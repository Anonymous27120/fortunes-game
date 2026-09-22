import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io({ autoConnect: false, transports: ['websocket'] });

const defaultRoom = {
  code: '',
  status: 'waiting',
  players: [],
  hostId: null,
  game: {
    board: [],
    currentPlayerIndex: 0,
    log: ['La partie n’a pas encore commencé.']
  }
};

function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [room, setRoom] = useState(defaultRoom);
  const [error, setError] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('room:update', (nextRoom) => {
      setRoom(nextRoom || defaultRoom);
      setError('');
    });
    socket.on('room:error', (message) => setError(message || 'Une erreur est survenue.'));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('room:update');
      socket.off('room:error');
      socket.disconnect();
    };
  }, []);

  const myPlayer = useMemo(
    () => room.players.find((player) => player.id === socket.id) || null,
    [room]
  );

  const currentPlayer = room.players[room.game.currentPlayerIndex] || null;
  const isHost = room.hostId === socket.id;
  const canPlay = room.status === 'playing' && myPlayer && currentPlayer && currentPlayer.id === myPlayer.id;
  const roomIsActive = Boolean(room.code && room.players.length);

  const createRoom = () => {
    if (!name.trim() || !password.trim()) {
      setError('Le pseudo et le mot de passe sont requis.');
      return;
    }

    socket.emit('create-room', { name: name.trim(), password }, (response) => {
      if (!response?.ok) {
        setError(response?.error || 'Impossible de créer la salle.');
        return;
      }
      setRoom(response.room);
      setRoomCode(response.room.code);
      setError('');
    });
  };

  const joinRoom = () => {
    if (!name.trim() || !password.trim() || !roomCode.trim()) {
      setError('Remplissez le pseudo, le mot de passe et le code de salle.');
      return;
    }

    socket.emit('join-room', { name: name.trim(), roomCode: roomCode.trim().toUpperCase(), password }, (response) => {
      if (!response?.ok) {
        setError(response?.error || 'Impossible de rejoindre la salle.');
        return;
      }
      setRoom(response.room);
      setError('');
    });
  };

  const startGame = () => {
    socket.emit('start-game', (response) => {
      if (!response?.ok) {
        setError(response?.error || 'Impossible de démarrer la partie.');
      }
    });
  };

  const rollDice = () => {
    socket.emit('roll-dice', (response) => {
      if (!response?.ok) {
        setError(response?.error || 'Le lancer de dés a échoué.');
      }
    });
  };

  const buyProperty = () => {
    socket.emit('buy-property', (response) => {
      if (!response?.ok) {
        setError(response?.error || 'Achat impossible.');
      }
    });
  };

  const exitRoom = () => {
    socket.emit('leave-room');
    setRoom(defaultRoom);
    setRoomCode('');
    setPassword('');
    setError('');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Projet gratuit</p>
          <h1>Fortunes</h1>
        </div>
        <span className={`status ${connected ? 'online' : 'offline'}`}>
          {connected ? 'Connecté' : 'Déconnecté'}
        </span>
      </header>

      {!roomIsActive ? (
        <main className="panel">
          <div className="fields">
            <label>
              Pseudo
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={20} placeholder="Votre pseudo" />
            </label>

            <label>
              Mot de passe de la salle
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={30} placeholder="Mot de passe" />
            </label>

            <div className="split-buttons">
              <button onClick={createRoom}>Créer une salle</button>
              <button className="secondary" onClick={joinRoom}>Rejoindre</button>
            </div>

            <label>
              Code de salle
              <input value={roomCode} onChange={(e) => setRoomCode(e.target.value.toUpperCase())} maxLength={10} placeholder="ABCD12" />
            </label>
          </div>

          {error && <p className="error">{error}</p>}
        </main>
      ) : (
        <main className="game-layout">
          <aside className="sidebar panel">
            <div className="room-header">
              <h2>Salle {room.code}</h2>
              <button className="small danger" onClick={exitRoom}>Quitter</button>
            </div>

            <div className="players-list">
              {room.players.map((player) => (
                <div key={player.id} className={`player-card ${currentPlayer?.id === player.id ? 'active' : ''}`}>
                  <div>
                    <strong>{player.name}</strong>
                    <small>{player.id === room.hostId ? 'Hôte' : 'Joueur'}</small>
                  </div>
                  <span>{player.money} €</span>
                </div>
              ))}
            </div>

            {room.status === 'waiting' && isHost && room.players.length >= 2 && (
              <button onClick={startGame}>Démarrer la partie</button>
            )}

            {room.status === 'waiting' && room.players.length < 2 && (
              <p className="hint">En attente d’un autre joueur pour commencer.</p>
            )}

            {room.status === 'playing' && (
              <div className="actions-block">
                {canPlay ? (
                  <>
                    <button onClick={rollDice}>Lancer les dés</button>
                    {room.game.board[myPlayer.position]?.owner === null && (
                      <button className="secondary" onClick={buyProperty}>Acheter la propriété</button>
                    )}
                  </>
                ) : (
                  <p className="hint">C’est au tour de {currentPlayer?.name}.</p>
                )}
              </div>
            )}
          </aside>

          <section className="board-panel panel">
            <div className="board-grid">
              {room.game.board.map((property) => {
                const owner = room.players.find((player) => player.id === property.owner);
                const isCurrentPosition = room.players.some(
                  (player) => player.position === property.id && player.id === myPlayer?.id
                );

                return (
                  <div
                    key={property.id}
                    className={`property-cell ${property.owner ? 'owned' : 'free'} ${isCurrentPosition ? 'my-position' : ''}`}
                  >
                    <span className="property-name">{property.name}</span>
                    <span className="property-price">{property.price} €</span>
                    <small>{owner ? `Propriétaire : ${owner.name}` : 'À vendre'}</small>
                  </div>
                );
              })}
            </div>

            <div className="game-log">
              <h3>Journal</h3>
              <ul>
                {room.game.log.map((entry, index) => (
                  <li key={`${entry}-${index}`}>{entry}</li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;

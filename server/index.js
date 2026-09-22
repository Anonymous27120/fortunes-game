* {
  box-sizing: border-box;
}

:root {
  color-scheme: dark;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #0b1020;
  color: #edf2ff;
}

body {
  margin: 0;
  min-height: 100vh;
  background: radial-gradient(circle at top, #132140 0%, #0b1020 40%, #070d18 100%);
}

button,
input {
  font: inherit;
}

button {
  border: none;
  cursor: pointer;
  border-radius: 12px;
  background: linear-gradient(135deg, #67e8f9, #3b82f6);
  color: #04111d;
  font-weight: 700;
  padding: 0.85rem 1.1rem;
  transition: transform 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

button.secondary {
  background: #1f2937;
  color: white;
}

button.danger {
  background: #ef4444;
  color: white;
}

button.small {
  padding: 0.5rem 0.8rem;
  font-size: 0.8rem;
}

input {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(15, 23, 42, 0.85);
  color: white;
  padding: 0.82rem 0.9rem;
}

.app-shell {
  max-width: 1200px;
  width: min(100%, 1100px);
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.4rem;
}

.eyebrow {
  margin: 0;
  color: #7dd3fc;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h1, h2, h3, p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  font-size: clamp(2rem, 5vw, 3rem);
}

.status {
  border-radius: 999px;
  padding: 0.4rem 0.8rem;
  font-size: 0.82rem;
  font-weight: 700;
}

.status.online {
  background: rgba(34, 197, 94, 0.15);
  color: #86efac;
}

.status.offline {
  background: rgba(148, 163, 184, 0.15);
  color: #cbd5e1;
}

.panel {
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 22px;
  padding: 1.25rem;
  box-shadow: 0 24px 60px rgba(2, 6, 23, 0.35);
}

.fields {
  display: grid;
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.5rem;
  font-weight: 600;
}

.split-buttons {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.error {
  margin-top: 1rem;
  color: #fca5a5;
  font-weight: 600;
}

.game-layout {
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  gap: 1rem;
}

.room-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.players-list {
  display: grid;
  gap: 0.75rem;
}

.player-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 0.85rem;
  border-radius: 14px;
  background: rgba(15, 118, 110, 0.12);
  border: 1px solid rgba(94, 234, 212, 0.2);
}

.player-card.active {
  background: rgba(59, 130, 246, 0.16);
  border-color: rgba(96, 165, 250, 0.4);
}

.player-card strong,
.player-card small {
  display: block;
}

.player-card small {
  color: #cbd5e1;
}

.hint {
  color: #cbd5e1;
  margin-bottom: 0;
}

.actions-block {
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
}

.board-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(90px, 1fr));
  gap: 0.75rem;
}

.property-cell {
  min-height: 130px;
  padding: 0.8rem;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(15, 23, 42, 0.8);
}

.property-cell.owned {
  border-color: rgba(250, 204, 21, 0.4);
  background: rgba(120, 119, 198, 0.15);
}

.property-cell.free {
  border-color: rgba(34, 197, 94, 0.3);
}

.property-cell.my-position {
  outline: 2px solid #67e8f9;
}

.property-name {
  font-weight: 700;
}

.property-price {
  font-size: 0.9rem;
  color: #fef3c7;
}

.game-log {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(148, 163, 184, 0.15);
}

.game-log ul {
  margin: 0;
  padding-left: 1.1rem;
  color: #dbeafe;
  display: grid;
  gap: 0.4rem;
}

@media (max-width: 820px) {
  .game-layout {
    grid-template-columns: 1fr;
  }

  .split-buttons {
    grid-template-columns: 1fr;
  }

  .board-grid {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  }
}

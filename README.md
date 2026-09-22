# Fortunes

Un jeu de propriété multijoueur en ligne, simple, responsive et hébergeable gratuitement.

## Fonctionnalités

- création de partie
- code de salle + mot de passe
- plusieurs joueurs connectés dans la même salle
- tour par tour
- propriété, argent, achat et gestion de l’argent
- interface mobile et ordinateur
- prêt pour un déploiement gratuit sur Cloudflare Pages / Vercel + serveur autonome

## Stack

- Frontend : React + Vite + Socket.IO client
- Backend : Node.js + Express + Socket.IO
- Hébergement gratuit proposé : Cloudflare Pages pour le front + Render/Railway/Fly.io pour le backend
- Base de données : pas encore nécessaire pour le MVP; la mémoire du serveur suffit pour les salles en local

## Pré-requis

- Node.js 18 ou plus
- npm

## Lancement local

```bash
npm install
npm run dev
```

Le site démarrera en local sur :
- frontend : http://localhost:5173
- backend : http://localhost:3001

## Démarrage du serveur seul

```bash
npm run server
```

## Build de production

```bash
npm run build
```

## Déploiement gratuit

### Option 1 : front + back séparés

- Frontend : Cloudflare Pages
- Backend : Render ou Railway
- Supabase si vous souhaitez conserver les salles dans une base plus sérieuse

### Option 2 : backend comblé dans un seul service

- déployer le serveur Express + Socket.IO sur Render gratuitement
- pointer l’URL de production dans un fichier de configuration ou une variable d’environnement

## Remarque importante

Le projet porte le nom de Fortunes, un jeu original inspiré de la mécanique de propriété. Il ne reprend pas les éléments protégés du Monopoly de manière commerciale. Cela évite les problèmes de marque et de droits pour un MVP gratuit.

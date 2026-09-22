# Fortunes

Un jeu de propriété multijoueur en ligne avec salles privées et mot de passe.

## Fonctionnalités

- Création et rejoint de salles privées
- Code de salle + mot de passe
- Interface web responsive pour mobile et ordinateur
- Multijoueur en temps réel via Socket.IO
- Boucle de jeu de propriétés simplifiée
- Test local et déploiement gratuit possible

## Stack

- Frontend: Vite + React + TypeScript
- Backend: Node.js + Socket.IO
- Stockage: JSON local pour le MVP, puis Supabase
- Déploiement: GitHub + Cloudflare Pages / Vercel (gratuit)

## Démarrage rapide

```bash
npm install
npm run dev
```

## Objectif du MVP

Un premier prototype avec :
- création d’une salle
- accès avec mot de passe
- liste des joueurs
- plateau de jeu basique
- tours et argent
- achat de propriétés
- synchronisation entre plusieurs appareils

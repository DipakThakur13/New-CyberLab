# CyberLab

Monorepo with two apps:
- frontend (Vite + React + Tailwind)
- sanity (Sanity Studio)

## Setup

1. Frontend
   ```bash
   cd frontend
   npm install
   cp .env.local.example .env.local
   # edit .env.local with your Sanity project id/dataset
   npm run dev

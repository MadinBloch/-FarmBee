# FarmBee

A React Progressive Web App demo that connects farmers with flowering crops to beekeepers looking for suitable farms for pollination and honey production.

## Requirements

- Node.js (v18+)
- npm

## Installation

```bash
npm install
node scripts/generate-icons.mjs
```

## Run Development Server

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

## Preview Production PWA

```bash
npm run preview
```

Then open the preview URL (usually `http://localhost:4173`).

## Demo Accounts

**Farmer — Ramesh Patel**

```
Mobile: 9000000001
Password: 123456
```

**Beekeeper — Amit Beekeeper**

```
Mobile: 9000000002
Password: 123456
```

## Demo Flow

1. Login as Beekeeper (9000000002 / 123456)
2. Open **Find Farms** and filter by Crop: Mustard
3. Open **Patel Mustard Farm** and send a request for 20 bee boxes
4. Logout and login as Farmer (9000000001 / 123456)
5. Open **Requests** and accept Amit Beekeeper's request
6. Logout and login again as Beekeeper to see the accepted status

## PWA Installation

1. Run `npm run build && npm run preview`
2. Open the preview URL in Chrome or Edge
3. Click the install icon in the address bar (or use browser menu → Install FarmBee)
4. The app will open in standalone mode and work offline for cached content

**Note:** Opening the HTML file directly via `file://` will NOT work for PWA features. Always use the dev or preview server.

## Reset Demo Data

Go to **Profile → Reset Demo Data** to restore the original seed data before a demo presentation.

## Tech Stack

- React + Vite + TypeScript
- React Router
- Tailwind CSS
- vite-plugin-pwa
- localStorage for all data persistence

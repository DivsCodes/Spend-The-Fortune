# Spend the Fortune V1.5

A polished browser-based wealth simulator where you choose a fictional fortune and spend it on hundreds of cars, jets, yachts, properties, businesses, technology, travel, charity projects, space missions, and deliberately ridiculous purchases.

Built with plain HTML, CSS, and JavaScript. No backend, build step, or dependencies are required.

## Features

- Multiple starting fortunes, including custom mode
- 300+ fictional/illustrative purchases across 19 categories
- Search, filtering, sorting, quantity controls, and maximum affordable purchase
- Live fortune balance, spending progress, item count, and category stats
- Spending report with category breakdown
- Purchase history stored locally in the browser
- Achievement system with 16 milestones
- Challenges that change as you play
- Sound toggle and lightweight purchase/achievement effects
- Responsive desktop and mobile layout
- GitHub Pages friendly static deployment

## Run locally

Open `index.html` in a browser. No installation is required.

## Deploy

This is a static site and works with GitHub Pages, Vercel, Netlify, Cloudflare Pages, and similar static hosts.

## Project structure

```text
spend-the-fortune/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Data and pricing note

Fortunes and product prices are simplified, illustrative values for entertainment. They are not intended to represent current net worths, market prices, or financial advice.

The app stores only local gameplay state in browser `localStorage` and does not require an account or backend.

## Images

Product imagery is loaded lazily from Wikimedia Commons when an item card enters view. The app only uses results identified as reusable/public-domain style licenses (such as CC BY, CC BY-SA, CC0, or public domain) and shows a source link on the card when an image is available. If no suitable image is found, the catalog keeps a lightweight visual placeholder instead of blocking the purchase UI.

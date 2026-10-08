# Spend the Fortune — V2.4 Fun Edition

A browser-based billionaire spending simulator built with vanilla HTML, CSS and JavaScript.

## What changed in V2.4

- Added **Chaos Spree**: instantly buys a randomized mini shopping spree from affordable items.
- Added **Daily Drop**: a date-based daily challenge with a one-per-day clear state.
- Added **Spin the Fortune Wheel**: randomly selects an affordable item and lets you accept or spin again.
- Added **Fortune Duel**: compare the same spending amount against another fortune.
- Added quick actions for **Random Item**, **Buy Cheapest**, **Biggest Flex**, and **Copy Stats**.
- Daily challenge completion is stored separately and the Daily button shows a completion check for the current day.
- Moved this build to dedicated V2.4 save/image-memory namespaces so older V2.1–V2.3 browser state cannot collide with it.
- Kept the V2.3 fixes: filter reset, currency-aware challenge text, Big-ticket navigation protection, clean supplied car crops, title-based local image mapping, Awards, Surprise Me, ×10 buying, price-to-fortune indicators, history, reports, themes, sound and sharing.

## Images

The supplied local images live in `assets/product-images/` and are mapped by exact product title in `manifest.js`. Products without a supplied local image use the strict real-photo resolver; if it cannot find a strong match, the card uses a neutral placeholder rather than a random category image.

The bundled supplied images are realistic generated product imagery, not verified documentary photographs.

## Running locally

Open the folder with VS Code and use Live Server, or serve it with any static HTTP server.

## Deployment

The project is static and can be deployed to GitHub Pages or another static host.

## Notes

Product prices are game estimates and the experience is entertainment, not financial advice. Real-person fortunes are dated illustrative snapshots rather than live account balances.


## v2.5 Rich List + Fun Pack
- Added small portrait thumbnails for real-person fortune choices, with country flags. Portraits are loaded from Wikimedia Commons at runtime and cached locally; fictional/custom modes use a fallback badge.
- Added Rich List modal with ranked fortunes.
- Added Spending Roast, Portfolio breakdown, and Jackpot pick.
- Kept the v2.4 Chaos, Daily, Duel, Wheel, Surprise Me, Awards, report, and filter tools.
- Portraits are informational UI imagery; Wikimedia image licenses/attribution apply to individual source files.


## V2.5.1.1 fixes
- Added bundled locally generated billionaire portrait assets for the matching fortunes; no portrait API call is required.
- Fixed missing burstConfetti runtime function used by Daily Challenge and Chaos Spree.
- Isolated V2.5.1.1 save, image-cache, and portrait-cache keys.
- Optimized Buy Everything to perform a single bulk state update instead of hundreds of individual UI/save operations.
- Reset now clears the portrait cache too.

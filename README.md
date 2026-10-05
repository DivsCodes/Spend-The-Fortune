# Spend the Fortune v2.1

A polished browser-based billionaire spending simulator built with vanilla HTML, CSS and JavaScript.

## v2.1 highlights

- 450 purchasable items across 19 categories.
- Fortune presets with country names and emoji flags.
- USD, INR, EUR and GBP display modes.
- Local browser save, reset, undo, favorites, filters, sorting, achievements, challenges and reports.
- Big-ticket cards open the exact matching shop item without destroying the current run.
- Product photography is real-photo-first and title-matched through Wikipedia/Wikimedia Commons.
- No random category images and no AI-generated image fallback.
- Duplicate image assignments are blocked with a reservation system that prevents async race conditions.
- Images are lazy-loaded with a small concurrency queue so navigation and category changes stay responsive.
- When a strong verified real photo cannot be found, the site intentionally shows a clean placeholder rather than a misleading or unrelated image.

## Run locally

Open `index.html` with VS Code Live Server or another static web server. Image lookup requires an internet connection because photographs are resolved from Wikipedia/Wikimedia Commons at runtime.

## Photo licensing

Images are pulled from Wikimedia projects and should be checked individually on their source page for license and attribution requirements. The site links to the source photo/page where available.

## Notes

Real-person fortunes are dated wealth snapshots from published sources. Product prices are illustrative game values and are not financial advice.

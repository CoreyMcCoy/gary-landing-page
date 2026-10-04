# Gary landing page

Static marketing site. No build step: upload this folder as-is to any static host.

- `index.html`: the page
- `styles.css`: all styles; brand colors are tokens on `:root`
- `demo-video.js`: creates the demo player when the visitor presses play
- `privacy.html`, `terms.html`, `sms.html`: legal pages, linked from every footer. Their placeholders are in square brackets in the text.
- `job-value.js`: the missed-call calculator under the hero
- `assets/`: mascot in WebP with PNG fallback (96, 400, 600 px), favicon, touch icon, share image
- `assets/gary.png`: original full-size mascot, kept as the source file. The page doesn't use it.

## Placeholders to fill before launch

Every placeholder is marked with a `PLACEHOLDER` comment in `index.html`. Search for `[`.

| Placeholder | Where |
| --- | --- |
| `[DEMO VIDEO]` | demo poster badge, plus the `data-video-src` attribute |

Also: the "Confirmation emails go to you and the customer" feature isn't confirmed yet. Check it with the owner before shipping.

## Changing the price

The $500/mo price appears in two places in `index.html`: the price in "What you get", and `data-monthly-price` on the calculator, which uses it for its math. Update both.

## Adding the demo video

Set `data-video-src` on `.video-frame` in `index.html` to any of these:

- a YouTube link (`watch?v=`, `youtu.be/`, `shorts/`). It plays through youtube-nocookie.com.
- a Vimeo link (unlisted `vimeo.com/<id>/<hash>` links work too)
- an `.mp4` path or URL
- a Cloudinary link: either the video's delivery URL (`res.cloudinary.com/<cloud>/video/upload/...`) or its hosted player link (`player.cloudinary.com/embed/...`). For the delivery URL, add `f_auto,q_auto` after `upload/` so Cloudinary picks the best format and size for each browser.

The current frame stays as the poster. Nothing loads until the visitor presses play. Then remove the `[DEMO VIDEO]` badge. The intro copy already says the video is 30 seconds.

## Checks done

- Layout matches the approved design at 1280px and 768px, with pixel-identical layout and type.
- At 375px and 320px, there's no sideways scroll. Two fixes apply only on phones:
  - The nav puts the logo and "Book a demo" on one row, with the links below.
  - The demo play button moves under the caption so the two don't overlap.
- Lighthouse, run locally on 2026-10-03: 100 for performance, accessibility, best practices and SEO, on both mobile and desktop.

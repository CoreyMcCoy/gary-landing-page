# Gary landing page

Static marketing site. No build step: upload this folder as-is to any static host.

- `index.html`: the page
- `styles.css`: all styles; brand colors are tokens on `:root`
- `hero-video.js`: runs the sound button on the hero video, and shows a paused video with player controls to visitors who turn on reduced motion
- `privacy-policy/`, `terms-and-conditions/`, `sms-disclosure/`: the three pages Twilio checks for A2P 10DLC registration, linked from every footer. Each folder's `index.html` is the page, so the URLs are `/privacy-policy/` and so on. Their placeholders are in square brackets in the text.
- `job-value.js`: the missed-call calculator under the hero
- `cal-booking.js`: makes the two "Hire Gary" buttons open Cal.com's booking calendar as a pop-up over the page. The buttons keep their normal cal.com link, so they still work if Cal.com's script can't load.
- `assets/`: mascot in WebP with PNG fallback (96, 400, 600 px), favicon, touch icon, share image, and the hero video with its poster
- `assets/gary.png`: original full-size mascot, kept as the source file. The page doesn't use it.

## Before launch

The "Confirmation emails" feature in "What you get" isn't confirmed yet. Check it with the owner before shipping.

## Changing the price

The site does not display pricing. The only price in `index.html` is `data-monthly-price` on the calculator, which it uses for its math. It is the average first-year monthly cost: ($1,500 one-time + $500/mo x 12) / 12 = $625. Update it if the pricing changes.

## The hero video

The hero shows `assets/hero-video.mp4`, the Ace Roofing text-thread video. It plays muted and looping as soon as the page opens, and the button in its corner turns the sound on and starts it over.

It is a smaller copy made for the website (720 by 1280, 30 frames per second, about 1.2 MB), cut to start 0.6 seconds in, so the video's first frame matches the poster, `assets/hero-video-poster.webp`. The full-quality video and its editable project are in `../text-thread-video/`. To replace the video, make a new copy the same way and take a new poster from the same starting point:

```bash
ffmpeg -ss 0.6 -i ../text-thread-video/text-thread-master.mp4 -vf "scale=720:1280:flags=lanczos,fps=30" -c:v libx264 -crf 25 -preset slow -pix_fmt yuv420p -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 128k -movflags +faststart assets/hero-video.mp4
```

```bash
ffmpeg -ss 0.6 -i ../text-thread-video/text-thread-master.mp4 -frames:v 1 -vf "scale=720:1280:flags=lanczos" -c:v libwebp -quality 82 assets/hero-video-poster.webp
```

## Checks done

- Layout matches the approved design at 1280px and 768px, with pixel-identical layout and type.
- At 375px and 320px, there's no sideways scroll. These changes apply only on phones:
  - The header shows only the logo and "Hire Gary". The two links are hidden.
  - The two hero buttons share one row, or stack at full width on the narrowest phones.
- Lighthouse, run locally on 2026-10-03: 100 for performance, accessibility, best practices and SEO, on both mobile and desktop.

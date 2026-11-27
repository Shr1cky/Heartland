# Heartland 2027 app — handoff

Start here when picking this project up in a new Claude Code session.

## What this is

The Heartland Festival 2027 companion app (theme *Between the lines / Mellem linjerne*, 10–12 June 2027, Egeskov). It's a React 19 + Vite + Tailwind v4 project that also runs inside **Figma Make**. Make shows the `main` branch, so whatever lands on `main` appears in Make.

- Repo: `Shr1cky/Heartland`
- Work branch: `claude/heartland-duotone`, open as **PR #1** into `main` (not merged yet).
- Hosted test build (owner-only Claude artifact): https://claude.ai/artifact/NrYe7D2Hcr7xKvSbT7Y2ff. It can't load remote photos, so it shows tinted placeholders.

## Source of truth: the visual identity deck

The brand guidelines are *NY Heartland præsentation 2027* (22 slides, PowerPoint, not in the repo because it's 62 MB; ask the user to attach it if you need the slides). Key rules:

- **Logo:** two tilted hearts that overlap, so the middle reads as a teardrop petal with thin gaps on each side. The lockup is the mark + "Heartland" wordmark.
- **Colours:** four families, each in three strengths.

  | Family | Livlig (accent) | Frisk (tint) | Rolig (deep) |
  | --- | --- | --- | --- |
  | Green | `#2DEA8B` | `#B1FFD8` | `#275C4C` |
  | Pink | `#EE5BCA` | `#FFC0F0` | `#752A64` |
  | Blue | `#207DFF` | `#D2D0FF` | `#0F216A` |
  | Red | `#FF4C33` | `#FF9FA0` | `#801C0D` |

  Neutrals: grey `#EFF0F3`, white, black.
- **Duotone combinations** (two colours from one family, or one colour + a neutral) are for **brand moments only**. The user was explicit that duotone is *not* for the whole app.
- **UI:** neutral grey/white/black with brand colours as accents and blocks. Buttons and tags are **pills**.
- **Type:** **Telegraf** (commercial, Pangram Pangram). Medium for titles, nav and key figures; Regular for subheads; Light for running text. The font files aren't in the repo yet, so the stack falls back to Inter Tight (Google Fonts).
- **"5. element":** organic inkblot shapes, **mirrored on both axes** (four-fold symmetry), morphing.
- **Photos:** full colour, warm, natural (Billedstil). Never put text over photos.

## Decisions made with the user

1. **Loading screen (9:16):**
   - Two filled hearts float apart, tilted outward. They accelerate together and *click* into the mark with a springy overshoot, and the background forms swell on the click.
   - The mark then shrinks into the lockup while the wordmark wipes in.
   - Each click switches to the next duotone pair. In the app, it goes from pink-on-black to green-on-dark-green.
   - It must **always play in full** and **hold at 100% for 1 s** before fading. Time advances only on drawn frames, and the timeline starts once fonts are ready.
2. **Welcome screen** (logo centred on moving inkblots, duotone green): the user likes it, so keep it.
3. **Rest of the app:** neutral UI plus one colour family per page, and *livelier than the deck*. The user asked to deviate a bit so scrolling isn't bland:
   - sections alternate Frisk tints, Rolig deep blocks and Livlig accents
   - a ticker band with the heart mark under each page intro
   - concept cards cycle through all four tints
   - sections rise in on scroll
4. **Page colour families:** set in `pageAccent` in `src/App.tsx`.

   | Pages | Family |
   | --- | --- |
   | welcome, home, programme, yellow | green |
   | explore, glossary | blue |
   | timeline, my | red |
   | ibsen, questions | pink |

5. **Code changes:** the user wants Claude to edit the code directly, not through Figma Make's AI chat.

## Where things live

- `src/brand.tsx`:
  - `PAIRS` (duotones)
  - `HEART` path, fitted to the logo construction drawing; the mark spans x ±75, y −103…0
  - `MarkGroup` / `HeartlandMark` / `Lockup`
  - `InkblotCanvas` (WebGL, four-fold mirrored metaballs; colours come from CSS `--bg`/`--ink` or props; `clear` ellipses keep text free of shapes; coordinates are mirrored, so put centres in the lower-right quadrant)
  - `Splash` (loading screen)
  - `Ticker`, `markDataUri`, `photoPlaceholder`
- `src/index.css`: original layout, converted to `--bg`/`--ink` tokens, plus the identity layer (`.accent-*` families, pills, Telegraf stack).
- `src/lively.css`: the livelier colour blocks, ticker, scroll reveal and contrast fixes. It's imported after `index.css`.
- `docs/handoff/loading-screen-9x16.dc.html`: the original standalone 1080×1920 loading-screen design (Claude Design canvas format). It's a reference only; the React port is `Splash`.
- `docs/handoff/heartland-mark.svg`: the static mark (uses `currentColor`).
- Run `python3 scripts/screenshots.py` to see every screen as it currently is.

## How to check work

```bash
pnpm install
pnpm exec tsc --noEmit -p .
pnpm build && pnpm preview --port 4173
python3 scripts/contrast_check.py      # flags text below 3:1 against its background
python3 scripts/screenshots.py         # phone-size screenshots of every screen → ./screenshots
```

The scripts need `pip install playwright && playwright install chromium`. The outlined "01" on the talk page is meant to be faint, so ignore it in the contrast output.

Gotchas we hit:
- The production CSS minifier shortens hex colours (`#fff`), so parse colours with the `rgb()` helper in `brand.tsx`.
- Tailwind preflight sets `img { max-width: 100% }`.
- Card `<button>`s centre their content vertically unless they're made flex columns.

## Open items

- [ ] Merge PR #1 into `main` when the user says so; then Figma Make picks it up.
- [ ] Add Telegraf web fonts (`.woff2`) once the user supplies them: `@font-face` in `src/index.css`, after the `@import` lines.
- [ ] Optional: replace the fitted heart geometry with the official logo SVG if the user can export it.

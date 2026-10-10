# Kithara Lyrics & Chords Scraper (Chrome extension)

Manifest V3 Chrome extension that extracts title, artist, key, lyrics and chords from a kithara.to song page and converts it to ChordPro (for Songbook Pro etc.). Copies to clipboard and downloads a `.cho` file. README is Greek.

## Stack
- Plain JavaScript, no build step; Manifest V3, version `1.0.2`
- Files: `manifest.json`, `popup.html`, `popup.js`, `content.js`, `icons/`, `banner.png`, `favicon.png`
- Permissions: `activeTab`, `scripting` only (keep it minimal)

## Run / test
- Chrome -> `chrome://extensions/` -> Developer mode -> Load unpacked -> select this folder. Reload the extension after edits.
- No automated tests; verify manually on a kithara.to song page.

## Conventions
- Update `CHANGELOG.md` and the `manifest.json` version together.
- `.cho` filenames must handle Greek characters.
- `PRIVACY.md` states no data is collected or transmitted; keep that true.
- Chord logic should stay in step with the Android apps (`kithara-lyrics-chords-scraper-app`, `kithara-scraper-v2`).

## Don't
- Don't add permissions or network requests without updating `PRIVACY.md`.

## Working across two PCs
This repo is worked on from a home PC and an office PC, synced via GitHub.
- At the start of a session, read `HANDOFF.md` for current status.
- At the end of a session, update `HANDOFF.md`, then commit and push.

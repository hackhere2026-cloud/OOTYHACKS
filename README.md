# OOTY HACKS 2026 — The Summit Expedition

A static event website for the offline 24-hour hackathon in Ooty, The Nilgiris, on **19–20 December 2026**. Teams: **1–4 members**. Registration: **₹1,000 per team**. Prize pool: **₹1 lakh**.

## Design and interactions

- Original supplied mountain poster, OOTY HACKS logo, and event-highlights artwork.
- Misty blue landscape, forest-green typography, translucent panels, and restrained gold accents.
- Responsive navigation and layouts for desktop, tablet, and mobile.
- Skippable, replayable intro; drifting mist; gentle landscape parallax; scroll reveals; animated mission illustrations.
- Persistent pause-motion control and system reduced-motion support.
- Countdown to the event date in India Standard Time, with event-weekend and concluded states.
- Two mission previews, a 12th-hour twist, event journey, supplied sponsor artwork, and expandable FAQs.
- The supplied styled QR, decoder-verified and linked to its confirmed official OOTY HACKS destination.
- Public-page information architecture adapted from the Quantexa event site: hero, event details, highlights, about, juries, missions, schedule, rewards, sponsors, organizing team, FAQ, registration, and footer.
- No evaluation, submission, admin, team-login, or final portal routes are included in this phase.
- Registration buttons lead to https://unstop.com/hackathons/ooty-hacks-hackhere-1768100.

The exact venue, reporting time, organizing-team profiles, mentor/jury roster, benefit details, and prize distribution remain to be announced. Career offers are subject to partner selection. GoHub, Scidaforest, and Unstop use supplied logo assets; ELRO Tech and delyon remain typeset because no artwork was supplied for them.

## Deploy on Vercel

Import `hackhere2026-cloud/OOTYHACKS`. The included `vercel.json` uses the Other preset, runs `node verify.mjs`, and publishes `dist/`. No package installation or environment variables are needed.

## Run locally

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173. Add `?skipIntro` to bypass the opening sequence.

## Verify

```sh
node verify.mjs
```

This checks asset references, navigation targets, duplicate IDs, JavaScript syntax, CSS asset paths, and deployment configuration. It does not replace rendered browser checks.

## Active files

- `dist/index.html`: event content and accessible controls.
- `dist/summit.css`: responsive design and animations.
- `dist/summit.js`: navigation, countdown, motion preferences, and intro.
- `dist/assets/summit-poster.png`, `ooty-hacks-logo.png`, `event-highlights.png`: original supplied artwork.
- `dist/assets/summit-mark.svg`: compact navigation mark.

Legacy `hackathon*`, `opening*`, and real-photo assets are retained for reference but are not loaded by the redesigned page. Google Fonts is optional; system fallback fonts remain available.

# Que Tracker

Tracks fraternity brothers' contact info — first name, last name, phone number, and
Omega Psi Phi chapter — and visualizes them on an interactive 3D globe by city.

## Features

- **Interactive globe**: cities with brothers show up as clickable points on a 3D
  globe. Click a point to see who's there, with inline edit/remove.
- **Auto-populate from chapter**: typing/selecting a chapter automatically fills in
  campus, city, and state. If the chapter isn't in the seed list yet, you fill in its
  city/state and click anywhere on an embedded globe to drop a pin for it — that
  chapter is then remembered for next time.
- **Area code lookup**: as you type a phone number, the app resolves its area code to
  a city/region automatically (e.g. `404` → Atlanta, GA).
- **List view**: searchable/sortable table of every brother, with remove.

## Stack

- `server/` — Node + Express + SQLite (`better-sqlite3`), seeded with ~50 known
  Omega Psi Phi undergraduate and alumni chapters.
- `web/` — React (Vite) + `react-globe.gl` for the 3D globe.

## Running locally

```bash
npm run install:all   # installs both server/ and web/ dependencies
npm run dev            # runs the API on :4000 and the web app on :5173
```

Then open http://localhost:5173.

The SQLite database file (`server/que_tracker.db`) is created automatically on first
run and is gitignored — your data stays local.

## Notes on the seed chapter data

Omega Psi Phi has hundreds of chapters, and exact Greek-letter designations beyond
the founding Alpha Chapter (Howard University) aren't reliably documented in one
place, so the seed list uses descriptive campus/city names (e.g. "Morehouse College
Chapter", "Chicago Alumni Chapter") rather than guessing letter assignments. Add or
rename chapters from the app as needed — anything you add via the "new chapter"
flow in the Add Brother form is saved permanently.

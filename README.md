# Capstone Project 

A small static web app for browsing movies and saving favorites. Built with HTML, CSS, and vanilla JavaScript.

## Features
- Browse movies via the app UI
- Save and view favorite movies
- Responsive layout

## Project structure

- `index.html` — Main entry page
- `about.html` — About page
- `favorites.html` — Favorites page
- `style.css` — Global styles
- `images/` — Static images used by the app
- `js/` — JavaScript source files
  - `api.js` — API interaction helpers
  - `app.js` — Main application logic
  - `favorites.js` — Favorites management
  - `favoritesPage.js` — Favorites page UI logic
  - `ui.js` — Shared UI helpers

## Getting started

Prerequisites: a modern web browser. No build step required.

To run locally:

1. Open `index.html` in your browser (double-click the file), or

2. Serve the folder with a simple HTTP server (recommended for APIs and fetch requests):

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

## Usage

- Browse books on the main page.
- Click the favorite/save control to add items to `favorites.html`.
- Open the `favorites.html` page to review saved items.



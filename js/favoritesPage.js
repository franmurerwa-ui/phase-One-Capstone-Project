// Lab 2 – Exercise 2.1: Favorites page renderer
import { getFavorites, removeFavorite, createBookCard } from './favorites.js';

function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    const noFavMsg = document.getElementById('noFavorites');
    const favs = getFavorites();

    // Clear existing cards (keep the noFavorites <p>)
    Array.from(grid.children).forEach(child => {
        if (child.id !== 'noFavorites') child.remove();
    });

    if (favs.length === 0) {
        noFavMsg.classList.remove('hidden');
        return;
    }

    noFavMsg.classList.add('hidden');
    favs.forEach(book => {
        const card = createBookCard(book, renderFavorites);
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderFavorites);

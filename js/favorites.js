// Lab 2 – Exercise 2.2 & 2.4: Favorites module with localStorage persistence
const STORAGE_KEY = 'bookExplorerFavorites';

export function getFavorites() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function addFavorite(book) {
    const favs = getFavorites();
    if (!favs.find(b => b.key === book.key)) {
        favs.push(book);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
    }
}

export function removeFavorite(key) {
    const favs = getFavorites().filter(b => b.key !== key);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export function isFavorite(key) {
    return getFavorites().some(b => b.key === key);
}

// Lab 2 – Exercise 2.1 & 2.3: Creates a book card DOM element with favorite toggle
export function createBookCard(book, onToggle) {
    const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : 'https://placehold.co/200x300?text=No+Cover';

    const fav = isFavorite(book.key);

    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow';
    card.innerHTML = `
        <img src="${coverUrl}" alt="${book.title}" class="book-cover w-full object-cover" loading="lazy">
        <div class="p-4 flex flex-col flex-grow">
            <h3 class="font-semibold text-gray-800 line-clamp-2 mb-1">${book.title}</h3>
            <p class="text-sm text-gray-500 mb-1">${book.author_name?.[0] ?? 'Unknown Author'}</p>
            <p class="text-xs text-gray-400 mb-4">${book.first_publish_year ?? ''}</p>
            <button
                data-key="${book.key}"
                class="mt-auto w-full py-2 rounded-lg text-sm font-semibold transition-colors ${fav ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}"
            >
                ${fav ? '★ Remove Favorite' : '☆ Add to Favorites'}
            </button>
        </div>
    `;

    // Lab 2 – Exercise 2.3: DOM click event
    card.querySelector('button').addEventListener('click', () => {
        if (isFavorite(book.key)) {
            removeFavorite(book.key);
        } else {
            addFavorite(book);
        }
        if (onToggle) onToggle();
        // Re-render this card in place
        const updated = createBookCard(book, onToggle);
        card.replaceWith(updated);
    });

    return card;
}

// Lab 3 – Exercise 3.2, 3.3, 3.4: Populate grid, search, loading states
import { fetchBooks } from './api.js';
import { createBookCard } from './favorites.js';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const bookGrid = document.getElementById('bookGrid');
const loading = document.getElementById('loading');
const errorEl = document.getElementById('error');

function showLoading() {
    loading.classList.remove('hidden');
    bookGrid.innerHTML = '';
    clearError();
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function clearError() {
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
}

function renderBooks(books) {
    bookGrid.innerHTML = '';
    if (!books || books.length === 0) {
        showError('No results found. Try a different search.');
        return;
    }
    books.forEach(book => {
        bookGrid.appendChild(createBookCard(book));
    });
}

async function loadBooks(query) {
    showLoading();
    try {
        const books = await fetchBooks(query);
        renderBooks(books);
    } catch (err) {
        showError('Something went wrong. Please try again.');
    } finally {
        hideLoading();
    }
}

function debounce(fn, delay = 400) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// Lab 3 – Exercise 3.3: Search on button click
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    loadBooks(query || 'popular books');
});

// Also search on Enter key
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

// Debounced live search while typing
searchInput.addEventListener('input', debounce(() => {
    const query = searchInput.value.trim();
    if (query.length > 2) loadBooks(query);
}));

// Lab 3 – Exercise 3.2: Load default books on page load
document.addEventListener('DOMContentLoaded', () => loadBooks('popular books'));

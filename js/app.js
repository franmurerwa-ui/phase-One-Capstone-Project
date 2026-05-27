
 //Lab 3: Async JavaScript & API Integration
 
import { fetchBooks } from './api.js';
import { createBookCard } from './favorites.js';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const settingsBtn = document.getElementById('settingsBtn');
const bookGrid = document.getElementById('bookGrid');
const loading = document.getElementById('loading');
const errorEl = document.getElementById('error');

function showError(message) {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function clearError() {
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
}

function debounce(fn, delay = 400) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

//Populate Homepage(Fetch and display book data from the API.)
 
 
async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        bookGrid.innerHTML = '<p class="text-gray-500 col-span-full text-center">Please enter a search term.</p>';
        return;
    }

    // Show loading spinner and clear previous UI
    loading.classList.remove('hidden');
    clearError();
    bookGrid.innerHTML = '';

    try {
        const books = await fetchBooks(query);

        if (!books || books.length === 0) {
            bookGrid.innerHTML = '<p class="text-gray-500 col-span-full text-center">No results found.</p>';
            return;
        }

        // Add books to the grid
        books.forEach(book => {
            bookGrid.appendChild(createBookCard(book));
        });
    } catch (err) {
        console.error('Search failed:', err);
        showError('Unable to fetch results. Check your connection and try again.');
    } finally {
        // Hide loading spinner
        loading.classList.add('hidden');
    }
}

/**
 * Exercise 3.3: Search Functionality
 * Listen for clicks or 'Enter' key to start search.
 */
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Live search with debounce on input
const debouncedSearch = debounce(() => handleSearch(), 500);
searchInput.addEventListener('input', debouncedSearch);

// Do not perform a default search on load; wait for user action
const SETTINGS_KEY = 'default_home_query';

// Safe localStorage access for settings so app doesn't crash when storage is unavailable.
function safeGetSetting(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.warn('localStorage unavailable when getting setting', key, e);
        return null;
    }
}

function safeSetSetting(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn('localStorage unavailable when setting', key, e);
    }
}

function safeRemoveSetting(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.warn('localStorage unavailable when removing', key, e);
    }
}

async function loadDefaultBooks(limit = 8) {
    searchInput.value = '';
    loading.classList.remove('hidden');
    clearError();
    bookGrid.innerHTML = '';

    try {
        const defaultQuery = safeGetSetting(SETTINGS_KEY) || 'bestsellers';
        const books = await fetchBooks(defaultQuery, limit);

        if (!books || books.length === 0) {
            bookGrid.innerHTML = '<p class="text-gray-500 col-span-full text-center">No results found.</p>';
            return;
        }

        books.forEach(book => {
            bookGrid.appendChild(createBookCard(book));
        });
    } catch (err) {
        console.error('Homepage load failed:', err);
        showError('Unable to load books for homepage.');
    } finally {
        loading.classList.add('hidden');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadDefaultBooks(8);
});

if (settingsBtn) {
    settingsBtn.addEventListener('click', async () => {
        const current = safeGetSetting(SETTINGS_KEY) || '';
        const newTerm = prompt('Set default homepage search term (leave empty to reset):', current);
        if (newTerm === null) return; // user cancelled

        if (newTerm.trim() === '') {
            safeRemoveSetting(SETTINGS_KEY);
            alert('Default query reset to "bestsellers".');
        } else {
            safeSetSetting(SETTINGS_KEY, newTerm.trim());
            alert('Default query set to "' + newTerm.trim() + '".');
        }

        await loadDefaultBooks(8);
    });
}

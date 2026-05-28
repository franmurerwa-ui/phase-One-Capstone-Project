// Lab 3 – Exercise 3.1: API Module
const BASE_URL = 'https://openlibrary.org/search.json';

export async function fetchBooks(query = 'javascript') {
    const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,cover_i,first_publish_year`);
    if (!res.ok) throw new Error('Failed to fetch books');
    const data = await res.json();
    return data.docs;
}

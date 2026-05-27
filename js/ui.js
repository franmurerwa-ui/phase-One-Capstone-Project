// Small UI utilities (menu toggle)
document.addEventListener('DOMContentLoaded', () => {
    const btns = document.querySelectorAll('#menuBtn');
    btns.forEach(btn => {
        const nav = btn.closest('nav');
        if (!nav) return;
        const menu = nav.querySelector('#mobileMenu');
        if (!menu) return;
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    });
});

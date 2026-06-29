document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articleCards = document.querySelectorAll('.insight-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active class on buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            articleCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    // Fast re-trigger visual reveal
                    setTimeout(() => card.classList.add('active'), 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

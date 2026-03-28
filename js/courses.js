// Course Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            courseCards.forEach(card => {
                if (filter === 'all' ||
                    card.dataset.subject === filter ||
                    card.dataset.grade === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // URL Parameter Filtering
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');

    if (subject) {
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === subject) {
                btn.click();
            }
        });
    }
});
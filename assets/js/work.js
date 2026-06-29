document.addEventListener('DOMContentLoaded', () => {
    // Case Studies Expandable Cards
    const caseStudyButtons = document.querySelectorAll('.case-study-toggle-btn');
    caseStudyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            const trayId = btn.getAttribute('aria-controls');
            const tray = document.getElementById(trayId);
            
            btn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
            btn.classList.toggle('active');
            
            if (!isExpanded) {
                tray.style.maxHeight = tray.scrollHeight + 'px';
            } else {
                tray.style.maxHeight = '0px';
            }
        });
    });
});

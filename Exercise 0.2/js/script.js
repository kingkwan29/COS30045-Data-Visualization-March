// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const logoBtn = document.getElementById('logo-btn');
    const pages = document.querySelectorAll('.page');

    /**
     * Switch to a specific page
     * @param {string} pageId - The ID of the page to display
     */
    function switchPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Remove active class from all nav buttons
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Show the selected page
        const selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.classList.add('active');
        }
        
        // Set the active nav button
        const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Scroll to top of page smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Update browser title
        const titleMap = {
            'home': 'Home - Power Energy Solutions',
            'televisions': 'Televisions - Power Energy Solutions',
            'about': 'About Us - Power Energy Solutions'
        };
        document.title = titleMap[pageId] || 'Power Energy Solutions';
    }

    // Add click handlers to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });

        // Add hover feedback
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Logo click handler - return to home
    logoBtn.addEventListener('click', function() {
        switchPage('home');
    });

    // Optional: keyboard navigation
    document.addEventListener('keydown', function(event) {
        // Alt + H for Home, Alt + T for Televisions, Alt + A for About
        if (event.altKey) {
            switch(event.key.toLowerCase()) {
                case 'h':
                    switchPage('home');
                    break;
                case 't':
                    switchPage('televisions');
                    break;
                case 'a':
                    switchPage('about');
                    break;
            }
        }
    });

    // Initialize - show home page on load
    switchPage('home');
});

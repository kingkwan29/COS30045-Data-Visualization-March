// Parse CSV by simple line and comma splitting
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        const values = lines[i].split(',').map(v => v.trim());
        const obj = {};
        
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = values[j] || '';
        }
        data.push(obj);
    }
    return data;
}

// Load CSV file and populate the table
function loadAndPopulateTable() {
    fetch('data/tv_power_consumption.csv')
        .then(response => response.text())
        .then(csvText => {
            const data = parseCSV(csvText);
            console.log('Parsed data:', data);
            
            const tbody = document.querySelector('.energy-table tbody');
            if (!tbody) {
                console.error('Table body not found');
                return;
            }
            
            // Clear existing rows
            tbody.innerHTML = '';
            
            // Populate table with CSV data
            data.forEach((row, index) => {
                console.log('Row ' + index + ':', row);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row['Technology'] || ''}</td>
                    <td>${row['Screen Size'] || ''}</td>
                    <td>${row['Power Consumption (W)'] || ''}</td>
                    <td>${row['Annual Cost (AUS)'] || ''}</td>
                    <td>${row['CO2 Emissions (tonnes)'] || ''}</td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error loading CSV:', error));
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const logoBtn = document.getElementById('logo-btn');
    const pages = document.querySelectorAll('.page');

    // Load CSV data when page loads
    loadAndPopulateTable();

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

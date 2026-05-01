    // Keep CSV parsing lightweight since this file has no quoted commas.
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

    // Fetch TV data and render it into the table body.
    function loadAndPopulateTable() {
        fetch('data/tv_power_consumption.csv')
            .then(response => response.text())
            .then(csvText => {
                const data = parseCSV(csvText);
                const tbody = document.querySelector('.energy-table tbody');
                if (!tbody) return;
                
                tbody.innerHTML = '';
                
                data.forEach(row => {
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
    }() => {}

    document.addEventListener('DOMContentLoaded', function() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const logoBtn = document.getElementById('logo-btn');
        const pages = document.querySelectorAll('.page');

        loadAndPopulateTable();

        function switchPage(pageId) {
            pages.forEach(page => {
                page.classList.remove('active');
            });

            navButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            const selectedPage = document.getElementById(pageId);
            if (selectedPage) {
                selectedPage.classList.add('active');
            }
            
            const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            const titleMap = {
                'home': 'Home - Power Energy Solutions',
                'televisions': 'Televisions - Power Energy Solutions',
                'storyboards': 'Storyboards - Power Energy Solutions',
                'about': 'About Us - Power Energy Solutions'
            };
            document.title = titleMap[pageId] || 'Power Energy Solutions';
        }

        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                const pageId = this.getAttribute('data-page');
                switchPage(pageId);
            });
        });

        logoBtn.addEventListener('click', function() {
            switchPage('home');
        });

        // Power users can jump sections with Alt + H/T/S/A.
        document.addEventListener('keydown', function(event) {
            if (event.altKey) {
                switch(event.key.toLowerCase()) {
                    case 'h':
                        switchPage('home');
                        break;
                    case 't':
                        switchPage('televisions');
                        break;
                    case 's':
                        switchPage('storyboards');
                        break;
                    case 'a':
                        switchPage('about');
                        break;
                }
            }
        });

        switchPage('home');
    });

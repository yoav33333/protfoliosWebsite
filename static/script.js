const portfolioData = [
    {
        team: 'Megiddo Lions',
        year: '2025',
        award: 'Think 1st Place',
        pdf: 'PDFs/24-25/Megiddo_Lions_18833_think_1.pdf',
        tags: ['2025', 'Megiddo Lions'],
        isAwardWinner: true
    },
    {
        team: 'Mishmash',
        year: '2025',
        award: 'Most Innovative',
        pdf: 'PDFs/24-25/mishmash - 12016 - inspire 1.pdf',
        tags: ['2025', 'Mishmash'],
        isAwardWinner: true
    },
    // Add more portfolio objects here
];

function toggleMode() {
    const body = document.body;
    body.classList.toggle('light');
    body.classList.toggle('dark');
}

function renderPortfolios(filteredData) {
    const portfolioList = document.getElementById('portfolio-list');
    portfolioList.innerHTML = ''; // Clear the current list

    filteredData.forEach(portfolio => {
        const portfolioItem = document.createElement('div');
        portfolioItem.classList.add('portfolio-item');
        if (portfolio.isAwardWinner) {
            portfolioItem.classList.add('highlight');
        }

        portfolioItem.innerHTML = `
            <h3>${portfolio.team}</h3>
            <p><strong>Year:</strong> ${portfolio.year}</p>
            <p><strong>Award:</strong> ${portfolio.award}</p>
            <a href="${portfolio.pdf}" download class="pdf-link">Download Portfolio</a>
        `;

        portfolioList.appendChild(portfolioItem);
    });
}

function filterPortfolios() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const filteredData = portfolioData.filter(portfolio =>
        portfolio.team.toLowerCase().includes(searchQuery) ||
        portfolio.year.toLowerCase().includes(searchQuery)
    );
    renderPortfolios(filteredData);
}

function sortPortfolios() {
    const sortByYear = document.getElementById('sort-by-year').value;
    const sortByAward = document.getElementById('sort-by-award').value;

    let sortedData = [...portfolioData];

    if (sortByYear !== 'none') {
        sortedData.sort((a, b) => {
            return sortByYear === 'asc' ? a.year - b.year : b.year - a.year;
        });
    }

    if (sortByAward === 'award') {
        const awardOrder = ['Champion', 'Finalist', 'Semifinalist'];
        sortedData.sort((a, b) => awardOrder.indexOf(a.award) - awardOrder.indexOf(b.award));
    }

    renderPortfolios(sortedData);
}

// Initial render
renderPortfolios(portfolioData);
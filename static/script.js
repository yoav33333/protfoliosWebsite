const portfolioData = [
    { team: 'Megiddo Lions', number: '18833', year: '2021-22', award: 'Design', pdf: 'PDFs/21-22/Megiddo lions - 18833 - design.pdf', isAwardWinner: true },
    { team: 'Megiddo Lions', number: '18833', year: '2022-23', award: 'Inspire 1st Place', pdf: 'PDFs/22-23/Megiddo lions - 18833 - inspire 1.pdf', isAwardWinner: true },
    { team: 'Megiddo Lions', number: '18833', year: '2023-24', award: 'Motivate', pdf: 'PDFs/23-24/Megiddo Lions - 18833 - Motivate.pdf', isAwardWinner: true },
    { team: 'Megiddo Lions', number: '18833', year: '2024-25', award: 'Think 1st Place', pdf: 'PDFs/24-25/Megiddo_Lions_18833_think_1.pdf', isAwardWinner: true },
    { team: 'Mishmash', number: '12016', year: '2024-25', award: 'Inspire 1st Place', pdf: 'PDFs/24-25/mishmash - 12016 - inspire 1.pdf', isAwardWinner: true },
    { team: 'Apollo', number: '9662', year: '2024-25', award: 'Inspire 3rd Place', pdf: 'PDFs/24-25/apollo - 9662 - inspire 3.pdf', isAwardWinner: true },
    { team: 'BTJ', number: '13452', year: '2024-25', award: 'Innovate', pdf: 'PDFs/24-25/BTJ - 13452 - innovate.pdf', isAwardWinner: true },
    { team: 'MA', number: '13146', year: '2024-25', award: 'Motivate', pdf: 'PDFs/24-25/MA - 13146 - motivate.pdf', isAwardWinner: true },
    { team: 'Orange Fox', number: '12363', year: '2024-25', award: 'Control', pdf: 'PDFs/24-25/orange fox - 12363 - control.pdf', isAwardWinner: true },
    { team: 'Shamir', number: '23422', year: '2024-25', award: 'Design', pdf: 'PDFs/24-25/shamir - 23422 - design.pdf', isAwardWinner: true }
];

function toggleMode() {
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
}

function renderPortfolios(filteredData) {
    const portfolioList = document.getElementById('portfolio-list');
    portfolioList.innerHTML = '';

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    filteredData.forEach(portfolio => {
        const portfolioItem = document.createElement('div');
        portfolioItem.classList.add('portfolio-item');
        if (portfolio.isAwardWinner) portfolioItem.classList.add('highlight');

        portfolioItem.innerHTML = `
            <h3>${portfolio.team} (#${portfolio.number})</h3>
            <p><strong>Year:</strong> ${portfolio.year}</p>
            <p><strong>Award:</strong> ${portfolio.award}</p>
            <button onclick="viewPDF('${portfolio.pdf}')">${isMobile ? 'Download PDF' : 'View PDF'}</button>
        `;

        portfolioList.appendChild(portfolioItem);
    });
}

function filterPortfolios() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const awardFilter = document.getElementById('filter-award').value;

    const filteredData = portfolioData.filter(portfolio => {
        const matchesSearch =
            portfolio.team.toLowerCase().includes(searchQuery) ||
            portfolio.number.includes(searchQuery) ||
            portfolio.year.includes(searchQuery) ||
            portfolio.award.toLowerCase().includes(searchQuery);

        const matchesAward = awardFilter === "all" || portfolio.award.toLowerCase().includes(awardFilter.toLowerCase());

        return matchesSearch && matchesAward;
    });

    renderPortfolios(filteredData);
}
function sortPortfolios() {
    const sortOrder = document.getElementById('sort-by-year').value;

    const sortedData = [...portfolioData].sort((a, b) => {
        // Convert years to numbers for correct sorting
        const yearA = parseInt(a.year.replace(/\D/g, ''), 10);
        const yearB = parseInt(b.year.replace(/\D/g, ''), 10);

        return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
    });

    renderPortfolios(sortedData);
}


function viewPDF(pdfURL) {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // If on mobile, force download instead of opening in modal
        const link = document.createElement("a");
        link.href = pdfURL;
        link.download = pdfURL.split("/").pop(); // Extract filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        // Desktop: Open in modal
        document.getElementById('pdf-viewer').src = pdfURL;
        document.getElementById('pdf-modal').style.display = 'flex';
        document.body.classList.add('modal-open');
    }
}


function closePDF() {
    document.getElementById('pdf-modal').style.display = 'none';
    document.body.classList.remove('modal-open'); // Re-enable scrolling

}
document.getElementById('pdf-modal').addEventListener('click', (event) => {
    if (event.target.id === 'pdf-modal') {
        closePDF();
    }
});
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closePDF();
    }
});
// Initial render
renderPortfolios(portfolioData);

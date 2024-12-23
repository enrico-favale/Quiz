const homepageButton = document.getElementById('homepage-button');

homepageButton.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '../../index.html';
});

const resultsScore = document.getElementById('results-score');
const resultsTotal = document.getElementById('results-total');

resultsScore.innerHTML = localStorage.getItem('correctAnswers');
resultsTotal.innerHTML = localStorage.getItem('nQuestions');


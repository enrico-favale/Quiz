const homepageButton = document.getElementById('homepage-button');

homepageButton.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '../../index.html';
});

const resultsScore = document.getElementById('results-score');
const resultsTotal = document.getElementById('results-total');

const msgComplimenti = document.getElementById('msg-complimenti');
const msgSuperamento = document.getElementById('msg-superamento');

const coriandoliSX = document.getElementsByClassName('coriandoli-sx');
const coriandoliDX = document.getElementsByClassName('coriandoli-dx');

let correct_answers = localStorage.getItem('correctAnswers');
let n_questions = localStorage.getItem('nQuestions');

resultsScore.innerHTML = correct_answers;
resultsTotal.innerHTML = n_questions;

if (correct_answers >= n_questions / 2) {
    msgComplimenti.innerHTML = 'Complimenti!';
    msgSuperamento.innerHTML = 'Test superato';
} else {
    msgComplimenti.innerHTML = 'Ops...';
    msgSuperamento.innerHTML = 'Test non superato';

    for (let coriandolo of coriandoliSX) {
        coriandolo.style.display = 'none';
    }
    for (let coriandolo of coriandoliDX) {
        coriandolo.style.display = 'none';
    }
}
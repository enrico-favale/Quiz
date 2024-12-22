const startButton = document.getElementById('start-math-button');
const nQuestionsInput = document.getElementById('questions-input');

startButton.addEventListener('click', () => {
    console.log("Quiz iniziato!");

    localStorage.setItem('nQuestions', nQuestionsInput.value);
    localStorage.setItem('currentQuestion', 1);
    localStorage.setItem('correctAnswers', 0);

    window.location.href = 'question.html';
});
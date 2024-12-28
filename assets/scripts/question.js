// Classe Counter per gestire il conteggio del timer
class Counter {
    constructor() {
        this.seconds = 15; // Contatore in secondi
    }

    // Incrementa il contatore di 1 secondo
    increment() {
        this.seconds++;
    }

    // Decrementa il contatore di 1 secondo
    decrement() {
        this.seconds--;
    }

    // Resetta il contatore
    reset() {
        this.seconds = 15;
    }
}

// Classe Timer per gestire il comportamento del timer
class Timer {
    constructor(displayElement, onTimeUp) {
        this.counter = new Counter();
        this.displayElement = displayElement;
        this.intervalId = null; // Riferimento all'intervallo del timer
        this.onTimeUp = onTimeUp;
    }

    // Avvia il timer
    start() {
        if (this.intervalId === null) {
            this.intervalId = setInterval(() => {
                this.counter.decrement();

                if (this.counter.seconds <= 0) {
                    this.pause();
                    this.onTimeUp();
                }

                this.updateDisplay();
            }, 1000);
        }
    }

    // Metti in pausa il timer
    pause() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    // Resetta il timer
    reset() {
        this.pause();
        this.counter.reset();
        this.updateDisplay();
    }

    // Aggiorna l'elemento grafico con il tempo attuale
    updateDisplay() {
        this.displayElement.textContent = this.counter.seconds;
    }
}

const maxValueQuestion = 50;
const maxValueAnswer = 100;

class Question {
    constructor() {
        this.question = this.getGeneratedQuestion(maxValueQuestion);
        this.answers = [eval(this.question), this.getRandomNumber(maxValueAnswer), this.getRandomNumber(maxValueAnswer), this.getRandomNumber(maxValueAnswer)];
        this.correctAnswer = this.answers[0];
    }

    getRandomOperation() {
        const operations = ['+', '-'];
        const randomIndex = Math.floor(Math.random() * operations.length);
        return operations[randomIndex];
    }

    getRandomNumber(maxValue = 10) {
        return Math.floor(Math.random() * maxValue);
    }

    getGeneratedQuestion(maxValue = 10) {
        const operation = this.getRandomOperation();
        const num1 = this.getRandomNumber(maxValue);
        const num2 = this.getRandomNumber(maxValue);

        let question = num1 + " " + operation + " " + num2;

        return question;
    }

    shuffleAnswers() {
        const array = this.answers;

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Genera un indice casuale tra 0 e i
            [array[i], array[j]] = [array[j], array[i]]; // Scambia gli elementi
        }
    }

    checkAnswer(answer) {
        return answer == this.correctAnswer;
    }
}

function goToNextPage () {
    if (parseInt(localStorage.getItem('currentQuestion')) >= parseInt(localStorage.getItem('nQuestions'))) {
        window.location.href = 'results.html';
    } else {
        window.location.href = 'question.html';
    }
}

if (parseInt(localStorage.getItem('currentQuestion')) > parseInt(localStorage.getItem('nQuestions'))) {
    window.location.href = 'results.html';
}
addEventListener("DOMContentLoaded", (event) => {

    localStorage.setItem('currentQuestion', parseInt(localStorage.getItem('currentQuestion')) + 1);

    // Accesso al DOM

    const questionNumberDisplay = document.getElementById('question-number');

    const questionDisplay = document.getElementById('question-text');

    const answer_1 = document.getElementById('answer-1');
    const answer_2 = document.getElementById('answer-2');
    const answer_3 = document.getElementById('answer-3');
    const answer_4 = document.getElementById('answer-4');

    const answersDisplay = [answer_1, answer_2, answer_3, answer_4];

    const timerDisplay = document.getElementById('timer');

    // Inizializza il contatore delle domande

    questionNumberDisplay.textContent = localStorage.getItem('currentQuestion') + "/" + localStorage.getItem('nQuestions');

    // Inizializza domanda e risposte

    const question = new Question();
    questionDisplay.textContent = question.question + " = ?";

    // Immischia le risposte

    question.shuffleAnswers();

    // Imposta i valori delle risposte

    answersDisplay.forEach((element, index) => {
        element.textContent = question.answers[index];
    });

    // Inizializza il timer

    const timer = new Timer(timerDisplay, goToNextPage);
    timer.start();

    // Event listeners per le risposte

    let userAnswer = 0;

    answersDisplay.forEach((element) => {
        element.addEventListener('click', () => {
            userAnswer = parseInt(element.textContent);
            timer.pause();

            if (question.checkAnswer(userAnswer)) {
                localStorage.setItem('correctAnswers', parseInt(localStorage.getItem('correctAnswers')) + 1);
            }

            goToNextPage();
        });
    });

    console.log(question.correctAnswer);
});
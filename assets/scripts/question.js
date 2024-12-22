import { Counter, Timer } from './timer.js';

class Question {
    constructor() {
        this.question = this.getGeneratedQuestion();
    }

    getRandomOperation() {
        const operations = ['+', '-', '*', '/'];
        const randomIndex = Math.floor(Math.random() * operations.length);
        return operations[randomIndex];
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 10);
    }

    getGeneratedQuestion() {
        const operation = this.getRandomOperation();
        const num1 = this.getRandomNumber();
        const num2 = this.getRandomNumber();

        let question = num1 + " " + operation + " " + num2;

        return question;
    }

}

addEventListener("DOMContentLoaded", (event) => {

    if (localStorage.getItem('currentQuestion') == localStorage.getItem('nQuestions')) {
        window.location.href = 'results.html';
    }

    const question = new Question();
    console.log(question.question);
});

console.log(new Question);
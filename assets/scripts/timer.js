// Classe Counter per gestire il conteggio del timer
export class Counter {
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
export class Timer {
    constructor(displayElement) {
        this.counter = new Counter();
        this.displayElement = displayElement;
        this.intervalId = null; // Riferimento all'intervallo del timer
    }

    // Avvia il timer
    start() {
        if (this.intervalId === null) {
            this.intervalId = setInterval(() => {
                this.counter.decrement();

                if (this.counter.seconds <= 0) {
                    this.pause();
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
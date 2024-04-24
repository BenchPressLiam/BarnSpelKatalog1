

// Hämta element från DOM
document.addEventListener('DOMContentLoaded', function() {
const startButton = document.getElementById('start-button');
const sequenceDisplay = document.getElementById('sequence-display');
const messageDisplay = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const colorButtons = document.querySelectorAll('.color-button');
const sound = new Audio('sound.mp3');

// Variabler för spelet
let sequence = [];
let userSequence = [];
let score = 0;
let currentIndex = 0;
let gameStarted = false;
let waitingForInput = false;

// start knapp för event listener, det är en funktion som väntar på en specifik händelse (event) att inträffa på ett HTML-element t.ex musklick. När musklicket görs så körs funktionen som är kopplad till event listener. 
startButton.addEventListener('click', startGame);

// Funktion för att starta spelet
function startGame() {
    gameStarted = true;
    sequence = [];
    userSequence = [];
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    messageDisplay.textContent = '';
    currentIndex = 0;
    generateSequence();
    showSequence();
}

    // Funktion för att generera en ny sekvens
function generateSequence() {
    const colors = ['red', 'yellow', 'blue', 'green'];                                // Färger att välja från
    const newColor = colors[Math.floor(Math.random() * colors.length)];              // Slumpa en ny färg och lägg till den i sekvensen, multiplicera ett slumptal mellan 0 och längden av arrayen "colors". Genom att köra ett random matte tal så väljs antigen 0,1,2,3 från arayen
    sequence.push(newColor);
}

function showSequence() {           // Funktion för att visa sekvensen
    waitingForInput = false;        // Väntar inte på användarinput
    if (currentIndex < sequence.length) {                   // Hämta färgen för nuvarande index och visa den
        const color = sequence[currentIndex];
        sequenceDisplay.textContent = color;
        flashColor(color);
        playSound();
        currentIndex++;
        setTimeout(showSequence, 1000);
    } else {
        waitingForInput = true;                  // Väntar på användarinput
        sequenceDisplay.textContent = '';
        currentIndex = 0;
    }
}

function playSound() {          // Funktion för att spela ljud
    sound.currentTime = 0;
    sound.play();
}

function flashColor(color) {            // Funktion för att blinka färg på knappen
    const button = document.querySelector(`.color-button[data-color="${color}"]`);
    button.classList.add('flash');
    setTimeout(() => {
        button.classList.remove('flash');
    }, 300);
}

colorButtons.forEach(button => {            // Eventlistener för färgknappar
    button.addEventListener('click', function() {
        if (gameStarted && waitingForInput) {                   // Om spelet är igång och väntar på användarinput
            const color = this.dataset.color;
            userSequence.push(color);
            flashColor(color); // Flashar button när den klickas
            if (userSequence[currentIndex - 1] !== sequence[currentIndex - 1]) {
                messageDisplay.textContent = 'Fel sekvens! Game over!';                    // Om användarsekvensen är felaktig, avsluta spelet
                userSequence = [];
                gameStarted = false;
                return;
            }
            currentIndex++;
            if (currentIndex === sequence.length) { 
                score++;                        // Om användarsekvensen är korrekt, öka poängen och visa meddelande
                scoreDisplay.textContent = `Score: ${score}`;
                messageDisplay.textContent = 'Korrekt! Lägger till ny färg...';
                userSequence = [];
                generateSequence();
                setTimeout(showSequence, 1000);
            }
        }
    });
});
});

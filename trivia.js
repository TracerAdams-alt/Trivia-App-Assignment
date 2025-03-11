let pageContainer = document.getElementById('page-container');
let username = document.getElementById('username');
let usernameId = document.getElementById('username-display');

class Question {
    constructor(question, options, correctAnswer) {
        this.question = question;
        this.options = options;  
        this.correctAnswer = correctAnswer; 
    }

    checkAnswer(answer) {
        return answer === this.correctAnswer;
    }
}

// Store questions in an array
let questions = [
    new Question("What is the most common type of rattlesnake?", 
        ['a. Timber Rattlesnake', 'b. Diamondback Rattlesnake', 'c. Prairie Rattlesnake'], 
        'a'),
    new Question("What is the color of the sky?", 
        ['a. Red', 'b. Blue', 'c. Purple'], 
        'b'),
    new Question("What temperature does water freeze at in Fahrenheit?", 
        ['a. 50 Degrees', 'b. 0 Degrees', 'c. 32 Degrees'], 
        'c'),
    new Question("What is redshift?", 
        ['a. Light frequencies compressing as objects move toward each other', 
         'b. Light frequencies stretching as objects move apart', 
         'c. Light frequencies compressing as objects move apart'], 
        'b'),
    new Question("How many hours are in a day?", 
        ['a. 2 Hours', 'b. 21 Hours', 'c. 24'], 
        'c')
];

function startTrivia() {
    let ourHTML = `
    <p class="text-center">Pick A Card!</p>
    <div class="question-card"><button class="p-4 m-2 rounded-2" onclick="questionGen(this)">flip</button></div>
    <div class="question-card"><button class="p-4 m-2 rounded-2" onclick="questionGen(this)">flip</button></div>
    <div class="question-card"><button class="p-4 m-2 rounded-2" onclick="questionGen(this)">flip</button></div>`;
    
    pageContainer.insertAdjacentHTML('beforeend', ourHTML);
}

function questionGen(button) {
    let randomIndex = Math.floor(Math.random() * questions.length);
    let selectedQuestion = questions[randomIndex];

    let optionsHTML = selectedQuestion.options.map(option => `
        <button class="btn btn-outline-primary m-1" onclick="checkAnswer('${option[0]}', '${selectedQuestion.correctAnswer}')">
            ${option}
        </button>`).join('');

    let questionHTML = `
        <p>${selectedQuestion.question}</p>
        ${optionsHTML}
    `;

    button.parentElement.innerHTML = questionHTML;
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        alert("✅ Correct!");
    } else {
        alert(`❌ Wrong! The correct answer was ${correct.toUpperCase()}`);
    }
}

function usernameDisplay() {
    let name = username.value;
    usernameId.parentElement.innerHTML = `${name}`;
}

window.onload = function () {
    const storedUsername = sessionStorage.getItem('username');
    const usernameDisplay = document.getElementById('username-display');

    if (storedUsername && usernameDisplay) {
        usernameDisplay.textContent = storedUsername;
    }
}

let pageContainer = document.getElementById('page-container');
let username = document.getElementById('username');
let usernameId = document.getElementById('username-display');
let results = document.getElementById('results');
let resultSentence = document.getElementById('result-sentence');

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
        ['a. 2 Hours', 'b. 21 Hours', 'c. 24 Hours'], 
        'c'),
    new Question("What is the Utah state flower?", 
        ['a. Indian Paintbrush', 'b. Silver Lupine', 'c. Sego Lily'],
        'b'),
    new Question("What kind of fuel is coal?",
        ['a. Petrol', 'b. Electric', 'c. Fossil'],
        'c'
    ),
    new Question("What is the term for when overprinting money drops the value?",
        ['a. Deflation', 'b. Inflation', 'c. Popped Tire'],
        'b'
    ),
    new Question("Is the Earth round?",
        ['a. yes', 'b. no', 'c. yes but in c'],
        'a'
    ),
    new Question("why?",
        ['huh?', 'nah fam', 'many people eat cereal for breakfast.'],
        'c'
    )
];

let firstTime = true;
let currentIndex = 0;

function startTrivia() {
    let message = firstTime ? `<p class="text-center">Pick A Card!</p>` : '';  
    firstTime = false;

    let ourHTML = `
    ${message}
    <div class="d-flex flex-wrap justify-content-evenly">
    <div class="question-card col-lg-4 col-md-4 col-sm-12 p-4 m-2 rounded-2">
        <button class="cardFlip" onclick="questionGen(this)"></button>
    </div>
    <div class="question-card col-lg-4 col-md-4 col-sm-12 p-4 m-2 rounded-2">
        <button class="cardFlip" onclick="questionGen(this)"></button>
    </div>
    <div class="question-card col-lg-4 col-md-4 col-sm-12 p-4 m-2 rounded-2">
        <button class="cardFlip" onclick="questionGen(this)"></button>
    </div>
    <div class="question-card col-lg-4 col-md-4 col-sm-12 p-4 m-2 rounded-2">
        <button class="cardFlip" onclick="questionGen(this)"></button>
    </div>
    <div class="question-card col-lg-4 col-md-4 col-sm-12 p-4 m-2 rounded-2">
        <button class="cardFlip" onclick="questionGen(this)"></button>
    </div>
    <div class="question-card col-lg-4 col-md-4 col-sm-12 p-4 m-2 rounded-2">
        <button class="cardFlip" onclick="questionGen(this)"></button>
    </div>
    <div class="question-card col-lg-4 col-md-4 col-sm-12 p-4 m-2 rounded-2">
        <button class="cardFlip" onclick="questionGen(this)"></button>
    </div>
    <div class="question-card col-lg-4 col-md-4 col-sm-12 p-4 m-2 rounded-2">
        <button class="cardFlip" onclick="questionGen(this)"></button>
    </div>
    <div class="question-card col-lg-4 col-md-4 col-sm-12 p-4 m-2 rounded-2">
        <button class="cardFlip" onclick="questionGen(this)"></button>
    </div>
    <div class="question-card col-lg-4 col-md-4 col-sm-12 p-4 m-2 rounded-2">
        <button class="cardFlip" onclick="questionGen(this)"></button>
    </div>
`;
    
    pageContainer.insertAdjacentHTML('beforeend', ourHTML);
}

function questionGen(button) {
    if (currentIndex >= questions.length) {
        currentIndex = 0;
    }
    let selectedQuestion = questions[currentIndex];

    let optionsHTML = selectedQuestion.options.map(option => `
        <button class="btn btn-outline-primary m-1" onclick="checkAnswer('${option[0]}', '${selectedQuestion.correctAnswer}')">
            ${option}
        </button>`).join('');

    let questionHTML = `
        <p>${selectedQuestion.question}</p>
        ${optionsHTML}
    `;

    button.parentElement.innerHTML = questionHTML;

    currentIndex++;
}

let score = 0;
let missed = 0;
let scoreHTML = `<p>${score}</p>`;

let questionsAnswered = 0;

function checkAnswer(selected, correct) {
    const answerButtons = document.querySelectorAll('.btn-outline-primary');
    answerButtons.forEach(button => button.disabled = true);

    let resultIcon = document.getElementById('result-indicator');
    if (!resultIcon) {
        resultIcon = document.createElement('div');
        resultIcon.id = 'result-indicator';
        resultIcon.classList.add('fw-bold', 'mt-2', 'text-end');
        const scoreDisplay = document.getElementById('score-display');
        scoreDisplay.parentElement.insertAdjacentElement('afterend', resultIcon);
    }

    if (selected === correct) {
        score++;
        document.getElementById('score-display').textContent = score;
        resultIcon.innerHTML += '<span class="checkmark">✔</span>'; 
    } else {
        resultIcon.innerHTML += '<span class="xmark">❌</span>';
        missed++;
    }
    questionsAnswered++;

    if (questionsAnswered >= 10) {
        sessionStorage.setItem('score', score);
        window.location.href = 'result.html';
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

    const score = sessionStorage.getItem('score');
    const resultsDisplay = document.getElementById('results');
    if (score !== null) {
        resultsDisplay.innerHTML = `${score} out of 10`;
    } else {
        resultsDisplay.innerHTML = "No score available";
    }

    displayResultSentence();
}

function displayResultSentence() {
    const score = sessionStorage.getItem('score');
    if (score !== null) {
        if (score >= 7) { 
            let ourHTML = `Good Work!`;
            resultSentence.insertAdjacentHTML('beforeend', ourHTML);
        }
        else { 
            let ourHTML = `Study Harder Next Time!`;
            resultSentence.insertAdjacentHTML('beforeend', ourHTML);
        }
    }
}

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
        'c')
];

let firstTime = true;

function startTrivia() {
    let message = firstTime ? `<p class="text-center">Pick A Card!</p>` : '';  
    firstTime = false;

    let ourHTML = `
    ${message}
    <div class="question-card"><button class="p-4 m-2 rounded-2" onclick="questionGen(this)">flip</button></div>
    <div class="question-card"><button class="p-4 m-2 rounded-2" onclick="questionGen(this)">flip</button></div>
    <div class="question-card"><button class="p-4 m-2 rounded-2" onclick="questionGen(this)">flip</button></div>
    <div class="question-card"><button class="p-4 m-2 rounded-2" onclick="questionGen(this)">flip</button></div>
    <div class="question-card"><button class="p-4 m-2 rounded-2" onclick="questionGen(this)">flip</button></div>
    <div class="question-card"><button class="p-4 m-2 rounded-2" onclick="questionGen(this)">flip</button></div>
    <div class="question-card"><button class="p-4 m-2 rounded-2" onclick="questionGen(this)">flip</button></div>
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

let score = 0
let scoreHTML = `<p>${score}</p>`;

function checkAnswer(selected, correct) {
    const answerButtons = document.querySelectorAll('.btn-outline-primary');
    answerButtons.forEach(button => button.disabled = true);

    const resultIcon = document.createElement('span');
    resultIcon.classList.add('ms-2', 'fw-bold');

    if (selected === correct) {
        score++;
        document.getElementById('score-display').textContent = score;
        resultIcon.innerHTML = '&#10004;';
        resultIcon.style.color = 'green';

        if (score >= 10) {
            window.location.href = 'result.html';
        }
    } else {
        resultIcon.innerHTML = '&#10060;'; 
        resultIcon.style.color = 'red';
    }

    const questionCard = [...answerButtons].find(btn => btn.textContent.trim().startsWith(selected)).closest('.question-card');
    const selectedButton = [...questionCard.querySelectorAll('.btn-outline-primary')].find(btn => btn.textContent.trim().startsWith(selected));
    if (selectedButton) {
        selectedButton.parentElement.appendChild(resultIcon);
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

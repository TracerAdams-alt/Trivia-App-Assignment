let pageContainer = document.getElementById('page-container');
let username = document.getElementById('username');
let usernameId = document.getElementById('username-display');
let questions = [
    "What is the most common type of rattlesnake?",
    "What is the color of the sky?",
    "What temperature does water freeze at in Fahrenheit?",
    "What is redshift?",
    "How many hours are in a day?"
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
    let i = Math.floor(Math.random() * questions.length);
    let ourQuestion = `<p>${questions[i]}</p>`;

    button.parentElement.innerHTML = ourQuestion;
}

function usernameDisplay() {
    let name = username.value;
    usernameId.parentElement.innerHTML = name;
}
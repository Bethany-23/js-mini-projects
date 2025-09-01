
const questions = [
    {
        question: "What is the longest river in the world? ",
        answers : [
            {
                text: "Amazon", correct: false,
                text: "Nile", correct: true,
                text: "Mediterrainian", correct: false,
                text: "Yellow river" , correct: false 
            }
        ]
    }, 
    {
        question: "What is the largest mammal? ",
        answers : [
            {
                text: "Elephant", correct: false,
                text: "Girraffe", correct: false,
                text: "Blue Whale", correct: True,
                text: "Lion" , correct: false 
            }
        ]
    },
    {
        question: "What is the capital city of Austria? ",
        answers : [
            {
                text: "Prussia", correct: false,
                text: "Amsterdam", correct: false,
                text: "Brussels", correct: false,
                text: "Vienna" , correct: true 
            }
        ]
    },
    {
        question: "What is the largest continent? ",
        answers : [
            {
                text: "Asia", correct: true,
                text: "Africa", correct: false,
                text: "Australia", correct: false,
                text: "North America" , correct: false 
            }
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers");
const nextButton = document.getElementById("next");

let currentQuesIndex = 0;
let score = 0;

function startQuiz(){
    currentQuesIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    renderQuestions();
}

function renderQuestions(){
    resetState();
    let currentQuestion = questions[currentQuesIndex];
    let questionNo = currentQuesIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
    })
}

function resetState(){

};

startQuiz();

let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;


const quizArray = [
    {
        id: "0",
        question: "What is Oracle Database mainly used for?",
        options: ["Data storage and retrieval", "Web development", "Graphic design", "Network security"],
        correct: "Data storage and retrieval",
    },
    {
        id: "1",
        question: "What does PL/SQL stand for?",
        options: ["Personal Language for SQL", "Procedural Language for SQL", "Procedural Language for SQL", "Prolonged Language for SQL"],
        correct: "Procedural Language for SQL",
    },
    {
        id: "2",
        question: "Which language is primarily used to interact with Oracle Database?",
        options: ["java", "python", "SQL", "C++"],
        correct: "SQL",
    },
    {
        id: "3",
        question: "What is the purpose of an Oracle Index?",
        options: ["To enforce uniqueness", "To improve query performance", "To store data", "To backup data"],
        correct: "To improve query performance",
    },
    {
        id: "4",
        question: "Which component of Oracle Database is responsible for storing data?",
        options: ["System Global Area", "Datafiles", "Control files", "Redo logs"],
        correct: "Datafiles",
    },
    
];

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});


nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        
        questionCount += 1;
        
        if (questionCount == quizArray.length) {
            
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
           
        }
    })
);


const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};


const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
   
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    
    quizCards[questionCount].classList.remove("hide");
};


function quizCreator() {
   
    quizArray.sort(() => Math.random() - 0.5);
    
    for (let i of quizArray) {
       
        i.options.sort(() => Math.random() - 0.5);
        
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}


function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
    
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

   
    clearInterval(countdown);
   
    options.forEach((element) => {
        element.disabled = true;
    });
}


function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    quizCreator();
    quizDisplay(questionCount);
}


startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});


window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};

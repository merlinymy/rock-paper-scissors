function getComputerChoice() {
    // Get a random choice from three possibilities (0, 1, 2)
    const choice = Math.floor(Math.random() * 3);
    return choice;
}

function getHumanChoice() {
    let humanChoice = prompt("Enter rock, paper or scissor to play: ", ).toLowerCase();
    while (true) {
        if (humanChoice === "rock" ||
        humanChoice === "paper" ||
        humanChoice === "scissor") {
            return humanChoice;
        } else {
            humanChoice = prompt("Invalid entry, please enter rock, paper or scissor to play: ", ).toLowerCase();
        }
    }
}

function playRound(humanChoice, computerChoice) {
    let humanChoiceNumber = convertToNumber(humanChoice);
    displayResult(humanChoiceNumber, computerChoice);
}

function playGame() {
    
    let winner = "";
    if (computerScore > humanScore) {
        console.log(`Computer scores ${computerScore}, You score ${humanScore}, Computer wins`);
    } else if (computerScore < humanScore) {
        console.log(`Computer scores ${computerScore}, You score ${humanScore}, you win`);
    } else {
        console.log(`Computer scores ${computerScore}, You score ${humanScore}, It's a tie`);
    }
}

function convertToNumber(humanChoice) {
    if (humanChoice === "rock") {
        return 0;
    } else if (humanChoice === "paper") {
        return 1;
    } else {
        return 2;
    }
}

function convertNumberToString(choice) {
    if (choice === 0) {
        return "rock";
    } else if (choice === 1) {
        return "paper";
    } else {
        return "scissor";
    }
}

function displayResult(humanChoice, computerChoice) {
    const resultDiv = document.querySelector(".detail");
    const resultP = document.createElement("p");
    const humanScoreP = document.querySelector(".human-score");
    const compScoreP = document.querySelector(".computer-score");
    const newHumanScoreSpan = document.createElement("span");
    const newComputerScoreSpan = document.createElement("span");
    const currentHumanSpan = document.querySelector(".human-score > span")
    const currentCompSpan = document.querySelector(".computer-score > span")
    if (humanChoice === 0 && computerChoice === 2) {
        // Add score to human
        humanScore++;
        newHumanScoreSpan.textContent = `${humanScore}`;
        resultP.textContent = "You chose rock and the computer chose scissor. You win";
        humanScoreP.replaceChild(newHumanScoreSpan, currentHumanSpan);
    } else if (humanChoice === 2 && computerChoice === 0) {
        computerScore++;
        newComputerScoreSpan.textContent = `${computerScore}`;
        resultP.textContent = "You chose scissor and the computer chose rock. Computer win";
        compScoreP.replaceChild(newComputerScoreSpan, currentCompSpan);
        // ELSE IF same choice, both are winners
    } else if (humanChoice === computerChoice) {
        humanScore++;
        computerScore++;
        newHumanScoreSpan.textContent = `${humanScore}`;
        newComputerScoreSpan.textContent = `${computerScore}`;
        resultP.textContent = `Both you and the computer chose ${humanChoice}. You both win!`;
        humanScoreP.replaceChild(newHumanScoreSpan, currentHumanSpan);
        compScoreP.replaceChild(newComputerScoreSpan, currentCompSpan);
    }  else { // ELSE compare the value as usual
        if (humanChoice > computerChoice) {
            humanScore++;
            newHumanScoreSpan.textContent = `${humanScore}`;
            resultP.textContent = `You chose ${convertNumberToString(humanChoice)} and the computer chose ${convertNumberToString(computerChoice)}. You win`;
            humanScoreP.replaceChild(newHumanScoreSpan, currentHumanSpan);
        } else {
            computerScore++;
            newComputerScoreSpan.textContent = `${computerScore}`;
            resultP.textContent = `You chose ${convertNumberToString(humanChoice)} and the computer chose ${convertNumberToString(computerChoice)}. Computer win`;
            compScoreP.replaceChild(newComputerScoreSpan, currentCompSpan);
        }
    }
    resultDiv.appendChild(resultP);

}

let humanScore = 0;
let computerScore = 0;

const rockButton = document.querySelector(".rock-button");
const paperButton = document.querySelector(".paper-button");
const sciButton = document.querySelector(".sci-button");

// when user click a button. Playround function is called.
// human choice is the button's name
const buttonGroup = document.querySelector(".rock-paper-sci");
buttonGroup.addEventListener("click", (event) => {
    let target = event.target;
    let computerChoice = getComputerChoice();
    if (target.tagName === "BUTTON") {
        switch(target.textContent) {
            case "rock":
                playRound("rock", computerChoice);
                break;
            case "paper":
                playRound("paper", computerChoice);
                break;
            case "scissor":
                playRound("scissor", computerChoice);
                break;
        }
    }
});


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
    let winner = displayResult(humanChoiceNumber, computerChoice);
    deductHealth(winner);

}

function deductHealth(winner) {
    // deduct cpu health
    if (winner === "null") return;
    if (winner === "player") {
        cpuHPBar.removeChild(cpuHPNodeList.pop());
    } else {
    // deduct player health
        playerHPBar.removeChild(playerHPNodeList.pop());
    }
    checkGameOver();
}

function checkGameOver() {
    if (playerHPNodeList.length === 0) {
        const wrapper = document.querySelector(".gameover-wrapper-hidden");
        wrapper.setAttribute("class", "gameover-wrapper");

        const winDiv = document.querySelector(".gameover-win");
        winDiv.setAttribute("class", "hidden");
        
        const gamePage = document.querySelector(".flex-container");
        gamePage.setAttribute("class", "hidden");
    } else if (cpuHPNodeList.length === 0) {
        const wrapper = document.querySelector(".gameover-wrapper-hidden");
        wrapper.setAttribute("class", "gameover-wrapper");

        const loseDiv = document.querySelector(".gameover-lose");
        loseDiv.setAttribute("class", "hidden");

        const gamePage = document.querySelector(".flex-container");
        gamePage.setAttribute("class", "hidden");
    }

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
    let winner;
    const resultDiv = document.querySelector(".detail");
    const resultP = document.createElement("p");
    const humanScoreP = document.querySelector(".human-score");
    const compScoreP = document.querySelector(".computer-score");
    const newHumanScoreSpan = document.createElement("span");
    const newComputerScoreSpan = document.createElement("span");
    const currentHumanSpan = document.querySelector(".human-score > span");
    const currentCompSpan = document.querySelector(".computer-score > span");
    if (humanChoice === 0 && computerChoice === 2) {
        // Add score to human
        humanScore++;
        newHumanScoreSpan.textContent = `${humanScore}`;
        resultP.textContent = "You chose rock and the computer chose scissor. You win";
        humanScoreP.replaceChild(newHumanScoreSpan, currentHumanSpan);
        winner = "player";
    } else if (humanChoice === 2 && computerChoice === 0) {
        computerScore++;
        newComputerScoreSpan.textContent = `${computerScore}`;
        resultP.textContent = "You chose scissor and the computer chose rock. Computer win";
        compScoreP.replaceChild(newComputerScoreSpan, currentCompSpan);
        winner = "cpu";
        // ELSE IF same choice, both are winners
    } else if (humanChoice === computerChoice) {
        newHumanScoreSpan.textContent = `${humanScore}`;
        newComputerScoreSpan.textContent = `${computerScore}`;
        resultP.textContent = `Both you and the computer chose ${convertNumberToString(humanChoice)}. It's a tie`;
        humanScoreP.replaceChild(newHumanScoreSpan, currentHumanSpan);
        compScoreP.replaceChild(newComputerScoreSpan, currentCompSpan);
        winner = "null";
    }  else { // ELSE compare the value as usual
        if (humanChoice > computerChoice) {
            humanScore++;
            newHumanScoreSpan.textContent = `${humanScore}`;
            resultP.textContent = `You chose ${convertNumberToString(humanChoice)} and the computer chose ${convertNumberToString(computerChoice)}. You win`;
            humanScoreP.replaceChild(newHumanScoreSpan, currentHumanSpan);
            winner = "player";
        } else {
            computerScore++;
            newComputerScoreSpan.textContent = `${computerScore}`;
            resultP.textContent = `You chose ${convertNumberToString(humanChoice)} and the computer chose ${convertNumberToString(computerChoice)}. Computer win`;
            compScoreP.replaceChild(newComputerScoreSpan, currentCompSpan);
            winner = "cpu";
        }
    }
    resultDiv.appendChild(resultP);
    return winner;
}

function startGame() {
    // populate player and cpu health bar
    for (let i = 0; i <= 4; i++) {
        const hpBlock = document.createElement("div");
        hpBlock.setAttribute("class", `hp-block-${i}`);
        hpBlock.style.backgroundColor = "#880808";
        hpBlock.style.height = "50px";
        hpBlock.style.width = "90px";
        const hpBlockDup = hpBlock.cloneNode(true);
        playerHPBar.appendChild(hpBlock);
        cpuHPBar.appendChild(hpBlockDup);
        playerHPNodeList = document.querySelectorAll(".player-health-bar div");
        cpuHPNodeList = document.querySelectorAll(".comp-health-bar div");
    }
    playerHPNodeList = [...playerHPNodeList];
    cpuHPNodeList = [...cpuHPNodeList];
}


let humanScore = 0;
let computerScore = 0;

let playerHP = 5;
let cpuHP = 5;

const rockButton = document.querySelector(".rock-button");
const paperButton = document.querySelector(".paper-button");
const sciButton = document.querySelector(".sci-button");

const playerHPBar = document.querySelector(".player-health-bar");
const cpuHPBar = document.querySelector(".comp-health-bar");
let playerHPNodeList;
let cpuHPNodeList;

startGame();


// when user click a button. Playround function is called.
// human choice is the button's name
const buttonGroup = document.querySelector(".rock-paper-sci");
buttonGroup.addEventListener("click", (event) => {
    let target = event.target;
    console.log(target.className);
    let computerChoice = getComputerChoice();
    if (target.tagName === "IMG") {
        switch(target.className) {
            case "rock-button static":
                playRound("rock", computerChoice);
                break;
            case "paper-button static":
                playRound("paper", computerChoice);
                break;
            case "sci-button static":
                playRound("scissor", computerChoice);
                break;
        }
    }
});

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", () => {
    window.location.reload();
});

const victoryReset = document.querySelector(".reset-button-victory");
victoryReset.addEventListener("click", () => {
    window.location.reload();
});


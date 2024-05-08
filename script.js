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
    roundCount++;
    let humanChoiceNumber = convertToNumber(humanChoice);
    let winner = chooseWinner(humanChoiceNumber, computerChoice);
    displayResult(humanChoiceNumber, computerChoice, winner);
    deductHealth(winner);
    checkGameOver();
    addOneToRound();
}

function addOneToRound() {
    roundP.textContent = `Round ${roundCount + 1}`;
}

function chooseWinner(humanChoice, computerChoice) {
    // choose the winner and update the score
    // might need refactor
    let winner;
    if (humanChoice === 0 && computerChoice === 2) {
        // Add score to human
        humanScore++;
        winner = "player";
    } else if (humanChoice === 2 && computerChoice === 0) {
        computerScore++;
        winner = "cpu";
        // ELSE IF same choice, both are winners
    } else if (humanChoice === computerChoice) {
        winner = "null";
    }  else { // ELSE compare the value as usual
        if (humanChoice > computerChoice) {
            humanScore++;
            winner = "player";
        } else {
            computerScore++;
            winner = "cpu";
        }
    }
    return winner;
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

function displayResult(humanChoice, computerChoice, winner) {

    const outputDiv = document.querySelector(".output");
    const detailDiv = document.createElement("div");
    const playerImgDiv = document.createElement("div");
    const cpuImgDiv = document.createElement("div");
    const playerImg = document.createElement("img");
    const cpuImg = document.createElement("img");
    const roundNumP = document.createElement("p");
    const roundWinner = document.createElement("p");
    const roundResultDiv = document.createElement("div");

    switch(humanChoice) {
        case 0:
            playerImg.src = "images/rock.gif";
            playerImg.alt = "A floating rock surrounds by lightings";
            playerImgDiv.className = "result-img";
            playerImgDiv.appendChild(playerImg);
            break;
        case 1:
            playerImg.src = "images/paper.gif";
            playerImg.alt = "four pieces of paper";
            playerImgDiv.className = "result-img";
            playerImgDiv.appendChild(playerImg);
            break;
        case 2:
            playerImg.src = "images/scissor.gif";
            playerImg.alt = "a scissor";
            playerImgDiv.className = "result-img";
            playerImgDiv.appendChild(playerImg);
            break;
    }

    switch(computerChoice) {
        case 0:
            cpuImg.src = "images/rock.gif";
            cpuImg.alt = "A floating rock surrounds by lightings";
            cpuImgDiv.className = "result-img";
            cpuImgDiv.appendChild(cpuImg);
            break;
        case 1:
            cpuImg.src = "images/paper.gif";
            cpuImg.alt = "four pieces of paper";
            cpuImgDiv.className = "result-img";
            cpuImgDiv.appendChild(cpuImg);
            break;
        case 2:
            cpuImg.src = "images/scissor.gif";
            cpuImg.alt = "a scissor";
            cpuImgDiv.className = "result-img";
            cpuImgDiv.appendChild(cpuImg);
            break;
    }

    if (winner === "null") {
        roundWinner.textContent = "Tie";
    } else {
        roundWinner.textContent = `${winner} Wins`;
    }

    detailDiv.className = "detail";
    roundNumP.textContent = `Round ${roundCount} result`;
    roundNumP.className = "round-num-p";
  
    roundResultDiv.append(roundNumP, roundWinner);
    roundResultDiv.className = "round-result-div";
    detailDiv.append(playerImgDiv, roundResultDiv, cpuImgDiv);
    outputDiv.appendChild(detailDiv);
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
    addOneToRound();
}


let humanScore = 0;
let computerScore = 0;

let playerHP = 5;
let cpuHP = 5;

let roundCount = 0;

const rockButton = document.querySelector(".rock-button");
const paperButton = document.querySelector(".paper-button");
const sciButton = document.querySelector(".sci-button");

const playerHPBar = document.querySelector(".player-health-bar");
const cpuHPBar = document.querySelector(".comp-health-bar");
const roundP = document.querySelector(".round-number");
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


function getComputerChoice() {
    // Get a random choice from three possibilities (0, 1, 2)
    const choice = Math.floor(Math.random() * 3);
    console.log(choice);
    // return the random choice
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

function playRound(humanChoice, ComputerChoice) {
    // 0 is rock, 1 is paper, 2 is scissor
    // 1 > 0, 2 > 1, 0 > 2
    // takes in human and computer choice
    // CONVERT humanChoice to a number
    humanChoice = convertToNumber(humanChoice);
    // COMPARE the two
    // IF one is 0 and the other is 2, 0 wins
    if (humanChoice === 0 && computerChoice === 2) {
        // Add score to human
        humanScore++;
        console.log("You chose rock and computer chose scissor. You win");
        console.log(`human score is ${humanScore}, computer score is ${computerScore}`);
    } else if (humanChoice === 2 && computerChoice === 0) {
        computerScore++;
        console.log("You chose scissor and computer chose rock. Computer win");
        console.log(`human score is ${humanScore}, computer score is ${computerScore}`);
        // ELSE IF same choice, nothing
    } else if (humanChoice === computerChoice) {
        console.log(`computer chose ${convertNumberToString(computerChoice)}. "it's a tie"`);
        console.log(`human score is ${humanScore}, computer score is ${computerScore}`);
    }  else { // ELSE compare the value as usual
        if (humanScore > computerScore) {
            humanScore++;
            console.log(`computer chose ${convertNumberToString(computerChoice)}. You win`);
            console.log(`human score is ${humanScore}, computer score is ${computerScore}`);
        } else {
            computerScore++;
            console.log(`computer chose ${convertNumberToString(computerChoice)}. Computer wins`);
            console.log(`human score is ${humanScore}, computer score is ${computerScore}`);
        }
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

let humanScore = 0;
let computerScore = 0;
const humanChoice = getHumanChoice();
const computerChoice = getComputerChoice();
console.log(computerChoice);
playRound(humanChoice, computerChoice);

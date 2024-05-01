function getComputerChoice() {
    // Get a random choice from three possibilities (0, 1, 2)
    const choice = Math.floor(Math.random() * 3);
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

let humanScore = 0;
let ComputerScore = 0;

function getComputerChoice() {
    // Get a random choice from three possibilities (0, 1, 2)
    const choice = Math.floor(Math.random() * 3);
    // return the random choice
    return choice;
}

console.log(getComputerChoice());

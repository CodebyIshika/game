'use strict';

// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
    
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

const userResult = select(".user_result i");
const computerResult = select(".computer_result i");
const result = select(".result");
const optionImages = document.querySelectorAll(".option_image");


function getRandomOption(gameOptions) {
    return gameOptions[Math.floor(Math.random() * gameOptions.length)];
}

function updateUserResult(userResult, userChoice) {
    userResult.className = `far ${userChoice.icon}`;
}

function displayResult(result, userChoice, computerChoice) {
    if (userChoice.name === computerChoice.name) {
        result.textContent = "It's a tie!";
        result.style.color ='#000';
    } else if (
        (userChoice.name === "Rock" && computerChoice.name === "Scissors") ||
        (userChoice.name === "Paper" && computerChoice.name === "Rock") ||
        (userChoice.name === "Scissors" && computerChoice.name === "Paper")
    ) {
        result.textContent = "You win!";
    } else {
        result.textContent = "Computer wins!";
    }
}


function setupGame() {
    const gameOptions = [
        { name: "Rock", icon: "fa-hand-rock" },
        { name: "Paper", icon: "fa-hand" },
        { name: "Scissors", icon: "fa-hand-scissors" },
    ];

    optionImages.forEach((optionImage, index) => {
        onEvent("click", optionImage, () => {
            optionImages.forEach(image => image.classList.add("disabled"));

            const userChoice = gameOptions[index];
            const computerChoice = getRandomOption(gameOptions); // Move this line outside of the click event.

            updateUserResult(userResult, userChoice);
            updateUserResult(computerResult, computerChoice);

            // Add a delay of 2 seconds before displaying the result
            setTimeout(() => {
                displayResult(result, userChoice, computerChoice);

                // Re-enable the option images after displaying the result
                optionImages.forEach(image => image.classList.remove("disabled"));
            }, 1000);
        });
    });
}


document.addEventListener("DOMContentLoaded", setupGame);

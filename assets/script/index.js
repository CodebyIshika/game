'use strict';

// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

const userResult = select(".user_result i");
const computerResult = select(".computer_result i");
const result = select(".result");
const optionImages = selectAll(".option_image");

function getRandomOption(gameOptions) {
    return gameOptions[Math.floor(Math.random() * gameOptions.length)];
}

function updateUserResult(resultElement, choice) {
    resultElement.className = `far ${choice.icon}`;
}

function displayResult(resultElement, userChoice, computerChoice) {
    if (userChoice.name === computerChoice.name) {
        resultElement.textContent = "It's a tie!";
    } else if (
        (userChoice.name === "Rock" && computerChoice.name === "Scissors") ||
        (userChoice.name === "Paper" && computerChoice.name === "Rock") ||
        (userChoice.name === "Scissors" && computerChoice.name === "Paper")
    ) {
        resultElement.textContent = "You win!";
    } else {
        resultElement.textContent = "Computer wins!";
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
            const computerChoice = getRandomOption(gameOptions);

            updateUserResult(userResult, userChoice);
            updateUserResult(computerResult, computerChoice);

            setTimeout(() => {
                displayResult(result, userChoice, computerChoice);
                optionImages.forEach(image => image.classList.remove("disabled"));
            }, 500);
        });
    });
}

document.addEventListener("DOMContentLoaded", setupGame);


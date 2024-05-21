const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const span = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia"; 

const updateParagraph = function(word){
    const circles = "●".repeat(word.length);
    wordInProgress.innerText = circles; 
}; 

updateParagraph(word);

// AddEventListener

guessButton.addEventListener("click",function(e){
    e.preventDefault();
    const inputWord = letter.value;
    console.log(inputWord);
    letter.value ="";
});

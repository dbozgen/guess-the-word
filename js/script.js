const guessedLettersItem = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const span = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia"; 
const guessedLetters = [];


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
    const validatedGuess = inputCheck(inputWord);
    // console.log(validatedGuess);
    if (validatedGuess) {
        makeGuess(guess);
    }
    letter.value ="";
});

const inputCheck = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0 ){
        message.innerText="Please write a word.";
    } else if (input.length > 1) {
        message.innerText="Please enter a single letter.";
    } else if (!input.match(acceptedLetter)){
        message.innerText ="Please enter a letter.";
    } else {
        return input; 
    }
};

const makeGuess = function (guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You guessed this letter. Try again." 
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};

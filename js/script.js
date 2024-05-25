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


const dummy = function(word){
    const dummyLetters = [];
    for (const item of word){
        console.log(item);
        dummyLetters.push("●");
    }
    wordInProgress.innerText = dummyLetters.join(""); 
}; 

dummy(word);


// AddEventListener

guessButton.addEventListener("click",function(e){
    e.preventDefault();
    const inputWord = letter.value;
    console.log(inputWord);
    const validatedGuess = inputCheck(inputWord);
    // console.log(validatedGuess);
    if (validatedGuess) {
        makeGuess(inputWord);
    }
    letter.value ="";
});

const inputCheck = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0 ){
        message.innerText="Please write a letter.";
    } else if (input.length > 1) {
        message.innerText="Please enter a single letter.";
    } else if (!input.match(acceptedLetter)){
        message.innerText ="Please enter a letter.";
    } else {
        return input; 
    }
};

const makeGuess = function (inputLetter){
    inputLetter = inputLetter.toUpperCase();
    if (guessedLetters.includes(inputLetter)){
        message.innerText = "You guessed this letter. Try again." 
    } else {
        guessedLetters.push(inputLetter);
        console.log(guessedLetters);
        displayGuessItems();
        UpdateWordInProgress(guessedLetters);
    }
};

const displayGuessItems = function () {
    guessedLettersItem.innerHTML = "";
    for (const item of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = item; 
        guessedLettersItem.append(li);
    }
};

const UpdateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    const showWord = [];
    for (const item of wordArray){
        if (guessedLetters.includes(item)){
            showWord.push(item.toUpperCase());
        } else {
            showWord.push("●");
        }
    }
    // console.log(showWord);
    wordInProgress.innerText = showWord.join("");
    checkWinner();
}; 

const checkWinner = function(){
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};
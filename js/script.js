const guessedLettersItem = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const GuessSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia"; 
let guessedLetters = [];
let remainingGuesses = 8; 

const getWord = async function(){
    const request = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`); 
    const data = await request.text();
    // console.log(data);
    const wordArray = data.split("\n");
    console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    dummy (word); 
};

// Start the game 
getWord();

const dummy = function(word){
    const dummyLetters = [];
    for (const item of word){
        // console.log(item);
        dummyLetters.push("●");
    }
    wordInProgress.innerText = dummyLetters.join(""); 
}; 


// AddEventListener

guessButton.addEventListener("click",function(e){
    e.preventDefault();
    message.innerText= "";
    const guess = letterInput.value;
    // console.log(guess);
    const correctGuess = inputCheck(guess);
    // console.log(validatedGuess);
    if (correctGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const inputCheck = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0 ){
        message.innerText="Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText="Please enter a single letter.";
    } else if (!input.match(acceptedLetter)){
        message.innerText ="Please enter a letter from A to Z.";
    } else {
        return input; 
    }
};

const makeGuess = function (guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You guessed this letter, already. Try again." 
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        displayGuessItems();
        CountGuessesRemaining(guess);
        UpdateWordInProgress(guessedLetters);
    }
};

const displayGuessItems = function () {
    guessedLettersItem.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter; 
        guessedLettersItem.append(li);
    }
};

const UpdateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    const showWord = [];
    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push("●");
        }
    }
    // console.log(showWord);
    wordInProgress.innerText = showWord.join("");
    checkWinner();
}; 

const CountGuessesRemaining = function (guess) {
    const UppercaseWord = word.toUpperCase();
    if (!UppercaseWord.includes(guess)) {
        message.innerText = `There's no ${guess} in this word.!`;
        remainingGuesses -= 1; 
    } else {
        message.innerText = `You guessed it right, there's a ${guess} in this word.`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML= `Sorry, you have no guesses left. The game is over. Here's the word: <span class="highlight"> ${word}</span>`;
        startOver();
    } else if (remainingGuesses === 1) {
        GuessSpan.innerText = `${remainingGuesses} guess`;
    } else {
        GuessSpan.innerHTML = `${remainingGuesses} guesses`;
    }
}; 

const checkWinner = function(){
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function(){
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersItem.classList.add("hide");
    playAgainButton.classList.remove("hide");

};

playAgainButton.addEventListener("click", function(){
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    GuessSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersItem.innerHTML= "";
    message.innerText = "";
    getWord();
    guessButton.classList.remove("hide");  
    remainingGuessesElement.classList.remove("hide");  
    guessedLettersItem.classList.remove("hide");  
    playAgainButton.classList.add("hide");
});
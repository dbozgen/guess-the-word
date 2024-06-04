const guessedLettersItem = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const span = document.querySelector("span");
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
    const randomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWord].trim();
    dummy (word); 
};

getWord();


const dummy = function(word){
    const dummyLetters = [];
    for (const item of word){
        console.log(item);
        dummyLetters.push("●");
    }
    wordInProgress.innerText = dummyLetters.join(""); 
}; 


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
    letter.value = "";
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
        CountGuessesRemaining(inputLetter);
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

const CountGuessesRemaining = function (guess) {
    const UppercaseWord = word.toUpperCase();
    if (!UppercaseWord.includes(guess)) {
        message.innerText = `There's no ${guess} in this word.!`;
        remainingGuesses -= 1; 
    } else {
        message.innerText = `You guessed correct the letter in this word! Congrats!`;
    }
    if (remainingGuesses === 0) {
        remainingGuessesElement.innerText= `Sorry, you have no guesses left. The game is over. Here's the word: ${word}`;
        startOver();

    } else if (remainingGuesses === 1) {
        remainingGuessesElement.innerHTML = `<p>You have <span class="highlight"> one guess</span> left.</p>`;
    } else {
        remainingGuessesElement.innerHTML = `<p>You have <span class="highlight">${remainingGuesses} guesses</span> left.</p>`;
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
    span.innerText = `${remainingGuesses} guesses`;
    guessedLettersItem.innerHTML= "";
    message.innerText = "";
    getWord();
    guessButton.classList.remove("hide");  
    remainingGuessesElement.classList.remove("hide");  
    guessedLettersItem.classList.remove("hide");  
    playAgainButton.classList.add("hide");
});
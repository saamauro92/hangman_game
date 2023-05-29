let wrongLetters = []; // to store wrong letter 
let matchingLetters = []; // to store matching letters 
let indexes = []; // to store indexes of matching letters
let wordArray = []; // to create an array of choosenWord
let errorCounter = 0; // to display error
let scoreCounter = 0; // to display score
var category; // to store game category
var choosenWord; // to store the word to guess
var gameStatus = "off"; // to set game status
var player;

document.addEventListener("DOMContentLoaded", function () {
  //fetch countries, animales and movies data from assets/data/data.json
  fetchGameData()
  //gets player name from localStorage
  if (localStorage.getItem("player")) {
    document.getElementById("player-name").value =
      localStorage.getItem("player");
  }
  //gets category name from localStorage
  if (localStorage.getItem("category")) {
    document.getElementsByTagName("select")[0].value =
      localStorage.getItem("category");
  }
  //Get play button
  const playButton = document.getElementById("play-button");

  /** This event sets the game taking player name and category in order to start*/
  playButton.addEventListener("click", function () {

    player = document.getElementById("player-name").value; //get players name
    //if no player name, display error and stop 
    if (!player) {
      return (document.getElementById("display-name-error").innerHTML =
        "**Please complete your name");
    }
    //restarts all the counters, words and hangman displayed
    restartCounters();

    //change first view to the game view
    document.getElementById("title").classList.add("moved"); // add moved class to title
    document.getElementById("game-options").style.display = "none"; // set main section to display none
    document.getElementById("display-player").style.display = "block"; //set players display block
    document.getElementById("game").style.display = "flex"; // set game visible 
    document.getElementById("display-player").textContent = player; // set players name 

    //save player and category in localStorage
    localStorage.setItem("player", player);
    let selectCategory = document.getElementById("category-selector");
    category = selectCategory.options[selectCategory.selectedIndex].value;
    localStorage.setItem("category", category);

    //get random word by category
    choosenWord = getRandomWordBycategory(category);
    //set game to status on 
    gameStatus = "on";
  });

  //get game instructions button and event
  //https://www.w3schools.com/howto/howto_js_popup.asp
  const gameInstructionsButton = document.getElementById("instructions-button");
  gameInstructionsButton.addEventListener("click", function () {
    toggleModal('instructions-modal');
  })

  //get modals closing button and event 
  const closeModals = document.getElementsByClassName("close-modal");
  for (let closeModal of closeModals) {
    closeModal.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "instructions-modal") {
        toggleModal('instructions-modal');
      } else if (this.getAttribute("data-type") === "error-modal") {
        toggleModal('error-modal')
      } else if (this.getAttribute("data-type") === "success-modal") {
        toggleModal('success-modal')
      } else if (this.getAttribute("data-type") === "category-modal") {
        toggleModal('category-modal')
      }
    })
  }

  //get game change category button and event
  const changeCategoryButton = document.getElementById("change-category-button");
  changeCategoryButton.addEventListener("click", function () {
    toggleModal('category-modal');
  })

  //get play again button from category change modal and restart the game
  const playAgainByCategoryChanged = document.getElementById("restart-category-button");
  playAgainByCategoryChanged.addEventListener("click", function () {
    //get new category values
    let selectCategory = document.getElementById("game-view-category-selector");
    category = selectCategory.options[selectCategory.selectedIndex].value;
    //save new category in localstorage
    localStorage.setItem("category", category);
    restartCounters()
    //get random new word by new category
    choosenWord = getRandomWordBycategory(category);
  })


});

/**This functions takes an id and toggles body background and show modal */
function toggleModal(id) {
  const popup = document.getElementById(id);
  const body = document.body;
  body.classList.toggle("body-background");
  popup.classList.toggle("show-modal");
}

//get title
const title = document.getElementById("title");
title.addEventListener("click", goToMainSection);

/**This function changes the game section to the first view */
function goToMainSection() {
  document.getElementById("title").classList.remove("moved");
  document.getElementById("display-player").style.display = "none";
  document.getElementById("game-options").style.display = "flex";
  document.getElementById("game").style.display = "none";
}

//get hint button
const hintButton = document.getElementById("hint-button");
hintButton.addEventListener("click", displayHint);

/** This function  displays the hint according the choosenWord */
function displayHint() {
  let words = [...countries, ...animals, ...movies];
  let hint = words.find(
    (word) => word.word.toLocaleLowerCase() === choosenWord.toLowerCase()
  ).hint;
  document.getElementById("hint-text").innerText = hint;
}

//get next button
const nextWordButton = document.getElementById("next-button");
nextWordButton.addEventListener("click", nextWord);

// This function calls for a new word to be randomized
function nextWord() {
  restartCounters();
  category = localStorage.getItem("category");
  document.getElementById("hint-text").innerText = "";
  choosenWord = getRandomWordBycategory(category);
}

// Gets the key value when pressed
document.addEventListener("keydown", function (event) {
  if (
    gameStatus === "on" &&
    event.keyCode >= 65 && event.keyCode <= 90 // to make sure we are only using the alphabet keys from keyboard
  ) {
    let key = event.key;
    checkIfWordMatchesKey(choosenWord, key.toLowerCase());
  }
});

/** This functions restarts the wrongLetters and errorCounter */
function restartCounters() {
  wrongLetters = [];
  errorCounter = 0;
  matchingLetters = [];
  document.getElementById("error-counter").innerText = errorCounter;
  document.getElementById("diplay-wrong-letters").innerHTML = "";
  document.getElementById("hint-text").innerText = "";
  hangmanDisplay();
}

/** This function gets a new or current category and returns a random word */
function getRandomWordBycategory(category) {
  let wordToGuess;
  if (category === "animals") {
    wordToGuess =
      animals[Math.floor(Math.random() * animals.length)].word.toLowerCase();
    runGame(wordToGuess);
  } else if (category === "movies") {
    wordToGuess =
      movies[Math.floor(Math.random() * movies.length)].word.toLowerCase();
    runGame(wordToGuess);
  } else {
    wordToGuess =
      countries[
        Math.floor(Math.random() * countries.length)
      ].word.toLowerCase();
    runGame(wordToGuess);
  }
  return wordToGuess;
}

/** This function gets a random word and display letter spaces in the ui */
function runGame(choosenWord) {
  let lettersContainer = document.getElementById("word-container");
  lettersContainer.innerHTML = "";

  let html = `<div class="game-letter"></div>`;
  let htmlEmpty = `<div class="game-letter-space"></div>`;

  for (let i = 0; i < choosenWord.length; i++) {
    if (choosenWord[i] === " ") {
      lettersContainer.innerHTML += htmlEmpty;
      continue;
    } else {
      lettersContainer.innerHTML += html;
    }
  }
}

/**This function  creates an array of the choosenWord, gets indices that matches the word , and also check for the wrong letters*/
function checkIfWordMatchesKey(word, key) {
  if (gameStatus === "off") return;
  indexes = [];
  wordArray = [];
  //Makes an array of the choosenWord in order to match the indexes in case there is a space on the word using the wordarray[]
  if (word !== null) {
    for (let letter of word) {
      if (letter === " ") {
        continue;
      } else {
        wordArray.push(letter);
      }
    }
    //Get indices of letters matched using the indexexs[]
    getMatchingIndexes(wordArray, key);
  }
  //Check for wrong letters
  getWrongLetters(wordArray, key);
  //Send indexes and wordArray to print letters
  printLetter(indexes, wordArray);
  //Compare if the choosenword matches all the letters in order to score
  setTimeout(() => {
    compareArrays(wordArray, matchingLetters);
  }, 1000);
}

//This functions get indices of letters matched using the indexexs[]
function getMatchingIndexes(wordArray, key) {
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i] === " ") {
      continue;
    } else if (wordArray[i] === key) {
      indexes.push(i);
      matchingLetters.push(key);
    }
  }
}
//This functions gets the wrong letters to display and incrementErrorCounter();
function getWrongLetters(wordArray, key) {
  if (
    !wordArray.includes(key) &&
    !wrongLetters.includes(key)
  ) {
    wrongLetters.push(key);
    printWrongLetter(wrongLetters);
    incrementErrorCounter();
  }
}

//** This function takes two arrays and compare them to see if values are the same in despite their order, will return the score + 1  */
function compareArrays(arr1, arr2) {
  for (let letter of arr1) {
    if (!arr2.includes(letter)) {
      return false;
    }
  }
  incrementScoreCounter();
}

/** This function takes indexes of correct letters and the word as an array to display them in the interface*/
function printLetter(indexes, word) {
  let letters = document.getElementsByClassName("game-letter");
  for (let index of indexes) {
    letters[index].textContent = word[index];
  }
}

/** This function takes the wrongLetters array to display them in the interface*/
function printWrongLetter(wrongLetters) {
  let divContainer = document.getElementById("diplay-wrong-letters");
  let newDiv = document.createElement("div");

  for (let letter of wrongLetters) {
    newDiv.innerHTML = `${letter}`;
    divContainer.appendChild(newDiv);
  }
}

/** This function increments errorCounter by one */
function incrementErrorCounter() {
  errorCounter += 1;
  document.getElementById("error-counter").innerText = errorCounter;
  hangmanDisplay();
}

/** This function increments scoreCounter by one */
function incrementScoreCounter() {
  scoreCounter += 1;
  document.getElementById("score-counter").innerText = scoreCounter;
  nextWord();
  toggleModal('success-modal')
  document.getElementById("success-message").textContent = `Well done ${player}!`
}

/**This function gets the hangman svg and return it on parts according to the errorCounters */
function hangmanDisplay() {
  if (errorCounter === 0) {
    let hangmanSvg = document.getElementById("hangman");
    const eachElement = hangmanSvg.getElementsByTagName("*");
    for (let i = 0; i < eachElement.length; i++) {
      eachElement[i].style.display = "none";
    } //to not display hangman if errrorCounter is 0;
  } else if (errorCounter === 1) {
    drawAnimation("id", "hangman-base");
  } else if (errorCounter === 2) {
    drawAnimation("id", "hangman-stand");
  } else if (errorCounter === 3) {
    drawAnimation("class", "hangman-top-stand");
  } else if (errorCounter === 4) {
    drawAnimation("id", "hangman-rope");
  } else if (errorCounter === 5) {
    drawAnimation("class", "hangman-head");
  } else if (errorCounter === 6) {
    drawAnimation("id", "hangman-body");
  } else if (errorCounter === 7) {
    drawAnimation("id", "hangman-right-arm");
  } else if (errorCounter === 8) {
    drawAnimation("id", "hangman-left-arm");
  } else if (errorCounter === 9) {
    drawAnimation("id", "hangman-right-leg");
  } else if (errorCounter === 10) {
    drawAnimation("id", "hangman-left-leg");
    setTimeout(() => {
      choosenWord = getRandomWordBycategory(category);
      restartCounters();
    }, 1000);
    toggleModal('error-modal')
    document.getElementById("hanged-man").textContent = `Sorry ${player}!, the correct anser was ${choosenWord.toUpperCase()}`
  }
}

/**This function takes two arguments, getBy "id" or "class" and either the name of id or className to creates a svg animation based on https://jakearchibald.com/2013/animated-line-drawing-svg/ */
function drawAnimation(getBy, name) {
  let paths;
  if (getBy === 'id') {
    let path = document.getElementById(name);
    //override paths as an array of the element by id in order to loop it after
    paths = [path]
  } else if (getBy === "class") {
    //get all the elements with that class in order to loop it after
    paths = document.getElementsByClassName(name);
  }

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    // Animation code based on https://jakearchibald.com/2013/animated-line-drawing-svg/
    path.style.display = "block";
    let length = path.getTotalLength();
    // Clear any previous transition
    path.style.transition = path.style.WebkitTransition = "none";
    // Set up the starting positions
    path.style.strokeDasharray = length + " " + length;
    path.style.strokeDashoffset = length;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.getBoundingClientRect();
    // Define our transition
    path.style.transition = path.style.WebkitTransition =
      "stroke-dashoffset 0.5s ease-in-out";
    // Go!
    path.style.strokeDashoffset = "0";
  }
}

let countries;
let animals;
let movies;

/**This function fetchs data from the data.json and returns the categories variables with data */
async function fetchGameData() {
  const gameDataFetched = await fetch('assets/data/data.json');
  let data = await gameDataFetched.json();
  countries = data.countries;
  animals = data.animals;
  movies = data.movies;
}
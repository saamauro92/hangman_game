let wrongLetters = []; // to store wrong letter 
let matchingLetters = []; // to store matching letters 
let indexes = [];// to store indexes of matching letters
let wordArray = []; // to create an array of choosenWord
let errorCounter = 0; // to display error
let scoreCounter = 0; // to display score
var category; // to store game category
var choosenWord; // to store the word to guess
var alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]; // to make sure we are using only the alphabet keys from keyboard
let player;  // to store players name
var gameStatus = "off"; // to set game status

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
  let playButton = document.getElementById("play-button");

  /** This event sets the game taking player name and category in order to start*/
  playButton.addEventListener("click", function () {

    player = document.getElementById("player-name").value;//get players name
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

});

//get title
let title = document.getElementById("title");
title.addEventListener("click", goToMainSection);

/**This function changes the game section to the first view */
function goToMainSection() {
  document.getElementById("title").classList.remove("moved");
  document.getElementById("display-player").style.display = "none";
  document.getElementById("game-options").style.display = "flex";
  document.getElementById("game").style.display = "none";
}

//get hint button
let hintButton = document.getElementById("hint-button");
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
let nextWordButton = document.getElementById("next-button");
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
  if (gameStatus === "on") {
    let key = event.key;
    checkIfWordMatchesKey(choosenWord, key);
    console.log(key);
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

  console.log(wordArray);
  printLetter(indexes, wordArray);

  //compare if the choosenword matches all the letters in order to score
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
      console.log(matchingLetters, "matching");
    }
  }
}
//This functions gets the wrong letters to display and incrementErrorCounter();
function getWrongLetters(wordArray, key) {
  if (
    !wordArray.includes(key) &&
    !wrongLetters.includes(key) &&
    alphabet.includes(key)
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
  alert("Well Done!");
  scoreCounter += 1;
  document.getElementById("score-counter").innerText = scoreCounter;
  nextWord();
}

/**This function gets the hangman svg and return it on parts according to the errorCounters */
function hangmanDisplay() {
  if (errorCounter === 0) {
    let hangmanSvg = document.getElementById("hangman");
    const eachElement = hangmanSvg.getElementsByTagName("*");
    for (let i = 0; i < eachElement.length; i++) {
      eachElement[i].style.display = "none";
    }  //to not display hangman if errrorCounter is 0;
  } else if (errorCounter === 1) {
    animationById("hangman-base");
  } else if (errorCounter === 2) {
    animationById("hangman-stand");
  } else if (errorCounter === 3) {
    animationByClass("hangman-top-stand");
  } else if (errorCounter === 4) {
    animationById("hangman-rope");
  } else if (errorCounter === 5) {
    animationByClass("hangman-head");
  } else if (errorCounter === 6) {
    animationById("hangman-body");
  } else if (errorCounter === 7) {
    animationById("hangman-right-arm");
  } else if (errorCounter === 8) {
    animationById("hangman-left-arm");
  } else if (errorCounter === 9) {
    animationById("hangman-right-leg");
  } else if (errorCounter === 10) {
    animationById("hangman-left-leg");
    setTimeout(() => {
      alert(`YOU GOT HANGED! the correct answer is ${choosenWord}`);
      choosenWord = getRandomWordBycategory(category);
      restartCounters();
    }, 500);
  }
}

/**This function takes an id and creates a svg animation based on https://jakearchibald.com/2013/animated-line-drawing-svg/ */
function animationById(id) {
  let = path = document.getElementById(id);
  path.style.display = "block";
  var length = path.getTotalLength();
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

/**This function takes a class and creates a svg animation based on https://jakearchibald.com/2013/animated-line-drawing-svg/ */
function animationByClass(className) {
  let path = document.getElementsByClassName(className);
  for (let i = 0; i < path.length; i++) {
    path[i].style.display = "block";
    let length = path[i].getTotalLength();
    // Clear any previous transition
    path[i].style.transition = path[i].style.WebkitTransition = "none";
    // Set up the starting positions
    path[i].style.strokeDasharray = length + " " + length;
    path[i].style.strokeDashoffset = length;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path[i].getBoundingClientRect();
    // Define our transition
    path[i].style.transition = path[i].style.WebkitTransition =
      "stroke-dashoffset 0.5s ease-in-out";
    // Go!
    path[i].style.strokeDashoffset = "0";
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
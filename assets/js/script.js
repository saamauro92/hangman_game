let wrongLetters = [];
let matchingLetters = [];
let errorCounter = 0;
let scoreCounter = 0;
var category;
var choosenWord;
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
];
let player;
var gameStatus = "off";

document.addEventListener("DOMContentLoaded", function () {
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

  let playButton = document.getElementById("play-button");
  /** This event sets the game taking player name and category in order to start*/
  playButton.addEventListener("click", function () {
    player = document.getElementById("player-name").value;
    if (!player) {
      return (document.getElementById("display-name-error").innerHTML =
        "**Please complete your name");
    }
    restartCounters();
    document.getElementById("title").classList.add("moved");
    document.getElementById("game-options").style.display = "none";
    document.getElementById("display-player").style.display = "block";
    document.getElementById("game").style.display = "flex";
    document.getElementById("display-player").textContent = player;
    //save player in localstorage
    localStorage.setItem("player", player);
    let selectCategory = document.getElementById("category-selector");
    category = selectCategory.options[selectCategory.selectedIndex].value;
    //save category in localstorage
    localStorage.setItem("category", category);
    choosenWord = getRandomWordBycategory(category);
    gameStatus = "on";
  });
});

//GET TITLE
let title = document.getElementById("title");
title.addEventListener("click", goToMainSection);

function goToMainSection() {
  document.getElementById("title").classList.remove("moved");
  document.getElementById("display-player").style.display = "none";
  document.getElementById("game-options").style.display = "flex";
  document.getElementById("game").style.display = "none";
}

//GET HINT BUTTON
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

//GET NEXT BUTTON
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
  console.log(choosenWord);
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

function checkIfWordMatchesKey(word, key) {
  if (gameStatus === "off") return;
  let indexes = [];
  let wordArray = [];

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

  //Check for wrong letters
  if (
    !wordArray.includes(key) &&
    !wrongLetters.includes(key) &&
    alphabet.includes(key)
  ) {
    wrongLetters.push(key);
    printWrongLetter(wrongLetters);
    incrementErrorCounter();
  }
  console.log(wordArray);
  printLetter(indexes, wordArray);

  //compare if the choosenword matches all the letters in order to score
  setTimeout(() => {
    compareArrays(wordArray, matchingLetters);
  }, 1000);
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
    }
  } else if (errorCounter === 1) {
    document.getElementById("hangman-base").style.display = "block";
  } else if (errorCounter === 2) {
    document.getElementById("hangman-stand").style.display = "block";
  } else if (errorCounter === 3) {
    let topStand = document.getElementsByClassName("hangman-top-stand");

    for (let i = 0; i < topStand.length; i++) {
      topStand[i].style.display = "block";
    }
  } else if (errorCounter === 4) {
    document.getElementById("hangman-rope").style.display = "block";
  } else if (errorCounter === 5) {
    let head = document.getElementsByClassName("hangman-head");
    for (let i = 0; i < head.length; i++) {
      head[i].style.display = "block";
    }
  } else if (errorCounter === 6) {
    document.getElementById("hangman-body").style.display = "block";
  } else if (errorCounter === 7) {
    document.getElementById("hangman-right-arm").style.display = "block";
  } else if (errorCounter === 8) {
    document.getElementById("hangman-left-arm").style.display = "block";
  } else if (errorCounter === 9) {
    document.getElementById("hangman-right-leg").style.display = "block";
  } else if (errorCounter === 10) {
    document.getElementById("hangman-left-leg").style.display = "block";
    setTimeout(()=> {
      alert(`YOU GOT HANGED! the correct answer is ${choosenWord}`);
      choosenWord = getRandomWordBycategory(category);
      restartCounters();
    }, 500)
  }
}

let countries = [
  {
    word: "argentina",
    hint: "he largest country in South America, famous for its vibrant culture, soccer, and the Amazon Rainforest",
  },
  { word: "united states", hint: "sjhgjhgth american" },
  { word: "germany", hint: "south amerjhgjhgican" },
  { word: "italy", hint: "south amerjhgjhican" },
  { word: "siri lanka", hint: "south amejhgjhgjhgrican" },
  { word: "spain", hint: "south amerjhgjhgican" },
];
let animals = [
  { word: "cat", hint: "soufhgfhgfth amejhgjhgjhgjhgjrican" },
  { word: "dog", hint: "souhgfhgth american" },
  { word: "rino", hint: "souhgfhgfhth american" },
  { word: "cocodrile", hint: "soguth american" },
  { word: "elephant", hint: "southgfh american" },
  { word: "komodo dragon", hint: "sohgfhgfuth american" },
];

let movies = [
  {
    word: "The Godfather",
    hint: "A classic crime film directed by Francis Ford Coppola, known for its iconic characters and memorable quotes like 'I'm gonna make him an offer he can't refuse'.",
  },
  {
    word: "Star Wars",
    hint: "An epic space opera franchise created by George Lucas, featuring iconic characters like Luke Skywalker, Darth Vader, and Yoda.",
  },
];

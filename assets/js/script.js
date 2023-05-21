let wrongLetters = [];
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
    document.getElementById("title").classList.add("moved");
    document.getElementById("game-options").style.display = "none";
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

function goToMainSection(){
document.getElementById("title").classList.remove("moved");
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

// Gets the key value when pressed
document.addEventListener("keydown", function (event) {
  if (gameStatus === "on") {
    let key = event.key;
    checkIfWordMatchesKey(choosenWord, key);
    console.log(key);
  }
});

/** This function gets a new or current category and returns a random word */
function getRandomWordBycategory(category) {
  let choosenWord;
  if (category === "animals") {
    choosenWord = animals[Math.floor(Math.random() * animals.length)].word;
    runGame(choosenWord);
  } else if (category === "movies") {
    choosenWord = movies[Math.floor(Math.random() * movies.length)].word;
    runGame(choosenWord);
  } else {
    choosenWord = countries[Math.floor(Math.random() * countries.length)].word;
    runGame(choosenWord);
  }
  console.log(choosenWord);
  return choosenWord;
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

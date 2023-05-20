var category = "countries";
var choosenWord;

document.addEventListener("DOMContentLoaded", function () {
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
  });
});














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

var category = "countries";
var choosenWord;



document.addEventListener("DOMContentLoaded", function () {
  let playButton = document.getElementById('play-button');
/** This event sets the game taking player name and category in order to start*/
  playButton.addEventListener("click", function(){
      player = document.getElementById("player-name").value;
      if(!player){
        return document.getElementById("display-name-error").innerHTML = "**Please complete your name"
    }
      document.getElementById("title").classList.add('moved');
      document.getElementById("game-options").style.display = 'none';
      document.getElementById("game").style.display = "flex"; 
      document.getElementById("display-player").textContent = player;
         //save player in localstorage
    localStorage.setItem("player", player);
      let selectCategory = document.getElementById("category-selector");
      category = selectCategory.options[selectCategory.selectedIndex].value;
          //save category in localstorage
    localStorage.setItem("category", category);


  })
  
  
  


  });


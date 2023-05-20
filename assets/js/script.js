
var category = "countries";
var choosenWord;



document.addEventListener("DOMContentLoaded", function () {
  let playButton = document.getElementById('play-button');
  
  playButton.addEventListener("click", function(){
      player = document.getElementById("player-name").value;
      if(!player){
        return document.getElementById("display-name-error").innerHTML = "**Please complete your name"
    }
      document.getElementById("title").classList.add('moved');
      document.getElementById("game-options").style.display = 'none';
      document.getElementById("game").style.display = "flex"; 
      document.getElementById("display-player").textContent = player;

  })
  
  
  


  });
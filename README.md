
# The Hangman Game

  

**Classic word guessing game** where the player attempts to **guess a secret word by suggesting letters**. For every incorrect guess, a part of a hangman's body is drawn, and the player loses when the hangman is complete. **The objective is to guess the word correctly before the hangman is fully drawn.**

The game offers a first view where player can input the name and choose word to guess categories as countries, animals and movies.
The game is developed for anyone looking to have a fun moment playing an interactive game which for some of us reminds us good old times.

  

The live version can be found  [Here](https://saamauro92.github.io/hangman_game/)

  
  

![Responsive Mockup](https://github.com/saamauro92/hangman_game/raw/main/media/responsive.png)

  # Table of contents

- [Features](#features)
  - [Existing Features ](#existing-features)
      - [Game title](#game-title)
      - [Game options](#game-options)
      - [Game](#game)
      - [Game scores](#game-score)
      - [Game actions](#game-actions)
      - [Error page](#error-page)

   - [Features Left to Implement ](#features-left-to-implement)
       - [Scores display](#scores-display)

- [UX/UI](#ux-ui)
  - [Wireframes](#wireframes)
 
 - [Testing](#testing)
   - [Validator Testing](#validator-testing)
     - [HTML](#html)
     - [CSS](#css)
     - [JS](#javascript)
    - [Accessibility](#accessibility)
      - [Lighthouse Desktop](#lighthouse-desktop)
      - [Lighthouse Mobile](#lighthouse-mobile)
      - [Wave Tool](#wave-tool)

   - [Manual testing](#manual-testing)
   - [Known Bugs](#known-bugs) 
     - [Fixed bugs](#fixed-bugs)

- [Deployment ](#deployment)

- [Technologies Used](#technologies-used)

- [Credits](#credits)
  - [Content](#content)
  - [Media](#media)

- [Acknowledgements](#acknowledgments)


---

## Features

  

### Existing Features

  

#####  Game title
  

- This section will allow the user identify the game name
  ![title](https://github.com/saamauro92/hangman_game/raw/main/media/title.png)

##### Game options

  
- This section includes an input where players should write their name and also has the option to select game category in order to start.
  

![game_options](https://github.com/saamauro92/hangman_game/raw/main/media/game_options.png)

  


##### Game

  
- This section displays the hangman draw, the word to guess as well as wrong letters and the word hint.
  

![game](https://github.com/saamauro92/hangman_game/raw/main/media/game_draw_and_word.png)
  

##### Game score

 
- This section displays the game score and errors counter.
  

![game_score](https://github.com/saamauro92/hangman_game/raw/main/media/game_scores.png)

##### Game actions

 
- This section includes 4 buttons:
- Hint button that would display the hint on click.
- Next button that would call for another word to guess on click.
- Change Category button that would display a modal with the option to change the category
- Game Instructions button that would display a modal with the game instructions/
  

![game_actions](https://github.com/saamauro92/hangman_game/raw/main/media/game_actions.png)

##### Error page

 
- This page includes an anchor tag that redirects to index 

 
![404_page](https://github.com/saamauro92/hangman_game/raw/main/media/404_page.png)
  




  

### Features Left to Implement

  

#### Scores Display

  

- This section would show other users scores.

## UX-UI
I based the design of this website/game on a school note book that incorporates lined backgrounds and a handwritten font to evoke a sense of nostalgia and transport you back to the days of handwritten notes.
  

## Wireframes
#### Desktop

  ![desktop_1](https://github.com/saamauro92/hangman_game/raw/main/media/desktop_1.png)

  ![desktop_2](https://github.com/saamauro92/hangman_game/raw/main/media/desktop_2.png)

#### Mobile
![mobile_1](https://github.com/saamauro92/hangman_game/raw/main/media/mobile_1.png)
![mobile_2](https://github.com/saamauro92/hangman_game/raw/main/media/mobile_2.png)

## Testing


- I tested that the game works in different browsers: Chrome, Firefox and Safari.

- I confirmed that all the text in the first view and game are readable and easy to understand.

  

### Validator Testing

  
##### HTML

- No errors were returned when passing through the official [W3C Validator](https://validator.w3.org/#validate_by_input)
![html_validator](https://github.com/saamauro92/hangman_game/raw/main/media/html_validator.png)

##### CSS

- No errors were found when passing through the official [Jigsaw Validator](https://jigsaw.w3.org/css-validator/#validate_by_input)

![css_validator](https://github.com/saamauro92/hangman_game/raw/main/media/css_validator.png)


##### Javascript
- I run the javascript code in [JS HINT TOOL](https://jshint.com/) and found no errors , only 2 warnings.
![js_validator](https://github.com/saamauro92/hangman_game/raw/main/media/js_validator.png)

#### Accessibility

 - I confirmed that the colors and fonts chosen are easy to read and accessible by running it through lighthouse devtools

- Used aria lables and tab indexes.

##### Lighthouse Desktop 

![lighthouse_desktop](https://github.com/saamauro92/hangman_game/raw/main/media/lighthouse_desktop.png)

##### Lighthouse mobile 

![lighthouse_mobile](https://github.com/saamauro92/hangman_game/raw/main/media/lighthouse_mobile.png)

##### WAVE Tool
  
  ![lwave](https://github.com/saamauro92/hangman_game/raw/main/media/web_accessibility.png)
  
  

### Manual testing

  

| Feature | Expect | Action | Result |
|--|--|--|--|
| Title on game view| When clicked, should return to first view | Clicked  | Went back to main view |
| Play Game Button | When clicked, after write a name should change the view to the game view | clicked the Play Game button | Game displayed |
| Hint button | When clicked, should display word to guess hint | Clicked | Displayed hint |
| Next button | should generate a different word | Clicked |Random word generated |
| Game Instructions link | should display a modal with the game instructions |clicked | displays correctly a modal with the game instructions |
| Letters to guess | When press any alphabetic letter will either show it as wrong or display it to the show to guess (if letter was not used already) | pressed several alphabetic keys on the keyboard | wrong letters showed up and letters guessed showed up|
| x (close) Button on modals | When pressed should hide the modals | clicked | all modals will hide|
| Home anchor tag in 404 page | When pressed should go back to the index.html (first view) | clicked | Redirected to index.html|

  

### Known Bugs

   
 -  Generating random words to guess sometimes could repeat the words.

 #### Fixed Bugs

 -  On mobile version keyboard will not show up, I tried several approaches and the only one that seemed to work fine was by adding a hidden input above the letters in html to guess and set opacity 0 and Z index 20 on the letters.
 

## Deployment

 
- The site was deployed to GitHub pages. The steps to deploy are as follows:

- In the GitHub repository, navigate to the Settings tab

- From the source section drop-down menu, select the Main Branch

- Once the main branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

## Technologies Used
  
  - The site was developed using HTML and CSS and Javascript
  
  - Used [Figma](https://www.figma.com/) to draw the wireframes.

  - Used [StackEdit](https://stackedit.io/) to write README
  - Used [Wave tool](https://wave.webaim.org/)
  - Used [JS hint Tool](https://jshint.com/)
  - Used [CSS validator Jigsaw](https://jigsaw.w3.org/css-validator/);
  - Used [W2c Validator](https://validator.w3.org/)  
  - Used [SVG Gator](https://app.svgator.com) to draw and make the SVG hangman
  - Used  [Google fonts](https://fonts.google.com/)

  

## Credits

### Content

- Code institute student programme
- How to animate CSS buttons [W3School](https://www.w3schools.com/howto/howto_css_animate_buttons.asp)
- Transitions in CSS [W3School](https://www.w3schools.com/css/css3_transitions.asp)
- How to avoid border overlape [StackOverflow](https://stackoverflow.com/questions/18836251/avoid-border-overlap-css)
- I got the lined background from [Projects.verou](https://projects.verou.me/css3patterns/#lined-paper)
- The SVG draw animation is based on [this tutorial](https://jakearchibald.com/2013/animated-line-drawing-svg/)
- Getting value of select tags from [this tutorial](https://ricardometring.com/getting-the-value-of-a-select-in-javascript?utm_content=cmp-true)
- Set and get items from localstorage [W3School](https://www.w3schools.com/jsref/prop_win_localstorage.asp)
- Bad Script font was imported from [Google fonts](https://fonts.google.com/)
- Favicon was downloaded from [Flaticon](https://www.flaticon.com/free-icons/hangman)


  

### Acknowledgments

- The code institute
- Graeme Taylor my mentor for support and advice.

  
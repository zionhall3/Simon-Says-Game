// At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
const buttonColors = ["red", "blue", "green", "yellow", "purple", "black"];


// At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];


// At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

// Create a new variable called level and start at level 0.
var level = 0;


// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {

    // Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.

    // Uses "this" to keep track of what you pressed and keeps track of it by the id attribute
    var userChosenColour = $(this).attr("id");

    // Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);

    // You can use conole logging to make sure your clicks are being captured as inputs and put into the array properly
    // console.log(userClickedPattern);


    // Calls the playsound function we made below and passes in the variable for the color as the name variable
    playSound(userChosenColour);

    // Calls the animated press function down below and passes in the variable of the color we clicked
    animatePress(userChosenColour);

    //     Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.

    // e.g. If the user has pressed red, green, red, yellow, the index of the last answer is 3.
    
    checkAnswer(userClickedPattern.length - 1);
  });

// In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played. e.g if the Green button is clicked, then green.mp3 should be played.

// Create a new function called playSound() that takes a single input parameter called name.

function playSound(name) {

    //Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.

    // Take the code we used to play sound in the nextSequence() function and move it to playSound().

    // Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.

    // Name variable we defined for this function is passed in from the above functions.
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};


// Create a new function called animatePress(), it should take a single input parameter called currentColour.

function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started){
    
    // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    
    nextSequence();
    // You'll need a variable called started to toggle to true once the game starts and if it's true, then further key presses should not trigger nextSequence().
    var started = true;
  }
});

// Create a new function called checkAnswer(), it should take one input with the name currentLevel


function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success!")

    // This if statement makes sure the user's input pattern is the same length as teh game pattern.
    if (userClickedPattern.length == gamePattern.length){
      
      // Call nextSequence() after a 1000 millisecond delay.

      setTimeout(function () {
        nextSequence()
      }, 1000);
    } 
  }

  else{
    console.log("wrong")
    
    // Plays a sound for the game over
    var wrong_sound = new Audio("sounds/wrong.mp3");
    wrong_sound.play();

    // Adds red background to the screen when getting a wrong answer and then removes it after a bit.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    

    // Changes heading text
    $("#level-title").text("Game Over. Press Any Key to restart");
    
    // Calls a function to start the game over
    startOver();
  }
};

// Inside game.js create a new function called nextSequence()
function nextSequence() {
  userClickedPattern = [];
  
  // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

 
  // Was encountering a bug where the level text wasn't showing up properly and realized it was because the next sequence function wasn't changing the text
  $("#level-title").text("Level " + level);


  // Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 6);

  // Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColors[randomNumber];

  // Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  // Use jQuery to select the button with the same id as the randomChosenColour
  //Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.


  // Was using a switch statement before but this makes it super easy to just insert the color name into the code without it being repetitive
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Calls the playsound function we made below and passes in the variable for the randomly chosen color as the name variable
  playSound(randomChosenColour);

};

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
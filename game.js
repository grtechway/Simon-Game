var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;
var currentLevel = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  $('#level-title').text("Level " + currentLevel);
  randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);
  //console.log(gamePattern);
  $("#" + randomChosenColour).fadeOut().fadeIn();
  playSound(randomChosenColour);
  currentLevel++;
}

$('.row').click(function(event) {
  if (buttonColours.includes(event.target.id)) {
    userClickedPattern.push(event.target.id);
    playSound(event.target.id);
    animatePress(event.target.id);
    checkAnswer(event.target.id,(userClickedPattern.length-1));
  }

});

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColour).removeClass("pressed");
  }, 100);
}

$('body').keydown(function(event) {
  if (!started) {
    nextSequence();
    started = true;
  }
});


function checkAnswer(colour, indexValue) {
  console.log(gamePattern+indexValue);
  if (gamePattern[indexValue]===colour) {
    if((gamePattern.length-1)===indexValue){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
    } else {
      $('body').addClass('game-over');
      $('#level-title').text('Game Over, Press Any Key / click here to Restart');
      setTimeout(function(){
        $('body').removeClass('game-over');
      },200);
      startOver();
    }
  }

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  randomChosenColour;
  currentLevel = 0;
  started = false;
}

$('#level-title').click(function(event){
  if (!started) {
    nextSequence();
    started = true;
  }
})

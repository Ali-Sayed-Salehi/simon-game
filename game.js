let gamePattern = [];
let userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let gameHasStarted = false;
let level = 0;


$(document).on("keypress", function() {
  if (!gameHasStarted) {
    gameHasStarted = true;
    setTimeout(function() {
      nextSequence();
    }, 200);
  } 
});



$(".btn").on("click", function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (!checkAnswer(gamePattern, userClickedPattern)) {
    gameOver();
  }
  if (gamePattern.length == userClickedPattern.length) {
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }

});


function nextSequence() {
  $("#level-title").text(`Level ${level}`);
  userClickedPattern = [];
  const randomNumber = Math.floor(Math.random() * (4));
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  flashAnimation(randomChosenColour);
  level++;
}

function flashAnimation(elementId) {
  $(`#${elementId}`).fadeOut(100).fadeIn(100, function() {
    // Animation complete, you can perform additional tasks here
  });
}


function playSound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer() {
  if (gamePattern[userClickedPattern.length - 1] != 
      userClickedPattern[userClickedPattern.length - 1]) {
    return false;
  }
  return true;
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 500);
  $("#level-title").text(`Game Over, Press Any Key to Restart`);
  startOver();
}

function startOver() {
  gameHasStarted = false;
  level = 0;
  gamePattern = [];
}
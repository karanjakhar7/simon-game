var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var buttonColours = ["red", "blue", "green", "yellow"];
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  click(randomChosenColour);
  sound(randomChosenColour);
  level++;
  $("h1").text("Level "+level);
}

$(".btn").click(onClick);

function onClick() {

  elemid = $(this).attr('id');
  click(elemid);
  sound(elemid);
  userClickedPattern.push(elemid);
  checkAnswer(userClickedPattern.length - 1);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

$(document).on("keypress", function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(nextSequence, 1000);

    }
  }
  else {
    sound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)

    startOver();
  }

}
// CLICK ANIMATION

function click(id) {

  $("#" + id).addClass("pressed");
  setTimeout(function() {
    $("#" + id).removeClass("pressed");
  }, 100)
}

// CLICK SOUND

function sound(id) {
  var audio = new Audio("sounds/" + id + ".mp3");
  audio.play();
}

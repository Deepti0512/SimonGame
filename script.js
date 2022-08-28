let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let cnt = 0;

$(document).on("keypress", function () {
    if (cnt === 0) {
        $("#level-title").text("Level " + level);
        nextSequence();
        cnt = cnt + 1;
    }l
});
$("#startGame").on("click",function(){
    if (cnt === 0) {
        $("#level-title").text("Level " + level);
        nextSequence();
        cnt = cnt + 1;
    }
});
$(".btn").on("click", function () {

    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playbuttonSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("gamepattern "+ gamePattern);
        console.log("userpattern "+ userClickedPattern);
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else {
        playbuttonSound("wrong");
        $(document.body).addClass("game-over");
        $("#level-title").text("Game Over! Press any key to restart ");

        setTimeout(function () {
            $(document.body).removeClass("game-over");
        }, 200);

        reset();
    }
}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playbuttonSound(randomChosenColor);

}

function playbuttonSound(buttonColor) {
    let sound = new Audio("sounds/" + buttonColor + ".mp3");
    sound.play();
}
function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");
    setTimeout(function () {
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}

function reset(){
    level = 0;
    cnt = 0;
    gamePattern = [];
}


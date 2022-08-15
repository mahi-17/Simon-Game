
var buttonColors = ["green", "red", "yellow", "blue"]
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function () {

    if (!started) {
        $("#level-title").text("level" + " " + level);
        next_sequence();
        started = true;
    }


});

function next_sequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level" + " " + level);

    var index = (Math.floor((Math.random()) * 4));
    var randomChoosenColor = buttonColors[index];

    gamePattern.push(randomChoosenColor);
    console.log("game ");
    console.log(gamePattern);

    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);

}

function playSound(userChoosenColor) {
    var audio = new Audio("sounds/" + userChoosenColor + ".mp3");
    audio.play();
}

$(".btn").click(function () {
    //    console.log(this);
    //    console.log(this.id);
    // var userChoosenColor = this.id;

    var userChoosenColor = $(this).attr("id");

    // user click pattern push in an array
    userClickedPattern.push(userChoosenColor);
    // console.log("user ")
    // console.log(userClickedPattern);

    //to play the corresponding sound 
    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

function animatePress(userChoosenColor) {
    // alert("i got clicked"+ userChoosenColor);
    var userClicked = "#" + userChoosenColor;
    $(userClicked).addClass("pressed")
    setTimeout(function () {
        $(userClicked).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        // console.log("success")

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                next_sequence();
            }, 1000);
        }
    } else {
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        StartOver();
    }

    function StartOver() {
        level = 0;
        started = false;
        gamePattern = [];
    }

}
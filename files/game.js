// alert("encviber");
// $("h1").css("color","blue");

var gamePattern=[];
var userClickedPattern=[];

var buttonColours=["red","blue","green","yellow"];

var level=0;
var started=false;

function playSound(soundName)
{
    var audio = new Audio("sounds/" + soundName + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}


function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+ level);
    var random_no=Math.random();
    random_no=Math.floor(random_no*4);
    var randomChosenColour=buttonColours[random_no];

    gamePattern.push(randomChosenColour);

    // $("#"+randomChosenColour).addClass("flash");

    // setTimeout(() => {
    //     $("#"+randomChosenColour).removeClass("flash");
    // }, 500);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    // .fadeOut(100).fadeIn(100);

    // var audiofile = 'files/sounds/' + randomChosenColour + '.mp3';

    playSound(randomChosenColour);


}

// nextSequence();



function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length==gamePattern.length)
        {
            console.log("success");
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
        
    }
    else 
    {
        console.log("wrong");
        playSound("wrong");
        

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
        
    }
}

document.addEventListener("keydown",function(){
    if(started==false)
    {
        started=true;
        // $("h1").text("Level "+level);
        nextSequence();
    }
});

// document.querySelector(".btn").addEventListener("click",function(){
$(".btn").click(function(){

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function startOver()
{
    gamePattern=[];
    userClickedPattern=[];
    level=0;
    started=false;
}












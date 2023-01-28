let level=0;
let gameStarted=false;
let gamePattern=[];
let userClickedPattern=[];
let buttonColours=["red", "blue", "green", "yellow"];


$(".btn").click(function(event){
    let targetBtn=event.target;
    handler(targetBtn);
    animatePress(targetBtn.id);
    checkAnswer();
})

$("body").keypress(()=>{
    if(!gameStarted){
        gameStarted=true;
        level=0;
        gamePattern=[];
        userClickedPattern=[];
        nextSequence();
    }
});

function handler(targetBtn){
    userChosenColour=targetBtn.id;
    userClickedPattern.push(userChosenColour);
}

function nextSequence(){
    level++;
    $("#level-title").html(`level ${level}`);
    let randomNumber=Math.floor(Math.random()*4);
    gameColor=buttonColours[randomNumber];
    $('.'+gameColor).fadeOut(100).fadeIn(100);
    playSound(gameColor);
    gamePattern.push(gameColor);
}

function restartGame(){
    level=0;
    nextSequence();
}

function checkAnswer(){
    if(userClickedPattern[userClickedPattern.length - 1]!=gamePattern[userClickedPattern.length - 1]){
        playSound('wrong');
        $("body").addClass("game-over");
        setTimeout(()=>{ $("body").removeClass("game-over");},200);
        $("h1").text("Game Over, Press Any Key to Restart");
        gameStarted=false;
    }
    playSound(userClickedPattern[userClickedPattern.length - 1]);
    if(JSON.stringify(userClickedPattern)==JSON.stringify(gamePattern)) setTimeout(()=>{
        userClickedPattern=[];
        nextSequence();
    },1000);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $('#'+currentColor).addClass("pressed");
    setTimeout(()=>{$('#'+currentColor).removeClass("pressed");},100);
}


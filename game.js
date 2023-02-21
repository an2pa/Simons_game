var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var count=0;

function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomColor=buttonColors[randomNumber];
    gamePattern[gamePattern.length]=randomColor;
    $("#"+randomColor).fadeOut(100).fadeIn(100);
    level++;
    $("h1").text("Level "+level);
    var audio=new Audio("sounds/"+randomColor+".mp3");
    audio.play();
}
function checkEqual(array1,array2){
    var count=0;
    for(var i=0; i<array1.length;i++){
        if(array1[i]==array2[i]){
        count++;
        }
        else
        break;
    }
    if(count==array1.length)
    return true;
    else
    return false;
}

function checkElement(x){
    if(userClickedPattern[x]==gamePattern[x])
    return true;
    else
    return false;
}
function startOver(){
    gamePattern=[];
    userClickedPattern=[];
    level=0;
    count=0;
    $("h1").text("Press A Key to Start");
    $(document).keydown(function(){
        if(level==0)
        nextSequence();
    })
    $("h1").click(function(){
        if(level==0)
        nextSequence();
    })
}
$("h1").click(function(){
    if(level==0)
    nextSequence();
})


$(document).keydown(function(){
    if(level==0)
    nextSequence();
})

$(".btn").click(function(){
    var id=($(this).attr("id"));
    userClickedPattern[userClickedPattern.length]=id;
    $(this).addClass("pressed");
    setTimeout(() => {
        $(this).removeClass("pressed");  
    }, 100);
    var audio=new Audio("sounds/"+id+".mp3");
    audio.play();
    if(!checkElement(count)){
    $("h1").text("Game over!");
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(() => {
        startOver();  
    }, 999);
    }
    else{
    count++; 
    if(count==gamePattern.length){
        if(checkEqual(userClickedPattern, gamePattern)){
            setTimeout(() => {
                nextSequence();  
            }, 200);
        count=0;
        }
        else{
        $("h1").text("Game over!");
        setTimeout(() => {
            var audio=new Audio("sounds/wrong.mp3");
            audio.play();
            startOver();  
        }, 999);
    }
    }  
}    
    })


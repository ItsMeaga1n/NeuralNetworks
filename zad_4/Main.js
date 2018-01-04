var robotArm = new RobotArm();
var learned = false;

$(document).ready(function(){ 

    $('.learnButton').click(function(){
        $('.resultText').replaceWith("<p class='resultText'>Learning.. .</p>");                
        var values = robotArm.StartLearning(10000, 100)
        console.log(values);
        $('.resultText').replaceWith("<p class='resultText'>Learning complete!</p>");
        learned = true;
    });
});
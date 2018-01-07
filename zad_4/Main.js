var robotArm = new RobotArm();
var learned = false;
var canvas;
var canvasContext;
var learnedIterations;

$(document).ready(function () {
    canvas = document.getElementById("robotArmCanvas");
    canvasContext=canvas.getContext("2d");
    canvasContext.beginPath();
    canvasContext.moveTo(0,241);
    canvasContext.lineTo(300,150);
    canvasContext.stroke();

    $('.learnButton').click(function () {
        $('.resultText').replaceWith("<p class='resultText'>Learning.. .</p>");
        learnedIterations = Number(document.getElementById('numberIterations').value);
        var values = robotArm.StartLearning(learnedIterations, 100)
        $('.resultText').replaceWith("<p class='resultText'>Learned with "+ learnedIterations + " iterations!</p>");
        learned = true;
    });

    $('.mainApp').mousemove(function () {
        if (learned) {
            var msg = "Learned with "+ learnedIterations + " iterations! Mouse at:";
            msg += (event.pageX - $(this).offset().left) + ", " + (event.pageY - $(this).offset().top);
            $('.resultText').replaceWith("<p class='resultText'>" + msg + "</p>");
            drawLine(robotArm.Eval(new Point(event.pageX - $(this).offset().left - 321, event.pageY - $(this).offset().top - 241)));
        }
    });

    function drawLine(angles){
        let points = robotArm.GetArmPoints(angles);
        points[0].y += 241;
        points[1].y += 241;
        
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.beginPath();

        canvasContext.moveTo(0,241);
        canvasContext.lineTo(points[0].x ,points[0].y);
        canvasContext.lineTo(points[1].x ,points[1].y);        
        canvasContext.stroke();        
    }
});
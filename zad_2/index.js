var inputGrid = new Array;
var learningSet = new Array;
var network = new Network();

$(document).ready(function () {
    for (var i = 0; i < 2500; i++) {
        $('.gridContainerLeft').append("<div class='gridBox' id='" + i + "'>");
        inputGrid.push(0);

        $('.gridContainerRight').append("<div class='gridBoxResult' id='" + i + "'>");
    }

    $('.gridBox').hover(function (e) {
        var currId = $(this).attr('id');
        if (e.buttons) {
            if (!inputGrid[currId]) {
                inputGrid[currId] = 1;
                $(this).addClass('active');
            }
        }
        return false;
    });

    $('.gridBox').click(function () {
        var currId = $(this).attr('id');
            if (inputGrid[currId]) {
                inputGrid[currId] = 0;
                $(this).removeClass('active');
            }
            else {
                inputGrid[currId] = 1;
                $(this).addClass('active');
            }
    });



    $('.recognizeButton').click(function () {
       let output = network.perceive(inputGrid);
       let resultGrid = $('.gridBoxResult');
       for(let i = 0; i < resultGrid.length; i++){
           if(output[i]){
               $(resultGrid[i]).addClass('active');
           }
       }
    });

    $('.learnButton').click(function () {
        network.learn([inputGrid]);
    });

    $('.clearButton').click(function () {

    });
});
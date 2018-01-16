var inputGrid = new Array;
var learningSet = new Array;

$(document).ready(function () {
    for (var i = 0; i < 2500; i++) {
        $('.gridContainerLeft').append("<div class='gridBox' id='" + i + "'>");
        inputGrid.push(-1);

        $('.gridContainerRight').append("<div class='gridBoxResult' id='" + i + "'>");
    }

    $('.gridBox').hover(function (e) {
        var currId = $(this).attr('id');
        if (e.buttons) {
            if (inputGrid[currId] === -1) {
                inputGrid[currId] = 1;
                $(this).addClass('active');
            }
        }
        return false;
    });

    $('.gridBox').click(function () {
        var currId = $(this).attr('id');
            if (inputGrid[currId] === 1) {
                inputGrid[currId] = -1;
                $(this).removeClass('active');
            }
            else {
                inputGrid[currId] = 1;
                $(this).addClass('active');
            }
    });



    $('.recognizeButton').click(function () {
        odSzum();
    });

    $('.learnButton').click(function () {
        learn();
    });

    $('.addButton').click(function () {
        learningSet.push(inputGrid);
    });

    $('.example').click(function () {
        switch($(this).attr('id')){
            case '1':{
                clear();
                loadExample(examples[0])
                break;
            }
            case '2':{
                clear();
                loadExample(examples[1])
                break;
            }
        }
    })

    $('.clearButton').click(function () {
        clear();
    });

    var clear = () => {
        let inputGridUI = $('.gridBox');
        inputGrid = [];        
        for(let i = 0; i < inputGridUI.length; i++){
            $(inputGridUI[i]).removeClass('active');
            inputGrid.push(-1);
        }
    }

    var loadExample = (example) => {
        inputGrid = [...example];
        let inputGridUI = $('.gridBox');
        for(let i = 0; i < inputGridUI.length; i++){
            if(example[i] === 1){
                if(!$(inputGridUI[i]).hasClass('active')){
                    $(inputGridUI[i]).addClass('active');                                    
                }
            } else {
                $(inputGridUI[i]).removeClass('active');
            }
        }
    }

    $('.coppyButton').click(function () {
        let inputGridUI = $('.gridBox');
        let resultGrid = $('.gridBoxResult');        
        inputGrid = [];        
        for(let i = 0; i < inputGridUI.length; i++){
            if($(resultGrid[i]).hasClass('active')){
                if(!$(inputGridUI[i]).hasClass('active')){
                    $(inputGridUI[i]).addClass('active');                                    
                }
                inputGrid.push(1);
            } else {
                $(inputGridUI[i]).removeClass('active');
                inputGrid.push(0);
            }
        }


    });
});
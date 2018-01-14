var grid = new Array;
var learned = false;
var perceptrons = new Array;
var ctx;

$(document).ready(function(){ 
    for(var i = 0; i < 36; i++){
        $('.gridContainer').append("<div class='gridBox' id='" + i + "'>");
        grid.push(0);
    }

    ctx  = document.getElementById("myChart").getContext('2d');
    

    for(var i = 0; i < 10; i++){
        perceptrons.push(new Perceptron(i));
    }

    $('.gridBox').click(function(){
        var currId = $(this).attr('id');
        if(grid[currId]){
            grid[currId] = 0;
            $(this).removeClass('activeBox');
        }
        else {
            grid[currId] = 1;
            $(this).addClass('activeBox');
        }
    });

    $('.recognizeButton').click(function(){
        if(!learned) {
            $('.resultText').replaceWith("<p class='resultText'>Need to learn!</p>");
        }
        else {
            var results = new Array;
            for(var i = 0; i < 10; i++){
                if(perceptrons[i].check() > 0.25 /*Threashold when propability is enough to acquire number*/){
                    results.push(i);
                }
            }
            if(results.length !== 0){
                var recognizedText = "" + results[0];
                for(var i = 1; i < results.length; i++){
                    recognizedText += ", " + results[i];
                }
                $('.resultText').replaceWith("<p class='resultText'>Recognized " + recognizedText + ".</p>");                                            
            }
            else {
                $('.resultText').replaceWith("<p class='resultText'>Didn't recognize anything.</p>");                            
            }
        }
    });

    $('.learnButton').click(function(){
        $('.resultText').replaceWith("<p class='resultText'>Learning.. .</p>");   
        let maxIndex = 0;             
        for(var i = 0; i < 10; i++){
            perceptrons[i].learn();
            console.log(perceptrons[i].daneWykres)
            if(maxIndex < perceptrons[i].daneWykres.length){
                maxIndex = perceptrons[i].daneWykres.length;
            }
        }
        let labelsArray = new Array;
        for(let i = 0; i < maxIndex; i++){
            labelsArray.push(i*5);
        }
        new Chart(ctx, {
            type: 'line',
            data: {
              labels: labelsArray,
              datasets: [{ 
                  data: perceptrons[0].daneWykres,
                  label: "Zero",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: perceptrons[1].daneWykres,
                  label: "One",
                  borderColor: "#8e5ea2",
                  fill: false
                }, { 
                  data: perceptrons[2].daneWykres,
                  label: "Two",
                  borderColor: "#3cba9f",
                  fill: false
                }, { 
                  data: perceptrons[3].daneWykres,
                  label: "Three",
                  borderColor: "#e8c3b9",
                  fill: false
                }, { 
                  data: perceptrons[4].daneWykres,
                  label: "Four",
                  borderColor: "#c45850",
                  fill: false
                }, { 
                    data: perceptrons[5].daneWykres,
                    label: "Five",
                    borderColor: "#a45850",
                    fill: false
                  }, { 
                    data: perceptrons[6].daneWykres,
                    label: "Six",
                    borderColor: "#b45850",
                    fill: false
                  }, { 
                    data: perceptrons[7].daneWykres,
                    label: "Seven",
                    borderColor: "#d45850",
                    fill: false
                  }, { 
                    data: perceptrons[8].daneWykres,
                    label: "Eight",
                    borderColor: "#123456",
                    fill: false
                  }, { 
                    data: perceptrons[9].daneWykres,
                    label: "Nine",
                    borderColor: "#666666",
                    fill: false
                  }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Errors'
              }
            }
          });
        $('.resultText').replaceWith("<p class='resultText'>Learning complete!</p>");
        learned = true;

    });

    $('.clearButton').click(function(){
        for(var i = 0; i < 36; i++){
            if($('#'+i).hasClass('activeBox')){
                $('#'+i).removeClass('activeBox')
            }
            grid[i] = 0;
        }
    });
 });
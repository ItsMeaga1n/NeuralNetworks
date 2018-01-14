var canvas, ctx, pointsNumber, getNumPoints, draw, clear;

$(document).ready(function () {
    canvas = document.getElementById('canvasBoard');
    ctx = canvas.getContext("2d");

    getNumPoints = function () {
        pointsNumber = Number(document.getElementById('numberPoints').value);;

    }
    clear = function() {
        losujPunkty();
        losujWagi();
        rysujPunkty();
        rysujWagi();
    }
    draw = function() {
        rysujPunkty();
        rysujWagi();
    }

    losujPunkty();
    losujWagi();
    draw();

    $('#randPoints').click(function () {
        clear();
    });
    $('#fill').click(function() {
        rozkladaj(0)
    })


});
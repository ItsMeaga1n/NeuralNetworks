var punkty = new Array;
var wagi = new Array;
var liczbaWag = 81;
var r = 250;
var center = {x: 300, y: 300};
var iterations = 100000;

var losujPunkty = function() {
    getNumPoints();
	punkty = new Array;
	wagi = new Array;
	
	for(var i = 0; i < pointsNumber; i++) {
		//losuje promien od 1 do 200
		
		var randomR = (Math.random() * 2 - 1) * r + 1;
		var randomX = Math.floor( (Math.random() * 2 - 1) * (randomR * 2) + (center.x - randomR));
		var sqrtY = Math.floor(Math.sqrt(randomR * randomR - (randomX - center.x)*(randomX - center.x)));
		var sign = Math.random() * 2 - 1;
		if(sign < 0) sqrtY *= (-1);
		var randomY = sqrtY + center.y;
		
		/*
		var randomX = Math.floor(Math.random() * (r * 2) + (center.x - r));
		var randomY = Math.floor(Math.random() * (r * 2) + (center.y - r));
		*/
		punkty.push({x: randomX, y: randomY}); 
	}
}

var rysujPunkty = function() {

	ctx.beginPath();
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#212121";
	ctx.fill();
	ctx.fillStyle = "red";
	for(var i = 0; i < pointsNumber; i++) {
		ctx.fillRect(punkty[i].x, punkty[i].y, 1, 1);
	}
}

var losujWagi = function() {
	wagi = [];
	var sqrtWagi = Math.floor(Math.sqrt(liczbaWag));
	var przesuniecie = ((sqrtWagi - 1) / 2) * sqrtWagi;
	for(var i = 0; i < liczbaWag; i++) {
		var xCord = i % sqrtWagi;
		var yCord = Math.floor(i / sqrtWagi);
		var xPoint = (center.x - przesuniecie) + xCord * sqrtWagi;
		var yPoint = (center.y - przesuniecie) + yCord * sqrtWagi;
		wagi.push({x: xPoint, y: yPoint});
	}
}

var rysujWagi = function() {
	ctx.strokeStyle = "blue";
	var sqrtWagi = Math.floor(Math.sqrt(liczbaWag));
	for(var i = 0; i < liczbaWag; i++) {
		var yCord = Math.floor(i / sqrtWagi);
		var xCord = i % sqrtWagi;
		var yRightCord = Math.floor((i + 1) / sqrtWagi);
		if(yCord === yRightCord) {
			ctx.beginPath();
			ctx.moveTo(wagi[i].x, wagi[i].y);
			ctx.lineTo(wagi[i+1].x, wagi[i+1].y);
			ctx.stroke();
		}
		if((i + sqrtWagi) < liczbaWag) {
			ctx.beginPath();
			ctx.moveTo(wagi[i].x, wagi[i].y);
			ctx.lineTo(wagi[i+sqrtWagi].x, wagi[i+sqrtWagi].y);
			ctx.stroke();
		}
	}
}

var rozkladaj = function(count) {
	rozkladajCall(0);
}

var rozkladajCall = function(iteration) {
	iteration++;
	
	if(iteration >= iterations) return;
		var t = iteration;
		var index = Math.floor(Math.random() * pointsNumber);
		var currX = punkty[index].x;
		var currY = punkty[index].y;
		var minDisIndex = 0;
		var minDis = 10000;
		for(var wagaIndex = 0; wagaIndex < liczbaWag; wagaIndex++) {
			var xWaga = wagi[wagaIndex].x;
			var yWaga = wagi[wagaIndex].y;
			var len = odleglosc(currX, currY, xWaga, yWaga);
			if(len < minDis) {
				minDisIndex = wagaIndex;
				minDis = len;
			}
		}
		var alf = alfa(t);
		var xWaga = wagi[minDisIndex].x;
		var yWaga = wagi[minDisIndex].y;
		wagi[minDisIndex].x = xWaga + alf * (currX - xWaga);
        wagi[minDisIndex].y = yWaga + alf * (currY - yWaga);
        if(iteration % 50 === 0) {
            draw();
            setTimeout(rozkladajCall, 10, iteration);
        } else {
            rozkladajCall(iteration);
        }
	
}

var odleglosc = function(a, b, c, d) {
	return Math.sqrt((c - a) * (c - a) + (b - d) * (b - d));
}

var alfa = function(t) {
	return 1.0 / Math.sqrt(t);
}
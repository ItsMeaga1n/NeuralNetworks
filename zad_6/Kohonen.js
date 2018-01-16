var punkty = new Array;
var wagi = new Array;
var liczbaWag = 81;
var r = 100;
var iterations = 1000000;
center = {x: 300, y: 300}

var losujPunkty = function() {
    getNumPoints();
	punkty = new Array;
	wagi = new Array;
	
	for(var i = 0; i < pointsNumber; i++) {		
		var sign = Math.random() - 0.5;
		sign = sign > 0 ? 1 : -1
		var randomX = centerPoints.x + (sign * range * Math.random() ); 
		sign = Math.random() - 0.5;
		sign = sign > 0 ? 1 : -1
		var randomY = centerPoints.y + (sign * range * Math.random() );
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


var rozkladaj = function(iteration) {
	iteration++;
	
	if(iteration >= iterations) return;
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
		let alf = alfa(iteration);
		przeliczWagi(minDisIndex, alf, currX, currY);
		
        if(iteration % 500 === 0) {
            draw();
            setTimeout(rozkladaj, 1, iteration);
        } else {
            rozkladaj(iteration);
        }
	
}

var przeliczWagi = function(waga, alfa, currX, currY){
	przeliczWage(waga, alfa, currX, currY);
	if(waga - 1 > 0){
		przeliczWage(waga-1, alfa, currX, currY);
	}
	if(waga + 1 < 81){
		przeliczWage(waga+1, alfa, currX, currY);

	}
	if(waga - 9 > 0){
		przeliczWage(waga - 9, alfa, currX, currY);
	}
	if(waga + 9 < 81){
		przeliczWage(waga + 9, alfa, currX, currY);
	}
}
var przeliczWage = function(waga, alfa, currX, currY){
	let xWaga = wagi[waga].x;
	let yWaga = wagi[waga].y;
	wagi[waga].x = xWaga + alfa * (currX - xWaga);
	wagi[waga].y = yWaga + alfa * (currY - yWaga);
}

var odleglosc = function(a, b, c, d) {
	return Math.sqrt((c - a) * (c - a) + (b - d) * (b - d));
}

var alfa = function(t) {
	return 1.0 / Math.sqrt(t);
}
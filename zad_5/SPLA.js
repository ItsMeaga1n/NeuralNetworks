

var weights = [];

let clearWeights = function () {
	weights = [];
	for (var i = 0; i < 2500; i++) {
		weights.push([]);
		for (var j = 0; j < 2500; j++) {
			weights[i].push(0.0);
		}
	}
};
clearWeights();

var learn = function () {
	var P = learningSet.length;
	for (var i = 0; i < 2500; i++) {
		for (var j = 0; j < 2500; j++) {
			if (j > i) {
				var wagaValue = 0.0;
				k = P - 1;
				wagaValue += (learningSet[k][i] * learningSet[k][j]);
				wagaValue /= 2500.0;
				weights[i][j] += wagaValue;
			} else if (j === i) {
				weights[i][j] = 0.0;
			} else {
				weights[i][j] = weights[j][i];
			}
		}
	}
}

var odSzum = function () {
	glauber(0, 0);
}

var sign = function (value) {
	return value > 0.0 ? 1.0 : -1.0;
}

var glauber = function (iteration, noChange) {
	if (iteration < 25000 || noChange < 30) {
		var index = Math.floor(Math.random() * 2500 + 0);
		var xOld = inputGrid[index];
		var sum = 0.0;
		for (var j = 0; j < 2500; j++) {
			if (j === index) continue;
			sum += (weights[index][j] * inputGrid[j]);
		}
		inputGrid[index] = sign(sum);
		if (inputGrid[index] !== xOld) {
			let inputGridUI = $('.gridBox');
			if(inputGrid[index] === 1.0) {
				if(!$(inputGridUI[index]).hasClass('active')){
                    $(inputGridUI[index]).addClass('active');
                }
			} else {
                $(inputGridUI[index]).removeClass('active');
			}
		} else {
			noChange++;
		}
		setTimeout(function () { glauber(++iteration, noChange); }, 0);
	}
}

var czyscZbiorUczenia = function () {
	learningSet = [];
	clearWeights();
}

		var przyciski = [];
		var buttony = [];
		var daneDoUczenia = [];
		var wagi = [];
		for(var i = 0; i < 50; i++) {
			buttony.push({row: []});
			for(var j = 0; j < 50; j++) {
				przyciski.push(-1.0);
				buttony[i].row.push({idx: (i * 50 + j)});
			}
		}
		var zerujWagi = function() {
			wagi = [];
			for(var i = 0; i < 2500; i++) {
				wagi.push([]);
				for(var j = 0; j < 2500; j++) {
					wagi[i].push(0.0);
				}
			}
		};
		zerujWagi();
		
		var zaznaczPrzyciski = function(idx) {
			var wybrany = document.getElementById("button" + idx);
			if(przyciski[idx] === -1.0) {
				przyciski[idx] = 1.0;
				wybrany.style = "background-color: red";
			}
			else {
				przyciski[idx] = -1.0;
				wybrany.style = "background-color: white";
			}
		}
		
		var czysc = function() {
			for(var i = 0; i < przyciski.length; i++) {
				przyciski[i] = -1.0;
				var wybrany = document.getElementById("button" + i);
				wybrany.style = "background-color: white";
			}
		}
		
		var wczytajHellboya = function(hellboyPixels) {
			for(var i = 0; i < 50; i++) {
				for(var j = 0; j < 50; j++) {
						if(hellboyPixels[i*50+j] === -1.0) {
							przyciski[i*50+j] = -1.0;
							var wybrany = document.getElementById("button" + (i*50+j));
							wybrany.style = "background-color: white";
						}
						else {
							przyciski[i*50+j] = 1.0;
							var wybrany = document.getElementById("button" + (i*50+j));
							wybrany.style = "background-color: red";
						}
				}
			}
		}
		
		var wczytajBPRD = function(BPRDPixels) {
			for(var i = 0; i < 50; i++) {
				for(var j = 0; j < 50; j++) {
						if(BPRDPixels[i*50+j] === -1.0) {
							przyciski[i*50+j] = -1.0;
							var wybrany = document.getElementById("button" + (i*50+j));
							wybrany.style = "background-color: white";
						}
						else {
							przyciski[i*50+j] = 1.0;
							var wybrany = document.getElementById("button" + (i*50+j));
							wybrany.style = "background-color: red";
						}
				}
			}
		}
		
		var wczytajDeadpoola = function(deadpoolPixels) {
			for(var i = 0; i < 50; i++) {
				for(var j = 0; j < 50; j++) {
						if(deadpoolPixels[i*50+j] === -1.0) {
							przyciski[i*50+j] = -1.0;
							var wybrany = document.getElementById("button" + (i*50+j));
							wybrany.style = "background-color: white";
						}
						else {
							przyciski[i*50+j] = 1.0;
							var wybrany = document.getElementById("button" + (i*50+j));
							wybrany.style = "background-color: red";
						}
				}
			}
		}
		
		var wczytajSpidera = function(spiderManPixels) {
			for(var i = 0; i < 50; i++) {
				for(var j = 0; j < 50; j++) {
						if(spiderManPixels[i*50+j] === -1.0) {
							przyciski[i*50+j] = -1.0;
							var wybrany = document.getElementById("button" + (i*50+j));
							wybrany.style = "background-color: white";
						}
						else {
							przyciski[i*50+j] = 1.0;
							var wybrany = document.getElementById("button" + (i*50+j));
							wybrany.style = "background-color: red";
						}
				}
			}
		}
		
		var zaszum = function() {
			for(var i = 0; i < 100; i++) {
				var idx = Math.floor((Math.random() * 2500) + 0);
				var color = przyciski[idx];
				var button = document.getElementById("button" + idx);
				przyciski[idx] = color === 1.0 ? button.style = "background-color: white" : button.style = "background-color: red";
				przyciski[idx] = color === 1.0 ? -1.0 : 1.0;
			}
		}
		
		var dodajDoZbioruUczenia = function() {
			var nowyArray = [];
			for(var i = 0; i < 2500; i++) {
				nowyArray.push(przyciski[i]);
			}
			daneDoUczenia.push(nowyArray);
			uczSie();
		}
		
		
		
		
		var uczSie = function() {
			var P = daneDoUczenia.length;
			for(var i = 0; i < 2500; i++) {
				for(var j = 0; j < 2500; j++) {
					if(j > i) {
						var wagaValue = 0.0;
						k = P - 1;
						wagaValue += (daneDoUczenia[k][i] * daneDoUczenia[k][j]);
						wagaValue /= 2500.0;
						wagi[i][j] += wagaValue;
					} else if(j === i) {
						wagi[i][j] = 0.0;
					} else {
						wagi[i][j] = wagi[j][i];
					}
				}
			}
		}
		
		var odSzum = function() {
			glauber(0, 0);
		}
		
		var sign = function(value) {
			return value > 0.0 ? 1.0 : -1.0;
		}
		
		var glauber = function(iteration, noChange) {
			if(iteration < 2500 || noChange < 25) {
				var index = Math.floor(Math.random() * 2500 + 0);
				var xOld = przyciski[index];
				var sum = 0.0;
				for(var j = 0; j < 2500; j++) {
					if(j === index) continue;
					sum += (wagi[index][j] * przyciski[j]);
				}
				przyciski[index] = sign(sum);
				if(przyciski[index] !== xOld) {
					var button = document.getElementById("button" + index);
					przyciski[index] === 1.0 ? button.style = "background-color: red" : button.style = "background-color: white";
				} else {
					noChange++;
				}
				setTimeout(function() { glauber(++iteration, noChange); }, 0.1);
			}
		}
		
		var czyscZbiorUczenia = function() {
			daneDoUczenia = [];
			zerujWagi();
		}
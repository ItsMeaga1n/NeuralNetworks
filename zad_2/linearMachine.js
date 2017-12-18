class LinearMachine {
    constructor() {
        this.neuronForBlack = new Neuron();
        this.neuronForWhite = new Neuron();
    }

    getValue(data) {
        return this.neuronForBlack.output(data) > this.neuronForWhite.output(data) ? 1 : 0;
    }

    learn(x/*example*/, y, life) {
        let isBlack = this.getValue(x);
        if(isBlack != y) {
			if(y === 1 ) {
				for(var i = 1; i < this.size; i++) {
					this.neuronForBlack.weights[i] += x[i-1];
					this.neuronForWhite.weights[i] -= x[i-1];
				}
				this.neuronForBlack.weights[0] += 1;
				this.neuronForWhite.weights[0] -= 1;
			} else {
				for(var i = 1; i < this.size; i++) {
					this.neuronForBlack.weights[i] -= x[i-1];
					this.neuronForWhite.weights[i] += x[i-1];
				}
				this.neuronForBlack.weights[0] -= 1;
				this.neuronForWhite.weights[0] += 1;
			}
		} else {
			life++;
		}
		return life;
    }

    learnMachine(x, index, life) {
        let idx = Math.floor(Math.random() * x.length);
        let currX = x[idx];
        return this.learn(this.noiseExample(currX), currX[index], life)
    }

    noiseExample(x) {
        let tab = [...x];
        for (var i = 0; i < 10; i++) {
            var idx = Math.floor(Math.random() * 2500);
            tab[idx] = tab[idx] === 1 ? 0 : 1;
        }
        return tab;
    }
}
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
        let shouldBeWhite = (y === 0) ? true : false;
        if (isBlack != y) {
            if (isBlack && shouldBeWhite) {
                for (var i = 1; i < this.neuronForBlack.SIZE; i++) {
                    this.neuronForWhite.weights[i] -= x[i];
                    this.neuronForBlack.weights[i] += x[i];
                }
                this.neuronForBlack.weights[0] -= 1;
                this.neuronForWhite.weights[0] += 1;
            } else if (!isBlack && !shouldBeWhite) {
                for (var i = 1; i < this.neuronForBlack.SIZE; i++) {
                    this.neuronForWhite.weights[i] -= x[i];
                    this.neuronForBlack.weights[i] += x[i];
                }
                this.neuronForBlack.weights[0] -= 1;
                this.neuronForWhite.weights[0] += 1;
            }
        }
        else {
            life++
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
        for (var i = 0; i < 25; i++) {
            var idx = Math.floor(Math.random() * 2500);
            tab[idx] = tab[idx] === 1.0 ? 0.0 : 1.0;
        }
        return tab;
    }
}
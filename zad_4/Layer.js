class Layer {
    constructor(newNeuronCount, newPrevLayer, newPrevLayerCount, newWeights /*numberOfInputs*/) {
        this.neuronCount = newNeuronCount;
        this.learningRate = 0.2;
        if(newPrevLayer){
            this.prevLayer = newPrevLayer;
            this.initRandomWeights(this.neuronCount, this.prevLayer.neuronCount);
        }
        else if(newPrevLayerCount){
            this.initRandomWeights(this.neuronCount, this.newPrevLayerCount);
        } else if(newWeights){
            this.weights = newWeights;
        }
        //this.neurons = new Array;
        // for(let i = 0; i < neuronsCount; i++){
        //     this.neurons.push(new Neuron(numberOfInputs));
        // }

    }

    initRandomWeights(neuronCount, prevNeuronCount) {
        this.weights = new Array;
        for (let i = 0; i < prevNeuronCount; i++) {
            this.weights.push(new Array);
            for (let j = 0; j < neuronCount; j++) {
                this.weights[i].push(2 * Math.random() - 1);
            }
        }
    }

    calcForward(input) {
        this.sums = new Array(this.neuronCount);
        this.values = new Array(this.neuronCount);

        this.sums.fill(0);
        this.values.fill(0);

        for (let i = 0; i < this.neuronCount; i++) {
            for (let j = 0; j < this.prevLayer.neuronCount; j++) {
                this.sums[i] += this.weights[j][i] * this.prevLayer.values[j];
            }
            this.values[i] = this.sigmoid(this.sum[i])
        }

        if (this.next) {
            thix.next.calcForward(this.values);
        }
    }

    sigmoidD(d) {
        let sig = this.sigmoidD(d);
        return sig * (1 - sig);
    }

    sigmoid(d) {
        return 1.0 / (1.0 + Math.exp(1.0 - d));
    }
    CalcBackwardOutput(errors) {
        let delta = new Array(this.neuronCount);
        for (let i = 0; i < this.neuronCount; i++) {
            delta[i] = errors[i] * SigmoidD(this.sums[i]);
        }
        if (this.prevLayer == null) {
            return;
        };

        for (let i = 0; i < this.neuronCount; i++) {
            for (let j = 0; j < this.prevLayer.neuronCount; j++) {
                this.weights[j][i] += this.learnRate * this.prevLayer.values[j] * delta[i];
            }
        }

        this.prevLayer.CalcBackward(delta);
    }

    CalcBackward(deltaIn) {
        if (this.prev == null) {
            return;
        }
        let deltaOut = new Array(this.neuronCount);
        let errors = new Array(this.neuronCount);

        for (let j = 0; j < this.neuronCount; j++) {
            for (let l = 0; l < this.next.neuronCount; l++) {
                errors[j] += this.next.weights[j][l] * deltaIn[l];
            }

            deltaOut[j] = SigmoidD(this.sums[j]) * errors[j];
        }

        for (let j = 0; j < this.neuronCount; j++) {
            for (let k = 0; k < this.prevLayer.neuronCount; k++) {
                this.weights[k][j] += this.learnRate * this.prevLayer.values[k] * deltaOut[j];
            }
        }

        this.prevLayer.CalcBackward(deltaOut);
    }

    CloneWeights(){
        let tmpWeights = new Array;

        for(let i = 0; i < this.weights.length; i++){
            tmpWeights[i] = [...this.weights[i]];
        }
        return tmpWeights;
    }

    Clone(){
        return new Layer(this.neuronCount, null, null, CloneWeights())
    }
}
class Layer {
    constructor(newNeuronCount, newPrevLayer, newPrevLayerCount, newWeights /*numberOfInputs*/) {
        this.neuronCount = newNeuronCount;
        this.learningRate = 0.2;
        if(newPrevLayer){
            this.setPrev(newPrevLayer);
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

    setNext(value){
        value.prevLayer = this;
        this.nextLayer = value;
    }

    setPrev(value){
        this.prevLayer = value;
        value.nextLayer = this;
    }

    initRandomWeights(neuronCount, prevNeuronCount) {
        this.weights = new Array;
        for (let i = 0; i < prevNeuronCount; i++) {
            this.weights.push(new Array(neuronCount));
            for (let j = 0; j < neuronCount; j++) {
                this.weights[i][j] = 2 * Math.random() - 1;
            }
        }
    }

    CalcForward(input) {
        this.sums = new Array(this.neuronCount);
        this.values = new Array(this.neuronCount);
        this.sums.fill(0);
        this.values.fill(0);
        for (let i = 0; i < this.neuronCount; i++) {
            for (let j = 0; j < this.prevLayer.neuronCount; j++) {
                
                this.sums[i] += this.weights[j][i] * this.prevLayer.values[j];
            }
            this.values[i] = this.sigmoid(this.sums[i])
        }

        if (this.nextLayer) {
            this.nextLayer.CalcForward(this.values);
        }
    }

    sigmoidD(d) {
        let sig = this.sigmoid(d);
        return sig * (1 - sig);
    }

    sigmoid(d) {
        return 1.0 / (1.0 + Math.exp(1.0 - d));
    }
    CalcBackwardOutput(errors) {
        let delta = new Array(this.neuronCount);
        for (let i = 0; i < this.neuronCount; i++) {
            delta[i] = errors[i] * this.sigmoidD(this.sums[i]);
        }

        for (let i = 0; i < this.neuronCount; i++) {
            for (let j = 0; j < this.prevLayer.neuronCount; j++) {
                this.weights[j][i] += this.learningRate * this.prevLayer.values[j] * delta[i];
            }
        }

        if (this.prevLayer == null) {
            return;
        };
        this.prevLayer.CalcBackward(delta);
    }

    CalcBackward(deltaIn) {
        if (this.prevLayer == null) {
            return;
        }
        let deltaOut = new Array(this.neuronCount);
        let errors = new Array(this.neuronCount);

        errors.fill(0);

        for (let j = 0; j < this.neuronCount; j++) {
            for (let l = 0; l < this.nextLayer.neuronCount; l++) {
                errors[j] += this.nextLayer.weights[j][l] * deltaIn[l];
            }

            deltaOut[j] = this.sigmoidD(this.sums[j]) * errors[j];
        }


        for (let j = 0; j < this.neuronCount; j++) {
            for (let k = 0; k < this.prevLayer.neuronCount; k++) {
                this.weights[k][j] += this.learningRate * this.prevLayer.values[k] * deltaOut[j];
            }
        }

        this.prevLayer.CalcBackward(deltaOut);
    }

    CloneWeights(){
        let tmpWeights = new Array;

        for(let i = 0; i < this.weights.length; i++){
            tmpWeights.push([...this.weights[i]]);
        }
        return tmpWeights;
    }

    Clone(){
        return new Layer(this.neuronCount, null, null, CloneWeights())
    }
}
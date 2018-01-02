class Neuron{
    constructor(size){
        this.weights = new Array;
        for(let i = 0; i < size; i++){
            this.weights.push(2 * Math.random() - 1)
        }
    }
    output(x){
        let weightedsum = 0;
        for(let i = 0; i < this.weights.length; i++){
            weightedsum += this.weights[i] * x[i];

            return 1.0/(1 + Math.exp(-weightedsum));
        }
    }

    derivative(x){
        return this.output(x) * (1 - this.output(x));
    }
}
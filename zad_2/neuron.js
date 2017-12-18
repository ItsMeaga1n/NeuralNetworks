class Neuron {
    constructor(){
        this.weights = new Array;
        this.SIZE = 2501;

        for(var i = 0; i < this.SIZE; i++){
            this.weights.push(Math.random()/100);
        }
    }

    output(data){
        let weightedsum = 0;
        for(var i = 1; i < this.SIZE; i++){
            weightedsum += this.weights[i] * data[i-1];
        }
        weightedsum += this.weights[0];
		return weightedsum;
    }
}
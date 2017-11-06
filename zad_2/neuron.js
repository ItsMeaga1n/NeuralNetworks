class Neuron {
    constructor(){
        this.weights = new Array;
        this.SIZE = 100;

        randomWeights(this.weights);
    }

    output(data){
        weightedsum = 0;
        for(var i = 0; i < this.SIZE; i++){
            
        }
    }
}

var randomWeights = function(array){

    for(var i = 0; i < array.length; i++){
        array.push(Math.random()/100);
    }
    return weights;
}
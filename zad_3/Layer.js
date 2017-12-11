class Layer{
    constructor(numbersofperceptrons, numberOfInputs){
        this.neurons = new Array;
        for(let i = 0; i < numbersofperceptrons; i++){
            this.neurons.push(new Neuron(numberOfInputs));
        }
    }

}
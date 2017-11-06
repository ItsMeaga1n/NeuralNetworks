class LinearMachine {
    constructor(){
        this.neuronForBlack = new Neuron();
        this.neuronForWhite = new Neuron();
    }

    getValue(data){
        return this.neuronForBlack.output(data) > this.neuronForWhite.output(data) ? 1 : 0;
    }

    learn(x/*example*/, y){
        var isBlack = this.neuronForBlack.output(x) > this.neuronForWhite.output(x);
        var shouldBeWhite = (y === 0) ? true : false;
        if(isBlack && shouldBeWhite){
            for(var i = 0; i < this.neuronForBlack.SIZE; i++){
                neuronForWhite.weights[i] += x[i];
                neuronForBlack.weights[i] -= x[i];
            }
        } else if(!isBlack && !shouldBeWhite) {
            for(var i = 0; i < this.neuronForBlack.SIZE; i++){
                neuronForWhite.weights[i] -= x[i];
                neuronForBlack.weights[i] += x[i];
            }
        }
    }
}
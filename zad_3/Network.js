class Network{
    constructor(){
        this.layers = new Array;
        this.numberOfPerceptronsPerLayer = [2,28,28,2];

        for(let i = 1; i < numberOfPerceptronsPerLayer.length; i++){
            this.layers[i-1] = new Layer(this.numberOfPerceptronsPerLayer[i], this.numberOfPerceptronsPerLayer[i-1]);
        }
    }


    updateWeights(){
        
    }

    updateDeltas(){
        
    }
}
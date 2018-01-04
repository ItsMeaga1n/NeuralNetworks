class Network {
    constructor(newInputLength, newOutputLength) {
        // this.layers = new Array;
        // this.numberOfPerceptronsPerLayer = [2,28,28,2];

        // for(let i = 1; i < numberOfPerceptronsPerLayer.length; i++){
        //     this.layers[i-1] = new Layer(this.numberOfPerceptronsPerLayer[i], this.numberOfPerceptronsPerLayer[i-1]);
        // }
        this.inputLength = newInputLength;
        this.outputLength = newOutputLength;
        this.InitLayers()
    }

    InitLayers() {
        this.inLayer = new Layer(this.inputLength, null, this.inputLength);
        let hidden = new Layer(5, this.inLayer);
        let hidden1 = new Layer(8, hidden);
        let hidden2 = new Layer(5, hidden1);
        this.outLayer = new Layer(this.outputLength, hidden2);
    }

    Learn(input, output) {
        this.inLayer.values = input;
        this.inLayer.nextLayer.CalcForward(input);

        let errors = new Array(output.length);
        for (let i = 0; i < output.length; i++) {
            errors[i] = output[i] - this.outLayer.values[i];
        }

        this.outLayer.CalcBackwardOutput(errors);
        console.log(this.outLayer)

        return {
            Errors: errors,
            Input: input,
            Output: output,
            Values: this.outLayer.values,
            Weights: this.GetWeights()
        };
    }

    Eval(input)
    {
        this.inLayer.values = input;
        this.inLayer.next.CalcForward(input);

        return [...this.outLayer.values];
    }

    GetWeights(){
        let tmpWeights = new Array;
        let tmpLayer = this.inLayer.next;
        while(tmpLayer){
            tmpWeights.push(tmpLayer.CloneWeights());
            tmpLayer = tmpLayer.next;
        }
        return tmpWeights;
    }

    Clone(){
        let result = new NeuralNetwork(this.inputLength, this.outputLength);
        result.inLayer = this.inLayer.Clone();
        result.outLayer = this.outLayer.Clone();

        let clonePrevLayer = this.inLayer;
        let layer = this.inLayer.Next;

        while (layer !== null)
        {
            let cloneLayer = layer.Clone();
            cloneLayer.Prev = clonePrevLayer;

            clonePrevLayer = cloneLayer;
            layer = layer.Next;
        }

        this.outLayer.Prev = clonePrevLayer;
        return result;
    }
}
class Perceptron {
    constructor(number) {
      this.number = number;
      this.weights = randomWeights();
      this.learningRate = 0.12;
      this.threshold  = 0;
      this.bestLifeTime = 0;
      this.bestClassification = 0;
      this.lifeTime = 0;
      this.pocket = null;
    }

    adjustWeights(){
        
    }

    learn(){
         var examples = [0,1,2,3,4,5,6,7,8,9];
         shuffle(examples);
        // var stopCondition = 0;
        // while(stopCondition < 100000){
        //     for(var i = 0; i < 10; i++){
        //         var example = numbers[examples[i]];
        //         var expected = examples[i] === this.number ? 1 : -1;
        //         var result = this.count(example);
        //         if(result !== expected){
        //             this.adjustWeights(expected, example);
        //         }
        //         else {
        //             this.updatePocket();
        //         }
        //     }
        //     ++stopCondition
        // }
        // if(this.lifeTime !== this.bestLifeTime){
        //     this.weights = this.pocket.slice(0);
        // }
        let rand = Math.random()
        var examples = [0,1,2,3,4,5,6,7,8,9];
        for(let i = 5; i < 1000; i++){
            shuffle(examples);
           let nrPrzykladu = examples[i%10];
           let przyklad = numbers[nrPrzykladu];
           let fft = [...przyklad];

           let wynik = 0;
           if(nrPrzykladu === this.number){
               wynik = 1;
           }
           let imag = new Array(36+1).join('0').split('').map(parseFloat);
           transform(fft, imag)
           let fftPrzyklad = new Array;
           for(let i = 0; i < 36; i++){
                fftPrzyklad.push(Math.pow(Math.pow(fft[i],2) + Math.pow(imag[i], 2),0.5));
           }
           przyklad = [...przyklad, ...fftPrzyklad];
           let suma = this.count(przyklad);
           for(let j = 0; j < przyklad.length; j++){
               this.weights[j+1] = this.weights[j+1] + this.learningRate * (wynik - suma);
           }
           this.weights[0] = this.weights[0] + this.learningRate * (wynik - suma);
           if(i % 5 === 0){
               let err = 0;
               let spodziewanyWynik;
               for(let j = 0; j < 10; j++){
                   if(this.number === j) {
                       spodziewanyWynik = 1;
                   }
                   else {
                    spodziewanyWynik = 0;
                   }
                   let otrzymanyWynik = this.count(numbers[j]);
                   err += (otrzymanyWynik - spodziewanyWynik) * (otrzymanyWynik - spodziewanyWynik);
               }
               if(err < 0.0001){
                   break;
               }
           }
        }
    }

    updatePocket(){
        this.lifeTime++;
        var currentClassifications = this.countClassifications();
        if(this.lifeTime > this.bestLifeTime && currentClassifications > this.bestClassification){
            this.pocket = this.weights.slice(0);
            this.bestLifeTime = this.lifeTime;
            this.bestClassification = currentClassifications;
        }
    }

    countClassifications(){
        var correctClasifications = 0;
        for(var i = 0; i < 10; i++){
            var expected = i === this.number ? 1 : -1;
            if(this.count(numbers[i]) === expected){
                correctClasifications++;
            }
        }
        return correctClasifications;
    }

    adjustWeights(err, example){
        for(var i = 0; i < 25; i++){
            this.weights[i+1] +=  err * example[i];
        }
        this.weights[0] += err;
        this.lifeTime = 0;
    }

    count(x){
        var sum = 0;
        for(var i = 0; i < 72; i++){
            sum += this.weights[i+1] * x[i];
        }
        sum += this.weights[0];
        console.log('liczba: '+this.number, 1/(1 + Math.exp(-sum)));
        
        return 1/(1 + Math.exp(-sum));
    }

    signum(val){
        if(val < 0){
            return -1;
        }
        else {
            return 1;
        }

    }

    check(){
        let imag = new Array(36+1).join('0').split('').map(parseFloat);
        let tempGrid = [...grid];
        transform(tempGrid, imag)
        let fftPrzyklad = new Array;
        for(let i = 0; i < 36; i++){
             fftPrzyklad.push(Math.pow(Math.pow(tempGrid[i],2) + Math.pow(imag[i], 2),0.5));
        }
        return this.count(fftPrzyklad);
    }
}

var randomWeights = function(){
    var weights = new Array;
    for(var i = 0; i < 73; i++){
        weights.push(Math.random()/100);
    }
    return weights;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}
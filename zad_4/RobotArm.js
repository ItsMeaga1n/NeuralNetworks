class RobotArm {
    constructor() {
        this.inputLength = 2;
        this.outputLength = 2;
        this.armLength = 180;
        this.learningRate = 0.2;
        this.attachPoint = new Point(100, 200);

        this.normalizationProvider = new RobotArmNormalizationProvider(this.inputLength, this.outputLength);
        this.network = new Network(this.inputLength, this.outputLength);
        this.CacheArmAngles();
    }

    CacheArmAngles() {
        this.armAnglesCache = new Array;

        for (let i = 0; i < 180; i++) {
            for (let j = 0; j < 180; j++) {
                let angles = [i, j];
                let point = this.GetArmPoints(angles)[1];
                let destPoint = new Point(Math.round(point.X), Math.round(point.Y));
                if (!this.ContainsKey(this.armAnglesCache, destPoint))
                    this.armAnglesCache.push({ destPoint, angles });
            }
        }
    }

    ContainsKey(array, key){
        let contains = false;
        for(let i = 0; i < array.length; i++){
            if(array[i] && array[i].destPoint.x === key.x && array[i].destPoint.y === key.y){
                contains = true;
            }
        }
        return contains;
    }

    RotatePoint(point, angle) {
        let s = this.SinDegree(angle);
        let c = this.CosDegree(angle);

        // rotate point
        let xnew = point.x * c - point.y * s;
        let ynew = point.x * s + point.y * c;

        return new Point(xnew, ynew);
    }

    GetArmPoints(angles) {


            let sinX = this.SinDegree(angles[0]);
            let cosX = this.CosDegree(angles[0]);

            let sinY = this.SinDegree(angles[1]);
            let cosY = this.CosDegree(angles[1]);

            let armPoints = new Array(2);
            armPoints[0] = new Point((sinX * this.armLength),
                (-cosX * this.armLength));

            armPoints[1] = new Point((-sinY * this.armLength),
                (-cosY * this.armLength));

            armPoints[1] = this.RotatePoint(armPoints[1], angles[0]);

            armPoints[1].x += armPoints[0].x;
            armPoints[1].y += armPoints[0].y;

            return armPoints;
    }

    SinDegree(degree) {
        return Math.sin(degree * Math.PI / 180);
    }

    CosDegree(degree) {
        return Math.cos(degree * Math.PI / 180);
    }

    RandAngles() {
        return [Math.random() * 180, Math.random() * 180];
    }


    StartLearning(iterations, nnValuesCount = 100) {
        let step = 1;
        if (iterations > nnValuesCount) {
            step = iterations / nnValuesCount;
        }

        this.nnParameters = new Array;


        for (let i = 0; i < iterations; i++) {
            let randAngles = this.RandAngles();
            let armPoints = this.GetArmPoints(randAngles);
            let input = this.normalizationProvider.NormalizeInput([armPoints[1].x, armPoints[1].y]);
            let output = this.normalizationProvider.NormalizeOutput(randAngles);

            let learnResult = this.network.Learn(input, output);

            if (i % step == 0)
                this.nnParameters.push(learnResult);
        }

        return this.nnParameters;
    }

    Eval(point) {
        let input = this.normalizationProvider.NormalizeInput([point.x, point.y]);
        let nnResult = this.network.Eval(input);

        let output = this.normalizationProvider.UnnormalizeOutput(nnResult);

        return output;
    }
}
class RobotArm {
    constructor(){
        this.inputLength = 2;
        this.outputLength = 2;
        this.armLength = 80;
        this.learningRate = 0.2;
        this.attachPoint = new Point(100,200);

        this.network = new Network(this.inputLength, this.outputLength);
        this.CacheArmAngles();
    }

    CacheArmAngles(){
        this.armLAnglesCache = new Array;
        
    }
}
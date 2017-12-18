class Examples{
    constructor(){
        this.numberOfExamples = 10000;
        this.hand = 10;
        this.center = new Point(0,0)
        for(let i = 0; i < this.numberOfExamples; i++){
            let alpha = Math.random() * 180;
            let beta = Math.random() * 180;
            tempoint = this.Move(this.center, alpha);
            examplepoint = this.Move(tempoint, alpha + beta - 180);
        }
    }

    Move(centerPoint, angle){
        let x = centerPoint.x + this.hand * sin(180 - angle);
        let y = centerPoint.y + this.hand * cos(180 - angle);        
        point = new Point(x, y);
        return point;
    }
}
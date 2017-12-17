class Network {
	constructor() {
        this.linearMachines = new Array;
        this.life = 0;
	}
	
	learn(learnSet) {
		let linearMachines = [];
		
		for(let i = 0; i < 2500; i++) {
			linearMachines.push(new LinearMachine());
		}
		for(let i = 0; i < 10; i++) {
			console.log(learnSet, i)
			var life = 0;
			for(let j = 0; j < 2500; j++) {
				life = linearMachines[j].learnMachine(learnSet, j, life);
			}
			if(life > this.life) {
				console.log('life!')
				this.life = life;
				this.linearMachines = [];
				for(var j = 0; j < 2500; j++) {
					this.linearMachines.push(linearMachines[j]);
				}
			}
		}
	}
		
	perceive(grid) {
		var result = [];
		for(var i = 0; i < 2500; i++) {
			result.push(this.linearMachines[i].getValue(grid));
		}	
		return result;
	}
}

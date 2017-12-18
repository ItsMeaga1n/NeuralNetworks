class Network {
	constructor() {
        this.linearMachines = new Array;
        this.life = 0;
	}
	
	learn(learnSet) {
		let linearMachines = new Array;
		
		for(let i = 0; i < 2500; i++) {
			linearMachines.push(new LinearMachine());
		}
		for(let i = 0; i < 300; i++) {
			console.log(learnSet, i)
			var life = 0;
			for(let j = 0; j < 2500; j++) {
				life = linearMachines[j].learnMachine(learnSet, j, life);
			}
			if(life > this.life) {
				this.life = life;
				this.linearMachines = [...linearMachines];
			}
		}
	}
		
	perceive(grid) {
		let result = new Array;
		for(let i = 0; i < 2500; i++) {
			result.push(this.linearMachines[i].getValue(grid));
		}	
		return result;
	}
}

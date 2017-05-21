import { Heuristic } from "./Heuristic";

export class ManhattenHeuristic extends Heuristic {
	constructor() {
		super();
	}
	
	getHeuristic(
		x1:number, y1:number, z1:number,
		x2:number, y2:number, z2:number) : number {
		return Math.sqrt(
			Math.pow(x2-x1, 2) + 
			Math.pow(y2-y1, 2) +
			Math.pow(z2 - z1, 2)
		);
	}
}
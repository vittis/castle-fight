export abstract class Heuristic {
	constructor() {}
	abstract getHeuristic(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) : number;
}
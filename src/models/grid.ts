type Boxes = Array<String>;

interface GridInterface {
	name: String,
	boxes: Boxes,
}

export class Grid {
	constructor(private grid: GridInterface) {}

	getBoxes() : Boxes {
		return this.grid.boxes;
	}

	getName() : String {
		return this.grid.name;
	}
}
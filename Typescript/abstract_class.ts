// abstract class Shape {
// 	abstract draw() { // Method 'draw' cannot have an implementation because it is marked abstract

// 	}
// }

abstract class Shape {
	abstract draw() : void;
	calculateArea() {
	}
}

// const shape = new Shape(); // Cannot create an instance of an abstract class

// class Circle extends Shape{ // Non-abstract class 'Circle' does not implement inherited abstract member 'draw' from class 'Shape'
// 	constructor() { // Constructors for derived classes must contain a 'super' call

// 	}
// }

class Circle extends Shape{ 
	constructor() { 
		super()
	}
	draw(): void {
		// draw a circle
	}
}
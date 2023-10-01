// To run this file `ts-node OOPS/playground.ts`

/* Function overriding */
class Animal {
speak(): void {
    console.log("Animal makes a sound");
	}
}
  
class Dog extends Animal {
	speak(): void {
		console.log("Dog barks");
	}
}
  
const myAnimal: Animal = new Dog();
myAnimal.speak(); // Outputs: "Dog barks" even if type of myAnimal was Animal

/* Function overloading in ts */
// class Calculator {
// 	add(x: number, y: number): number {
// 			return x + y;
// 	}

// 	add(x: string, y: string): string {
// 			return x + y;
// 	}
// }

// const calc = new Calculator();
// console.log(calc.add(5,10)); // TSError: ⨯ Unable to compile TypeScript OOPS/playground.ts:21:2 - error TS2393: Duplicate function implementation.

class Calculator {
  add(x: number, y: number): number;
  add(x: string, y: string): string;
  
  add(x: number | string, y: number | string): number | string {
    if (typeof x === 'number' && typeof y === 'number') {
      return x + y;
    } else if (typeof x === 'string' && typeof y === 'string') {
      return x + y;
    } else {
      throw new Error('Invalid argument types');
    }
  }
}

const calc = new Calculator();
console.log(calc.add(5, 10)); // 15
console.log(calc.add("Hello, ", "World!")); // "Hello, World!"



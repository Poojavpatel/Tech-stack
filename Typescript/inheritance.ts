//// implements
interface IHuman {
	breath() : void;
	name : string;
}

interface IAthelete {
	run(): void;
}

class Student implements IHuman, IAthelete { // Property 'run' is missing in type 'Student' but required in type 'IAthelete'
	name: string;
	breath(): void {
		console.log('Student Breathing')
	}
	run(): void {
		console.log('Student running')
	}
}

const pooja = new Student();
pooja.breath();
pooja.run();
console.log(pooja.name);

//// extends
class Human {
	breath () {
		console.log('Human Breathing')
	}
	walk () {
		console.log('Human walking')
	}
}

class Student2 extends Human{
	learn () {
		console.log('Student2 learning');
	}
	walk() {
		super.walk();
		console.log('Walk completed');
	}
}

const swati = new Student2();
swati.learn();
swati.breath();
swati.walk();
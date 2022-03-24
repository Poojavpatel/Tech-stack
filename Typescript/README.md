# Typescript 

* Typescript is a super set of javascript 
* Browsers donot understand typescript, Typescript files are **transpiled** into javascript 

### Advantages of typescript over javascript
1. Strong typing 
1. OOP support - private, interface, abstract 
1. Compile time errors
1. Intellisence support
### Running Typescript files
```bash
sudo npm install -g typescript
tsc -v
tsc index.ts    # transpiles and creates a js file
node index.js

# To transpile and run
tsc index.ts | node index.js

# To transpile using ES6 
tsc --target ES6 index.ts
```



---

## Basics

### Types in typescript 
```typescript
let c : number;
let d : string;
let e : boolean;
let f : number[] = [5, 7, 9];
let g : string[] = ['a', 'b', 'c'];
let h : any[] = ['a', 1, true];
```

### Enum in typescript
```typescript
const colorRed = 1;
const colorGreen = 2;
const colorBlue = 3;

enum Color {Red, Green, Blue};

// declaring an enum automatically asigns numbers sequentially
let red = Color.Red;
console.log(red);                      // 0
console.log(Color.Blue);               // 2

// a better way is to assign values explicitly, so that if we add lets say purple before blue it wont mess blue
enum Color2 {Red = 0, Green = 1, Blue = 2};

// in js enums are compiled as 
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
```

### Type Assertions
* Type Assertions is explicity telling typescript the type of a variable, Type Assesrtion is done just to get intellicence 
* Note - Type Assertions does not change the type of this variable at runtime, its purely a way to tell ts compiler about type of a variable
```typescript
let a = 5;
a = 'tyu';  // Type 'string' is not assignable to type 'number'
// since we defined a as 5, type of a is considered number, hence when we try to assign a = 'tyu' we get an error

let b;
b = 5;
b = 'ghb';
b = true;
// since we only declared b, type of b is considered as any, hence typescript has no issues if we set it to string or boolean

let message = 'hello';
// when we type message. we get intellisense of all string methods
message.endsWith('o');

let message2 
message2 = 'world';
// when we type message2. we DO NOT get intellisense of all string methods as type of message2 is considered as any
message2.endsWith('d');

// Type Assertions 
(<String>message2).endsWith('d');
(message2 as String).endsWith('d');
```

---

### Interface
```typescript
function drawPoint(point){
  // draw a point with x,y cordinate
}
drawPoint({x : 5, y : 7})
drawPoint({name: 'Pooja'})  

// This function expects a point but we get no error even when passing string, to fix this

// 1. Object literal
function drawPoint2(point : {x : number,y : number}){
  // draw a point with x,y cordinate
}
drawPoint2({x : 5, y : 7})
// drawPoint2({name: 'Pooja'}) // Argument of type '{ name: string; }' is not assignable to parameter of type '{ x: any; y: any; }'. Object literal may only specify known properties, and 'name' does not exist in type '{ x: any; y: any; }'

// Problem with object literal - we might want to reuse this point object

// 2. Interface
interface IPoint {
  x : number,
  y : number
}

function drawPoint3(point : IPoint){
  // draw a point with x,y cordinate
}
drawPoint3({x : 5, y : 7})
// drawPoint3({name: 'Pooja'}) // Argument of type '{ name: string; }' is not assignable to parameter of type 'IPoint'. Object literal may only specify known properties, and 'name' does not exist in type 'IPoint'

// Problem with this implementation is that it violates cohesion
// In OOP there is a concept of cohesion, which states that related properties should belong to a single unit
// Here since IPoint and drawPoint both are related to a point, they should be placed together
```

```typescript
// Using Class
// all related properties and methods are grouped together
class Point {
  x : number;
  y : number
  drawPoint3 = () => {
    console.log(`Drawing point ${this.x} ${this.y}`)
  }
}

const a = new Point();
a.x = 5;
a.y = 10;
a.drawPoint3();
```

```typescript
// Instead of declaring all properties seperately, use constructor
class Point2 {
  x : number;
  y : number;
  z : number;

  // z is an optional argument
  constructor(x : number,y : number, z?:number){
    this.x = x;
    this.y = y;
    this.x = x;
  }

  drawPoint3 = () => {
    console.log(`Drawing point ${this.x} ${this.y} ${this.z}`)
  }
}

const b = new Point2(10, 20);
b.drawPoint3();
```

<br/>

---

### Access Modifier

* In our current implementation of point, we can reassign values of x and y   
a.x = 9
* This can cause issues, to prevent reassignment of properties we can use Access Modifiers   
* Access Modifiers are used to restrict access of class properties and methods from outside 
* There are 3 access modifiers in typescript
1. Public
1. Private
1. Protected

**Public** - By default, members (properties and methods) of the TypeScript class are public - so you don’t need to prefix members with the public keyword. Public members are accessible everywhere without restrictions even from the multiple level sub-classes without any compile errors.

**Private** - A private member cannot be accessed outside of its containing class. Private members can be accessed only within the class and even their sub-classes won't be allowed to use their private properties and attributes.

**Protected** - A protected member cannot be accessed outside of its containing class. Protected members can be accessed only within the class and by the instance of its sub/child class.

```typescript
class Point {
  private x : number;
  private y : number;
  z : number;

  constructor(x : number,y : number, z?:number){
    this.x = x;
    this.y = y;
    this.x = x;
  }

  drawPoint = () => {
    console.log(`Drawing point ${this.x} ${this.y} ${this.z}`)
  }
}

const point = new Point(2,3,4);
point.z = 5; // intelligence only shows z and drawPoint
```
<br/>

---
### Shorthand for constructor

```typescript
class Point {
  private x : number;
  private y : number;
  z : number;

  constructor(x : number,y : number, z?:number){
    this.x = x;
    this.y = y;
    this.x = x;
  }
}

// can be written as
class Point3 {
  constructor(private x : number, private y : number, public z?:number){}
}

```

<br/>

---

### Properties in typescript
* lets say we want to allow setting x with some validation we can use getters and setters
* Using properties, we can set X as a field while also applying validation 
* Properties are more cleaner then getters and setters

> Property is something that looks like a field, but is actually a method


```typescript
// normally set and get using functions
class Point4 {
  constructor(private x : number, private y : number, public z?:number){}

  getX (){
    return this.x;
  }

  setX (value){
    // after some basic validation
    this.x = value;
  }
}

const p = new Point4(1,2);
console.log(p.getX());        // 1
p.setX(6);
console.log(p.getX());        // 6
```

```typescript
// using properties
class Point5 {
  constructor(private x : number, private y : number, public z?:number){}

  get X (){
    return this.x;
  }

  set X (value){
    // after some basic validation
    this.x = value;
  }
}

const q = new Point5(1,2);
console.log(q.X);        // 1
q.X = 6;
console.log(q.X);        // 6
```

<br/>

---

## Abstract class
* Prefixed with abstract keyword
* Does not have a constructor, as you cannot instanciate it
* Abstract class can have abstract methods and public methods
* Abstract methods cannot have implementation and logic inside abstract class
* Classes that extend abstract class should implement all abstract methods
* Even though abstract class does not have a constructor, Classes that extend abstract class must call super() in their constructor
* Abstract classes are used to clearly express your intent that these method needs to be implemented by all sub classes
* With Abstract classes we can have a lot of implementation thats shared but some methods that compulsarily should be overwritten in any subclasses

```typescript
abstract class Shape {
	abstract draw() { // Method 'draw' cannot have an implementation because it is marked abstract

	}
}

const shape = new Shape(); // Cannot create an instance of an abstract class
```

```typescript
class Circle extends Shape{ // Non-abstract class 'Circle' does not implement inherited abstract member 'draw' from class 'Shape'
	constructor() { // Constructors for derived classes must contain a 'super' call

	}
}
```

```typescript
class Circle extends Shape{ 
	constructor() { 
		super()
	}
	draw(): void {
		// draw a circle
	}
}
```



<br/>

---
## Inheritance in TypeScript (extends vs implements)

* We can extend only once class, we can implement multiple interfaces
* When implementing an interface, all properties and methods defined in the interface needs to be defined in the subclass
* When extending a class, use super.parentMethod() to call parent method

```typescript
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
```

```typescript
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
```

<br/>

---

### Typescript Generics

TODO

https://rossbulat.medium.com/typescript-generics-explained-15c6493b510f

https://levelup.gitconnected.com/using-typescript-extending-generic-types-2c18459934ea

<br/>

---

### Use TypeScript to Build a Node API with Express

Setup - https://developer.okta.com/blog/2018/11/15/node-express-typescript

For Project structure refer - https://github.com/Poojavpatel/search-engine-assignment

<br/>

---

### How to add Typescript definitions to Express req & res

```bash
npm i @types/express --save-dev ("@types/express": "^4.17.0")
```

```typescript
// This can be shortened..
import { Request, Response, NextFunction } from 'express';
export const myMiddleware = (req: Request, res: Response, next: NextFunction) => {
  ...
};

// to this..
import { RequestHandler } from 'express';
export const myMiddleware: RequestHandler = (req, res, next) => {
  ...
};

// or in case it handles the error object
import { ErrorRequestHandler } from 'express';
export const myMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  ...
};
```

```typescript
// or create a generic middleware function

// middleware/authCheck.ts
import { Request, Response, NextFunction } from 'express';

export const authCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
  ...
};

// server.ts
import { authCheckMiddleware } from './middleware/authCheck';
app.use('/api', authCheckMiddleware);
```
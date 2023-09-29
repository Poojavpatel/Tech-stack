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

// Example of enum in real world application
enum COMMON_ERROR_CODES {
  BAD_REQUEST = "BAD_REQUEST",
  FORBIDDEN = "FORBIDDEN",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  MISSING_REQUIRED_PARAMETERS = "MISSING_REQUIRED_PARAMETERS"
}

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

### Partial<T> Type

* The partial utility type was introduced in TypeScript release 2.1 and it is designed to make all of the properties of a type optional. This means developers will no longer have to provide values to all properties of a type. In fact, it opens the possibility of not providing any property.

```typescript
Partial<MyType>
Partial<MyInterface>
Partial<{}>
```

* let’s take a look at the following example where we have the Blog interface. Notice the Blog interface is composed of six property keys, which all except by featureImageUrl are required.

```ts
interface Blog {
  id: string;
  title: string;
  slug: string;
  categories: string[];
  tags: string[];
  featureImageUrl?: string;
  content: string;
}
```

* However, it is common during the development to not know all the values of a Blog, especially when we have a draft of a blog. However, failing to pass all the property keys will lead to a TypeScript error
* An alternative solution is to make all of the properties optional using the question mark ? However, it is not always possible to make all of the property keys optional. Besides, it will prevent from enforcing property values in certain types. 
* That’s when the partial type becomes useful as it makes all these properties optional without the need of modifying the requirement of the properties of the type like in the following example.
```ts
// Partial<Blog> generates a new type based on Blog with all the property
// keys being optional
const draft: Partial<Blog> = {
  title: 'What kind of title should I type?'
}
```

* Make a property required and the rest optional - There are special scenarios where we would want to keep certain properties required, but let the rest be optional. For example, assume we must update the title of a Blog type every time we trigger the updateBlog function.
Unfortunately, using the Partial type with not work as you know by now, it will make all the properties optional.

* However, we can use Partial in combination with Pick utility type to enforce the property title. to be passed as part of the blog parameter.
```ts
async function updateBlog(id: string, blog: Partial<Blog> & Pick<Blog, 'title'>) {
  await db.Blog.save(id, {
    ...blog
  });
}
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

**Public**: Members (properties and methods) declared as public are accessible from anywhere, both inside and outside the class.   
By default, members (properties and methods) of the TypeScript class are public 

**Private**: Members declared as private are only accessible from within the class in which they are defined.     
They cannot be accessed from outside the class.   
They can't be accessed even from sub-classes.

**Protected**: Members declared as protected are accessible within the class and also within its subclasses (derived classes).    
They cannot be accessed from outside the class or its subclasses.

```typescript
class Point {
  private x : number;
  private y : number;
  z : number;

  constructor(x : number,y : number, z?:number){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  drawPoint = () => {
    console.log(`Drawing point ${this.x} ${this.y} ${this.z}`)
  }
}

const point = new Point(2,3,4);
point.z = 5; // intelligence only shows z and drawPoint
```


#### Protected 

* Intended for Subclasses: If a method is meant to be overridden or extended by subclasses but is not meant to be called directly by external code, it should be declared as protected. This restricts access to the method to the class itself and its subclasses.

* Implementation Detail: Protected methods are often used for implementation details that are not part of the public interface. They provide a way for subclasses to customize or extend the behavior of the base class.

* Template Method Pattern: In the Template Method Pattern, you may have a public method in the base class that calls protected methods to implement a certain algorithm. Subclasses then override these protected methods to customize the algorithm's behavior.

```typescript
/*
In this example, the name property is marked as protected in the Animal class, so it can be accessed within the Animal class and its subclass Dog, but not from outside these classes. This allows for controlled and safe access to certain class members within an inheritance hierarchy.
*/

class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    public makeSound() {
        console.log(`${this.name} makes a sound`);
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    public bark() {
        console.log(`${this.name} barks`);
    }
}

const dog = new Dog('Fido');
dog.makeSound(); // Accessible because it's a public method
dog.bark();      // Accessible because it's a public method
console.log(dog.name); // Error: Property 'name' is protected and only accessible within class 'Animal' and its subclasses.
```

```typescript
/*
In this example, calculateArea is marked as protected because it's meant to be customized by subclasses, while printArea is marked as public because it's part of the public interface of the Shape class. 
*/
class Shape {
    protected calculateArea(): number {
        // Implementation for calculating the area
        return 0;
    }

    public printArea(): void {
        const area = this.calculateArea();
        console.log(`Area: ${area}`);
    }
}

class Circle extends Shape {
    private radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    protected calculateArea(): number {
        // Custom implementation for calculating the area of a circle
        return Math.PI * this.radius * this.radius;
    }
}

const circle = new Circle(5);
circle.printArea(); // Can be called externally
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

**Abstract classes are used when you want to create a blueprint for other classes to inherit from, but you don't want instances of the abstract class to be created directly**

* Prefixed with abstract keyword
* Does not have a constructor, as you cannot instantiate it
* Abstract class can have abstract methods and public methods
* Abstract methods cannot have implementation and logic inside abstract class
* Classes that extend abstract class should implement all abstract methods
* Even though abstract class does not have a constructor, Classes that extend abstract class must call super() in their constructor
* Abstract classes are used to clearly express your intent that these method needs to be implemented by all sub classes
* With Abstract classes we can have a lot of implementation thats shared but some methods that compulsorily should be overwritten in any subclasses
* Example for use of abstract class in real world application - BaseNotificationDelivery class
* Other examples are Pagination class, BaseRouter or BaseError classes
* Also used to create all the base classes like Entity, ValueObject, AggregateRoot, etc while using DDD

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

```typescript
// Example for use of abstract class in real world application 
export abstract class BaseNotificationDelivery<T> {
  public abstract isDeliveryPossible(notification: T): Promise<Result<boolean>>;
  public abstract queue(notifications: T[]): Promise<Result<boolean>>;
  protected abstract deliver(notification: T): Promise<Result<boolean>>;
  protected abstract notificationIdempotency(notification: T): Result<string>;

  public async send(notification: T): Promise<Result<boolean>> {
    // 1. Get notification idempotency
    const notificationIdempotencyOrError = await this.notificationIdempotency(notification);

    if (notificationIdempotencyOrError.isFailure) {
      return Result.fail<boolean>(notificationIdempotencyOrError.errorAsString());
    }
    const idempotency = notificationIdempotencyOrError.getValue();

    // 2. Check if delivery is possible using notification preferences
    const isDeliveryPossibleOrError = await this.isDeliveryPossible(notification);

    if (isDeliveryPossibleOrError.isFailure) {
      logger.info(`Email delivery not possible due to ${isDeliveryPossibleOrError.errorAsString()}`);
      return Result.ok<boolean>(true);
    }

    const isDeliveryPossible = isDeliveryPossibleOrError.getValue();

    if (isDeliveryPossible === false) {
      logger.info(`isDeliveryPossible is ${isDeliveryPossible} for ${idempotency}. Skipping`);
      return Result.ok<boolean>(true);
    }

    const deliveredOrError = await this.deliver(notification);
    return Result.ok<boolean>(true);
  }
}

/* 
This class is extended by EmailNotificationDelivery InAppNotificationDelivery and MobilePushNotificationDelivery classes 
They all have their own implementations of queue, deliver and other methods
*/

```

<br/>

---
## Class vs Interface
Here are some guidelines to help you determine when to use a class and when to use an interface

### Use a Class When

1. You Need to Create Instances: If you want to create instances of an entity with properties and methods, you should use a class. Classes provide the blueprint for creating objects, and instances can have state and behavior.

```typescript
class Person {
  constructor(public name: string) {}

  sayHello() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const person = new Person("John");
person.sayHello();
```

2. You Want to Implement a Constructor: Classes can have constructors that initialize instance properties when an object is created. If you need initialization logic, use a class.

```typescript
class Car {
  constructor(public make: string, public model: string) {}
}

const myCar = new Car("Toyota", "Camry");
```

3. You Need Inheritance: If you want to create a hierarchy of related objects with shared properties and methods, classes are the way to go. You can extend one class from another to inherit and override behavior.

```typescript
class Animal {
  constructor(public name: string) {}
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog("Fido");
dog.speak(); // Output: "Fido barks."
```

### Use an Interface When:

1. You Want to Define a Contract: Interfaces are used to define contracts or shapes for objects. They specify the structure (properties and methods) that classes implementing them must adhere to. Interfaces do not contain any implementation.

```typescript
interface Shape {
  area(): number;
}
```

2. You Need to Enforce a Structure: If you want to ensure that certain properties or methods are available on objects without specifying how they are implemented, use interfaces. Interfaces enforce a structure that implementing classes must follow.

```typescript
class Circle implements Shape {
  constructor(public radius: number) {}

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

3. You Want to Achieve Composition: In TypeScript, a class can implement multiple interfaces, allowing you to compose behavior from multiple sources. This is useful when you want to achieve a form of multiple inheritance.

```typescript
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Bird implements Flyable {
  fly() {
    console.log("Bird is flying.");
  }
}

class Fish implements Swimmable {
  swim() {
    console.log("Fish is swimming.");
  }
}
```

4. You Want to Keep Implementation Details Separate: If you want to separate the declaration of an object's shape (using an interface) from its actual implementation (using a class), interfaces provide a clear separation of concerns.

---
## Inheritance in TypeScript (extends vs implements)

*extends (Inheritance) - Class to Class Relationship*    
*implements (Interface Implementation) - Class to Interface Relationship*   

The extends keyword is used when you want to create a new class that is a child or subclass of an existing class. It signifies inheritance, allowing the new class to inherit properties and methods from the parent class.    

The implements keyword is used when a class agrees to adhere to the structure defined by an interface. It enforces that the class must provide implementations for all the properties and methods declared in the interface.

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

```typescript
/* In real world application a class can do both as well */
export interface IEmailNotificationDelivery {
  isDeliveryPossible(notification: EmailNotification): Promise<Result<boolean>>;
  queue(notifications: EmailNotification[]): Promise<Result<boolean>>;
  queueWithCaching(notifications: EmailNotification[]): Promise<Result<boolean>>;
}

export class EmailNotificationDelivery
  extends BaseNotificationDelivery<EmailNotification>
  implements IEmailNotificationDelivery
{
}
```

<br/>

---

## Interface vs Abstract classes 
What should be used to enforce method implementations ?    
The choice between using an interface or an abstract class to enforce method implementations depends on whether you need to define a contract (interface) or provide shared behavior with the option for customization (abstract class)

### Use an Interface When:

1. Defining Contracts: Interfaces are primarily used to define contracts or shapes that classes must adhere to. They specify the structure (properties and methods) that implementing classes must provide.

1. Multiple Implementations: A class can implement multiple interfaces. This allows for greater flexibility in composing behavior from various sources.

1. Loose Coupling: When you want to ensure loose coupling between classes, interfaces are a good choice. They allow different classes to conform to a common contract without being tightly bound to a common base class.

1. Agility and Composition: Interfaces promote a more agile and compositional approach. They enable you to add functionality to classes in a modular way without worrying about class hierarchies.

1. No Shared Implementation: Interfaces do not contain any implementation details. They only declare the structure of methods and properties, leaving the actual implementation to the classes that implement them.

### Use an Abstract Class When:

1. Common Implementation: Abstract classes can provide a common base with shared implementation details. They allow you to define methods that have a default implementation while still enforcing derived classes to provide their own implementations for certain methods.

1. Code Reuse: When you have a group of related classes that share common methods or properties, abstract classes can help avoid code duplication by centralizing the shared logic in one place.

1. Partial Implementations: Abstract classes can have abstract methods (methods without implementation) that must be implemented by derived classes. This enforces a contract while still allowing for shared behavior.

1. Constructor Logic: If you need to enforce a specific constructor signature or include constructor logic that should be shared among derived classes, abstract classes are the way to go.

1. Method Overriding: Abstract classes allow you to mark methods as abstract, indicating that they must be overridden by derived classes. This is useful when you want to ensure that certain methods are provided by subclasses.

```typescript
/* A combination of abstract class and interface can be used as well, refer eg under extends vs implements */
abstract class Vehicle {
  abstract drive(): void;
}

interface Flyable {
  fly(): void;
}

class Car extends Vehicle {
  drive() {
    console.log("Car drives.");
  }
}

class Helicopter extends Vehicle implements Flyable {
  drive() {
    console.log("Helicopter drives.");
  }

  fly() {
    console.log("Helicopter flies.");
  }
}

// In this example, Car extends Vehicle to inherit the drive method, while Helicopter extends Vehicle and implements Flyable to provide both driving and flying behavior.
```

<br/>

---

### Typescript Generics

https://rossbulat.medium.com/typescript-generics-explained-15c6493b510f
https://levelup.gitconnected.com/using-typescript-extending-generic-types-2c18459934ea

Generics enable you to parameterize types, functions, and classes, making them adaptable to different data types while maintaining type safety.

**Generic Types**
```typescript
function identity<T>(arg: T): T {
    return arg;
}

const str: string = identity("Hello, TypeScript!");
const num: number = identity(42);
```

**Generic Functions**
```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

const swapped = swap([1, "hello"]);
// swapped is inferred as [string, number]
```

**Generic Classes**
```typescript
class Stack<T> {
    private items: T[] = [];

    push(item: T) {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);

const poppedNumber = numberStack.pop();

const stringStack = new Stack<string>();
stringStack.push("hello");
```

**Constraints**
```typescript
function logAndReturn<T extends { toString(): string }>(value: T): T {
    console.log(value.toString());
    return value;
}

const strResult = logAndReturn("hello");
const numResult = logAndReturn(42);
// Error: number does not have toString method

```

**Default Values**
```typescript
function getValue<T = any>(obj: Record<string, T>, key: string): T {
    return obj[key];
}

const person = { name: "Alice", age: 30 };
const age: number = getValue(person, "age");
const city: string = getValue(person, "city", "Unknown");

```

### Why use generics when you can use "any" ?

```typescript
/* Using Generics */
function identity<T>(arg: T): T {
    return arg;
}

const str: string = identity("Hello, TypeScript!"); // Correct usage, str is inferred as string
const num: number = identity(42); // Correct usage, num is inferred as number

// Type safety is maintained at compile-time
const strLength: number = str.length; // OK
const numToString: string = num.toString(); // OK
const invalidOperation: number = str; // Error: Type 'string' is not assignable to type 'number'
```

```typescript
/* Using 'any' */
function identityAny(arg: any): any {
    return arg;
}

const str: string = identityAny("Hello, TypeScript!"); // Correct usage, but no type inference
const num: number = identityAny(42); // Correct usage, but no type inference

// Type safety is compromised because of 'any'
const strLength: number = str.length; // No type checking, could lead to runtime errors
const numToString: string = num.toString(); // No type checking, could lead to runtime errors
const invalidOperation: number = str; // No error at compile-time, potential runtime error
```

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

---

# Common errors

### Declare type and provide default initial value 

A type literal property cannot have an initializer in TS

```ts
options: { initialRespondentsSize: number } = { initialRespondentsSize: 5 },
```
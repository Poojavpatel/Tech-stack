## Table of contents
- [Interface](#interface)
- [Abstract class](#abstract-class)
- [Interface vs Abstract classes](#interface-vs-abstract-classes)
- [Inheritance in TypeScript (extends vs implements)](#inheritance-in-typescript-extends-vs-implements)
- [Class vs Interface](#class-vs-interface)


## Interface
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
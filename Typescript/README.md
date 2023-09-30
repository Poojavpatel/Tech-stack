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

## OOPS in Typescript 

[OOPS in Typescript](OOPS.md)

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

## Common errors

### Declare type and provide default initial value 

A type literal property cannot have an initializer in TS

```ts
options: { initialRespondentsSize: number } = { initialRespondentsSize: 5 },
```

## Decorators

TODO

## Advance TS tricks

### Mapped types 

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Point {
  x : number;
  y : number; 
}

type ReadonlyPoint = Readonly<Point>;

const regularPoint : Point = {x : 5, y: 10};
const readOnlyPoint : Point =  {x: 20, y : 30};

regularPoint.x = 15;
readOnlyPoint.x = 25 // Error : Cannot assign to x as it is a read-only property
```

### Conditional types

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```

### Namespaces

Namespaces are a way to organize and group related code     
They help avoid naming collisions    
Namespaces can contain variables, functions, classes, interfaces and other namespaces   

```ts
export namespace NSSlack {
  export type DTO = {
    channel: string;
    memberId: string;
  };

  export interface IService {
    sendMessage(message: string): void;
    submitJob(): Promise<Result<void>>;
  }
}
```

### Mixins
Mixins are a way to compose classes from multiple smaller parts called mixins classes    
They allow you to reuse and share behavior between different classes    
```ts
// Defining mixins - To define a mixin create a class that extends a generic type parameter with a constructor signature   
class TimestampMixin<TBase extends new (...args: any[]) => any>(Base: TBase) {
  constructor(...args: any[]) {
    super(...args);
  }
  getTimestamp() {
    return new Date();
  }
}

// Using Mixins - to use a mixin class, define a base class and apply the mixin class using the extends keyword
class MyBaseClass {
  constructor(public value : number) {}
  displayValue(){
    console.log(`The value is ${this.value}`);
  }
}

class MyMixedClass extends TimestampMixin(MyBaseClass) {
  constructor(value: number) {
    super(value);
  }
}

// usage
const instance = new MyMixedClass(42);
instance.displayValue(); // Output : The value is 42
console.log(instance.getTimestamp()); // current datetime
```

### Utility types
```ts
interface Person {
  name : string;
  age : number;
  email : string;
}

type PartialPerson = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
type NameAndAge = Pick<Person, "name" | "age">;
type withoutEmail = Omit<Person, "email">;
```

### Nullish coalescing

* The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
* The nullish coalescing operator is different from the logical OR (||) operator in that it only considers null and undefined to be falsy values. The logical OR operator considers any falsy value to be falsy, including the empty string (""), the number 0, and false.

```ts
let value1: string = "hello";
console.log(value1 ?? "default"); // "hello"

// set props.text as params.text if it is not null or undefined
this.props.text = params.text ?? this.props.text;
```

### Discriminated Unions

* A discriminated union in TypeScript is a union type that has a common property that can be used to determine the specific type of the value at runtime.    
* This common property is called a discriminator, it can be string literals, numeric literals, or even symbols      
* Discriminated unions can also be used to represent different states of a system. 
For example, you could use a discriminated union to represent the state of a loading spinner, where the discriminator is the current state (e.g. "idle", "loading", "success", "error").

```ts
interface Square {
  kind : 'square';
  size : number;
}

interface Circle {
  kind : 'circle';
  radius : number;
}

interface Triangle {
  kind : 'triangle';
  base : number;
  height : number;
}

type Shape = Square | Circle | Triangle;

function area(shape : Shape) {
  switch(shape.kind){
    case 'square':
      return shape.size * shape.size;
    case 'circle': 
      return 3.14 * shape.radius * shape.radius;
    case 'triangle':
      return 0.5 * shape.base * shape.height;
  }
}
```
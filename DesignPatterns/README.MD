## Table of Contents
- [Refresh OOPS concepts](#refresh-oops-concepts)
- [Anti patterns](#software-development-antipatterns)
- [SOLID Principles](#solid-principles)
  - [Single responsibility principle](#single-responsibility-principle)
  - [Open-closed principle](#open-closed-principle)
  - [Liskov substitution (substitutability) principle](#liskov-substitution-substitutability-principle)
  - [Interface segregation principle](#interface-segregation-principle)
  - [Dependency inversion principle](#dependency-inversion-principle)
  - [Loose Coupling](#loose-coupling)
- [Design Patterns](#design-patterns)
  - [Dependency Injection](#dependency-injection)
  - [Creational Patterns](#creational-patterns)
    - [Singleton](#singleton)
    - [Factory](#factory)
    - [Object pool](#object-pool)
    - [Builder](#builder)
    - [Abstract factory](#abstract-factory)
    - [Prototype](#prototype)
  - [Structural Patterns](#structural-patterns)
    - [Decorator](#decorator)
    - [Adapter](#adapter)
    - [Facade](#facade)
    - [Composite](#composite)
    - [Bridge](#bridge)
    - [Flyweight](#flyweight)
    - [Proxy](#proxy)
  - [Behavioural Patterns](#behavioral-patterns)
    - [Strategy](#strategy)
    - [Observer](#observer)
    - [Command](#command)
    - [Template](#template)
    - [State](#state)
    - [Chain of responsibility](#chain-of-responsibility)
    - [Iterator](#iterator)
    - [Mediator](#mediator)
    - [Visitor](#visitor)
    
    


## Refresh OOPS concepts

[OOPS](../OOPS/README.md)    
[OOPS Concepts in Typescript](../Typescript/OOPS.md)

<br/>

### Software Development AntiPatterns   
[Software Development AntiPatterns](https://sourcemaking.com/antipatterns/software-development-antipatterns)

<br/>

# SOLID Principles

S - Single responsibility    
O - Open/closed    
L - Liskov substitution (substitutability)   
I - Interface segregation   
D - Dependency inversion  



## Single responsibility principle 
A class should have only one reason to change, meaning that a class should have only one responsibility or job   

A class should have a single, well-defined purpose, and it should encapsulate all the functionality related to that purpose

Single responsibility principle is violated when 
* you have error handling code in your class
* you have presentation logic
* File or database read/write operations

## Open-closed principle 
A class should be open to extension, closed to modification 

* Once a software component (such as a class) is written and considered stable, it should not be modified to add new functionality or features. 
* Instead, it should be designed in a way that allows for extensions or enhancements without altering the existing code.
* This principle encourages a design that is both flexible and robust to changes, making it easier to maintain and extend software over time.
* Open for Extension - You can achieve this by using mechanisms like inheritance, interfaces, or composition to extend the behavior of existing classes.
* To follow the Open/Closed Principle, you often rely on abstraction and polymorphism. You define abstract base classes or interfaces that provide a common contract, and then you create concrete implementations that adhere to that contract.

**Example**    
Consider you have an existing error handling class that displays error, now you need to log those errors to datadog by sending to an endpoint    
[openClosedPrinciple/followingPrinciple.ts](openClosedPrinciple/followingPrinciple.ts)

## Liskov substitution (substitutability) principle 

* The LSP states that objects of a derived class should be able to replace objects of the base class without affecting the correctness of the program.
* In other words, if a class A is a base class and class B is a derived class, you should be able to use objects of class B wherever objects of class A are expected, and the program should still work correctly.
* A program should not have any type of undefined behavior just because a subclass defined a method/property in a different way then its base class

<br/>

**My take -**      
Assume you have a base class (Bird) and a few derived classes (Sparrow, Ostrich), and you have a function that accepts param of type base class
Since objects of derived class (sparrow) are also of type of Base class, they can be passed to the function as well   
LSP states that when you pass the objects of derived class to that function, it should work logically correctly   

You can use composition instead of inheritance to adhere to LSP in some cases eg - [Quiz question](liskovSubstitutionPrinciple/quizQuestion.ts)



**Examples**
1. Bird - [liskovSubstitutionPrinciple/bird.ts](liskovSubstitutionPrinciple/bird.ts)
2. Quiz - [liskovSubstitutionPrinciple/quizQuestion.ts](liskovSubstitutionPrinciple/quizQuestion.ts)

**Real world examples for a saas app**
1. User Authentication and Authorization - you might have different types of users, such as regular users and administrators. These users should be interchangeable when it comes to authentication and authorization
2. Payment Processors - you may integrate with different payment processors like PayPal, Stripe, and Square. Each payment processor can have its implementation, but they should all adhere to a common interface
3. Data Storage Abstraction - you may need to store data in various databases, such as MySQL, PostgreSQL, or MongoDB. You can create a common data access interface that all these database-specific classes implement

## Interface segregation principle 

A class should not have to implement methods it does not need

**How to recognize the issue**
* You don't know how to implement an interface method
* The interface method does not belong in the class
* You are forced to leave method empty
* You are forced to throw a generic exception

**My take -** 
Assume you have an interface (SmartDevices) that is going to be implemented by a few classes (Smartphones, tablets, fridge)   
You have some methods in the interface (playYoutubeVideo) that are not possible to be implemented by some of these classes (fridge cant play youtube video, all other smart devices can).   
So in your fridge class you have to either keep method empty or do an unnecessary log or throw error to avoid compilation error  
This means the principle was violated here since you are implementing a method the Fridge class does not need   
   
To fix it segregate interface into smaller ones

**Example**    
[Smart devices](interfaceSegregationPrinciple/ISmartDevice.ts)

## Dependency Inversion principle

[Twitter post by Milan Jovanović](https://twitter.com/mjovanovictech/status/1755497516760531228)   
[Dependency Inversion Principle 101 - Medium blog](https://mcvalls.medium.com/dependency-inversion-principle-101-efa4a4d5bfa5)   

<!-- <img src="https://pbs.twimg.com/media/F8OreCHXUAAkr8C.jpg" width="40%" />

<br/> -->

<img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" width="45%" />

<br/>

**High-level modules:** These are modules or classes that define the main logic (business logic) of your application (eg - Usecase)   
**Low-level modules:** These are modules or classes that perform specific tasks or services that the high-level modules depend on (eg - Repo methods, service methods)   
**Abstraction:** Abstraction is an abstract class or an interface   
**Detail:** Detail is everything that isn’t business logic: Data persistence, external services, frameworks, UI, etc.

**The Dependency Inversion Principle states that high-level modules should not depend on low-level modules; both should depend on abstractions** 

* Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions.
* The principle encourages the use of interfaces or abstract classes to define a contract between different components of your system, rather than having concrete implementations depend on each other directly
* The goal is to reduce coupling between different parts of your codebase, making it more modular, maintainable, and adaptable to changes

**Consider an example of computer mouse**   
There are various types of computer mouse available like wired, wireless, touchpad, laser, optical, trackball   
To connect all these to a computer, a computer does not build a separate port for each type of mouse   
Your computer does not depend on any one type explicitly rather depends on a USB port a common interface   
Taking it further, it does not even depend on that, it depends on an entity with two buttons and a pointer. Implementation does not matter   
The mouse example perfectly explains loose coupling

### Implementation Examples

**Not Adhering to DIP**
* This tight coupling makes it difficult to change the data source or swap out the OrderService implementation without modifying OrderProcessor
* It also makes unit testing of OrderProcessor more challenging because it relies on a concrete, difficult-to-mock dependency

```ts
/* High-level module (Usecase with Business Logic)
It directly depends on a low-level module OrderService to fetch orders from a database */
class OrderProcessor {
  constructor(private orderService: OrderService) {}

  processOrder(orderId: number): void {
    const order = this.orderService.getOrder(orderId);
    order.state = "processed";
  }
}

/* Low-level module (Service or Repo method for Data Access)
OrderService isn’t an abstraction but a concrete class 
*/
class OrderService {
  getOrder(orderId: number): Order {
    return models.Orders.findById(orderId);
  }
}

const orderService = new OrderService();
const orderProcessor = new OrderProcessor(orderService);
```

> If the OrderService is a detail (it doesn’t have any business logic), coupling a high-level module to the detail could be considered as a design error

**Adhering to DIP**
* To adhere to the Dependency Inversion Principle, we introduce an abstraction OrderRepository that acts as an intermediary between the high-level and low-level modules
* The high-level module OrderProcessor now depends on the OrderRepository abstraction, not directly on DatabaseOrderService. 
* This adheres to the Dependency Inversion Principle, as it decouples the high-level module from the low-level module, making it easier to change or extend the code without modifying the OrderProcessor class.

```ts
/* Abstraction (Interface) */
interface IOrderService {
  getOrder(orderId: number): Order;
}

/* Implementing the abstraction in the low-level module */
class OrderService implements IOrderService {
  getOrder(orderId: number): Order {
    return models.Orders.findById(orderId);
  }
}

/* High-level module */
class OrderProcessor {
  constructor(private orderService: IOrderService) {}

  processOrder(orderId: number): void {
    const order = this.orderService.getOrder(orderId);
    order.state = "processed";
  }
}

const orderService: IOrderService = new OrderService(); // Instantiate the interface, not the concrete class
const orderProcessor = new OrderProcessor(orderService);
```

**TODO**      
I tried out implementing both examples and making a change to getOrder method to see how DIP helps avoiding changes to OrderProcessor class   
[not adhering to DIP](./dependencyInversion/playground.ts)   
[adhering to DIP](./dependencyInversion/adheringToDIP.ts)   
In both cases, I did indeed need to make same changes to accommodate the new behavior of the getOrder method   
So i am not entirely sure how it helps   
Update here on getting more clarity   


### Example in DDD codebase 
```ts
// Abstraction
export interface IFlowRepo {
	findById(id: UniqueEntityID | string): Promise<Flow>;
}

// Low-level module (Repo)
export class FlowRepo implements IFlowRepo {
	public async findById(id: UniqueEntityID | string): Promise<Flow> {
    const rawFlow = await this.flowModel.findById(id).select(FlowMap.selectedFields()).lean<IFlow>();
    return rawFlow ? FlowMap.toDomain(rawFlow) : null;
  }
}

// High-level module (Usecase)
export class approveRequestUseCase {
	constructor(flowRepo: IFlowRepo) { this.flowRepo = flowRepo }

	public async execute(request = {} as IApproveOrDenyShareRequestRequestDTO): Promise<ResponseType> {
		const flow = await this.repo.flowRepo.findById(flowId);
	}
}
```

## Loose Coupling 

* Software parts that communicate with each other have little to no knowledge of each others implementation
* Eg - FE and BE communicate via API contracts. A get posts API sends posts in a fixed format   
The BE can keep updating its implementations, sending posts from db, from an AI tool, from some other service, adding scalability, etc as long as the API contract is followed FE does not need to have any knowledge of BE implementation
* The point is as long as the interfaces match, we do not care about how each individual component is actually implemented

### To achieve loose coupling, follow these practices 
* Single responsibility principle 
* Separation of concerns - Use Modules
* Use Interfaces and Abstractions
* Factory pattern/object pool
* Dependency injection
* Inversion of Control Containers 
* Avoid Tight Coupling to Frameworks - Keep framework-specific code in separate files or layers
* Use Event-Based Communication - Implement an event-based communication system, such as the Observer pattern or an event bus, to decouple components that need to communicate. This allows components to publish and subscribe to events without direct dependencies.
* API Contracts - Clearly define API contracts between different parts of your application. Document the expected input and output for functions and modules to ensure that components can interact without tightly coupling.

### Benefits
* Easier to work on large projects
* Swap implementations (even on fly with strategy pattern)
* Testability
* Components grow independently


<br/>

---
# Design Patterns

* Design patterns are typical solutions to common problems in software design
* Design patterns act as blue prints and can be customized to solve recurring design problem in your code
* Design patterns define a common language to helps your team communicate more efficiently
* While an algorithm always defines a clear set of actions that can achieve some goal, a pattern is a more high-level description of a solution

## Classification of patterns
All patterns can be categorized by their intent or purpose

* **Creational patterns** provide object creation mechanisms that increase flexibility and reuse of existing code.

* **Structural patterns** explain how to assemble objects and classes into larger structures, while keeping these structures flexible and efficient.

* **Behavioral patterns** take care of effective communication and the assignment of responsibilities between objects.

<br/>

---

## Dependency Injection

* Dependency injection (DI) is a design pattern used in software development to achieve the principle of Inversion of Control (IoC). 
* Instead of a class or component creating its own dependencies, those dependencies are injected from the outside.
* DI promotes loose coupling between components, improves maintainability, and enhances testability by allowing dependencies to be injected from external sources.

#### What type of pattern is it
* DI doesn't fall into any of the categories (Creational, Structural, Behavioral) because it is more of an architectural design principle rather than a traditional design pattern.
* While it's not part of the original Gang of Four design patterns, it is widely used in software development to achieve these goals and is often considered a fundamental concept in modern software design.

#### What is principle of Inversion of Control (IoC)
* The Principle of Inversion of Control (IoC) is a fundamental concept in software engineering and design. It's not a specific design pattern but rather a high-level architectural principle that promotes the decoupling of components in a system
*  IoC suggests that control over the flow of a program should be inverted. Instead of a component controlling the creation and management of its dependencies, it should receive those dependencies from an external source. This external source often is a container or framework.

#### Example of traditional flow vs Dependency Injection (DI) flow
  ```ts
  /* In the traditional approach, a class typically creates its own dependencies directly within its methods or constructors */
  class UserService {
    private databaseService: DatabaseService;

    constructor() {
      // In the traditional approach, the class creates its own dependencies
      this.databaseService = new DatabaseService();
    }

    getUser(userId: number) {
      return this.databaseService.getUserById(userId);
    }
  }
  ```

  ```ts
  /* In the Dependency Injection approach, dependencies are provided to the class from external sources */
  class UserService {
    private databaseService: DatabaseService;

    constructor(databaseService: DatabaseService) {
      // Dependencies are injected from the outside.
      this.databaseService = databaseService;
    }

    getUser(userId: number) {
      return this.databaseService.getUserById(userId);
    }
  }
  ```

### Dependency Injector/Container
* A Dependency Injector (or Container) is responsible for managing the creation and resolution of dependencies. It provides a way to configure how objects are instantiated and how their dependencies are injected.   
* Popular libraries for this purpose in TypeScript include "InversifyJS" and "tsyringe."   

In [this course](https://www.udemy.com/course/design-patterns-in-typescript/learn/lecture/11677734) we go over these. Since I did not understand it completely, I am skipping it for now    
1. How to create a custom dependency container 
1. Typescript decorators
1. Adding decorators to custom dependency container 
1. Using InversifyJS   


#### Example of a Dependency Injector using InversifyJS
```bash
npm install inversify reflect-metadata
```

```ts
import { injectable, inject, Container } from 'inversify';

// Define an interface for the DatabaseService
interface DatabaseService {
  getUserById(userId: number): string;
}

// Define the implementation of the DatabaseService
@injectable()
class MySQLDatabaseService implements DatabaseService {
  getUserById(userId: number) {
    return `User ${userId} from MySQL`;
  }
}

// Define a UserService that depends on DatabaseService
@injectable()
class UserService {
  private databaseService: DatabaseService;

  constructor(@inject("DatabaseService") databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  getUser(userId: number) {
    return this.databaseService.getUserById(userId);
  }
}

// Create an InversifyJS container
const container = new Container();

// Bind the DatabaseService implementation to the interface
container.bind<DatabaseService>("DatabaseService").to(MySQLDatabaseService);

// Resolve and use the UserService from the container
const userService = container.resolve<UserService>(UserService);

// Now, you can use the UserService, and the DatabaseService is injected from the container
console.log(userService.getUser(123)); // Output: User 123 from MySQL
```

### Example of how dependency injection is done is DDD codebase
```ts
// app/modules/domain_name/repos/index.ts - This common file exports all repos of that domain
const memberRepo = new MemberRepo(models.User);

export {
  ...
  memberRepo,
  ...
}

// app/modules/domain_name/services/permissionService/index.ts - All services have an index file that exports their instances
const permissionService = new PermissionService(/* all of its dependencies */)
export { permissionService };
```

```ts
/* Dependencies injected to usecase */
const updateSettingsUseCase = new UpdateSettingsUseCase(memberRepo, permissionService);
const updateSettingsRouter = new UpdateSettingsRouter(updateSettingsUseCase);

export { updateSettingsRouter };
```

<br/>

---

## Creational Patterns

> These patterns provide object creation mechanism which maximizes flexibility and reuse of code


## Singleton

* Singleton is a creational design pattern that lets you ensure that a class has only one instance throughout the entire application, while providing a global access point to this instance.
* You have only a single instance of a specific class throughout the entire application

### The problems
1. You want to ensure your class has only one instance 
	* The most common reason for this is to control access to some shared resource—for example, a database or a file
	* Suppose you want to keep a track of your website stats like totalViews, fbShares, etc no matter from which page or file or part of code its updated.    
	In this case if we do not enforce singleton pattern, there are chances we might create new instances of stats that count from 0
1. You need global access
	* There are some properties that we need access to throughout the application, we often use global variables for those.    
	While they’re very handy, they’re also very unsafe since any code can potentially overwrite the contents of those variables and crash the app.   
	Just like a global variable, the Singleton pattern lets you access some object from anywhere in the program. However, it also protects that instance from being overwritten by other code.

### Benefits
* Shared state - You need shared state, this is more common in mobile apps
* Avoid longer initializations - incase the constructor logic is too complex
* Cross class communication

### How to implement the solution 

#### Approach 1 - Error from constructor
Reference : [Design patterns in Typescript](https://www.udemy.com/course/design-patterns-in-typescript/learn/lecture/11677718#overview)   
With singleton pattern implementation we want to ensure that a class can only be initialized once.   
Whenever an instance of a class is initialized using the new keyword, the constructor is called   
We throw an error from the constructor to make sure this does not happen

```ts
export class StatsTracker {
  public buttonClicks:number = 0;
  public facebookShares: number = 0;
  // 1. A static instance of the same class initialized using the constructor
  private static _instance : StatsTracker = new StatsTracker();

  constructor(){
    // 3. Error from constructor if trying to reinitialize
    if(StatsTracker._instance){
      throw new Error("Cannot initialize singleton class using new");
    }
    StatsTracker._instance = this;
  }

  // 2. public getter that returns the instance
  public static get instance(): StatsTracker{
    return StatsTracker._instance;
  }
}
```
```ts
import { StatsTracker } from "./StatsTracker";

// const statsTracker = new StatsTracker(); // Error: Cannot initialize singleton class using new
const statsTracker = StatsTracker.instance;

statsTracker.buttonClicks += 5;
console.log(statsTracker.buttonClicks) // 5
```

#### Approach 2 - Static creation method that acts as constructor
Reference : [Refactoring Guru](https://refactoring.guru/design-patterns/singleton)   

Steps
1. Make the default constructor private, to prevent other objects from using the new operator 
1. Create a static creation method that acts as a constructor.    
Under the hood, this method calls the private constructor to create an object and saves it in a static field. All following calls to this method return the cached object.

```ts
export class Database {
  public buttonClicks:number = 0;
  // 1. static field for storing the singleton instance
  private static instance: Database

  // 2. The singleton's constructor should always be private
  private constructor() {
  }

  // 3. static method that controls access to the singleton instance
  public static getInstance() {
    if(Database.instance === null || Database.instance === undefined){
      Database.instance = new Database();
    }
    return Database.instance
  }
}
```
```ts
import { Database } from "./Database";

// const db = new Database() // Constructor of class Database is private and only accessible within the class declaration.
const db = Database.getInstance();
db.buttonClicks += 10;
console.log(db.buttonClicks); // 10

const dbAnotherInstance = Database.getInstance();
dbAnotherInstance.buttonClicks += 5;
console.log(dbAnotherInstance.buttonClicks); // 15
```

Both approach are more or less the same, I like the second one more as we avoid throwing error and making constructor private gives intellisense errors

<br/>

## Factory
aka Virtual Constructor

* Combination of single responsibility principle and open-closed principle

### How to implement the solution 

#### Approach 1 - Creator for each type
Reference : [Design patterns in Typescript](https://www.udemy.com/course/design-patterns-in-typescript/learn/lecture/11677720#overview)   

```ts
export interface GameCharacter { health : number; magic : number; }

import { GameCharacter } from "./GameCharacter";

export class GameCharactersFactory {
  public static getWarrior(level: number) : GameCharacter {
    let warrior : GameCharacter;
    if(level < 5) {
      warrior = {health: 10, magic:0};
    } else {
      warrior = {health: 10, magic:10};
    }
    return warrior;
  }

  public static getFarmer(level: number) : GameCharacter {
    let farmer : GameCharacter;
    if(level < 5) {
      farmer = {health: 2, magic:0};
    } else {
      farmer = {health: 5, magic:0};
    }
    return farmer;
  }
}

const warrior = GameCharactersFactory.getWarrior(10);
const farmer = GameCharactersFactory.getFarmer(2);
```

Similar to different create methods in valueObjects in DDD

```ts
export class MemberState extends ValueObject<IMemberStateProps> {
  ...
  public static createActive(): Result<MemberState> {
    return MemberState.create({ value: MemberStateEnum.ACTIVE });
  }

  public static createPending(): Result<MemberState> {
    return MemberState.create({ value: MemberStateEnum.PENDING });
  }

  public static createDeactivated(): Result<MemberState> {
    return MemberState.create({ value: MemberStateEnum.DEACTIVATED });
  }
  ...
}
```

#### Approach 2 
Reference : [Refactoring Guru](https://refactoring.guru/design-patterns/factory-method) 

TODO - was unclear 

<br/>

## Object pool

* An object pool is a collection of pre-initialized objects whose initialization is heavy weight 
* Every time we need an object we can take from the pool 
* Instead of creating one and destroying them once done, we create a pool of lets say 20 objects
* Once done, you return them back to the pool or destroy them

### Is the object pool deprecated ?
* With advancements in programming languages and general speed in which we can instanciate object, maintaining an object pool is more of a headache then it is useful
* However object pooling is still very useful in game development. In gaming where you need instances like guns, bullets, trees, its helpful to not have to initialize them every time

### How to implement the solution 
Object pool is usually implemented in combination with factory design pattern

```ts
/* Continuing from example in factory pattern */
export class GameCharacterPool {
  private warriorPool : GameCharacter[] = [];

  static WARRIOR_POOL_SIZE = 20;

  constructor(level: number){
    this.level = level
    this.loadWarriorPool();
  }

  private loadWarriorPool() {
    for(let i=0; i < GameCharacterPool.WARRIOR_POOL_SIZE; i++) {
      this.warriorPool.push(GameCharactersFactory.getWarrior(this.level))
    }
  }

  private getPoolItem<T>(pool: T[], reloadFn: () => void): T {
    let item: T = pool.pop() as T;
    if(!pool.length) {
      reloadFn();
    }
    return item;
  }

  public getWarrior(): GameCharacter {
    return this.getPoolItem(this.warriorPool, this.loadWarriorPool);
  }
}

// app.js
let pool = new GameCharacterPool(12);
const warrior = pool.getWarrior();
```

<br/>

## Builder

The Builder pattern is a creational design pattern that is used to construct a complex object step by step.     
It separates the construction of a complex object from its representation, allowing the same construction process to create various representations


<p align="center">
<img src="https://refactoring.guru/images/patterns/diagrams/builder/problem1-2x.png" width="700px" >
</p>

**The Problem**   
Let’s think about how to create a House object. To build a simple house, you need to construct four walls and a floor, install a door, fit a pair of windows, and build a roof. But what if you want a bigger, brighter house, with a backyard and other goodies   

Solution 1 -    
The simplest solution is to extend the base House class and create a set of subclasses to cover all combinations of the parameters. But eventually you’ll end up with a considerable number of subclasses. Any new parameter, such as the porch style, will require growing this hierarchy even more.   

Solution 2 -    
You can create a giant constructor right in the base House class with all possible parameters that control the house object. While this approach indeed eliminates the need for subclasses, it creates another problem. In most cases most of the parameters will be unused, making the constructor calls pretty ugly.    
For instance, only a fraction of houses have swimming pools, so the parameters related to swimming pools will be useless nine times out of ten.   
`house = new House(4, 2, 1, true, null, null, true, null)`


The Builder pattern suggests that you extract the object construction code out of its own class and move it to separate objects called builders.   
You can go further and extract a series of calls to the builder steps you use to construct a product into a separate class called director. The director class defines the order in which to execute the building steps, while the builder provides the implementation for those steps.



**Real-World Analogy**   
* Car manufacturing company   
A customer might want a car with specific features, such as a powerful engine, leather seats, and a sunroof. However, the manufacturing process involves various steps, from assembling the chassis to adding different components like the engine, seats, and accessories.

* Meal Ordering System:    
Consider a customizable meal ordering system, where a customer can select from various components such as a main dish, side dishes, and drinks. The Builder pattern can be used to facilitate the construction of the meal based on the customer's specific choices.

**When to use builder pattern**
* When you have a telescoping constructor or a constructor with many optional parameters


### Example 1 - Car manufacturing process

```ts
// Product
class Car {
  private carParts: string[] = [];

  public listParts(): void {
    console.log(`Car parts: ${this.carParts.join(', ')}\n`);
  }

  public addPart(part: string): void {
    this.carParts.push(part);
  }
}

// Builder
interface CarBuilder {
  reset(): void;
  setSeats(seats: number): void;
  setEngine(horsepower: number): void;
  setTripComputer(): void;
  setGPS(): void;
}

// Concrete Builder
class JeepBuilder implements CarBuilder {
  private car: Car;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.car = new Car();
  }

  setSeats(seats: number): void {
    this.car.addPart(`Seats: ${seats}`);
  }

  setEngine(horsepower: number): void {
    this.car.addPart(`Engine: ${horsepower}HP`);
  }

  setTripComputer(): void {
    this.car.addPart('Trip Computer installed');
  }

  setGPS(): void {
    this.car.addPart('GPS installed');
  }

  getResult(): Car {
    const result = this.car;
    this.reset();
    return result;
  }
}

// Director
class CarBuildDirector {
  private builder: CarBuilder;

  setBuilder(builder: CarBuilder): void {
    this.builder = builder;
  }

  constructSUV(): void {
    this.builder.reset();
    this.builder.setSeats(5);
    this.builder.setEngine(250);
    this.builder.setTripComputer();
    this.builder.setGPS();
  }
}

// Example usage
const director = new CarBuildDirector();
const builder = new JeepBuilder();

director.setBuilder(builder);

director.constructSUV();

const car = builder.getResult();
car.listParts();
```

### Example 2 - Complex database queries in DDD

```ts
/* Builder */
export interface TemplateQueryBuilderProps {
  query?: TemplateQuery;
  paginationOptions?: TemplatePaginationOptions;
}

export class TemplateQueryBuilder {
  private query: TemplateQuery;
  private sortBy: Record<string, 1 | -1>;
  private paginationOptions: TemplatePaginationOptions;

  private constructor(props: TemplateQueryBuilderProps) {
    this.query = props.query || {};
    this.sortBy = {};
    this.paginationOptions = props.paginationOptions || TemplatePaginationOptions.create().getValue();
  }

  setVisibilityPublic(): TemplateQueryBuilder {
    this.query.visibility = TemplateVisibilityEnum.PUBLIC;
    return this;
  }

  setAllBlockTypesExceptGivePoints(): this {
    this.query["blocks.type"] = { $ne: BlockTypeEnum.GIVE_POINTS_STACK };
    return this;
  }

  setCategories(categories: string[]): this {
    this.query["$or"] = this.query["$or"] || [];
    this.query["$or"].push({ category: { $in: categories } });
    return this;
  }

  setSearchByTitle(searchKeyword: string): this {
    const searchString = TextUtil.escapeSpecialCharsForRegExp(searchKeyword);
    const searchRegex = new RegExp(searchString, "i");

    this.query["title"] = searchRegex;
    return this;
  }

  sortByTitleAsc(): TemplateQueryBuilder {
    this.sortBy["title"] = 1;
    return this;
  }

  build(): ITemplateQueryBuilderResponse {
    return {
      query: this.query,
      sortBy: this.sortBy,
      paginationOptions: this.paginationOptions
    };
  }

  static create(props: TemplateQueryBuilderProps): Result<TemplateQueryBuilder> {
    return Result.ok<TemplateQueryBuilder>(new TemplateQueryBuilder({ ...props }));
  }
}

/* Repo methods to fetch using builder */
export interface ITemplateRepo {
  getTemplateQueryBuilder(props?: TemplateQueryBuilderProps): TemplateQueryBuilder;
  getTemplatesByBuilder(build: ITemplateQueryBuilderResponse): Promise<TemplateDetails[]>;
}

export class TemplateRepo implements ITemplateRepo {
  ...
  public getTemplateQueryBuilder(props?: TemplateQueryBuilderProps): TemplateQueryBuilder {
    const resultOrError = TemplateQueryBuilder.create(props);
    return resultOrError.isSuccess ? resultOrError.getValue() : null;
  }

  public async getTemplatesByBuilder(build: ITemplateQueryBuilderResponse): Promise<TemplateDetails[]> {
    const sortBy = build.sortBy || { title: 1 };
    const templatesQuery = this.TemplateModel.find(build.query);
    templatesQuery.sort(sortBy).allowDiskUse(true).lean();

    const templates = await templatesQuery.exec();
    return templates.map((t) => TemplateDetailsMap.toDomain(t));
  }
}

/* Usage in usecase */
const templateBuilder = this.repos.templateRepo.getTemplateQueryBuilder({ paginationOptions: pagination });
templateBuilder.setVisibilityPublic();
templateBuilder.sortByTitleAsc();
templateBuilder.setCategories(categories);

const templates = await this.repos.templateRepo.getPaginatedTemplatesByBuilder(templateBuilder.build());
```

<br/>


## Abstract factory

The Abstract Factory pattern is a creational design pattern that provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's used when there's a need to create a set of related or dependent objects.    
This pattern allows the client code to use the interface for creating these objects, without being concerned about the implementation logic

  ```ts
  // Abstract product: Button
  interface Button {
      render(): void;
  }

  // Concrete product: LightButton
  class LightButton implements Button {
      render(): void {
          console.log('Rendering LightButton');
      }
  }

  // Concrete product: DarkButton
  class DarkButton implements Button {
      render(): void {
          console.log('Rendering DarkButton');
      }
  }

  // Abstract product: Input
  interface Input {
      render(): void;
  }

  // Concrete product: LightInput
  class LightInput implements Input {
      render(): void {
          console.log('Rendering LightInput');
      }
  }

  // Concrete product: DarkInput
  class DarkInput implements Input {
      render(): void {
          console.log('Rendering DarkInput');
      }
  }

  // Abstract Factory: ThemeFactory
  interface ThemeFactory {
      createButton(): Button;
      createInput(): Input;
  }

  // Concrete Factory: LightThemeFactory
  class LightThemeFactory implements ThemeFactory {
      createButton(): Button {
          return new LightButton();
      }

      createInput(): Input {
          return new LightInput();
      }
  }

  // Concrete Factory: DarkThemeFactory
  class DarkThemeFactory implements ThemeFactory {
      createButton(): Button {
          return new DarkButton();
      }

      createInput(): Input {
          return new DarkInput();
      }
  }

  // Client code
  function applyTheme(themeFactory: ThemeFactory) {
      const button = themeFactory.createButton();
      const input = themeFactory.createInput();

      button.render();
      input.render();
  }

  // Usage
  const lightThemeFactory = new LightThemeFactory();
  const darkThemeFactory = new DarkThemeFactory();

  applyTheme(lightThemeFactory);
  applyTheme(darkThemeFactory);
  ```

<br/>




## Prototype

Prototype is a creational design pattern that lets you copy existing objects without making your code dependent on their classes.

<p align="center">
<img src="https://refactoring.guru/images/patterns/content/prototype/prototype-2x.png" width="700px" >
</p>

**Problem**   
Say you have an object, and you want to create an exact copy of it. How would you do it? First, you have to create a new object of the same class. Then you have to go through all the fields of the original object and copy their values over to the new object.
   
Nice! But there’s a catch. Not all objects can be copied that way because some of the object’s fields may be private and not visible from outside of the object itself.

   
There’s one more problem with the direct approach. Since you have to know the object’s class to create a duplicate, your code becomes dependent on that class. If the extra dependency doesn’t scare you, there’s another catch. Sometimes you only know the interface that the object follows, but not its concrete class, when, for example, a parameter in a method accepts any objects that follow some interface.

**Real-World Analogy**   
* Photocopying a Document:   
Consider a scenario where you need multiple copies of a document. Instead of rewriting the entire document every time, you can use a photocopy machine to create copies from an original document. Here, the original document acts as the prototype, and the copies are created from it, saving time and effort.

* Baking Cookies from a Recipe:   
When you bake cookies using a recipe, you follow a set of instructions to create multiple cookies that have the same taste and texture. The recipe serves as the prototype, and you can make multiple batches of cookies using the same instructions without having to create a new set of instructions each time.

* Cloning of Plants:   
In agriculture, the process of cloning plants involves taking a cutting from an existing plant and allowing it to grow into a new plant with identical characteristics. The original plant acts as the prototype, and the new plant inherits all the features of the original, including its genetic makeup and traits.

**Scenarios where pattern should be used**   


### Example 1
  ```ts
  // Creating an interface for the car prototype
  interface CarPrototype {
    clone(): CarPrototype;
    getInfo(): void;
  }

  // Creating a concrete car prototype class
  class BasicCar implements CarPrototype {
    private brand: string;
    private model: string;

    constructor(brand: string, model: string) {
      this.brand = brand;
      this.model = model;
    }

    // Implementing the clone method to create a copy of the current car prototype
    clone(): CarPrototype {
      return new BasicCar(this.brand, this.model);
    }

    // Method to get information about the car
    getInfo(): void {
      console.log(`Brand: ${this.brand}, Model: ${this.model}`);
    }

    // Method to modify car details
    modifyDetails(brand: string, model: string): void {
      this.brand = brand;
      this.model = model;
    }
  }

  // Usage of the Prototype pattern
  const prototypeCar = new BasicCar('Toyota', 'Corolla');

  // Creating multiple instances of the car prototype using cloning
  const car1 = prototypeCar.clone();
  const car2 = prototypeCar.clone();

  // Modifying properties of the cloned cars
  car1.modifyDetails('Honda', 'Civic');
  car2.modifyDetails('Ford', 'Fiesta');

  car1.getInfo(); // Brand: Honda, Model: Civic
  car2.getInfo(); // Brand: Ford, Model: Fiesta
  ```

### Relations with Other Patterns
* Prototype can help when you need to save copies of Commands into history

* Prototype isn’t based on inheritance, so it doesn’t have its drawbacks. On the other hand, Prototype requires a complicated initialization of the cloned object. Factory Method is based on inheritance but doesn’t require an initialization step.

* Sometimes Prototype can be a simpler alternative to Memento. This works if the object, the state of which you want to store in the history, is fairly straightforward and doesn’t have links to external resources, or the links are easy to re-establish.

<br/>
<br/>


---

## Structural Patterns

> These patterns explain how to assemble objects and classes into larger structures, while keeping these structures flexibile and efficient

## Decorator

The Decorator Design Pattern is a structural design pattern that allows you to dynamically add or modify behavior to individual objects without altering their class

<p align="center">
<img src="https://refactoring.guru/images/patterns/content/decorator/decorator-2x.png" width="700px" >
</p>

### Real-World Analogy
Wearing clothes is an example of using decorators. When you’re cold, you wrap yourself in a sweater. If you’re still cold with a sweater, you can wear a jacket on top. If it’s raining, you can put on a raincoat. All of these garments “extend” your basic behavior but aren’t part of you, and you can easily take off any piece of clothing whenever you don’t need it.

### Example 1 - Notifier
Consider you have a notifier class and a few sub classes for SMS notifier, Facebook notifier, Slack notifier   
Now you want to send several combined notifications, for that you will have to create separate sub classes for all possible combinations   
SMS + slack notifier, SMS + facebook notifier, all channel notifier etc   
   
Extending a class is the first thing that comes to mind when you need to alter an object’s behavior. However, inheritance has several serious caveats that you need to be aware of   
* Inheritance is static. You can’t alter the behavior of an existing object at runtime. You can only replace the whole object with another one that’s created from a different subclass.
* Subclasses can have just one parent class. In most languages, inheritance doesn’t let a class inherit behaviors of multiple classes at the same time.   

One of the ways to overcome these caveats is by using Aggregation or Composition  instead of Inheritance.   
Aggregation/composition is the key principle behind many design patterns, including Decorator   
[for more details](https://refactoring.guru/design-patterns/decorator)

```ts
// 1. A Notifier interface with send method
// 2. A Base decorator that implements Notifier
// 3. Individual decorators for SMS, facebook, slack
// 4. Client code

const stack = new Notifier();
if(facebookEnabled) {
  stack = new FacebookDecorator(stack);
}
if(slackEnabled) {
  stack = new SlackDecorator(stack)
}
app.setNotifier(stack)

notifier.sendAlert("House on fire") // sent via facebook and slack
```


### Example 2 - Coffee maker

  ```ts
  // Step 1: Define an interface for the component (base class).
  interface Coffee {
      cost(): number;
  }

  // Step 2: Create a concrete component (base class implementation).
  class SimpleCoffee implements Coffee {
      cost(): number {
          return 5; // Cost of a simple coffee
      }
  }

  // Step 3: Create decorator classes that extend the component and add behavior.
  class MilkDecorator implements Coffee {
      private coffee: Coffee;

      constructor(coffee: Coffee) {
          this.coffee = coffee;
      }

      cost(): number {
          return this.coffee.cost() + 2; // Add the cost of milk
      }
  }

  class SugarDecorator implements Coffee {
      private coffee: Coffee;

      constructor(coffee: Coffee) {
          this.coffee = coffee;
      }

      cost(): number {
          return this.coffee.cost() + 1; // Add the cost of sugar
      }
  }

  // Step 4: Client code that uses decorators.
  const myCoffee: Coffee = new SimpleCoffee();
  console.log("Cost of simple coffee:", myCoffee.cost()); // 5

  const coffeeWithMilk: Coffee = new MilkDecorator(myCoffee);
  console.log("Cost of coffee with milk:", coffeeWithMilk.cost()); // 7

  const coffeeWithMilkAndSugar: Coffee = new SugarDecorator(coffeeWithMilk);
  console.log("Cost of coffee with milk and sugar:", coffeeWithMilkAndSugar.cost()); // 8
  ```

The same can be achieved through builder pattern as well    
For simple cases like the coffee example, either pattern can be adapted, and the choice may come down to personal preference or the specific needs of your application.   

```ts
class Coffee {
    private hasMilk: boolean = false;
    private hasSugar: boolean = false;
    private cost: number = 5;

    addMilk(): Coffee {
        if (!this.hasMilk) {
            this.cost += 2; // Add the cost of milk only once
            this.hasMilk = true;
        }
        return this; // Return the coffee object to allow chaining
    }

    addSugar(): Coffee {
        if (!this.hasSugar) {
            this.cost += 1; // Add the cost of sugar only once
            this.hasSugar = true;
        }
        return this; // Return the coffee object to allow chaining
    }

    getCost(): number {
        return this.cost;
    }
}

const coffeeWithMilkAndSugar = new Coffee()
    .addMilk()
    .addSugar();

console.log("Cost of coffee with milk and sugar:", coffeeWithMilkAndSugar.getCost());
```


### Example 3 - Computer
[udemy lecture](https://www.udemy.com/course/design-patterns-in-typescript/learn/lecture/11677752)

  ```ts
  class Computer {
    boot() : void {
      console.log(`Booting computer`);
    }
    print() : void {
      console.log(`No printer attached`);
    }
    renderVideo() : void {
      console.log(`Cannot render video without graphics card`);
    }
  }

  class ServerComputer extends Computer {
    boot() : void {
      console.log(`Booting server`);
    }
  }

  class ComputerDecorator extends Computer {
    private computer: Computer;

    constructor(computer: Computer) {
      super();
      this.computer = computer;
    }

    boot() : void {
      return this.computer.boot();
    }
    print() : void {
      return this.computer.print();
    }
    renderVideo() : void {
      return this.computer.renderVideo();
    }
  }

  class PrinterDecorator extends ComputerDecorator {
    constructor(computer: Computer) {
      super(computer);
    }

    print() : void {
      console.log(`Printing sheet`);
    }
  }

  class GraphicsDecorator extends ComputerDecorator {
    constructor(computer: Computer) {
      super(computer);
    }

    renderVideo() : void {
      console.log(`Rendering Video`);
    }
  }

  let computerWithPrinterAndGraphics = new GraphicsDecorator(new PrinterDecorator(new ServerComputer()))

  computerWithPrinterAndGraphics.print();
  computerWithPrinterAndGraphics.renderVideo();
  ```

### Decorator vs Builder (when to use which)
#### Decorator
* Use the Decorator pattern when you want to add or modify behavior of objects without changing their actual code. Decorators are suitable for adding responsibilities to individual objects dynamically.
* Use the Decorator pattern when you need a flexible and reusable way to add or modify behavior. Decorators allow you to create combinations of behaviors dynamically by stacking decorators.

**Scenarios where Decorator pattern suits better**
* User Permissions and Authentication: Consider a user authentication system where users have different roles and permissions. The decorator pattern can be used to dynamically add or remove permissions to user objects, allowing for flexible access control.
* Logging and Monitoring: In a logging or monitoring system, you may want to add various logging behaviors (e.g., log to a file, log to a database, send notifications) to different parts of your application. The decorator pattern can dynamically add these behaviors without changing the core classes.
* UI Components: In graphical user interface (GUI) development, you often have UI components (e.g., buttons, text fields) that may need to have various decorations (e.g., borders, shadows) applied. The decorator pattern can be used to add these decorations dynamically.
* Encryption and Compression: When dealing with data transmission or storage, you may want to apply encryption and compression to data streams. The decorator pattern can be used to wrap data streams with encryption and compression decorators as needed.

**Real-world Analogies**
* Wearing layers of clothing 
* Text Formatting - Imagine a word processing software where you can apply formatting options like bold, italic, underline, and font color to a text. Each formatting option acts as a decorator, modifying the appearance of the text without changing its content.
* Vehicle Customization - When customizing a vehicle (e.g., a car or a bike), you can add accessories like spoilers, custom paint, and decals. These accessories decorate the vehicle, adding style and functionality without altering the vehicle's core structure.
* Food Toppings - When ordering a pizza or a sandwich, you can choose from a variety of toppings such as cheese, vegetables, meats, and sauces. Each topping can be thought of as a decorator, enhancing the flavor and texture of the dish.


#### Builder 
* Use the Builder pattern when you are dealing with complex objects that have many optional components or configurations. Builders excel at constructing objects with numerous parameters or attributes.
* Builders are typically used when you want to create an object with a significant number of optional parameters and you want to avoid telescoping constructors (constructors with many parameters) or having a large number of constructor overloads.
* Use the Builder pattern when the construction process involves multiple steps and the **order of those steps matters**

**Scenarios where Builder pattern suits better**
* Database Query Builder : When constructing complex database queries with various conditions, joins, and clauses, a builder pattern can be more intuitive. Each method call adds a specific part to the query, and the order in which you specify conditions can be crucial.
* Document Generation : Suppose you are generating documents (e.g., PDFs or Word documents) with different formatting, styles, and content elements. A builder pattern can help construct documents step by step, allowing for precise control over the document structure
* Immutable Objects : When working with immutable objects, the builder pattern is often preferred. Immutable objects cannot be modified once created, so a builder can help you construct these objects with various attributes.

**Real-world Analogies**
* Meal Ordering - When you order a meal at a restaurant, you can customize it by choosing specific appetizers, main courses, sides, and desserts. The menu acts as a builder, allowing you to build your meal with various components.
* Car Configuration - When ordering a custom car from a manufacturer, you can specify the car's make, model, engine, color, interior features, and optional accessories. The car configuration process is similar to using a builder to create a custom car.
* Toy Assembly - Building a complex toy or model kit involves assembling various parts according to instructions. The assembly process can be likened to a builder pattern, where you follow step-by-step instructions to construct the final toy or model.

<br/>

## Adapter

Adapter is a structural design pattern, which allows incompatible objects to collaborate.   

It is used to connect similar objects with different interfaces
   
The Adapter acts as a wrapper between two objects. It catches calls for one object and transforms them to format and interface recognizable by the second object.

**Real-world Analogies**   
When you travel from the US to Europe for the first time, you may get a surprise when trying to charge your laptop. The power plug and sockets standards are different in different countries. That’s why your US plug won’t fit a German socket. The problem can be solved by using a power plug adapter that has the American-style socket and the European-style plug.

**Scenarios where Adapter pattern suits**
* Legacy Code Integration - It’s very often used in systems based on some legacy code. In such cases, Adapters make legacy code work with modern classes.

* Database Adapters - When switching between different database systems, you can create database adapters to abstract the differences in database interfaces. This allows your application to work seamlessly with different database systems without changing the core code.

* Third-Party Libraries Integration - When you're using a third-party library or API that doesn't quite match your application's interface. You can create an adapter that wraps around the third-party code and presents it in a way that's more convenient for your application.

* Language Translation: If you're building a multilingual application, you can use adapters to switch between different translation services or libraries seamlessly.

* File Format Conversion: Adapters can be useful when dealing with different file formats, such as converting data from XML to JSON or vice versa.


### Example 1 - Database Adapters

  ```ts
  class MongoDB {
    // MongoDB-specific methods
    connect() {}
    findOne() {}
    // ...
  }

  class MySQL {
    // MySQL-specific methods
    connectDB() {}
    query() {}
    // ...
  }

  // Adapter for MySQL to make it compatible with MongoDB interface
  class MySQLAdapter {
    constructor(private mySQL: MySQL) {}
    
    connect() {
      this.mySQL.connectDB();
    }
    
    findOne() {
      this.mySQL.query('SELECT * FROM table LIMIT 1');
      // Adapt the result to match MongoDB's format
      return { _id: 1, data: {} };
    }
  }
  ```


### Example 2 - Countries

```ts
/* 
  You have an application which lists countries by continent, currency, etc
  Initially the countries were persisted-in and read from json files
  As the app grew larger and json was tough to maintain, you realized you need to use an external api for listing countries
*/

// Initial code - reading from JSON
interface Country {
  name : string,
  capital : string,
  currency : string
}

class CountriesRepository {
  public getCountriesByContinent(continent: string): Promise<Country[]>{
    // read file with corresponding continent name, format response and return
  }

  public getCountriesByCurrency(currency: string): Promise<Country[]>{
    // read all files to get list of all countries, filter by currency and return
  }
}

const countriesRepo = new CountriesRepository()
const allEuroCountries = countriesRepo.getCountriesByCurrency("EUR");
```

```ts
// Using Adapter pattern to read from API

// Step 1 - create an interface according to existing implementation
interface ICountriesRepository {
  getCountriesByContinent(continent: string): Promise<Country[]>
  getCountriesByCurrency(currency: string): Promise<Country[]>
}

// Step 2 - Both existing class and new class should implement the interface
class CountriesRepository implements ICountriesRepository {
  // ...
}

class RestCountriesAdapter implements ICountriesRepository {
  // private methods that fetch countries using api
  // private helper methods that help format to required type
  // private methods for compatibility, eg api considers north and south americas as same continent, add necessary conditions to handle those cases
  // public methods as specified by interface
}

// Step 3 - Use new adapter class
const countriesRepo = new RestCountriesAdapter()
const allEuroCountries = countriesRepo.getCountriesByCurrency("EUR");
```


### Example 3 - Language Translator

```ts
interface LanguageTranslator {
  translate(text: string, sourceLanguage: string, targetLanguage: string): string;
}

// Adapter for Google Translate
class GoogleTranslateAdapter implements LanguageTranslator {
  private googleTranslate: GoogleTranslateService;

  constructor() {
    this.googleTranslate = new GoogleTranslateService();
  }

  translate(text: string, sourceLanguage: string, targetLanguage: string): string {
    // Adapt Google Translate's API to the common interface
    return this.googleTranslate.translateText(text, sourceLanguage, targetLanguage);
  }
}

// Adapter for Microsoft Translator
class MicrosoftTranslatorAdapter implements LanguageTranslator {
  private microsoftTranslator: MicrosoftTranslatorService;

  constructor() {
    this.microsoftTranslator = new MicrosoftTranslatorService();
  }

  translate(text: string, sourceLanguage: string, targetLanguage: string): string {
    // Adapt Microsoft Translator's API to the common interface
    return this.microsoftTranslator.translateText(text, sourceLanguage, targetLanguage);
  }
}
```

<br/>

## Facade

The Facade pattern is a structural design pattern that provides a simplified, higher-level interface to a complex subsystem, making it easier to use.    
It's often used when you have a complex system with many components and you want to provide a unified and simplified interface for clients to interact with


<p align="center">
<img src="https://refactoring.guru/images/patterns/content/facade/facade-2x.png" width="700px" >
</p>

The facade pattern is an implementation of Principle of least (Law of Demeter) : Every component should have little or no knowledge of how other components work and only communicate with a selected few

**My take**   
It is similar to some services in DDD codebase   
Eg - criteriaService.addMember method takes care of adding member to criteria array, creating criteriaHasMember relation, updating count of members etc   
It takes in multiple repos and makes updates to all required collections

**Cons**
* A facade can become a god object coupled to all classes of an app.   
In object-oriented programming, a god object (sometimes also called an omniscient or all-knowing object) is an object that references a large number of distinct types, has too many unrelated or uncategorized methods, or some combination of both.[1] The god object is an example of an anti-pattern and a code smell

**Real-world Analogies**   
* Think of a hotel concierge as a facade for the various services a hotel offers. Instead of guests having to interact with multiple departments (e.g., room service, housekeeping, restaurant reservations), they can simply approach the concierge, who acts as a single point of contact to fulfill their requests. The concierge handles the complexities behind the scenes and provides a streamlined experience for the guests.
   
* A personal assistant can act as a facade for an executive or business leader. The personal assistant manages their schedule, screens calls, arranges meetings, and handles administrative tasks, shielding the executive from the complexity of managing these aspects of their work.

* An e-commerce website serves as a facade for a complex backend system that manages inventory, payment processing, order fulfillment, and customer accounts. Shoppers interact with the website's user-friendly interface without needing to understand the inner workings of the logistics and payment systems.

<br/>

**Scenarios where Facade pattern suits**
* Payment Processing System - In a payment processing system, you might have various components like payment gateways, fraud detection, currency conversion, and transaction logging. Creating a facade for these components can simplify the process of making a payment for the client code

* Video Conversion Library - Suppose you have a library for converting video files from one format to another. Behind the scenes, this library might use various codecs, file parsers, and video processing algorithms. A facade can provide a simple method to convert a video without exposing the intricacies of codec selection, quality settings, or format-specific options.

* Third-party API Integration - When integrating with third-party APIs, you can create a facade that wraps the API calls and provides a more intuitive and consistent interface for your application. This can include handling authentication, error handling, and rate limiting, making it easier to work with the external service

* Graphics Rendering Engine - If you're building a graphics-intensive application, like a game or a 3D modeling tool, you can use a facade to simplify the interaction with the underlying graphics rendering engine. This can hide the complexity of rendering pipelines, shaders, and hardware-specific optimizations.

### Example 1 - Audio system 
  ```ts
  // Subsystem 1: Audio Player
  class AudioPlayer {
    playAudio(file: string): void {
      console.log(`Playing audio: ${file}`);
    }

    stopAudio(): void {
      console.log('Stopping audio playback');
    }
  }

  // Subsystem 2: Volume Control
  class VolumeControl {
    setVolume(volume: number): void {
      console.log(`Setting volume to ${volume}`);
    }
  }

  // Subsystem 3: Audio Equalizer
  class AudioEqualizer {
    applyEqualizerPreset(preset: string): void {
      console.log(`Applying equalizer preset: ${preset}`);
    }
  }

  /* 
  The AudioSystemFacade class encapsulates all subsystems and provides high-level methods like playMusicWithEQ and stopMusic, 
  which simplify the process of playing audio with equalization
  */
  // Facade for the Audio System
  class AudioSystemFacade {
    private audioPlayer: AudioPlayer;
    private volumeControl: VolumeControl;
    private audioEqualizer: AudioEqualizer;

    constructor() {
      this.audioPlayer = new AudioPlayer();
      this.volumeControl = new VolumeControl();
      this.audioEqualizer = new AudioEqualizer();
    }

    playMusicWithEQ(file: string, volume: number, preset: string): void {
      console.log('----- Starting Audio System -----');
      this.audioEqualizer.applyEqualizerPreset(preset);
      this.audioPlayer.playAudio(file);
      this.volumeControl.setVolume(volume);
    }

    stopMusic(): void {
      console.log('----- Stopping Audio System -----');
      this.audioPlayer.stopAudio();
    }
  }

  /* The client code interacts with the facade (audioFacade) instead of dealing directly with the individual subsystems */
  // Client Code
  const audioFacade = new AudioSystemFacade();

  audioFacade.playMusicWithEQ('song.mp3', 80, 'Rock');
  // Output:
  // ----- Starting Audio System -----
  // Applying equalizer preset: Rock
  // Playing audio: song.mp3
  // Setting volume to 80

  audioFacade.stopMusic();
  // Output:
  // ----- Stopping Audio System -----
  // Stopping audio playback

  ```


<br/>

## Composite

Composite is a structural design pattern that lets you compose objects into tree structures to represent part-whole hierarchies and then work with these structures as if they were individual objects

The Composite pattern lets you run a behavior recursively over all components of an object tree

This pattern is particularly useful when you need to work with objects that have a hierarchical structure and you want to treat individual objects and groups of objects in a consistent way.


<p align="center">
<img src="https://refactoring.guru/images/patterns/content/composite/composite-2x.png" width="700px" >
</p>

The greatest benefit of this approach is that you don’t need to care about the concrete classes of objects that compose the tree. You don’t need to know whether an object is a simple product or a sophisticated box. You can treat them all the same via the common interface. When you call a method, the objects themselves pass the request down the tree.

* Keep in mind that the implementing Composite pattern might violate the Interface Segregation Principle because the methods will be empty in the leaf class. However, the client will be able to treat all the elements equally, even when composing the tree.

**Pros**  
* You can work with complex tree structures more conveniently: use polymorphism and recursion to your advantage.


**Real-world Analogies** 

* Imagine you have a deck of cards, the deck can have individual cards as well as other sub decks, and those decks can further have individual cards as well as other sub decks

* Imagine that you have two types of objects: Products and Boxes. A Box can contain several Products as well as a number of smaller Boxes. These little Boxes can also hold some Products or even smaller Boxes, and so on.

* Directories can contain files and other directories, creating a hierarchical structure

**Scenarios where Composite pattern suits**
* File Systems - A file system can be modeled using the Composite Pattern. Directories can contain files and other directories, creating a hierarchical structure. Operations like copying and deleting can be performed uniformly on both files and directories.

* Menu Systems - In a menu system for a restaurant or a software application, menus can have items, and submenus can contain more items or submenus. The Composite Pattern can be used to build and manage menu structures

* Document Object Models (DOM) - In web development, the DOM is a perfect example of a part-whole hierarchy. HTML documents consist of elements, which can contain other elements, forming a tree structure. The Composite Pattern is used to represent and manipulate the DOM

* Bill of Materials (BOM) - In manufacturing and engineering, a bill of materials represents the hierarchy of components and subcomponents required to build a product

* Mathematical Expressions - Representing mathematical expressions as trees, where operators and operands are nodes in the tree. This can be useful for parsing and evaluating expressions.

### Example 1 - Deck of cards
  ```ts
  abstract class Card {
    abstract display(): void;
  }

  class PlayingCard extends Card {
    constructor(private rank: string, private suit: string) {
      super();
    }

    display(): void {
      console.log(`${this.rank} of ${this.suit}`);
    }
  }

  class DeckOfCards extends Card {
    private cards: (Card | DeckOfCards)[] = [];

    addItem(item: Card | DeckOfCards): void {
      this.cards.push(item);
    }

    display(): void {
      for (const item of this.cards) {
        /* method called recursively incase of deck of cards */
        item.display();
      }
    }
  }

  // Usage
  const aceOfSpades = new PlayingCard("Ace", "Spades");
  const twoOfHearts = new PlayingCard("2", "Hearts");

  const deck1 = new DeckOfCards();
  deck1.addItem(aceOfSpades);
  deck1.addItem(twoOfHearts);

  const deck2 = new DeckOfCards();
  deck2.addItem(new PlayingCard("King", "Diamonds"));
  deck2.addItem(new PlayingCard("10", "Clubs"));

  deck1.addItem(deck2);

  deck1.display();
  /* 
  Ace of Spades
  2 of Hearts
  King of Diamonds
  10 of Clubs
  */
  ```

### Example 2 - Box of products 

  ```ts
  abstract class Item {
    abstract getPrice(): number;
  }

  class Product extends Item {
    constructor(private name: string, private price: number) {
      super();
    }

    getPrice(): number {
      return this.price;
    }
  }

  class Box extends Item {
    private items: Item[] = [];

    addItem(item: Item): void {
      this.items.push(item);
    }

    getPrice(): number {
      let total = 0;
      for (const item of this.items) {
        /* 
          This method leverages polymorphism
          If the item is a product, its getPrice method is called
          If the item is a box, the box's getPrice method is called recursively
        */
        total += item.getPrice();
      }
      return total;
    }
  }

  // Usage
  const laptop = new Product("Laptop", 1000);
  const smartphone = new Product("Smartphone", 500);

  console.log(`Total cost of laptop: $${laptop.getPrice()}`) // 1000

  const accessoryBox = new Box();
  accessoryBox.addItem(new Product("Keyboard", 50));
  accessoryBox.addItem(new Product("Mouse", 30));

  console.log(`Total cost of accessoryBox: $${accessoryBox.getPrice()}`) // 80

  const bigBox = new Box();
  bigBox.addItem(laptop);
  bigBox.addItem(smartphone);
  bigBox.addItem(accessoryBox);

  console.log(`Total cost of the big box: $${bigBox.getPrice()}`); // 1580
  ```

### Composite vs Decorator pattern
* Composite and Decorator have similar structure diagrams since both rely on recursive composition to organize an open-ended number of objects.

* A Decorator is like a Composite but only has one child component.   

* Decorator adds additional responsibilities to the wrapped object, while Composite just “sums up” its children’s results.


<br/>

## Bridge

<p align="center">
<img src="https://refactoring.guru/images/patterns/diagrams/bridge/problem-en-2x.png" width="700px" >
</p>


**Problem**   
Say you have a geometric Shape class with a pair of subclasses: Circle and Square. You want to extend this class hierarchy to incorporate colors, so you plan to create Red and Blue shape subclasses   
However, since you already have two subclasses, you’ll need to create four class combinations such as BlueCircle and RedSquare   
Adding new shape types and colors to the hierarchy will grow it exponentially. For example, to add a triangle shape you’d need to introduce two subclasses, one for each color   
   
This problem occurs because we’re trying to extend the shape classes in two independent dimensions: by form and by color
   
The Bridge pattern attempts to solve this problem by switching from inheritance to the object composition
   
Following this approach, we can extract the color-related code into its own class with two subclasses: Red and Blue. The Shape class then gets a reference field pointing to one of the color objects. Now the shape can delegate any color-related work to the linked color object. That reference will act as a bridge between the Shape and Color classes


**My Take**   
Nothing fancy here, its simple, we would use a field for colour in objects of shape class   
The colour property instead of making a string we should make it of type colour 

### Example 1 - Colour 

  ```ts
  // Abstraction - Shape
  interface Shape {
    getColor(): Color;
    setColor(color: Color): void;
    draw(): void;
  }

  // Concrete Abstraction - Circle
  class Circle implements Shape {
    private color: Color;

    constructor(color: Color) {
      this.color = color;
    }

    getColor(): Color {
      return this.color;
    }

    setColor(color: Color): void {
      this.color = color;
    }

    draw(): void {
      console.log(`Drawing a ${this.color.getColorName()} circle`);
    }
  }

  // Implementor - Color
  interface Color {
    getColorName(): string;
  }

  // Concrete Implementor - Red Color
  class RedColor implements Color {
    getColorName(): string {
      return "red";
    }
  }

  // Concrete Implementor - Blue Color
  class BlueColor implements Color {
    getColorName(): string {
      return "blue";
    }
  }

  // Usage
  const redCircle = new Circle(new RedColor());
  redCircle.draw();

  const blueCircle = new Circle(new BlueColor());
  blueCircle.draw();
  ```

<br/>

## Flyweight

Flyweight is a structural design pattern that lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.

<p align="center">
<img src="https://refactoring.guru/images/patterns/content/flyweight/flyweight-2x.png" width="700px" >
</p>

Constant data of an object is usually called the intrinsic state. It lives within the object; other objects can only read it, not change it.   
The rest of the object’s state, often altered from the outside by other objects, is called the extrinsic state.   
The Flyweight pattern suggests that you stop storing the extrinsic state inside the object. Instead, you should pass this state to specific methods which rely on it. Only the intrinsic state stays within the object, letting you reuse it in different contexts. As a result, you’d need fewer of these objects since they only differ in the intrinsic state, which has much fewer variations than the extrinsic.   
 
Example : 
  ```ts
  /* Before applying Flyweight pattern */

  class Circle {
    /*
    The radius and color are intrinsic properties of the circle. 
    These properties cannot be changed once the circle is created, and they are specific to each instance of the circle 
    */
    private readonly radius: number;
    private readonly color: string;
    /* the position is extrinsic to the circle, as it can be changed by the client code that is interacting with the circle */
    private position: { x: number; y: number };

    constructor(radius: number, color: string, position: { x: number; y: number }) {
      this.radius = radius;
      this.color = color;
      this.position = position;
    }

    draw(): void {
      console.log(`Drawing a ${this.color} circle with radius ${this.radius} at position (${this.position.x}, ${this.position.y})`);
    }
  }

  const circle1 = new Circle(5, 'red', { x: 10, y: 5 });
  const circle2 = new Circle(5, 'red', { x: 20, y: 10 });

  circle1.draw();
  circle2.draw();
  ```   

  ```ts
  /* After applying Flyweight pattern */

  class Circle {
    private readonly radius: number;
    private readonly color: string;

    constructor(radius: number, color: string) {
      this.radius = radius;
      this.color = color;
    }

    draw(position: { x: number; y: number }): void {
      console.log(`Drawing a ${this.color} circle with radius ${this.radius} at position (${position.x}, ${position.y})`);
    }
  }

  const flyweightCircle = new Circle(5, 'red');

  // Drawing circles at different positions
  flyweightCircle.draw({ x: 10, y: 5 });
  flyweightCircle.draw({ x: 20, y: 10 });
  ```




**Real-world Analogies**  

* Coffee Shop Chain   
In a coffee shop chain, the menu items such as espresso, latte, and cappuccino are like the intrinsic state. The customer preferences for sugar level or type of milk (like almond, soy, or regular) are the extrinsic state. By using the Flyweight pattern, the coffee shop chain can standardize the preparation of menu items while customizing the extrinsic preferences, improving service efficiency and maintaining consistency in taste across multiple locations

* Piano Manufacturing   
When producing a piano, the black and white keys are like the intrinsic state as they remain the same for all pianos. However, the external design or the color of the piano casing can be considered as extrinsic state

* Music Streaming Service   
In a music streaming service, the audio files of songs are the intrinsic state, and the user's playback history or playlist information is the extrinsic state

**Scenarios where Flyweight pattern suits**  

* Graphic Design and Image Processing Software:   
Graphic design tools often utilize the Flyweight pattern to optimize the handling of basic shapes, colors, and graphical elements, allowing efficient rendering and manipulation of complex visual data.

* Game Development:   
Game development frameworks and engines often leverage the Flyweight pattern to manage and optimize the rendering of graphical elements, textures, and sprites, especially in games with numerous recurring objects or characters.

* Compiler Design and Code Editors:   
Compilers and code editors can use the Flyweight pattern to manage and optimize the handling of syntax highlighting, abstract syntax trees, and other language-specific data structures.

* Caching and Database Systems:   
Caching mechanisms and database systems can make use of the Flyweight pattern to efficiently manage and reuse frequently accessed data and resources, reducing memory usage and improving overall system performance.

* Network Applications:   
Network applications, especially those dealing with data transfer and processing, can utilize the Flyweight pattern to optimize the management of network resources, such as connections, packets, and data buffers.

<br/>

## Proxy 

Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.

  ```ts
  // Subject interface
  interface Image {
    display(): void;
  }

  // RealSubject class
  class RealImage implements Image {
    private fileName: string;

    constructor(fileName: string) {
      this.fileName = fileName;
      this.loadFromDisk();
    }

    display(): void {
      console.log(`Displaying ${this.fileName}`);
    }

    private loadFromDisk(): void {
      console.log(`Loading ${this.fileName} from disk`);
    }
  }

  // Proxy class
  class ProxyImage implements Image {
    private realImage: RealImage | null = null;
    private fileName: string;

    constructor(fileName: string) {
      this.fileName = fileName;
    }

    display(): void {
      if (!this.realImage) {
        this.realImage = new RealImage(this.fileName);
      }
      this.realImage.display();
    }
  }

  // Client code
  const image1: Image = new ProxyImage('testImage.jpg');

  // Image will be loaded from disk only when required
  image1.display();
  image1.display();

  // Output:
  // Loading testImage.jpg from disk
  // Displaying testImage.jpg
  // Displaying testImage.jpg
  ```


<br/>
<br/>


---

## Behavioral Patterns

> These patterns take care of effective communication and the assignment of responsibilities between objects.


## Strategy

The Strategy Design Pattern allows you to define a family of interchangeable algorithms, encapsulate each one of them, and make them interchangeable   
This pattern helps you to select an algorithm at runtime based on the specific situation or context   

The primary advantage of strategy pattern is the ability to **choose algorithm at runtime**

**My Take**   
Since we follow dependency injection and dependency inversion, the constructor of a usecase expects any implementation that follows an interface   
So we can pass implementations as required   
Eg - We want to log error to console in a usecase, we can pass the ConsoleLoggerStrategy instance.    
If we want to log error to a file, we can pass the FileLoggerStrategy instance.

**Real-world Analogies**
* Transportation Methods & Navigation App:   
Think of transportation methods like cars, bicycles, and trains as different strategies. You can choose a strategy (transportation method) based on factors like speed, cost, and convenience to reach your destination.

* Smartphone Cameras:   
Smartphone cameras often offer various photography modes like portrait, panorama, and night mode. Each mode represents a different strategy for taking photos, allowing you to select the one that best suits the current lighting and subject.

* Fitness Training:   
In fitness training, you might have different workout routines for strength training, cardio, or flexibility. Each routine can be seen as a strategy that you choose based on your fitness goals.

* Investment Strategies:   
Investment portfolios can be managed using various strategies, such as aggressive, conservative, or balanced approaches. These strategies are chosen based on an investor's risk tolerance and financial goals.

**Scenarios where Strategy pattern suits**
* Sorting Algorithms:    
You can use the Strategy Pattern to encapsulate different sorting algorithms such as quicksort, mergesort, and bubblesort. Depending on the situation, you can switch between these algorithms without changing the client code that uses sorting.

* File Compression:    
When compressing files, you can have different compression algorithms like ZIP, GZIP, or custom algorithms. Using the Strategy Pattern, you can switch between these compression strategies easily.

* Authentication:    
You might have different authentication methods in your application, such as username/password, OAuth, or fingerprint authentication. Each of these methods can be implemented as a strategy, allowing you to switch between them based on user preferences or security requirements.

* Logging and Error Handling:    
You can encapsulate different logging and error handling strategies. For example, you might have strategies for logging to a file, sending logs to a remote server, or displaying logs in the console.

* Caching Strategies:    
In caching systems, you can have strategies for cache eviction policies (e.g., LRU, LFU, or TTL-based). You can switch between these strategies based on your application's caching needs.

### Example 1 - Payment Strategy
  ```ts
  // Step 1: Define a set of strategy interfaces and concrete implementations
  interface PaymentStrategy {
    pay(amount: number): void;
  }

  class CreditCardPayment implements PaymentStrategy {
    constructor(private cardNumber: string, private name: string) {}

    pay(amount: number): void {
      console.log(`Paid $${amount} with credit card ${this.cardNumber}`);
    }
  }

  class PayPalPayment implements PaymentStrategy {
    constructor(private email: string) {}

    pay(amount: number): void {
      console.log(`Paid $${amount} via PayPal to ${this.email}`);
    }
  }

  // Step 2: Create a context class that uses the strategy
  class ShoppingCart {
    private items: Map<string, number> = new Map();
    private paymentStrategy: PaymentStrategy;

    /* The usecase expects any implementation of PaymentStrategy interface, so we can pass either strategy */
    constructor(paymentStrategy: PaymentStrategy) {
      this.paymentStrategy = paymentStrategy;
    }

    addItem(item: string, price: number): void {
      if (this.items.has(item)) {
        this.items.set(item, this.items.get(item)! + price);
      } else {
        this.items.set(item, price);
      }
    }

    checkout(): void {
      const totalAmount = Array.from(this.items.values()).reduce(
        (total, price) => total + price,
        0
      );
      this.paymentStrategy.pay(totalAmount);
    }
  }

  // Step 3: Use the context class with different strategies
  const cart1 = new ShoppingCart(new CreditCardPayment("1234-5678-9012-3456", "John Doe"));
  cart1.addItem("Item 1", 25);
  cart1.addItem("Item 2", 30);
  cart1.checkout();

  const cart2 = new ShoppingCart(new PayPalPayment("john@example.com"));
  cart2.addItem("Item 1", 25);
  cart2.checkout();
  ```

### Relations with Other Patterns

* Decorator lets you change the skin of an object, while Strategy lets you change the guts

<br/>

## Observer

Observer design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing   

So, the Observer pattern is like a notification system where one thing (the subject) tells many other things (observers) that something interesting has happened, without those observers needing to know the details about the subject.   
   

<p align="center">
<img src="https://refactoring.guru/images/patterns/content/observer/observer-2x.png" width="700px" >
</p>

Imagine you have a newspaper (the "subject") and many people (the "observers") who want to be notified when the newspaper publishes a new issue

**Newspaper (Subject):** The newspaper keeps a list of subscribers (people who want to know about new issues).   
**Subscribers (Observers):** People who subscribe to the newspaper are the observers. They want to be notified when a new issue comes out.   
**Publishing:** When the newspaper publishes a new issue, it goes through the list of subscribers and tells each person about the new issue.   
**Subscribing:** When someone subscribes to the newspaper, their name is added to the list of subscribers.   
**Unsubscribing:** If someone decides they no longer want the newspaper, their name is removed from the list of subscribers.   

This pattern is useful because it keeps the newspaper and subscribers loosely connected. The newspaper doesn't need to know who the subscribers are or how many there are. It just knows how to notify them when something new happens.


**Real-world Analogies**
* Social Media Followers - When the user posts a new update, it is automatically shared with all their followers
* Traffic Signals - The traffic signal changes its lights, notifying all drivers and pedestrians waiting at the intersection when it's safe to proceed
* Weather Alerts - weather monitoring system sends out alerts to all the subscribed apps, websites, and emergency services when severe weather conditions are detected
* Shopping Discounts - Shoppers sign up for the store's loyalty program. When there are special deals or discounts, the store sends notifications to the shoppers' mobile apps, allowing them to take advantage of the savings.

**Scenarios where Observer pattern suits**
* Notifications
* Track analytics 
* UI Components - In graphical user interfaces, you can use the Observer pattern to notify various UI elements (e.g., buttons, text fields, and labels) about changes in underlying data, such as updating the display when data is modified
* Chat Applications - In chat applications, when one user sends a message, it is received by multiple other users. The Observer pattern can be used to notify all active users of new messages.
* Distributed Systems and Publish-Subscribe Architectures - In distributed systems, such as message brokers or publish-subscribe systems, the Observer pattern is used to broadcast messages to multiple subscribers without the sender needing to know who they are.
* Database Triggers - Database systems often use the Observer pattern to trigger actions or notifications when changes are made to the database. For example, sending emails when a new user registers or updating a cache when data is modified
* Monitoring and Logging - In system monitoring and logging, the Observer pattern can be used to notify multiple logging or monitoring components about system events or errors
* Sensor Networks - In sensor networks, multiple sensors may collect data, and the Observer pattern can be used to transmit this data to central monitoring systems or control units

### Example 1 - News feed system 

```ts
/* Observer */
interface Observer {
  update(article: string): void;
}

class Subscriber implements Observer {
  constructor(private name: string) {}

  update(article: string): void {
    console.log(`${this.name} received an update: ${article}`);
  }
}

/* Subject (News Feed) */
class NewsFeed {
  private observers: Observer[] = [];

  // Subscribe an observer
  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  // Unsubscribe an observer
  unsubscribe(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  // Notify all observers
  publishArticle(article: string): void {
    console.log(`New article published: ${article}`);
    this.observers.forEach((observer) => {
      observer.update(article);
    });
  }
}

/* Usage */
const newsFeed = new NewsFeed();

const subscriber1 = new Subscriber('Subscriber 1');
const subscriber2 = new Subscriber('Subscriber 2');
const subscriber3 = new Subscriber('Subscriber 3');

newsFeed.subscribe(subscriber1);
newsFeed.subscribe(subscriber2);
newsFeed.subscribe(subscriber3);

newsFeed.publishArticle('New TypeScript Features');
newsFeed.publishArticle('Latest JavaScript Frameworks');

newsFeed.unsubscribe(subscriber2);

newsFeed.publishArticle('Web Development Tips');
```

### Example 2 - Domain Events in DDD

This is somewhat similar to observer pattern but more complex and deals with multiple events

In DDD we use domain events      
Whenever a change happens, a new domain event is added to the list of events, which is maintained under an aggregate      
The domain event class itself maintains a list of handlers which are basically list of callback functions   
when the change is persisted we dispatch all domain events for that aggregate      
this is when the change event is sent to all handlers that satisfy a condition   

Example -    
A few domain events are added to member aggregate  
  ```ts
  Member { domainEvents : [MemberStateUpdated, MemberEmailUpdate, MemberRegisteredForAnEvent] }
  ```

All of these events have a list of their handlers 
  ```ts
  handlersMap : {
    MemberStateUpdated : [AfterMemberStateUpdatedTriggerAnalytics,  AfterMemberStateUpdatedSendNotifications],
    MemberEmailUpdate : [AfterMemberEmailUpdateSendNotifications],
    MemberRegisteredForAnEvent : [AfterMemberRegisteredForAnEventSendNotifications],
  }
  ```

When the changes are persisted, events for aggregate are dispatched
  ```ts
  aggregate.domainEvents.forEach((event: IDomainEvent) => this.dispatch(event));

  const handlers = this.handlersMap[eventClassName]
  for (const handler of handlers) { 
    handler(event);
  }
  ```

<br/>

## Command

Imagine you are in a restaurant as a customer, and you want to order some food. Instead of going to the kitchen and telling the chef directly what you want, you tell the waiter. The waiter then takes your order to the kitchen and the chef prepares the food accordingly. Here, the waiter acts as a mediator between you and the chef.   
   
In software development, the Command design pattern works similarly. It allows you to encapsulate a request as an object, making it possible to parameterize clients with different requests, queue or log requests, and support undoable operations. This helps in decoupling the sender of a request from the object that performs the action, providing more flexibility and extensibility to the codebase.
   
For instance, in a program, if you have different actions that need to be performed, you can encapsulate each action as a separate command. Then, you can use an invoker to execute these commands without needing to know the specifics of how each command is executed.

**Supporting Undoable Operations**   
The Command pattern enables you to implement undo and redo functionality easily. By encapsulating each operation as a command, you can maintain a history of executed commands. If you need to revert any operation, you can simply traverse this history and call the undo method of each command, effectively reversing the changes made by the command.


**Real-world Analogies**
* Restaurant Ordering System   
Imagine you are a waiter taking orders in a restaurant. When a customer places an order, you note down the request and send it to the kitchen. In this scenario, the customer's order is like a command, and you, the waiter, are the invoker. The kitchen, which processes the order, is the receiver.

* TV Remote Control:    
Think of a TV remote control where you press different buttons to perform various actions like changing the channel, adjusting the volume, or turning the TV on or off. Each button press represents a specific command, and the remote control is the invoker that executes these commands on the TV, acting as the receiver.

* Smart Home Devices:    
Consider a smart home system where you can control different devices like lights, thermostats, and security systems through a central control panel or a smartphone app. Each action you perform, such as turning on the lights or adjusting the temperature, can be seen as a command, and the control panel or smartphone app acts as the invoker.

* Text Editor Undo Functionality:    
In a text editor, when you perform actions like typing, deleting, or formatting text, you can often undo these actions. Each action you perform can be thought of as a command, and the text editor's undo functionality acts as the invoker that executes these commands in reverse to revert the changes.

**Scenarios where Command pattern suits**   
The Command design pattern is particularly useful in various scenarios where you need to decouple the sender and receiver of a request, or when you want to support operations like undo, redo, queuing, and logging

* Multi-level Undo/Redo Operations:    
In applications where users perform a series of complex operations, such as in graphic editors or word processors, the Command pattern can be used to implement multi-level undo and redo functionality, allowing users to revert changes to the document at different stages.

* Transaction Management:    
In database systems or financial applications, the Command pattern can be used to manage transactions. Each database operation can be encapsulated as a command, making it easier to roll back or commit a series of database changes as a single unit.

* Logging and Auditing:    
The Command pattern can be used to log and audit operations in an application. By encapsulating each operation as a command and maintaining a history of executed commands, you can create an audit trail for tracking and analyzing the sequence of actions performed within the application.

### Example 1 - Restaurant Ordering System

  ```ts
  // Receiver
  class Kitchen {
      receiveOrder(order: string): void {
          console.log(`Order received for: ${order}`);
          // Process the order in the kitchen
      }
  }

  // Command interface
  interface OrderCommand {
      execute(): void;
  }

  // Concrete command: CustomerOrder
  class CustomerOrder implements OrderCommand {
      private order: string;
      private kitchen: Kitchen;

      constructor(order: string, kitchen: Kitchen) {
          this.order = order;
          this.kitchen = kitchen;
      }

      execute(): void {
          this.kitchen.receiveOrder(this.order);
      }
  }

  // Invoker
  class Waiter {
      private orders: OrderCommand[] = [];

      takeOrder(command: OrderCommand): void {
          this.orders.push(command);
      }

      sendOrdersToKitchen(): void {
          this.orders.forEach(order => {
              order.execute();
          });
          this.orders = [];
      }
  }

  // Example usage
  const kitchen = new Kitchen();
  const waiter = new Waiter();

  const order1 = new CustomerOrder("Pasta", kitchen);
  const order2 = new CustomerOrder("Steak", kitchen);

  waiter.takeOrder(order1);
  waiter.takeOrder(order2);

  waiter.sendOrdersToKitchen();
  ```

### Example 2 - How you can implement undo and redo functionality using the Command pattern in TypeScript

  ```ts
  // Command interface
  interface Command {
      execute(): void;
      undo(): void;
  }

  // Receiver
  class Calculator {
      private value: number = 0;

      add(x: number): void {
          this.value += x;
      }

      subtract(x: number): void {
          this.value -= x;
      }

      getValue(): number {
          return this.value;
      }
  }

  // Concrete command: AddCommand
  class AddCommand implements Command {
      private calculator: Calculator;
      private value: number;

      constructor(calculator: Calculator, value: number) {
          this.calculator = calculator;
          this.value = value;
      }

      execute(): void {
          this.calculator.add(this.value);
      }

      undo(): void {
          this.calculator.subtract(this.value);
      }
  }

  // Concrete command: SubtractCommand
  class SubtractCommand implements Command {
      private calculator: Calculator;
      private value: number;

      constructor(calculator: Calculator, value: number) {
          this.calculator = calculator;
          this.value = value;
      }

      execute(): void {
          this.calculator.subtract(this.value);
      }

      undo(): void {
          this.calculator.add(this.value);
      }
  }

  // Invoker
  class Invoker {
      private history: Command[] = [];

      execute(command: Command): void {
          command.execute();
          this.history.push(command);
      }

      undo(): void {
          if (this.history.length > 0) {
              const command = this.history.pop();
              if (command) {
                  command.undo();
              }
          }
      }
  }

  // Example usage
  const calculator = new Calculator();
  const invoker = new Invoker();

  const addCommand = new AddCommand(calculator, 10);
  const subtractCommand = new SubtractCommand(calculator, 5);

  invoker.execute(addCommand);
  console.log('Value:', calculator.getValue()); // Output: Value: 10

  invoker.execute(subtractCommand);
  console.log('Value:', calculator.getValue()); // Output: Value: 5

  invoker.undo();
  console.log('Value:', calculator.getValue()); // Output: Value: 10
  ```

### Relations with other patterns

* Chain of Responsibility, Command, Mediator and Observer address various ways of connecting senders and receivers of requests
  * Chain of Responsibility passes a request sequentially along a dynamic chain of potential receivers until one of them handles it.

  * Command establishes unidirectional connections between senders and receivers.

  * Mediator eliminates direct connections between senders and receivers, forcing them to communicate indirectly via a mediator object.

  * Observer lets receivers dynamically subscribe to and unsubscribe from receiving requests.

* You can use Command and Memento together when implementing “undo”. In this case, commands are responsible for performing various operations over a target object, while mementos save the state of that object just before a command gets executed.

* Prototype can help when you need to save copies of Commands into history.

* You can treat Visitor as a powerful version of the Command pattern. Its objects can execute operations over various objects of different classes.

<br/>

## Template

The Template Method is a behavioral design pattern that defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.

**Real-world Analogies**

* Recipe for Cooking   
A template for making pasta could have specific steps for boiling water, adding pasta, and preparing a sauce, but the type of pasta and the sauce ingredients can vary. Similarly, the template method defines the overall structure for preparing a dish, while specific steps can be modified or customized by different recipes.
By using the template method, the core cooking process remains the same, while allowing for variations in specific steps. This allows you to reuse the general steps for different dishes, making the overall cooking process more efficient and consistent.

* Education System:    
A curriculum can be seen as a template for the education system. It sets the overall structure of what needs to be taught in a specific course, while individual teachers can have the flexibility to use different teaching methods and materials within that structure.

* Building Construction:   
Blueprints for building construction can be considered as templates. They outline the overall structure of a building, including the layout, the rooms, and the foundation. Contractors can then modify the specific materials, design details, and interior finishes while adhering to the predefined blueprint.

**Scenarios where Template pattern suits**   
The Template Design Pattern is particularly useful in scenarios where you want to define an algorithm's structure but allow subclasses to alter specific steps of the algorithm without changing its overall structure

* Report Generation: In applications that generate various types of reports, the Template Pattern can be used to define a standard report generation process while allowing customization for different report formats and data sources.

* Game Development: When creating games, the Template Pattern can be used to define the overall game structure, including the game loop, rendering, and updating, while allowing different implementations for specific game elements and behaviors.

* Workflow Automation: In workflow automation systems, the Template Pattern can be used to define a standard workflow structure, allowing different steps to be executed based on specific conditions or requirements.

### Example 1 - Pasta Recipe
  ```ts
  abstract class PastaRecipe {

    /* The template method defines the skeleton of an algorithm */
    public cookPasta(): void {
      this.boilWater();
      this.addPasta();
      this.cookPastaAlDente();
      this.prepareSauce();
      this.combinePastaAndSauce();
      this.serve();
      this.customStep(); // Hook
    }

    /* These operations have to be implemented in subclasses */
    protected abstract addPasta(): void;
    protected abstract prepareSauce(): void;

    /* These operations already have implementations */
    protected boilWater(): void {
      console.log('Boiling water');
    }

    protected cookPastaAlDente(): void {
      console.log('Cooking pasta al dente');
    }

    protected combinePastaAndSauce(): void {
      console.log('Combining pasta and sauce');
    }

    protected serve(): void {
      console.log('Serving delicious pasta');
    }

    /* These are hooks. Subclasses may override them, but it's not mandatory */
    protected customStep(): void {} 
  }

  class SpaghettiRecipe extends PastaRecipe {
    protected addPasta(): void {
      console.log('Adding spaghetti to boiling water');
    }

    protected prepareSauce(): void {
      console.log('Preparing tomato-based sauce for spaghetti');
    }

    protected customStep(): void {
      console.log('Adding parmesan cheese on top'); 
    }
  }

  class PenneRecipe extends PastaRecipe {
    protected addPasta(): void {
      console.log('Adding penne to boiling water');
    }

    protected prepareSauce(): void {
      console.log('Preparing creamy sauce for penne');
    }
  }

  // Client code
  function cookPastaRecipe(recipe: PastaRecipe) {
    console.log('Cooking Pasta:');
    recipe.cookPasta();
  }

  // Using the template with specific pasta recipes
  const spaghettiRecipe = new SpaghettiRecipe();
  const penneRecipe = new PenneRecipe();

  cookPastaRecipe(spaghettiRecipe);
  cookPastaRecipe(penneRecipe);
  ```

### Relations with other patterns

* Template Method is based on inheritance: it lets you alter parts of an algorithm by extending those parts in subclasses. Strategy is based on composition: you can alter parts of the object’s behavior by supplying it with different strategies that correspond to that behavior. Template Method works at the class level, so it’s static. Strategy works on the object level, letting you switch behaviors at runtime.

* Template pattern vs just abstract classes
To me it looked like template pattern is just abstract classes where a few methods are common and a few are to be implemented in subclasses   

  The Template Design Pattern offers a specific approach for defining an algorithm structure, ensuring that the steps are not only abstract but also predefined. It helps in maintaining the structure of the algorithm while allowing specific variations in certain steps.   

  The template pattern enforces a specific structure for the algorithm, ensuring that certain steps are followed in a defined sequence.   



<br/>

## State

The State design pattern is a behavioral pattern that allows an object to alter its behavior when its internal state changes.    
The pattern is particularly useful in scenarios where an object's behavior is dependent on its state and must change dynamically based on the state transitions

Use the State pattern when you have an object that behaves differently depending on its current state, the number of states is enormous, and the state-specific code changes frequently.

**Real-world Analogies**   

* Phone buttons   
The buttons and switches in your smartphone behave differently depending on the current state of the device
When the phone is unlocked, pressing buttons leads to executing various functions   
When the phone is locked, pressing any button leads to the unlock screen   
When the phone’s charge is low, pressing any button shows the charging screen   

* Package Delivery System:   
Imagine a package delivery system where a package can be in different states such as "In Transit," "Out for Delivery," and "Delivered." Each state has its own set of behaviors, like updating the location, estimated delivery time, and delivery confirmation.

* Game Character State:   
Consider a video game character that can be in different states like "Normal," "Powered Up," and "Injured." Each state affects the character's abilities, speed, and appearance. For example, when the character is "Powered Up," it might have increased strength and special powers.

* Vending Machine:   
Imagine a vending machine with states like "Ready," "Dispensing Item," and "Out of Stock." Each state controls what the user can do, such as selecting items, processing payments, and dispensing products.

**Scenarios where State pattern suits**   
The State design pattern is suitable for scenarios where the behavior of an object changes depending on its internal state

* User Interface (UI) Management:     
When dealing with complex user interfaces, the State pattern can be used to manage different states of the UI components, such as enabling or disabling certain buttons or features based on the current state of the application.

* Workflow Management:   
In applications with complex workflows or processes, the State pattern can help manage the different stages of the workflow. Each stage can have its own set of actions and rules, allowing for easier management and transition between various workflow states.

* E-commerce Order Processing:   
In e-commerce applications, the State pattern can be applied to manage the different states of an order, such as processing, shipped, delivered, or cancelled. Each state can trigger specific actions or notifications to the users or the system.


### Example 1 - 
  ```ts
  // State interface
  interface OrderState {
      cancelOrder(): void;
      verifyPayment(): void;
      shipOrder(): void;
  }

  // Concrete states
  class NewOrderState implements OrderState {
      constructor(private order: Order) {}

      cancelOrder() {
          console.log("Cancelling order.");
          this.order.setState(new CancelledOrderState(this.order));
      }

      verifyPayment() {
          console.log("Payment verified. Processing order.");
          this.order.setState(new ProcessingOrderState(this.order));
      }

      shipOrder() {
          console.log("Cannot ship the order. Payment not verified.");
      }
  }

  class ProcessingOrderState implements OrderState {
      constructor(private order: Order) {}

      cancelOrder() {
          console.log("Cancelling order.");
          this.order.setState(new CancelledOrderState(this.order));
      }

      verifyPayment() {
          console.log("Payment already verified. Processing order.");
      }

      shipOrder() {
          console.log("Shipping order.");
          this.order.setState(new ShippedOrderState(this.order));
      }
  }

  class ShippedOrderState implements OrderState {
      constructor(private order: Order) {}

      cancelOrder() {
          console.log("Cannot cancel the order. Already shipped.");
      }

      verifyPayment() {
          console.log("Payment already verified. Order already processed and shipped.");
      }

      shipOrder() {
          console.log("Cannot ship the order. Already shipped.");
      }
  }

  class CancelledOrderState implements OrderState {
      constructor(private order: Order) {}

      cancelOrder() {
          console.log("Cannot cancel the order. Already cancelled.");
      }

      verifyPayment() {
          console.log("Cannot verify payment. Order is cancelled.");
      }

      shipOrder() {
          console.log("Cannot ship the order. Order is cancelled.");
      }
  }

  // Context (Order) - It maintains the current state and delegates the behavior to the appropriate state object
  class Order {
      private state: OrderState;

      constructor() {
          this.state = new NewOrderState(this);
      }

      setState(state: OrderState) {
          this.state = state;
      }

      cancelOrder() {
          this.state.cancelOrder();
      }

      verifyPayment() {
          this.state.verifyPayment();
      }

      shipOrder() {
          this.state.shipOrder();
      }
  }

  // Usage
  const order = new Order();
  order.verifyPayment(); // Payment verified. Processing order.
  order.shipOrder(); // Shipping order.
  order.cancelOrder(); // Cancelling order.
  ```


### Relations with other patterns

* State can be considered as an extension of Strategy. Both patterns are based on composition: they change the behavior of the context by delegating some work to helper objects. Strategy makes these objects completely independent and unaware of each other. However, State doesn’t restrict dependencies between concrete states, letting them alter the state of the context at will.

<br/>

## Chain of responsibility

Chain of Responsibility is a behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.   

Use the pattern when it’s essential to execute several handlers in a particular order

<p align="center">
<img src="https://refactoring.guru/images/patterns/content/chain-of-responsibility/chain-of-responsibility-2x.png" width="700px" >
</p>

**My take**   
Looks like middlewares to me   


<br/>


## Iterator

Iterator is a behavioral design pattern that lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.)

Use the Iterator pattern when your collection has a complex data structure under the hood, but you want to hide its complexity from clients (either for convenience or security reasons)

Use the Iterator when you want your code to be able to traverse different data structures or when types of these structures are unknown beforehand


### Relation with different classes
* You can use Visitor along with Iterator to traverse a complex data structure and execute some operation over its elements, even if they all have different classes.
* You can use Iterators to traverse Composite trees

<br/>


## Mediator

Mediator is a behavioral design pattern that lets you reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.

<p align="center">
<img src="https://refactoring.guru/images/patterns/content/mediator/mediator-2x.png" width="700px" >
</p>


**Real-world Analogies**   

* ATC    
Aircraft pilots don’t talk to each other directly when deciding who gets to land their plane next. All communication goes through the control tower.


  ```ts
  interface ChatMediator {
      sendMessage(message: string, user: User): void;
  }

  class ConcreteChatMediator implements ChatMediator {
      private users: User[] = [];

      addUser(user: User): void {
          this.users.push(user);
      }

      /* 
      When a message is sent, the mediator distributes it to all other users except the sender
      This way, the users don't need to have direct references to each other, achieving a more loosely coupled system
      */
      sendMessage(message: string, user: User): void {
          for (const u of this.users) {
              if (u !== user) {
                  u.receive(message);
              }
          }
      }
  }

  class User {
      private name: string;
      private mediator: ChatMediator;

      constructor(name: string, mediator: ChatMediator) {
          this.name = name;
          this.mediator = mediator;
      }

      send(message: string): void {
          console.log(`${this.name} sends: ${message}`);
          this.mediator.sendMessage(message, this);
      }

      receive(message: string): void {
          console.log(`${this.name} receives: ${message}`);
      }
  }

  const mediator = new ConcreteChatMediator();

  const user1 = new User("User1", mediator);
  const user2 = new User("User2", mediator);
  const user3 = new User("User3", mediator);

  mediator.addUser(user1);
  mediator.addUser(user2);
  mediator.addUser(user3);

  user1.send("Hello, everyone!");
  ```




<br/>





## Visitor

<br/>








<br/>
<br/>



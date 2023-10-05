## Table of Contents
- [Refresh OOPS concepts](#refresh-oops-concepts)
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
    <!-- - [Abstract factory](#abstract-factory)
    - [Builder](#builder)
    - [Prototype](#prototype) -->
  - [Structural Patterns](#structural-patterns)
    - [Adapter](#adapter)
    - [Bridge](#bridge)
    - [Composite](#composite)
    - [Decorator](#decorator)
  - [Behavioural Patterns](#behavioural-patterns)
    - [Chain of responsibility](#chain-of-responsibility)
    - [Iterator](#iterator)
    - [Mediator](#mediator)
    - [State](#state)
    - [Visitor](#visitor)
    - [Observer](#observer)
    - [Strategy](#strategy)


## Refresh OOPS concepts

[OOPS](../OOPS/README.md)    
[OOPS Concepts in Typescript](../Typescript/OOPS.md)

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

**High-level modules:** These are modules or classes that define the main logic of your application (eg - Usecase)   
**Low-level modules:** These are modules or classes that perform specific tasks or services that the high-level modules depend on (eg - Repo methods, service methods)   

**The Dependency Inversion Principle states that high-level modules should not depend on low-level modules; both should depend on abstractions** 

* Abstractions should not depend on details. Details should depend on abstractions.
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

/* Low-level module (Service or Repo method for Data Access) */
class OrderService {
  getOrder(orderId: number): Order {
    return models.Orders.findById(orderId);
  }
}
```

**Adhering to DIP**
* To adhere to the Dependency Inversion Principle, we introduce an abstraction OrderRepository that acts as an intermediary between the high-level and low-level modules
* The high-level module OrderProcessor now depends on the OrderRepository abstraction, not directly on DatabaseOrderService. 
* This adheres to the Dependency Inversion Principle, as it decouples the high-level module from the low-level module, making it easier to change or extend the code without modifying the OrderProcessor class.

```ts
/* Abstraction (Interface) */
interface IOrderRepository {
  getOrder(orderId: number): Order;
}

/* Implementing the abstraction in the low-level module */
class DatabaseOrderService implements IOrderRepository {
  getOrder(orderId: number): Order {
    return models.Orders.findById(orderId);
  }
}

/* High-level module */
class OrderProcessor {
  constructor(private orderRepository: IOrderRepository) {}

  processOrder(orderId: number): void {
    const order = this.orderRepository.getOrder(orderId);
    order.state = "processed";
  }
}
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

## Abstract factory

<br/>


## Builder

<br/>


## Prototype

<br/>






<br/>
<br/>


---

## Structural Patterns

> These patterns explain how to assemble objects and classes into larger structures, while keeping these structures flexibile and efficient


## Adapter

<br/>


## Bridge

<br/>


## Composite

<br/>


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


<br/>
<br/>


---

## Behavioural Patterns

> These patterns take care of effective communication and the assignment of responsibilities between objects.


## Chain of responsibility

<br/>


## Iterator

<br/>


## Mediator

<br/>


## State

<br/>


## Visitor

<br/>


## Observer

<br/>


## Strategy

<br/>


<br/>
<br/>


---

## Relations among patterns
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

## Open/closed principle 
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

---
<!-- # Design Patterns

* Design patterns are typical solutions to common problems in software design
* Design patterns act as blue prints and can be customised to solve software problems
* Design patterns define a common language to helps your team communicate more efficiently

<br/>

---



## Types of design patterns

* [Creational Patterns](#creational-patterns)
    * [Factory](#factory)
    * [Abstract factory](#abstract-factory)
    * [Builder](#builder)
    * [Prototype](#prototype)
    * [Singleton](#singleton)
* [Structural Patterns](#structural-patterns)
    * [Adapter](#adapter)
    * [Bridge](#bridge)
    * [Composite](#composite)
    * [Decorator](#decorator)
* [Behavioural Patterns](#behavioural-patterns)
    * [Chain of responsibility](#chain-of-responsibility)
    * [Iterator](#iterator)
    * [Mediator](#mediator)
    * [State](#state)
    * [Visitor](#visitor)
    * [Observer](#observer)
    * [Strategy](#strategy)

<br/>
<br/>

---

## Creational Patterns

> These patterns provide object creation mechanism which maximizes flexibility and reuse of code


## Factory

aka Virtual Constructor

<br/>


## Abstract factory

<br/>


## Builder

<br/>


## Prototype

<br/>


## Singleton

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

<br/>


<br/>
<br/>


---

## Behavioural Patterns

> These patterns are concerned with algorithm and assignment of responsibiliteis between objects


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

## Relations among patterns -->
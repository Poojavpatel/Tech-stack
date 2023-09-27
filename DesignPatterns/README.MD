# SOLID Principles

S - Single responsibility    
O - Open/closed    
L - Liskov substitution (substitutability)   
I - Interface segregation   
D - Dependency inversion  

<br/>

## Single responsibility principle 
 A class/method should be responsible for a single part of functionality (Should be doing one thing and one thing only)

Single responsibility principle is violated when 
* you have error handling code in your class
* you have presentation logic
* File or database read/write operations

## Open/closed principle 
A class should be open to extension, closed to modification 

**Example**    
Consider you have an existing error handling class that displays error, now you need to log those errors to datadog by sending to an endpoint

```typescript
/* Error handling class */
export class ErrorHandler {
  private messageBox: any;

  constructor(messageBox){
    this.messageBox = messageBox;
  }

  public wrapError(res: any, errorBody: string, statusCode: number) {
    if(statusCode === 500) {
      this.critical(res, errorBody)
    } else {
      this.clientError(res, errorBody)
    }
  }

  private clientError(res: any, body: string): any {
    this.messageBox.show("Client error", body)
  }

  private critical(res: any, body: string): any {
    this.messageBox.show("Internal server error", body)
  }
}

/* Another class for error logging to datadog */
export class ErrorLogger {
  private datadogClient: any;

  constructor(datadogClient){
    this.datadogClient = datadogClient;
  }

  public logError(errorBody: string) {
    this.datadogClient.post("api/logs", errorBody);
  }
}

/* Extending error handling class with error logging class */
export class ErrorHandlerWithLogging extends ErrorHandler {
  private logger : ErrorLogger;

  constructor(messageBox, logger: ErrorLogger) {
    super(messageBox);
    this.logger = logger
  }

  public logAndWrapError(res: any, errorBody: string, statusCode: number) {
    this.logger.logError(errorBody);
    super.wrapError(res, errorBody, statusCode);
  }
}
```

## Liskov substitution (substitutability) principle 

* The LSP states that objects of a derived class should be able to replace objects of the base class without affecting the correctness of the program.
* In other words, if a class A is a base class and class B is a derived class, you should be able to use objects of class B wherever objects of class A are expected, and the program should still work correctly.
* A program should not have any type of undefined behavior just because a subclass defined a method/property in a different way then its base class

<br/>

**My take -**      
Assume you have a base class (Bird) and a few derived classes (Sparrow, Ostrich), and you have a function that accepts param of type base class
Since objects of derived class (sparrow) are also of type of Base class, they can be passed to the function as well   
LSP states that when you pass the objects of derived class to that function, it should work logically correctly

<br/>

**Examples**
1. Bird - DesignPatterns/liskovSubstitutionPrinciple/bird.ts
2. Quiz - DesignPatterns/liskovSubstitutionPrinciple/quizQuestion.ts

**Real world examples for a saas app**
1. User Authentication and Authorization - you might have different types of users, such as regular users and administrators. These users should be interchangeable when it comes to authentication and authorization
2. Payment Processors - you may integrate with different payment processors like PayPal, Stripe, and Square. Each payment processor can have its implementation, but they should all adhere to a common interface
3. Data Storage Abstraction - you may need to store data in various databases, such as MySQL, PostgreSQL, or MongoDB. You can create a common data access interface that all these database-specific classes implement

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
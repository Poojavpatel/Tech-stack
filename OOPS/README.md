# Object oriented programming basics

### Object literal

```javascript
// Object literal
const Book={
    title:'The Moon',
    author:'daisy',
    year:'2001',
    getSummary: function(){
        return `${this.title} was written by ${this.author} in year ${this.year}`
    }
};

console.log(Book.title);
console.log(Book.getSummary());
```
<br/>

### Factory Function 
```javascript
function createBook(title,author,year){
    return {
        title : title,
        author:author,
        year:year,
        getSummary:function(){
        return `${this.title} was written by ${this.author} in year ${this.year}`
    }
}

const book1 = createBook('Algorithms','Tom','2003');
```
<br/>

###  Constructor

```javascript
// Constructor
function Movie(){
    console.log('new movie instantiated...');
}

// Instantiate an object
// Whenever an object is instantiated..it runs whatever is in the constructor
const movie1 = new Movie();

// Constructor
function Book(title,author,year){
    this.title=title;
    this.author=author;
    this.year=year;
    this.getSummary=function(){
        return `${this.title} was written by ${this.author} in year ${this.year}`
    }
}
// Instantiate an object
const book1 = new Book('Algorithms','Tom','2003');

console.log(book1);
console.log(book1.getSummary());
```
<br/>

###  Prototype

```javascript
// Constructor
function Book(title,author,year){
    this.title=title;
    this.author=author;
    this.year=year;
};

// Prototype
Book.prototype.getSummary=function(){
    return `${this.title} was written by ${this.author} in year ${this.year}`;
};
Book.prototype.getAge=function(){
    return new Date().getFullYear() - this.year;
};
Book.prototype.revise=function(newYear){
    this.year = newYear;
    this.revised = true;
};

// Instantiate an object
const book1 = new Book('Algorithms','Tom','2003');

console.log(book1);
console.log(book1.getSummary());
console.log(book1.getAge());
book1.revise(2006);
console.log(book1);
```
<br/>

### Inheritance

> Inheritance is implemented in functions using .call(this, params)

```javascript
//Construtor for book
function Book(title,author,year){
    this.title = title;
    this.author=author;
    this.year=year;
};

// Prototype method - getSummary
Book.prototype.getSummary = function(){
    return `${this.title} was written by ${this.author} in year ${this.year}`
};

// instantiate book object
const book1 = new Book('jungle','shawn','2013');
console.log(book1);
console.log(book1.getSummary());

//We want magazine object to inherit book oject
//Constructor for magazine object
function Magazine(title,author,year,month){
    Book.call(this,title,author,year);
    this.month = month;
};
//To inherit prototype of book object
Magazine.prototype = Object.create(Book.prototype);

// instantiate magazine object
const mag1 = new Magazine('cosmo','amy','2017','feb');
console.log(mag1);
console.log(mag1.getSummary());
```
<br/>

###  ES6 Classes

```javascript
//es6 classes are just syntactic sugar-under the hood they do same as object constructors and prototypes
//es6 class
class Book{
    constructor(title,author,year){
        this.title=title;
        this.author=author;
        this.year=year;
    }
    getSummary(){
        return `${this.title} was written by ${this.author} in year ${this.year}`
    }
    revise(newYear){
        this.year = newYear;
        this.revised = true;
    }
    // Static method - a method that we have in a class which we can use without instantiating an object
    static topBookStore(){
        return `Barnes and Nobles`;
    }
}

//instantiate book object
const book1 = new Book('murder','bella','2002');
console.log(book1);
console.log(book1.getSummary());
book1.revise(2006);
console.log(book1.getSummary());

//call a static method with directly the class name
console.log(Book.topBookStore());
```
<br/>

### Private Properties and Methods
* By default, all the properties declared in the class are public means you can call and modify them from outside the class
* Hash(#) indicates that this property is private to the class and only methods that are declared inside the class can access it. Private properties should be declared before they were used.
* To print/modify the private properties, we need getter/setter methods. Here I have created one method that set the new cost.

```javascript
class Book{
  #cost
  constructor(title,author,year,cost){
    this.title=title;
    this.author=author;
    this.year=year;
    this.#cost = cost;
  }
  setCost(newCost) {
    this.#cost = newCost;
  }
  #updateAuthor(author) {
    this.author=author;
  }
}

const book1 = new Book('murder','bella','2002', 500);
console.log(book1); // Book { title: 'murder', author: 'bella', year: '2002' }
console.log(book1.cost); // undefined

// vscode on hover shows - Property '#cost' is not accessible outside class 'Book' because it has a private identifier
console.log(book1.#cost); // SyntaxError: Private field '#cost' must be declared in an enclosing class
book1.setCost(700);

book1.#updateAuthor('elle'); // SyntaxError: Private field '#updateAuthor' must be declared in an enclosing class
```

###  Subclasses

> when we use `new` the constructor of the class is called, when we use `super` constructor of parent class is called

```javascript
class Book{
    constructor(title,author,year){
        this.title=title;
        this.author=author;
        this.year=year;
    }
    getSummary(){
        return `${this.title} was written by ${this.author} in year ${this.year}`
    }
}

// create a subclass magazine that inherits class book
// simillar to syntax of react
class Magazine extends Book{
    constructor(title,author,year,month){
        super(title,author,year);
        this.month=month;
    }
}

const mag1 = new Magazine('cosmo','amy','2016','feb');
console.log(mag1);
console.log(mag1.getSummary());class Book{
    constructor(title,author,year){
        this.title=title;
        this.author=author;
        this.year=year;
    }
    getSummary(){
        return `${this.title} was written by ${this.author} in year ${this.year}`
    }
}

// create a subclass magazine that inherits class book
// simillar to syntax of react
class Magazine extends Book{
    constructor(title,author,year,month){
        super(title,author,year);
        this.month=month;
    }
}

const mag1 = new Magazine('cosmo','amy','2016','feb');
console.log(mag1);
console.log(mag1.getSummary());
```
<br/>


---


# Classes and Methods
* A blueprint for creating objects with predefined properties and methods, like making a mould
* class names conventionally start with capital letters
* Constructor is a special function that runs when the class is instantiated
* The class keyword creates a constant so you cannot redefine it
* class instances are created using the new keyword

```javascript
// Declaring class as OBJECT

const Book={
    title:'The Moon',
    author:'daisy',
    year:'2001',
    getSummary: function(){
        return `${this.title} was written by ${this.author} in year ${this.year}`
    }
};

console.log(Book.title);
console.log(Book.getSummary());
```


```javascript
// Declaring class using ES6 syntax   

class Book{
    constructor(title,author,year){
        this.title=title;
        this.author=author;
        this.year=year;
    }
    getSummary(){
        return `${this.title} was written by ${this.author} in year ${this.year}`
    }
}

//instantiate book object
const book1 = new Book('murder','bella','2002');
console.log(book1);
console.log(book1.getSummary());
```

### Class has 2 types of methods - Instance Methods & Class Methods
### Instance Methods
Methods that work on individual instance level, and not class level
```javascript
class Student() {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  fullName() {
    return `Your full name is ${this.firstName} ${this.lastName}`;
  }
}

let pooja = new Student('Pooja', 'patel');
pooja.fullName()
```

### Class Methods

* Methods that is relevent to class, but not necessarily to individual instances
* we use static keyword in front of method defination
* static methods are called without instantiating thier class and cannot be called through a class instance
* static methods are often used to create utility functions for an application
```javascript
class Student() {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  fullName() {
    return `Your full name is ${this.firstName} ${this.lastName}`;
  }
  static enrollStudents(...students) {
    // send email to students
  }
}

let pooja = new Student('Pooja', 'patel');
Student.enrollStudents([pooja]);
```

* Use case of a class method
```javascript
class Point{
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static calculateDistance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx,dy);
  }
}

const p1 = new Point(5,5);
const p2 = new Point(10,10);

Point.calculateDistance(p1, p2);
```
* here each point represents a point in x,y cordinate system
* To calculate distance between two points, it does not make much sense to call distance on a single point
* Can be implemented like p1.calculateDistance(p2) but since it is more of a utility function, we make it a class method

<br/>

---

<br/>

# Four Pillars of OOP 
## Encapsulation
Encapsulation is defined as binding the data and methods into a single unit to protect it from outside access
## Abstraction
Abstraction is defined as showing only the essential things and hiding the inner implementation
## Inheritance
* When one class derived the properties and methods of another class it is called inheritance in OOP. 
* The class that inherits the property is known as subclass or child class and the class whose properties are inherited is known as a superclass or parent class.
* main advantage of inheritance is reusability
* The super keyword is a special keyword. Calling super in the child's constructor invokes the parent constructor
## Polymorphism 
Polymorphism has two types.
1. Compile time Polymorphism
1. Runtime Polymorphism

* **Function overloading**  is a type of compile-time polymorphism. Here, we are creating more than one function with the same name and different parameters or types.

Function overloading is not supported in JavaScript because if you create functions with the same name, Javascript will override the last defined function with former functions.

* **Method overriding** is a type of runtime polymorphism. You can override the methods of parent class in the child class, That is method overriding.

---

<!-- # Clean Architecture: A Craftsman's Guide to Software Structure and Design (Robert C. Martin Series)
432 Pages

https://www.amazon.in/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164 

https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

online pdf - http://prof.mau.ac.ir/images/Uploaded_files/Clean%20Architecture_%20A%20Craftsman%E2%80%99s%20Guide%20to%20Software%20Structure%20and%20Design-Pearson%20Education%20(2018)%5B7615523%5D.PDF

<img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" />
<img src="https://cdn-media-1.freecodecamp.org/images/YsN6twE3-4Q4OYpgxoModmx29I8zthQ3f0OR" />
<img src="https://cdn-media-1.freecodecamp.org/images/lbexLhWvRfpexSV0lSIWczkHd5KdszeDy9a3" />
<img src="https://cdn-media-1.freecodecamp.org/images/YIABVRTHRz58ZiT6W-emBkfNIQUHBelp8t6U" />
<img src="https://cdn-media-1.freecodecamp.org/images/TmSQbZOg5bxn0cRXxIrRUd2zhqeDAXTe8ni5" /> -->

---
## How to build Classes in Object Oriented Design
https://www.youtube.com/watch?v=_wmyYdOkCo4

### Classes and objects

#### NVP Technique
N - Noun   
V - Verb   


### Relation among classes 
1. Has a relation
    1. **Composition relationship**  
    Consider relation of a customer and a credit card    
    Customer has a credit card    
    Credit card cannot exist in the system without existance of a related customer, Credit card belongs to a customer, this is called a **composition relationship**
    1. **Aggregation relationship**
    Consider relation of a cart and product (1:N)
    Cart has a product
    But product can exist without cart, this is called as Aggregation
2. Is a relation (Inheritance)
    Shampoo is a product, face wash is a product

* There can exist relations between classes which are not 'has-a' or 'is-a', eg relation of a credit card and payment   
  Credit card creates payment
  For these kind if relations, we have to think about real world and model accordingly    

### Assigning responsibilities to classes


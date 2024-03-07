# Node js

## Table of Contents

- [Introduction](#introduction)
- [Node.js Use Cases](#node-js-use-cases)
- [REPL in Node.js](#repl-in-nodejs)
- [Event loop](#event-loop)
- [Runtime execution of C](#runtime-execution-of-c)
- [Runtime execution of Nodejs](#runtime-execution-of-nodejs)
- [Buffer Datatype](#buffer-datatype)
- [Core Modules of Node.js](#core-modules-of-node-js)
  - [HTTP/HTTP2/HTTPS Module](#httphttp2https-module)
  - [OS Module](#os-module)
  - [FS Module](#fs-module)
  - [Path Module](#path-module)
  - [Events Module](#events-module)
  - [Datagram Module (dgram)](#datagram-module-dgram)
  - [Worker Threads](#worker-threads)
  - [Cluster Process Module](#cluster-process-module)
  - [child_process Module](#child_process-module)
  - [Zlib Module](#zlib-module)
- [Event Emitters](#event-emitters)
- [Streams in Node.js](#streams-in-nodejs)
  - [Difference between readFile and createReadStream](#difference-between-readfile-and-createreadstream)
- [Scopes in Node.js](#scopes-in-nodejs)
  - [Global Objects](#global-objects)
  - [Process Object](#process-object)
  - [Local Objects](#local-objects)
- [Asynchronous vs Non-blocking](#asynchronous-vs-non-blocking)
- [setTimeout setImmediate setInterval](#settimeout-setimmediate-setinterval)
- [process.nextTick() and setImmediate()](#processnexttick-and-setimmediate)
- [Auth](#auth)
- [Memory Leaks in Nodejs](#memory-leaks-in-nodejs)
- [Error Handling in Nodejs](#error-handling-in-nodejs)
- [Nodejs packages](#nodejs-packages)
  - [PM2](#pm2)
- [Guess The Output](#guess-the-output)
- [Implementations]()
  - [How to Serve Static Files](#how-to-serve-static-files)
  - [Setup Basic Server and Using Node](#setup-basic-server-and-using-node)
  - [Setup a Node Express Server and Connect to mlab Database](#setup-a-node-express-server-and-connect-to-mlab-database)
- [Deploying a Nodejs App](#deploying-a-nodejs-app)


<br/>


## Introduction

Node js is a **Runtime environment for executing javacsript code outside of a browser**
* Written on google chrome's V8 engine
* Its cross-platform and open source
* We oftenly use node to build backend services also called APIs
* Ideal for Highly-scalable, data-intensive, and real time apps
* Supports non-blocking I/O operations
* Node applications are asynchronous by default

---
## Node js use cases
* Server client applications
* Responsive web apps
* Distributed computing
* Network application

### My Take

Nodejs is 
* event-driven
* single-threaded
* asynchronous
* Supports non-blocking I/O operations


### When to use Node js 
* Web Servers   
Web servers are a perfect use case that benefits from Node’s inherent features. Node’s event-driven implementation can be used to trigger events in the server every time a request from the client-side is received. The single-threaded and asynchronous features ensure that the server can serve a large number of requests at a given time using callbacks. Sending responses back to the client-side is handled by these callbacks while the event loop keeps accepting and passing the receiving requests to event handlers without much delay.

* Real-Time Applications   
Real-time applications, like chat applications, video conferencing, and online-gaming, benefit from Node’s inherent set of features. These data-intensive applications require the use of websockets and push technology to establish two-way communication between the server and the client. Node’s ability to handle I/O-intensive tasks and its high scalability are the main reasons why the language is being commonly used for real-time applications

* Command-line Applications   
Building command-line applications are another common application of Node.js. The simple syntax, fast development, and the number of packages available for this purpose

* Creating APIs   
The language’s ability to integrate well with NoSQL databases, Node becomes a good fit for creating API fronts for NoSQL databases

### When to not use Node js 
* Heavy Computational Applications   
If your application is likely to run tasks that involve heavy computing and number crunching, like running the Fibonacci algorithm   
the heavy computation blocks the single-thread running in the application and halts the progress of the event loop until the computation is finished. And it delays serving the requests still in the queue, which may not take as much time   
The best solution is to implement heavy computational tasks as background processes in another appropriate language   
> Using microservices architecture and separating heavy computational tasks from Node implementation is the best solution.

* A CPU-Heavy Application   
The very benefits of its event-driven, non-clocking I/O model would get practically... nullified in the context of CPU-intensive operations.

* A Simple CRUD (or HTML) Application   
Using Node.js in this case would be like driving a Formula 1 car while... stuck in rush hour traffic. 

* Backends with Relational Databases   
Node’s relational database support tools are not up to the expected level when compared to other languages. This makes Node an undesirable for use cases with relational databases

### Limitations of Single-Threaded Event Loop

Refer - https://blog.bitsrc.io/top-5-features-of-nodejs-e49d1c68f4a7   

[Fireship - PROOF JavaScript is a Multi-Threaded language](https://www.youtube.com/watch?v=-JE8P2TiJEg)

Initially, Node.js was designed for I/O-bound tasks like web servers. For these, creating multiple threads adds overhead and complexity in managing thread synchronization and context switching. Instead, Node.js adopted an event-driven approach.

This behavior brings several advantages but also limitations to Node.js.
CPU-bound tasks can block the loop   
No true parallelism: Tasks are still executed one after another, not simultaneously  

To address these limitations, Node.js introduced [Worker Threads](#worker-threads) and the [Cluster Module](#cluster-process-module) in various Node.js versions.

### Concurrency vs Parallelism in Node.js

<img src="https://miro.medium.com/v2/resize:fit:1400/1*ylONk4ex9q6IK68C6USRBg.jpeg" width="30%" />

<br/>

Concurrency: The ability to execute multiple tasks seemingly at the same time, but actually by switching between them rapidly.

Parallelism: The ability to execute multiple tasks truly at the same time, on multiple cores or processors

Node.js is single-threaded, so it cannot execute tasks in true parallel.
However, it can achieve concurrency using its event loop.
We can also use worker threads to take advantage of multicore CPUs


<br/>

### Event loop

[Event loop in javascript](../Javascript/README.md#understanding-how-asynchronus-calls-work)

Refer - https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick

The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.   
Since most modern kernels are multi-threaded, they can handle multiple operations executing in the background. When one of these operations completes, the kernel tells Node.js so that the appropriate callback may be added to the poll queue to eventually be executed. 

Event loop is a crucial part of Nodejs architecture that enables it to handle asynchronous operations efficiently. It is responsible for managing and executing various events and callbacks in a non-blocking way

Here's a brief explanation of how the event loop works in Node.js:

* When asynchronous operations are initiated in Node.js, such as reading a file, making a network request, or setting a timer, the associated callbacks are not executed immediately. Instead, they are placed in an **Event Queue**.

* The **Event Loop** constantly checks the event queue for any pending callbacks or events. If there are callbacks waiting in the queue, the event loop picks them up one by one and executes them.

* The event loop allows Node.js to handle multiple operations concurrently without blocking the execution of the program. This is achieved by delegating the execution of asynchronous operations to the underlying system, such as the operating system's file I/O or network subsystem.

*  As callbacks are executed, they may trigger additional asynchronous operations, and their associated callbacks will be added to the event queue. This process continues in a loop, giving the appearance of parallelism even though Node.js is single-threaded.

The event loop is the mechanism that enables Node.js to efficiently handle asynchronous operations by continuously checking the event queue for pending tasks and executing their callbacks in a non-blocking manner. This design allows Node.js to handle a large number of concurrent connections and I/O operations efficiently.

#### Interview question
If you say that nodejs i single-threaded, when there is an async operation that is executed differently than the main thread, without blocking the main thread, what thread executes the async operation? Is it not multithreaded then?

In Node.js, the event-driven architecture allows for asynchronous operations without blocking the main thread. While Node.js itself is single-threaded, it leverages an event loop and the concept of callbacks or promises to handle asynchronous operations efficiently.

When you perform an asynchronous operation, such as reading from a file, making a network request, or interacting with a database, Node.js utilizes background worker threads or the operating system's asynchronous I/O operations. These operations are handled outside the main event loop, ensuring that the main thread remains free to handle other events.

So, even though Node.js is technically single-threaded, it doesn't mean that there's only one thread handling everything. Asynchronous operations can be executed by worker threads or external processes, but the coordination and handling of these operations are done in a single-threaded event loop, which makes the programming model simpler.

In summary, Node.js is not considered multithreaded in the traditional sense, but it effectively manages asynchronous tasks through mechanisms like the event loop and worker threads without blocking the main thread.


<br/>

---

### RELP in NodeJs   
  The Node.js **Read-Eval-Print-Loop (REPL)** is an interactive shell that processes Node. js expressions. The shell reads JavaScript code the user enters, evaluates the result of interpreting the line of code, prints the result to the user, and loops until the user signals to quit.    
  Node comes bundled with a REPL environment. It performs the following tasks −   
  * Read − Reads user's input, parses the input into JavaScript data-structure, and stores in memory.   
  * Eval − Takes and evaluates the data structure.   
  * Print − Prints the result.   
  * Loop − Loops the above command until the user presses ctrl-c twice.   
  The REPL feature of Node is very useful in experimenting with Node.js codes and to debug JavaScript codes

  **Underscore(_) is a special variable in node which stores the result of last expression evaluation**.   
  It can be used to access result of last command execution — similar to $? in bash

<br/>

---

### Runtime execution of C
* In C, the source code is typically written in a human-readable format with the .c file extension.
* The C code needs to be compiled by a C compiler (e.g., GCC, Clang) into machine code or an intermediate form, such as assembly language.
* The compilation process translates the high-level C code into low-level machine code specific to the target architecture (e.g., x86, ARM).
* The resulting executable file contains machine code that can be directly executed by the computer's hardware.

### Runtime execution of Nodejs

JavaScript is generally considered an interpreted language. When you run a JavaScript file in a web browser, the browser's JavaScript engine (like V8 in Chrome or SpiderMonkey in Firefox) interprets the code directly.

* You write your JavaScript code in a file with a .js extension, this is called Source Code
* You execute the JavaScript file using the Node.js runtime. Node.js includes the V8 JavaScript engine, developed by Google.
* The V8 engine first parses the JavaScript source code to create an Abstract Syntax Tree (AST). The AST represents the syntactic structure of the code. This process is called Parsing
* The engine then performs lexical analysis and generates an intermediate representation of the code known as bytecode. This is not machine code but a lower-level representation that can be executed more efficiently than the original source code.
* Optionally, V8 can use Just-In-Time (JIT) compilation. Instead of interpreting the bytecode directly, V8 may compile parts of the code into machine code just before execution. This helps optimize performance.
* The V8 engine's runtime executes the bytecode or machine code, depending on whether JIT compilation is utilized.
* During execution, the engine manages the event loop, handles asynchronous tasks, and interacts with the underlying operating system.
* If your JavaScript code includes module imports using the require keyword, Node.js manages the loading of these modules. Each module is essentially a separate JavaScript file, and Node.js handles the dependencies.
* Node.js operates on a single-threaded event loop, allowing asynchronous operations to be handled efficiently. Events, such as I/O operations or timers, are processed in a non-blocking manner. Event loop


In summary, when you run a JavaScript file with Node.js, the V8 engine takes care of parsing, compiling, and executing the code. Optionally, JIT compilation may be used for performance optimization. 



<br/>

---



### Buffer datatype

Node.js includes an additional data type called Buffer (not available in browser's JavaScript).   
A buffer is a temporary storage area in memory that allows for the manipulation of raw binary data.   
It is particularly useful when working with I/O operations, such as reading from or writing to files, handling network data, or interacting with binary streams.     


* Fixed Size: Buffers have a fixed size, meaning you need to specify the size when creating a buffer. Once the size is set, it cannot be changed.

* Buffers provide methods for reading and writing data at specific positions, making it easy to manipulate binary data.

* Efficient Memory Allocation: Buffers provide a way to efficiently allocate memory for binary data, making it suitable for scenarios where memory efficiency is crucial.

* Buffer Creation:   
Buffer.alloc(size): Allocates a new buffer of the specified size.   
Buffer.from(array): Creates a buffer from an existing array or array-like object.   
Buffer.from(string, encoding): Creates a buffer from a string, optionally specifying the encoding (e.g., 'utf-8').   

Example of creating a buffer and manipulating data
```js
// Creating a buffer of size 4
const buffer = Buffer.alloc(4);

// Writing data to the buffer
buffer.writeUInt8(65, 0);  // 'A' in ASCII
buffer.writeUInt8(66, 1);  // 'B' in ASCII
buffer.writeUInt8(67, 2);  // 'C' in ASCII
buffer.writeUInt8(68, 3);  // 'D' in ASCII

// Reading data from the buffer
console.log(buffer.toString());  // Outputs 'ABCD'
```


<br/>

---

## Core Modules of Node js

### Http/http2/https module
provides an HTTP client/server implementation

### OS module
provides operating system-related utility methods and properties


### FS module
provides an API for interacting with the file system

### Path module
provides utilities for working with file and directory paths

### Events module
provides us the [EventEmitter](#event-emitters) class, which is key to working with events in Node.js.

<br/>



### Datagram Module (dgram)

The dgram module provides a way of working with Datagram sockets.   
It can be used to send messages from one computer/server to another.
     
(A datagram socket provides a symmetric data exchange interface. There is no requirement for connection establishment. Each message carries the destination address)

<br/>

### Worker Threads

<img src="https://images.ctfassets.net/hspc7zpa5cvq/20h5efXHT4bQbuf44mdq2H/a40944191d031217a9169b17a8ef35d6/worker-diagram_2x__1_.jpg" width="50%" />

<br/>

Think of worker threads as separate JavaScript execution contexts within the same Node.js process.   

Instead of the main thread handling everything, it can delegate CPU-intensive tasks to these worker threads. This allows the main thread to remain responsive and handle other requests while the worker threads crunch away on the complex calculations.   

Remember, worker threads share memory. So data structures like ArrayBuffer or SharedArrayBuffer are recommended for large data exchanges to avoid unnecessary copying.

Creating and managing worker threads has some overhead, so consider its benefit vs. cost for your specific use case.

Example of using worker threads :
```js
const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js', { data: { someData: 'to process' } });

worker.on('message', (message) => {
  console.log(Received message from worker: ${message} );
});

worker.postMessage({ anotherData: 'to send' });
```

[Fireship - parallelism and concurrency in JavaScript by experimenting with Node.js Worker Threads](https://www.youtube.com/watch?v=-JE8P2TiJEg)

<br/>

### Cluster Process Module

Node.js runs single threaded programming, which is very memory efficient, but to take advantage of computers multi-core systems, the Cluster module allows you to easily create child processes that each runs on their own single thread, to handle the load.

The cluster module provides a way of creating child processes that runs simultaneously and share the same server port.

The Cluster Module creates multiple separate Node.js processes, each with its own event loop and memory space.
These processes run independently on different cores, utilizing multiple cores for improved performance (Horizontal Scaling).
   
This operates by creating a master process and several worker processes. The master process manages the distribution of incoming connections among the worker processes. If a worker process fails, the master process can respawn a new one, ensuring robustness in the face of failures.

Worker processes share memory and resources, so consider data synchronization carefully.

Example usage : 
```js
const cluster = require('cluster');

if (cluster.isMaster) {
  // Master process
  const numWorkers = require('os').cpus().length;

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(worker ${worker.process.pid} died );
  });
} else {
  // Worker process
  // Your application logic here
  app.listen(3000);
}
```

<br/>

### child_process Module
We can easily spin a child process using Node’s child_process module and those child processes can easily communicate with each other with a messaging system.   
The child_process module enables us to access Operating System functionalities by running any system command inside a, well, child process.   
We can control that child process input stream, and listen to its output stream. We can also control the arguments to be passed to the underlying OS command, and we can do whatever we want with that command’s output   
There are four different ways to create a child process in Node: ```spawn(), fork(), exec(), and execFile()```.

### Zlib Module
The Zlib module provides a way of zip and unzip files


---
### Event Emitters
* The core of NodeJS is **event-driven programming**. In NodeJS, we achieve event-driven programming with the event-emitter class
* EventEmitter is a class that helps us create a **publisher-subscriber** pattern in NodeJS.   
    With an event emitter, we can simply raise a new event from a different part of an application, and a listener will listen to the raised event and have some action performed for the event.
* To create an event emitter, we need to create an instance of the event emitter instance from the **events module in NodeJS**
* It has many useful member functions, some of them are - on(eventName, …), emit(eventName, …)
* To publish an event, we use the emit() function, and to listen to an event, we use the on() function
```javascript
import { EventEmitter } from 'events';
const eventEmitter = new EventEmitter();

// listen to the event
eventEmitter.on('myEvent', () => {
    console.log('Data Received');
});

// publish an event
eventEmitter.emit('myEvent');
```
* The events raised by event emitters are **synchronously** executed by the listeners in the current event loop’s iteration.
* NodeJs internally uses event emitters widely across its environment. The first example we can think of is streams.   
    Streams extend event emitters. Streams are built on top of event emitters that raise predefined events like open, end, data, etc.
* Another example of NodeJS using event emitters is the global **process** variable.
    The process object exposes some variables we can listen to and respond to accordingly.
```javascript
process.on("exit", () => console.log("Exit"));
process.on("beforeExit", () => console.log("Before Exit"));
process.on('uncaughtException', () => {
    console.log('Exception');
    process.exit();
});
throw new Error('Test Error');
```

Note : In Node.js EventEmitter, `addListener` and `on` methods are equivalent and used interchangeably to subscribe to events. They both add a listener function to the specified event.    

---

### Streams in Nodejs

In Node.js, streams are a powerful and efficient concept for handling data flow, especially when dealing with large amounts of data or real-time data processing. Streams provide an abstraction that allows you to read or write data piece by piece, instead of loading the entire data into memory at once. This makes streams particularly useful for scenarios like reading or writing files, handling network communication, and processing data in real-time.   

There are several types of streams in Node.js   

#### Readable Streams
These streams represent a source of data that you can read from. Examples include reading data from a file, receiving data over the network, or generating data dynamically

```js
const fs = require('fs');
const readableStream = fs.createReadStream('example.txt');

readableStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});

readableStream.on('end', () => {
  console.log('Finished reading data.');
});
```

#### Writable Streams

These streams represent a destination for data that you can write to. Examples include writing data to a file, sending data over the network, or storing data in a database.

```js
const fs = require('fs');
const writableStream = fs.createWriteStream('output.txt');

writableStream.write('Hello, ');
writableStream.write('world!');
writableStream.end();
```

#### Duplex Streams

These streams represent both a readable and writable side. An example is a network socket, where you can both read data from and write data to the same connection.


#### Transform Streams

These streams are a type of duplex stream that allows for data transformation as it is being read or written. An example is the zlib.createGzip() stream for compressing data   

The pipe() method is commonly used to simplify stream interactions, allowing data to flow from one stream to another seamlessly.   

```js
const fs = require('fs');
const zlib = require('zlib');

const readableStream = fs.createReadStream('example.txt');
const gzipStream = zlib.createGzip();
const writableStream = fs.createWriteStream('example.txt.gz');

readableStream.pipe(gzipStream).pipe(writableStream);
```

#### Difference between readFile and createReadStream 

| readFile | createReadStream  | 
| :-----: | :-: | 
| fs module contains the readFile method. It is used to read a file by bringing it into the buffer | fs module contains the inbuilt API createReadStream.It allows us to open a file/stream and reads the data present inside it. | 
| It reads the file into the memory before making it available to the user. | It reads the file in chunks according to a need by the user. | 
| It is slower due to read of whole file.	 | It is faster due to its property of bringing in chunks. | 
| It will not scale in case of too many requests as it will try to load them all at the same time. | It is scalable as it pipes the content directly to the HTTP response object | 
| Due to its property, it is easier for nodejs to handle cleaning of memory in this case. | In this case memory cleaning by nodejs is not easy. | 

---

## Scopes in Nodejs

### Global Objects

> In Browsers we have Document and Window object, in node we have Global scope

Can be accessed anywhere in any file   
In Node Console is a Global Object   
setTimeout(), setInterval(), process.exit()   

### Process Object
* The process object in Node.js is a **global object** that can be accessed inside any module without requiring it
* **Each Node.js script runs in a process**. It includes process object to get all the information about the current process of Node.js application
* This **process object is an instance of the EventEmitter class**. It contains its own pre-defined events such as exit which can be used to know when a program in Node.js has completed its execution.   
  ```javascript
  process.pid
  // 1652
  process.cwd()
  // 'C:\\'
  process.exit()
  ```

### Local objects

> Default Scope in Node js is LOCAL

* In the browser's JavaScript, variables declared without var keyword become global. In Node.js, everything becomes local by default
* In a browser, global scope is the window object. In Node.js, global object represents the global scope.   
    To add something in global scope, you need to export it using export or module.export. The same way, import modules/object using require() function to access it from the global scope.







---
### Asynchronous vs Non-blocking

* Asynchronous literally means not synchronous. We are making HTTP requests which are asynchronous, means we are not waiting for the server response. We continue with other block and respond to the server response when we received.

* The term Non-Blocking is widely used with IO. For example non-blocking read/write calls return with whatever they can do and expect caller to execute the call again. Read will wait until it has some data and put calling thread to sleep.
* Nonblocking immediately responses with whatever data available. Moreover, it does not block any execution and keeps on running as per the requests. If an answer could not be retrieved than in those cases API returns immediately with an error. 
* Nonblocking is mostly used with I/O(input/output). Node.js is itself based on nonblocking I/O model. 
* There are few ways of communication that a nonblocking I/O has completed. The callback function is to be called when the operation is completed. Nonblocking call uses the help of javascript which provides a callback function.

<br/>

* Asynchronous does not respond immediately, While Nonblocking responds immediately if the data is available and if not that simply returns an error
* Asynchronous calls usually involve a callback or an event, to signal that the response is available, while in the case of non-blocking the call returns with whatever is available and the caller might have to try again to get the rest of the data
* Suppose you are reading a book meanwhile waiting for a call from your friend.   
<ins>Synchronous</ins>   
    <ins>Blocking</ins>: You don’t start reading until you get the call.   
    <ins>Non-blocking</ins> : You read the book at the beginning but every time period you pause and have a glance at your phone.   
<ins>Asynchronous</ins>   
    <ins>Based on interruption</ins>: You read the book and leave your phone alone. If it rings, you are interrupted. Then you answer it, and after that you come back to your book. This only works if the phone has a function of ringing (event interruption runtime).   
    <ins>Based on thread</ins>: You read the book and have your phone answered by someone else. This only works if you can find someone to help you (multi-thread runtime).   

---

### setTimeout setImmediate setInterval


In Node.js, setTimeout(), setImmediate(), and setInterval() are functions used to schedule the execution of code at specified intervals

#### setTimeout()
The setTimeout() function is used to schedule a function or code block to run after a specified delay (in milliseconds)

```js
console.log('Start');

setTimeout(() => {
  console.log('Inside setTimeout after 2000ms');
}, 2000);

console.log('End');

// In this example, "Start" and "End" will be logged first, and after a delay of 2000 milliseconds (2 seconds), "Inside setTimeout after 2000ms" will be logged
```

#### setImmediate()

The setImmediate() function is used to schedule a function or code block to run in the next iteration of the event loop. It allows executing code immediately after the current event loop cycle.

```js
console.log('Start');

setImmediate(() => {
  console.log('Inside setImmediate');
});

console.log('End');
// In this example, "Start" and "End" will be logged first, and then "Inside setImmediate" will be logged in the next iteration of the event loop.
```

#### setInterval()

The setInterval() function is used to repeatedly execute a function or code block at specified intervals

```js
let count = 0;

const intervalId = setInterval(() => {
  count++;
  console.log(`Counter: ${count}`);

  if (count === 5) {
    clearInterval(intervalId); // Stop the interval after 5 executions
    console.log('Interval stopped');
  }
}, 1000);

// the function inside setInterval will be executed every 1000 milliseconds (1 second), incrementing the counter. The interval will be stopped after the counter reaches 5
```

```js
console.log('Start');

// setTimeout example
setTimeout(() => {
  console.log('Inside setTimeout after 2000ms');
}, 2000);

// setImmediate example
setImmediate(() => {
  console.log('Inside setImmediate');
});

// setInterval example
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Interval Counter: ${count}`);

  if (count === 3) {
    clearInterval(intervalId); // Stop the interval after 3 executions
    console.log('Interval stopped');
  }
}, 1000);

console.log('End');

/*
Expected Output 
Start
End
Inside setImmediate
Interval Counter: 1
Interval Counter: 2
Interval Counter: 3
Interval stopped
Inside setTimeout after 2000ms
*/
```

---

### process.nextTick() and setImmediate()   

> Consoles -> then all process.nextTick -> setTimeouts -> then all setImmediate

* Understanding process.nextTick() - Whenever a new queue of operations is initialized we can think of it as a new tick. The process.nextTick() method **adds the callback function to the start of the next event queue**. It is to be noted that, at the start of the program process.nextTick() method is called for the first time before the event loop is processed.

* Understanding setImmdeiate() - Whenever we call setImmediate() method, it’s **callback function is placed in the check phase of the next event queue**. There is slight detail to be noted here that setImmediate() method is called in the poll phase and it’s callback functions are invoked in the check phase.

```javascript
setImmediate(function A() { 
    console.log("1st immediate"); 
}); 
  
setImmediate(function B() { 
    console.log("2nd immediate"); 
}); 
  
process.nextTick(function C() { 
    console.log("1st process"); 
}); 
  
process.nextTick(function D() { 
    console.log("2nd process"); 
}); 
  
console.log("program started"); 

/* Output
program started
1st process
2nd process
1st immediate
2nd immediate
*/
```
Event queues are initialized in the following manner:
1. In the first event queue only ‘program started is printed’.
1. Then second event queue is started and function C i.e. callback of process.nextTick() method is placed at the start of the event queue. C is executed and the queue ends.
1. Then previous event queue ends and third event queue is initialized with callback D. Then callback function A of setImmdeiate() method is placed in the followed by B.
1. Now, the third event queue looks like this,
D A B
1. Now functions D, A, B are executed in the order they are present in the queue

```javascript
function cb1(){
  console.log(1);
}
function cb2(){
  console.log(2);
}
setImmediate(cb1);
console.log(3);
process.nextTick(cb2);

/* Output - 
3
2
1
*/
```

```javascript
let racer = function() {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
  console.log("current event loop");
}

racer()

/* 
current event loop
nextTick
timeout
immediate
*/
```

```javascript
let racer1 = function() {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
  console.log("current event loop");
}
let racer2 = function() {
  process.nextTick(() => console.log("nextTick"));
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
  console.log("current event loop");
}
let racer3 = function() {
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
  setTimeout(() => console.log("timeout"), 0);
  console.log("current event loop");
}
racer1()
racer2()
racer3()

/*
current event loop
current event loop
current event loop
nextTick
nextTick
nextTick
timeout
timeout
timeout
immediate
immediate
immediate
*/
```

---

## Auth

Refer this file for everything related to authentication including    
Hashing   
Encryption   
SSO

[Authentication](../Auth/README.md)

<br/>
<br/>

---

## Memory Leaks in Nodejs

https://www.youtube.com/watch?v=YBnN2JpS4hI






<br/>
<br/>

---

## Error Handling in Nodejs


<br/>
<br/>

---

## Nodejs packages

### PM2

PM2 is a process manager for Node.js applications. It is designed to simplify the deployment and management of Node.js processes in production environments.

PM2 provides a set of features that make it easier to run and maintain Node.js applications, ensuring they stay online, restart automatically in case of failure, and scale easily.

**Key features:**

* Process Management: PM2 allows you to start, stop, restart, and manage multiple Node.js processes effortlessly. This is particularly useful for applications that require high availability and need to handle a large number of concurrent requests.

* Automatic Restart: PM2 monitors your Node.js application, and in the event of a failure or crash, it automatically restarts the application. This helps ensure that your application remains available and responsive.

* Load Balancing: PM2 can distribute incoming network traffic across multiple instances of your Node.js application, providing basic load balancing functionality. This is beneficial for improving performance and handling increased traffic.

* Logging: PM2 provides built-in log management, allowing you to view and analyze logs generated by your application. This is useful for debugging and monitoring the health of your application.

* Startup Scripts: PM2 can generate and manage startup scripts to ensure that your Node.js application starts automatically when the server boots up. This is essential for production environments where applications need to be persistent.

To use PM2, you typically install it globally on your server using npm and then use its command-line interface to manage your Node.js applications. Here is a basic example of installing and using PM2:

```bash
# Install PM2 globally
npm install -g pm2

# Start your Node.js application with PM2
pm2 start app.js

# View the list of running processes
pm2 list
```

<br/>

**Logging in PM2**   
PM2 provides a flexible logging system that captures standard output and error streams from your Node.js application. By default, PM2 logs are stored in a directory called `~/.pm2/logs`. Each application managed by PM2 has its own log files within this directory.

The log files are named based on the application's name and process ID. For example, if your application is named "myapp" and has a process ID of 0, the log files might be named myapp-out-0.log and myapp-error-0.log.

```bash
# view the logs for a specific application
pm2 logs  myapp

# view logs for all applications
pm2 logs
```

**Configuring pm2**   

```js
// ecosystem.config.json
{
  "apps": [
    {
      "name": "myapp",
      "script": "app.js",
      "instances": 2,
      "exec_mode": "cluster",
      "env": {
        "NODE_ENV": "production",
        "PORT": 3000
      }
    }
  ]
}
```

**If i am using pm2, should i not use cluster module in node js?**   
PM2 and the Node.js cluster module serve different purposes, and you can use them together if it makes sense for your application's requirements.

Regarding whether to use them together, it depends on your specific use case and requirements:

* Single Instance: If your application can effectively handle the load with a single instance and you want the simplicity of process management, PM2 alone may be sufficient.

* Multiple Instances: If your application can benefit from running multiple instances across multiple cores for improved performance and scalability, you can use the Node.js cluster module in conjunction with PM2. PM2 can still manage and monitor these instances.


<br/>
<br/>
<br/>

---

## Guess The Output

```javascript
console.log(("0 || 1 ="+(0 || 1)));
console.log(("1 || 2 ="+(1 || 2)));
console.log(("0 && 1 ="+(0 && 1)));
console.log(("1 && 2 ="+(1 && 2)));

/*
0 || 1 =1
1 || 2 =1
0 && 1 =0
1 && 2 =2
*/
```

```javascript
function cb1(){
  console.log(1);
}
function cb2(){
  console.log(2);
}
setImmediate(cb1);
console.log(3);
process.nextTick(cb2);

/* Output - 
3
2
1
*/
```
```javascript
function foo(){
  let a=b=0;
  a++;
  return a;
}
foo();

console.log(typeof a);
console.log(typeof b);
/*
undefined
number
*/
```
```javascript
const clothes = ['shirt', 'jacket'];
clothes.length = 0;

console.log(clothes);
console.log(clothes[0]);

/*
[]
undefined
*/
```

https://medium.com/@vigowebs/frequently-asked-node-js-interview-questions-and-answers-b74fa1f20678

<br/>
<br/>
<br/>

---

## Implementations

### How to serve static files
  * A basic necessity for most http servers is to be able to serve static files   
  This example takes the path requested and it serves that path, relative to the local directory. 

  ```javascript
  var fs = require('fs'),
      http = require('http');

  http.createServer(function (req, res) {
    fs.readFile(__dirname + req.url, function (err,data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }).listen(8080);
  ```

  * This works fine as a quick solution; however, there are a few problems with this approach. First, this code does not correctly handle mime types. Additionally, a proper static file server should really be taking advantage of client side caching, and should send a "Not Modified" response if nothing has changed. Furthermore, there are security bugs that can enable a malicious user to break out of the current directory. (for example, GET /../../../).

  * Each of these can be addressed invidually without much difficulty. You can send the proper mime type header. You can figure how to utilize the client caches. You can take advantage of path.normalize to make sure that requests don't break out of the current directory

  * In your node application, you can use node-static module to serve static resources.   
  The node-static module is an HTTP static-file server module with built-in caching.   
  First of all, install node-static module using NPM.using node-static module, you can create static file server in Node

  ```javascript
  var static = require('node-static');
  var http = require('http');

  var file = new(static.Server)(__dirname);

  http.createServer(function (req, res) {
    file.serve(req, res);
  }).listen(8080);
  ```

---
### Setup basic server and using node.
```javascript
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

//listen for request on port 3000
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

```javascript
http.createServer(function (req, res) {
  console.log('hello world');
}).listen(8080);
```

---
### Setup a Node Express server and connect to mlab database
```javascript
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());

// connecting to mongodb
const mongouri = require('./config/keys.js').mongoURI;
mongoose.connect(mongouri)
    .then( () => console.log('Connected to MongoDB'))
    .catch( err => console.log('Error while connecting to MongoDB', err));

// Homepage route
app.get('/',(req,res) => {
   res.sendFile(path.join(__dirname+'/static/index.html'));
});

// use routes
const items = require('./routes/api/items.js');
app.use('/api/items' , items);

port = process.env.PORT || 5000;
app.listen(port,() => console.log(`Server started at port ${port}`));
```

To install basic packages and run the application
```bash
$ npm init
$ npm i express body-parser path concurrently mongoose joi
$ npm i nodemon --save-dev
$ node index.js
```

<br/>

---

## Deploying a Nodejs App

There are many ways to deploy a Node js backend code with tradeoffs between cost, complexity and scalability

#### 1. Build your own server   

This is the most traditional way to deploy an app, but it also requires the most maintenance and upfront cost.   
You will need to purchase and manage your own servers, which can be time-consuming and expensive.   
You will need to configure the server and also take care of electricity, internet, air conditioning, natural disasters, etc.   

As your app scales you will need to buy more computers and may need to keep them in different parts of the world   

#### 2. Deploy to cloud using a compute engine    

[Deploy a Nodejs app on EC2](../AWS/README.md#elastic-compute-cloud-ec2)

Use compute engine to create a virtual machine   
This is a more modern approach that is still relatively affordable and easy to manage.   
You can rent a virtual machine from a cloud provider like Amazon Web Services (AWS), Google Cloud Platform (GCP), or Microsoft Azure.    
This gives you more control over your server than you would have with a serverless option, but you still need to manage the virtual machine itself.   
You will need to set up static IP, DNS settings, SSL certificates, etc   

This app won't scale automatically, once the CPU and memory has been fully utilized the app will stop working    
This can be fixed using Ngnix and adding load balancers which is a lot of configuration work   

#### 3. Deploy to a Platform as a Service (PaaS)  

App engine standard environment

This makes it very easy to get our nodejs app to a production server and the cloud fully manages the virtual machine, which means your app scales automatically 

This is a more hands-off approach that allows you to deploy your app without having to manage the underlying infrastructure. PaaS providers like Heroku, AWS Elastic Beanstalk, and Google App Engine handle all of the server management for you.   
This can be a good option if you want to focus on developing your app and don't want to worry about the infrastructure.

In this approach it is called the standard environment as you have no control over the runtime itself (nodejs version, dependencies version, etc)

#### 4. Deploy to a Platform as a Service (PaaS)  

App engine flexible environment

Instead of a sandbox environment, you have full control of the environment with docker   
You can install any version of nodejs along with any other dependencies   
But at the same time, cloud will automatically scale those vm up or down based on incoming traffic    

Eg - Heroku, elastic beanstalk on aws

#### 5. Deploy to Kubernetes   

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. However, Kubernetes can be difficult to learn and manage, so it is not recommended for beginners.

Kubernetes require lot of configuration but also provide maximum control  
It provides a predictable framework for scaling your infrastructure   

It is popular for large teams who have extra demands on their infrastructure   

#### 6. Serverless functions

This is the most hands-off approach, and it can also be the most cost-effective.   

Serverless functions are small pieces of code that run on demand in the cloud.   
You don't have to worry about provisioning or managing servers, and you only pay for the resources that you use.   
Cloud Functions are a good option for simple tasks that don't require a lot of processing power.

Servers are ephemeral or short lived    
These cloud functions can be triggered to run on certain events, this makes them ideal to run background jobs   
Instead of paying a fixed amount per month, we pay a tiny amount for every use    

However, serverless functions can have limitations, such as cold start times and restrictions on execution time.   
Also since they are short lived, they do not support web sockets    


#### 7. Use Cloud Run   

It works just like a serverless function, but instead of using a predefined runtime, you can customize it by containerizing your app with docker

In this approach we have all benefits of serverless like auto scaling and pay-as-you-go while also having more control over underlying server    


The best way to deploy your Node.js application will depend on your specific needs and requirements. 
* If you are just getting started, a PaaS like Heroku or Google App Engine is a good option. 
* If you need more control over your infrastructure, you can use a virtual machine or Kubernetes. 
* And if you are looking for the most cost-effective option, serverless functions are a good choice. 
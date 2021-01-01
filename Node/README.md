## Node js

Node js is a **Runtime environment for executing javacsript code outside of a browser**
* Written on google chrome's V8 engine
* Its cross-platform and open source
* We oftenly use node to build backend services also called APIs
* Ideal for Highly-scalable, data-intensive, and real time apps
* Supports non-blocking I/O operations

---
### Node js is used in
* Server client applications
* Responsive web apps
* Distributed computing
* Network application

---
### Core Modules of Node js
1. Http/http2/https module - provides an HTTP client/server implementation
1. OS module - provides operating system-related utility methods and properties
2. FS module - provides an API for interacting with the file system
3. Path module - provides utilities for working with file and directory paths
4. Events module - provides us the EventEmitter class, which is key to working with events in Node.js.

Other Modules 
1. Datagram Module (dgram) - The dgram module provides a way of working with Datagram sockets.   
  It can be used to send messages from one computer/server to another.
     
  (A datagram socket provides a symmetric data exchange interface. There is no requirement for connection establishment. Each message carries the destination address)

1. Zlib Module - The Zlib module provides a way of zip and unzip files.
1. Cluster Process Module - The cluster module provides a way of creating child processes that runs simultaneously and share the same server port.   
Node.js runs single threaded programming, which is very memory efficient, but to take advantage of computers multi-core systems, the Cluster module allows you to easily create child processes that each runs on their own single thread, to handle the load.   
Run the code three times, the first time is as a master, then as workers
1. child_process Module - We can easily spin a child process using Node’s child_process module and those child processes can easily communicate with each other with a messaging system.   
The child_process module enables us to access Operating System functionalities by running any system command inside a, well, child process.   
We can control that child process input stream, and listen to its output stream. We can also control the arguments to be passed to the underlying OS command, and we can do whatever we want with that command’s output   
There are four different ways to create a child process in Node: ```spawn(), fork(), exec(), and execFile()```.
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

---
* In Node Console is a Global Object

---
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
---
### Default Scope in Node js is LOCAL
  * In the browser's JavaScript, variables declared without var keyword become global. In Node.js, everything becomes local by default
  * In a browser, global scope is the window object. In Node.js, global object represents the global scope.   
    To add something in global scope, you need to export it using export or module.export. The same way, import modules/object using require() function to access it from the global scope.
---
### Buffer    
  * Node.js includes an additional data type called Buffer (not available in browser's JavaScript). Buffer is mainly used to store binary data, while reading from a file or receiving packets over the network.
---
### RELP in NodeJs   
  The Node.js **Read-Eval-Print-Loop (REPL)** is an interactive shell that processes Node. js expressions. The shell reads JavaScript code the user enters, evaluates the result of interpreting the line of code, prints the result to the user, and loops until the user signals to quit.    
  Node comes bundled with a REPL environment. It performs the following tasks −   
  * Read − Reads user's input, parses the input into JavaScript data-structure, and stores in memory.   
  * Eval − Takes and evaluates the data structure.   
  * Print − Prints the result.   
  * Loop − Loops the above command until the user presses ctrl-c twice.   
  The REPL feature of Node is very useful in experimenting with Node.js codes and to debug JavaScript codes

**Underscore(_) is a special variable in node which stores the result of last expression evaluation**. It can be used to access result of last command execution — similar to $? in bash

---
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
### process.nextTick() and setImmediate()   

> Consoles -> then all process.nextTick -> then all setImmediate

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
### Difference between readFile and createReadStream 

---
### EventEmitter
  * Node.js allows us to create and handle custom events easily by using events module. Event module includes EventEmitter class which can be used to raise and handle custom events.   
  The following example demonstrates EventEmitter class for raising and handling a custom event.
  ```javascript
  // get the reference of EventEmitter class of events module
  var events = require('events');
  //create an object of EventEmitter class by using above reference
  var em = new events.EventEmitter();

  //Subscribe for FirstEvent
  em.on('FirstEvent', function (data) {
      console.log('First subscriber: ' + data);
  });

  // Raising FirstEvent
  em.emit('FirstEvent', 'This is my first Node.js event emitter example.');
  ```
  * In the above example, we first import the 'events' module and then create an object of EventEmitter class. We then specify event handler function using on() function. The on() method requires name of the event to handle and callback function which is called when an event is raised.   
  The emit() function raises the specified event. First parameter is name of the event as a string and then arguments. An event can be emitted with zero or more arguments. You can specify any name for a custom event in the emit() function.   
  You can also use addListener() methods to subscribe for an event as shown below
  ```javascript
  var emitter = require('events').EventEmitter;
  var em = new emitter();

  //Subscribe FirstEvent
  em.addListener('FirstEvent', function (data) {
      console.log('First subscriber: ' + data);
  });
  //Subscribe SecondEvent
  em.on('SecondEvent', function (data) {
      console.log('First subscriber: ' + data);
  });
  // Raising FirstEvent
  em.emit('FirstEvent', 'This is my first Node.js event emitter example.');
  // Raising SecondEvent
  em.emit('SecondEvent', 'This is my second Node.js event emitter example.');
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
```javascript

```
```javascript

```

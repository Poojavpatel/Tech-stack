# Golang

### Golang Is Fast
Golang is a compiled language, which means the code written is directly translated into formats that a processor understands. Meanwhile, the program in Java is compiled into bytecode that are executed by the virtual machine.

### Golang Is Well-Scaled
* The Go language has Goroutines, which are basically functions that can run simultaneously and independently.
* Goroutines take up only 2 kB of memory, which makes it scalable when the need for running multiple concurrent processes arise. 
* Unlike Java threads, which are blocking by nature, Goroutines are non-blocking. Goroutines is the combination of async approach used by JavaScript and the traditional multi-threading used by Java. 
* Technically, you can run millions of GoRoutines without crashing the system. Having a leaner and meaner software gives you an edge over your competitors. 

<br/>
<br/>

---

## Go Concurrency Worker Pool Pattern

https://itnext.io/explain-to-me-go-concurrency-worker-pool-pattern-like-im-five-e5f1be71e2b0

<br/>
<br/>

### Node.js vs Golang for back-end development

Golang pros:

In Node.js it is difficult to utilize full CPU cores. You will have to use cluster module (which basically is different processes communicating with each other via IPC using shared port) or use worker_threads but then they serialize messages and cannot share objects like true threads so threading in Node is awkward this way. So if you have business logic in your code which is synchronous and have too many requests then the latency of Node servers will be higher than go equivalent due to lack of concurrency and even with concurrency an equivalent go code is faster than Node as its compiled to binary.

Go being statically typed means you dont have to add type validations in run time as all your go interfaces will validate data from IO calls automatically whereas in Node you will need validation libraries to validate incoming requests data (like Yup, express-validator, class validators, AJV etc) and basically everywhere you would want a strong type check in Node. In Go you get all this builtin.

Go has much stronger primitives especially numbers compared to Javascript.

MEMORY LEAK. Nearly all projects I worked in last 8 years in Node in different companies had memory leaks especially when websocket was involved. And i have spent countless hours profiling those Node servers by taking heap snapshots and inspecting memory usage. Sometimes it was due to library itself (ex. Socket.io inflate/deflate incoming JSON) and other times were due to developers code because of how closure in JS works and how V8 garbage collector works with mark sweep etc. I am saying in NodeJS its very easy to write a code which can leak memory and a lot of third party libraries (even established ones like socket.io) can cause leak especially when sockets are involved and those are VERY difficult to debug.

Node servers consume more memory compared to equivalent Go code.

Extensive standard library compared to Node.js


Node pros:

Has TON of 3rd party libraries to get work done compared to Go.

No meta framework in Go like laravel in php or Nest.js (or Adonis.js) in Node.js world. And somehow Go community is to hostile to those ideas. It means you will end up using standard library to solve same problems which Nest.js/laravel have already solved and your solution might not be robust. It becomes prevalent if you, in your Go code, add authentication, authorization, graphql, websocket middlewares etc. Go gets messy without any meta framework or lack of good 3rd party libraries compared Node.js as the same things are easy to solve/already solved in NodeJs

Extending previous point, it also means it is harder to bootstrap and build web app compared to Go as its so faster to build products with Node.

Typescript as a language is MUCH fun to work and syntax of TS/JS is significantly better than Golang. Google has a history of solving problems in awkward way and always reinventing wheel just to look cool.

Ex. Weird for loops, EXTREMELY weird OOP, export functions with capital letter (bad code styling by starting functions with capital letters instead of marking them with export and easier to search what is exported), receiver function (seriously to solve a problem they created another), has pointers which most other high level languages dont have and devs like not having to deal with pointers, painful string interpolation, painful to add JSON functionality, lack of generics, function can return more than 1 value, PAINFUL error handling and lack of DRY code because of it etc. Overall Go is just NOT the fun language syntactically which is a shame.

5. Faster to bootstrap ideas and overall MUCH more fun to work with by a long shot compared to Golang and overall in general.

6. Has npm modules fir just about anything though quality can be debatable.

So, verdict?

Overall its a tuff call. The main attraction of golang is single binary executable, easy concurrency, high speed and big standard library but its a shame that the lack of meta frameworks/small ecosystem and especially weird/poor syntax really ruin it for me significantly.

Whereas Node and TS/JS is so much fun to work with with a HUGE npm ecosystem using which developers can build products significantly faster but lack of good concurrency support means hitting limits on Node server with demanding features is easy and very hard to solve given JS is not built for concurrency and servers benefit from it. The only way out would be horizontally/vertical scaling and shelling out more $ compared to Golang.

https://www.reddit.com/r/node/comments/s4s07k/is_there_any_reason_to_switch_to_golang_nodejs_vs/

https://www.peerbits.com/blog/nodejs-vs-golang.html
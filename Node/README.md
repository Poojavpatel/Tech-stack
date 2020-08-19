## Node js

Node js is a 

---
### Core Modules of Node js
1. http module
1. os module
2. fs module
3. path module

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
### process.nextTick() and setImmediate   
process.nextTick() - to inform/request js engine to run a function asynchronously, but asap and not queue it
in short run at the begining of next iteration

setImmediate - next iteration, but at end of next iteration

---
### Difference between readFile and createReadStream   


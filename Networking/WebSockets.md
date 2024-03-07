# WebSockets


## Table of contents
- [What are websockets](#what-are-websockets)
- [How a websocket connection is established](#how-a-websocket-connection-is-established)
- [Implementing Websockets](#implementing-websockets)
- [Scaling web sockets](#scaling-web-sockets)


<br/>
<br/>


## What are websockets

[Fireship - WebSockets in 100 Seconds & Beyond with Socket.io](https://www.youtube.com/watch?v=1BfCnjr_Vjg)   
[System design - Websockets](../System%20Design/README.md)   
[Networking - Websockets](./README.md#websockets)

Websockets are used to build real time applications by establishing a two way connection between client and server

Assume you are displaying player score on a website, for client to receive the latest score, they can refresh the screen every few minutes to send new HTTP requests. Or client can fetch new data every few seconds (short polling), but these aren't ideal for real time data    

<br/>

## How a websocket connection is established  
A WebSocket connection is established through a process that involves an initial handshake between the client and the server.

1. Client initiates a WebSocket connection
    * Client (typically a web browser) sends an HTTP request to the server called WebSocket handshake request
    * The client includes an "Upgrade" header in the request with the value "websocket" to indicate its intention to establish a WebSocket connection.

      ```js
      GET /path/to/websocket-endpoint HTTP/1.1
      Host: example.com
      Upgrade: websocket  // to signal the desire to upgrade the connection
      Connection: Upgrade // to specify the intention to switch protocols
      Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==  // a base64-encoded randomly generated value
      Sec-WebSocket-Version: 13 // specifies the WebSocket protocol version
      ```

1. Server acknowledges the WebSocket upgrade request
    * the server checks for the "Upgrade" header and confirms that it is set to "websocket."
    * If the server supports WebSocket connections, it responds with a 101 status code (Switching Protocols) and includes an "Upgrade" header in the response with the value "websocket."

      ```js
      HTTP/1.1 101 Switching Protocols
      Upgrade: websocket  // to confirm the protocol switch
      Connection: Upgrade // to confirm the upgrade
      Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk= // value calculated by the server based on Sec-WebSocket-Key
      ```

1. Connection is established
    * Once the client receives the server's response with the 101 status code, the WebSocket connection is considered established
    * The WebSocket connection (TCP/IP) now remains open, allowing bidirectional communication between the client and the server.
    * The connection remains open until one of the parties drops off, and then the tcp resources can be unallocated


<br/>

Note : Serverless functions (lambdas) do not support websockets

<br/>

## Implementing Websockets

### Using ws

To implement Regular Websockets we can use the ws package on backend   
JS has a built in WebSocket class for frontend   
(modern web browsers have built-in support for WebSocket communication through a JavaScript API called the WebSocket API)

```js
npm install ws

// BE server.ts
const WebSocket = require('ws')
const server = new WebSocket.Server({ port: '8080' })

server.on('connection', socket => { 
  socket.on('message', message => {
    socket.send(`Roger that! ${message}`);
  });
});

// FE client.js
const socket = new WebSocket('ws://localhost:8080'); // the ws protocol triggers the handshake to open the connection

socket.onmessage = ({ data }) => {
  console.log('Message from server ', data);
};

socket.send('hello');

socket.close();
```

<br/>

### Using Socket.io

With regular web sockets, the server cannot broadcast a message to multiple clients simultaneously, eg to a group chat    
Instead of implementing it using ws, we can use libraries like socket.io    
ws is a low-level building block, socket.io is a practical library that solves common usecases

Implementation of a group chat room :
```js
npm install socket.io

// server.js
const http = require('http').createServer();

const io = require('socket.io')(http, {cors: { origin: "*" }});

io.on('connection', (socket) => {
  socket.on('message', (message) =>     {
    io.emit('message', `${message}` );   
  });
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );


// client.js
<script src="https://cdn.socket.io/socket.io-3.0.0.js"></script>  // need to include or install using npm, socket.io is not built in

const socket = io('ws://localhost:8080');

socket.on('message', text => {
  const el = document.createElement('li');
  el.innerHTML = text;
  document.querySelector('ul').appendChild(el)
});

document.querySelector('button').onclick = () => {
  const text = document.querySelector('input').value;
  socket.emit('message', text) 
}
```

<br/>

### Using Pusher

At Assembly, we used Pusher to implement websockets   
[Pusher npm](https://www.npmjs.com/package/pusher)

```js
// AfterMemberDeactivated.ts
this.socketService.relayToMember(memberId, "MEMBER_DEACTIVATED", {memberId, dateTimeOccurred});

// SocketService.ts
constructor(pusher: ISocketClient) {
  this.pusher = pusher;
}

public async relayToMember(memberID: string, event: string, payload?: SocketPayloadType): Promise<void> {
  await this.pusher.emitToMembers(memberID, event, params);
}
```

<br/>
<br/>


### Scaling web sockets 

Interview question asked in purplle round 2   
Q : For each logged in user, we keep one socket connection open, how did we scale this as web sockets are expensive?   

<br/>
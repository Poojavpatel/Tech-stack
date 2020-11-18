## Browsers
Browser’s job mainly consists of
1. DNS resolution - This process makes sure that once the user enters a URL, the browser knows which server it has to connect to. The browser contacts a DNS server to find that google.com translates to 216.58.207.110, an IP address the browser can connect to
1. HTTP exchange - Once the browser has identified which server is going to serve our request, it will initiate a TCP connection with it and begin the HTTP exchange
1. Rendering - It parses the HTML, loads additional resources included in the markup (for example, there could be JavaScript files or CSS documents to fetch) and presents them to the user as soon as possible

* ### High-level architecture of browser   
  <img src="https://miro.medium.com/max/499/1*VXZnMnQ0NIUMICUQYREzcw.png" width="30%">

1. The User Interface - The user interface is the space where User interacts with the browser. It includes the address bar, back and next buttons, home button, refresh and stop, bookmark option, etc. Every other part, except the window where requested web page is displayed, comes under it.
1. The Browser Engine - The browser engine works as a bridge between the User interface and the rendering engine. According to the inputs from various user interfaces, it queries and manipulates the rendering engine
1. The Rendering Engine - The rendering engine, as the name suggests is responsible for rendering the requested web page on the browser screen. The rendering engine interprets the HTML, XML documents and images that are formatted using CSS and generates the layout that is displayed in the User Interface. However, using plugins or extensions, it can display other types data also. Different browsers user different rendering engines:
    * Internet Explorer: Trident
    * Firefox & other Mozilla browsers: Gecko
    * Chrome & Opera 15+: Blink
    * Chrome (iPhone) & Safari: Webkit   
    *In Google Chrome each tab runs in a separate process(multiple instances of rendering engine)*
1. Networking - Component of the browser which retrieves the URLs using the common internet protocols of HTTP or FTP. The networking component handles all aspects of Internet communication and security. The network component may implement a cache of retrieved documents in order to reduce network traffic.
1. JavaScript Interpreter - It is the component of the browser which interprets and executes the javascript code embedded in a website. The interpreted results are sent to the rendering engine for display. If the script is external then first the resource is fetched from the network. Parser keeps on hold until the script is executed.
1. UI Backend.
1. Data Persistence/Storage - Browsers support storage mechanisms such as localStorage, IndexedDB, WebSQL and FileSystem. It manages user data such as cache, cookies, bookmarks and preferences


## HTTP

* HTTP (HyperText Transfer Protocol) is an application layer protocol that allows web based applications to communicate and exchange data
* It is a TCP/IP based protocol
* HTTP is connectionless
* HTTP is stateless - The HTTP client initiates an HTTP request and waits for the response. The server processes the request and sends a response back after which client disconnect the connection. So client and server knows about each other during current request and response only. Further requests are made on new connection like client and server are new to each other
* The server and client are aware of each other only during a current request. Afterwards, both of them forget about each other. Due to this nature of the protocol, neither the client nor the browser can retain information between different requests across the web pages
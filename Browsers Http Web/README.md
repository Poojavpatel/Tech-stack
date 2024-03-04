## Browsers

Browser’s job mainly consists of

1. DNS resolution - This process makes sure that once the user enters a URL, the browser knows which server it has to connect to. The browser contacts a DNS server to find that google.com translates to 216.58.207.110, an IP address the browser can connect to
1. HTTP exchange - Once the browser has identified which server is going to serve our request, it will initiate a TCP connection with it and begin the HTTP exchange
1. Rendering - It parses the HTML, loads additional resources included in the markup (for example, there could be JavaScript files or CSS documents to fetch) and presents them to the user as soon as possible

- ### High-level architecture of browser
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

- HTTP (HyperText Transfer Protocol) is an application layer protocol that allows web based applications to communicate and exchange data
- It is a TCP/IP based protocol
- HTTP is connectionless
- HTTP is stateless - The HTTP client initiates an HTTP request and waits for the response. The server processes the request and sends a response back after which client disconnect the connection. So client and server knows about each other during current request and response only. Further requests are made on new connection like client and server are new to each other
- The server and client are aware of each other only during a current request. Afterwards, both of them forget about each other. Due to this nature of the protocol, neither the client nor the browser can retain information between different requests across the web pages

<br/>
<br/>

---

## Local storage

- localStorage is a way to store data on the client’s computer.
- It allows the saving of key/value pairs in a web browser and it stores data with no expiration date.
- In addition with localStorage, the data is not sent back to the server for every HTTP request
- It works on same-origin policy, so the data stored will **only be available on the same origin**.
- That’s because localstorage doesn’t support sharing the storage across subdomains or even domain. Thus, if you have something stored at a.example.com it won’t be accessible from example.com or b.example.com.

- Actually, this is a browser storage security issue, and in fact, none of LocalStorage/WebSQL/IndexedDB can be shared across subdomains. They are part of the “same-origin policy” which sandboxes data. This is to prevent malicious sites from e.g. malicious.geocities.com spying on data from another site like innocent.geocities.com.

---

# HTTP Cookies

- cookie session management can be scoped to multiple subdomains

Functions

- Track browsing activity
- save login details
- track unique visitors count

<br/>
<br/>

### How cookies work

- when you visit a website for the first time, the website saves a cookie on your hard drive that has its own id
- the website uses this cookie to track your session
- a cookie is specific to that website, meaning they cannot track you on another website (except 3rd party cookie)

###

### Using cookies for subdomains

#### Host only cookie -

If you set a cookie like this, then the cookie will only apply to the request domain,  
and will only be sent for requests to the exact same domain, not any other subdomains.

```
Set-Cookie: name=value
```

#### Two different domains

(e.g. mydomain.com and subdomain.mydomain.com, or sub1.mydomain.com and sub2.mydomain.com) can only share cookies if the domain attribute is present in the header:

```
Set-Cookie: name=value; domain=mydomain.com
```

## Note

Please everyone note that you can set a cookie from a subdomain on a domain.

(sent in the response for requesting subdomain.mydomain.com)

Set-Cookie: name=value; Domain=mydomain.com // GOOD
But you CAN'T set a cookie from a domain on a subdomain.

(sent in the response for requesting mydomain.com)

Set-Cookie: name=value; Domain=subdomain.mydomain.com // Browser rejects cookie
WHY?
According to the specifications RFC 6265 section 5.3.6 Storage Model

If the canonicalized request-host does not domain-match the domain-attribute: Ignore the cookie entirely and abort these steps.

and RFC 6265 section 5.1.3 Domain Matching

Domain Matching

A string domain-matches a given domain string if at least one of the following conditions hold:

The domain string and the string are identical. (Note that both the domain string and the string will have been canonicalized to lower case at this point.)

All of the following conditions hold:

- The domain string is a suffix of the string.

- The last character of the string that is not included in the
  domain string is a %x2E (".") character.

- The string is a host name (i.e., not an IP address).
  So "subdomain.mydomain.com" domain-matches "mydomain.com", but "mydomain.com" does NOT domain-match "subdomain.mydomain.com"

## Define the lifetime of a cookie

The lifetime of a cookie can be defined in two ways:

Session cookies are deleted when the current session ends. The browser defines when the "current session" ends, and some browsers use session restoring when restarting. This can cause session cookies to last indefinitely.
Permanent cookies are deleted at a date specified by the Expires attribute, or after a period of time specified by the Max-Age attribute.

## Attributes of cookies

https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

<br/>
<br/>

---

## Should JWT be stored in localStorage or Cookies

- localStorage is subjected to XSS and generally it's not recommended to store any sensitive information in it.

- With Cookies we can apply the flag "httpOnly" which mitigates the risk of XSS. However if we are to read the JWT from Cookies on backend, we then are subjected to CSRF.

- To keep them secure, you should always store JWTs inside an httpOnly cookie. This is a special kind of cookie that’s only sent in HTTP requests to the server. It’s never accessible (both for reading or writing) from JavaScript running in the browser.

- If we store JWT in Cookies. On every request to server, the JWT will be read from Cookies and added in the Authorization header using Bearer scheme. The server can then verify the JWT in the request header (as opposed to reading it from the cookies)

<br/>
<br/>

---

## Using Cookies with JWT in Node.js

https://dev.to/franciscomendes10866/using-cookies-with-jwt-in-node-js-8fn

<br/>
<br/>

---

## Authentication vs Authorization

In security processes, authentication validates a user's identity.  
Authorization then grants that user permission to access a resource.

<br/>
<br/>

---

Can local storage be shared between subdomains - no  
Can you share cookies across subdomains - Yes  
Can cookies be shared across domains - No, You cannot share cookies across domains

Local storage capacity - The available size is 5MB per app per browser
Cookie storage capacity - Maximum size of cookie is 4KB, you can't store more than 20 cookies per site


### Async vs Defer in JavaScript

async and defer are attributes used when including external JavaScript files in HTML documents. They affect how the browser loads and executes the script. Let's learn about them in detail.

[Dev to: Async vs Defer in JavaScript](https://dev.to/fidalmathew/async-vs-defer-in-javascript-which-is-better-26gm?ref=dailydev)
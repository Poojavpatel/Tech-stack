# Networking

## Table of contents

- [Computer Networking](#computer-networking)
- [OSI Model](#osi-model)
  - [Layers of OSI model](#1-application-layer)
    - [Application layer](#1-application-layer)
    - [Presentation layer](#2-presentation-layer)
    - [Session layer](#3-session-layer)
    - [Transport layer](#4-transport-layer)
    - [Network layer](#5-network-layer)
    - [Data Link layer](#6-data-link-layer)
    - [Physical layer](#7-physical-layer)   
  - [Sending a message through OSI model](#example-of-sending-a-message)
  - [Possible network attacks (OSI model)](#possible-network-attacks)
- [TCP/IP model](#tcpip-model)
- [Networking Basics](#networking-basics)
  - [LAN](#lan-local-area-network)
  - [Router](#router)
  - [Wireless Networking](#wireless-networking)
  - [Packet Analysis](#packet-analysis)
  - [VPN](#vpn)
- [Networking devices](#networking-devices)
  - [Hub](#hub)
  - [Bridges](#bridge)
  - [Switch](#switch)
- [Transport Layer Protocols](#transport-layer-protocols)
  - [TCP](#tcp-transmission-control-protocol)
  - [UDP](#udp-user-datagram-protocol)
- [Network Protocols](#network-protocols)
  - [HTTP](#http-hypertext-transfer-protocol)
  - [HTTPS](#https-hypertext-transfer-protocol-secure)
  - [WebSockets](#websockets)
  - [REST](#rest-representational-state-transfer)
    - [URIs](#uniform-resource-identifiers-uris)
  - [GraphQL](#graphql)
  - [FTP](#ftp)
  - [SMTP](#smtp)
  - [DNS](#dns)

<br/>
<br/>
<br/>

## Computer Networking

[Computer Networking in 100 Seconds](https://www.youtube.com/watch?v=keeqnciDVOo)

Computer Networking is the way computers exchange information around the world  

<br/>
<br/>

## OSI Model
The OSI model is a seven-layer model that helps to understand how networking works.

The OSI model, which stands for Open Systems Interconnection model, is a conceptual framework that describes the different layers involved in network communication. It's basically a way to break down the complex process of transferring data between computers into manageable chunks.

Note : We don't actually use the OSI model, we use the TCP/IP model in which the concepts are exactly the same but the layers are slightly different   
We still learn the OSI model as it is referenced a lot while troubleshooting or describing network operations

[What is OSI Model | Real World Examples](https://www.youtube.com/watch?v=0y6FtKsg6J4)   
[OSI Model Explained](https://www.youtube.com/watch?v=LANW3m7UgWs)

Layers in OSI model   
1. Physical layer
1. Data Link layer
1. Network layer
1. Transport layer
1. Session layer
1. Presentation layer
1. Application layer
   

Layer 1 2 3 are called Hardware layers   
Layer 4 links top and bottom layers   
Layer 5 6 7 are called software layers  

### 7. Application layer
This layer is where the application and user communicates   
Deals with user applications like web browsers or email clients   
Application specific protocols are used here such as SMTP

Eg - HTTP, HTTPS, WebSockets, REST, GRAPHQL, FTP, SMTP, DNS, Browser


### 6. Presentation layer

Formats data in a way that the receiving application can understand   
Also able to encrypt and decrypt data if needed   

Eg - ASCII, Encryption

### 5. Session layer

This layer is responsible for establishing and terminating connection between devices   
Establishes, manages, and terminates communication sessions between applications

Eg - Sessions

### 4. Transport layer

At this layer transport protocols are added such as TCP/UDP   
This layer also adds source and destination port numbers   
Ensures reliable data delivery between end systems

<!-- ### TCP

### UDP  -->

Eg - TCP, UDP

### 3. Network layer

Network layer handles IP addressing and routing   
Routes packets of data across networks    
At this stage source and destination IP addresses are added   

Eg - [Routers](#router)

<!-- #### IP
IPv4 and IPv6 addressing.   
Difference between public and private IP addresses.   

#### NAT (Network Address Translation)
Translates private IP addresses within a network to a single public IP address for external communication.

#### Subnetting
Subnetting logically divides a single network into smaller subnetworks, allowing for better network organization, traffic control, and security. It affects how IP addresses are assigned and interpreted within a network

#### Routing
Routing is the process of determining the best path for packets to travel across a network to reach their destination. Routing protocols enable routers to communicate and exchange information about network topology, allowing them to dynamically learn and update their routing tables.

Routing protocols
RIP, OSPF, and BGP -->


### 2. Data Link layer 

Connect one physical node to another in a network via protocols like ethernet or wifi   
At this layer physical addresses are added to the data, the source and destination MAC addresses   

Eg - [Switches](#switch) are part of layer 2

### 1. Physical layer

It clear responsibility is to carry data across physical hardware   
Transmit raw data bits over the physical medium (cables, etc.)   
Fibre optic cables that literally carry light through point A to point B

Eg - Ethernet, Network interface cards (NIC), [Hubs](#hub) 


<br/>

---

### Example of sending a message

Let's imagine you're sending a message using a messaging app on your phone

1. **Application Layer**

* You compose your message within the app's UI
* The app serializes the message object, transforming it into a byte stream using a specific data format (e.g., JSON, Protobuf)
* The app initiates a request to the messaging server's API endpoint, including the serialized message and authentication credentials.

2. **Presentation Layer**

* The client-side library handles request serialization, applying content-encoding (e.g., GZIP) for efficiency and encryption (e.g., TLS) for security
* The data becomes a structured HTTP request packet with headers and the serialized message body.

3. **Session Layer**

* TCP (Transmission Control Protocol) handshakes occur, establishing a virtual connection and exchanging sequence numbers for reliable data delivery

4. **Transport Layer**

* TCP segments the request packet into smaller datagrams with headers containing source/destination ports, sequence numbers, and checksums.
* UDP (User Datagram Protocol) might be used for real-time media, sacrificing reliability for speed.

5. **Network Layer**

* IP (Internet Protocol) adds headers containing source/destination IP addresses, enabling routing across networks.
* Routers determine the best path based on routing tables and forward the datagrams accordingly.

6. **Data Link Layer**

* The datagrams are encapsulated with frame headers containing MAC (Media Access Control) addresses for local network delivery.
* Error detection and correction mechanisms ensure data integrity at this layer.

7. **Physical Layer**

* The frames are converted into electrical signals or radio waves based on the physical medium (Ethernet cables, Wi-Fi).
* Network interface cards (NICs) transmit the signal through the physical infrastructure.


---

## Possible network attacks

<br/>

<img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F10156f95-a4c2-47e2-86cf-645e9e7ab169_1280x1664.gif" width="50%" />

<br/>
<br/>
<br/>

---

## TCP/IP model

A model to standardize computer networking   

Even though we reference OSI model a lot, it is not used in real life, In real life we use TCP/IP model

Layers in TCP/IP model
1. Physical layer
1. Data Link layer
1. Network layer
1. Transport layer
1. Application layer
     
        
Note : Layer 5 6 7 (Session, Presentation, Application) of OSI model are combined as one layer Application layer

| Layer   |      Header-Data-Tail          |   what it is called |
| :-----: | :----------------------------: | :-----------------: |
| Layer 5 |                 DATA           |         data        |
| Layer 4 |             TCP-DATA           |       segment       | 
| Layer 3 |          IP-TCP-DATA           |        packet       |
| Layer 2 | Ethernet-IP-TCP-DATA-Ethernet  |        frame        |
| Layer 1 | Ethernet-IP-TCP-DATA-Ethernet  |          -          |

<br/>
<br/>

---

## Networking Basics


### LAN (Local Area Network)

Refer      
https://www.youtube.com/watch?v=oHQvWa6J8dU   
https://www.youtube.com/watch?v=tSodBEAJz9Y   

A LAN is a network that is limited to a small geographic area, such as within a single building or campus. Devices on a LAN can communicate with each other directly without going through the internet.    

Best example of LAN is home network where multiple devices Mobiles, Computers, Printers all are connected to a WIFI and the network is connected to outer internet   

**IP (in a LAN)**   
IP addresses are used to uniquely identify devices within the local network. Each device on the LAN is assigned an IP address, allowing them to communicate with each other using the Internet Protocol

**Switch (in a LAN)**   
A switch is a crucial device in a LAN. It connects devices within the same network, such as computers, printers, and other networked devices. Switches use MAC addresses to forward data to the correct device within the LAN.

**Router (in a LAN)**   
A router connects the local network (LAN) to other networks, including the internet. It acts as a gateway between the LAN and external networks. Routers make decisions about where to send data based on IP addresses, ensuring that data is correctly directed within and outside the local network.

A router also has an IP address which is often called as the network **Gateway**

**Subnet (in a LAN)**  
A crucial part of networking setup is determining wether a piece of hardware is a part of local network or a foreign device. This is done using subnet 

Subnets help determine overall range of a LAN 

**Subnet mask**   
A subnet mask is a 32-bit number that divides an IP address into network and host portions. It is used in networking to define the boundaries between the network and host parts of an IP address, allowing for efficient routing of data within a network.

In binary form, a subnet mask is a sequence of 1s followed by 0s. The consecutive 1s represent the network portion, and the 0s represent the host portion. For example, a subnet mask of "255.255.255.0" in binary is "11111111.11111111.11111111.00000000."   

Classless Inter-Domain Routing (CIDR) notation is commonly used to represent subnet masks. For example, the subnet mask "255.255.255.0" can be expressed as "/24" in CIDR notation, indicating that the first 24 bits are allocated for the network.

"255.255.255.0" (/24) is common for small to medium-sized networks.   
"255.255.0.0" (/16) is often used for larger networks.   
"255.0.0.0" (/8) represents a very large network.   


---

### Router 

A router connects the local network (LAN) to other networks, including the internet.   
A router is a networking device that connects different computer networks together and directs data traffic between them.   

Its primary function is to determine the optimal path for data packets to travel from the source to the destination across multiple networks. Routers operate at the network layer (Layer 3) of the OSI (Open Systems Interconnection) model.

Routers are a Layer 3 device as they use IP and MAC addresses

> Consider a Router like an ATC (Air Traffic Controller), that guides airplanes (data packets) flying to various airports (networks) 

Here's why routers are used in networking:   

1. Network Address Translation (NAT)   
When router communicates with devices outside a network, it tends to mask the internally allocated IP addresses and uses a single Public IP address for all the devices. This process is called Network Address Translation   
NAT enhances security and conserves public IP addresses.   

1. Firewall Functionality   
A firewall is a security device or software that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between a trusted internal network and untrusted external networks, blocking or allowing traffic based on specified criteria.   
Firewalls protect the network from unauthorized access, prevent malicious attacks, and enforce security policies. They can be implemented in routers to filter and control traffic between the internal and external networks.

1. Connectivity between Networks   
Routers connect disparate networks, such as a local area network (LAN) to the internet or multiple LANs in different locations. They act as gateways, allowing data to flow between these networks.

1. Packet Forwarding   
Routers analyze the destination IP addresses of data packets and make decisions about how to forward them to the next hop or destination network. This process is known as packet forwarding

1. Path Determination   
Routers use routing algorithms to determine the most efficient path for data to travel between source and destination networks. The selection is based on factors like the destination IP address, network conditions, and routing protocols.

1. DHCP (Dynamic Host Configuration Protocol)
Routers can act as DHCP servers, dynamically assigning IP addresses to devices within a local network. This simplifies IP address management in a network.

1. Virtual LAN (VLAN) Support   
Some routers support VLANs, allowing the logical segmentation of a network into multiple virtual LANs. This enhances network organization and security.

1. Load Balancing   
In enterprise environments, routers can be configured for load balancing

#### DMZ

#### Port forwarding


<br/>


---

### Wireless Networking
Enables devices to connect to a network without wires using technologies like Wi-Fi or Bluetooth

<br/>

---
### Packet Analysis
Captures and examines network packets to troubleshoot issues or monitor activity.
Can analyze data from various layers depending on the tool and its capabilities.

<br/>

---

### VPN

<br/>

<img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fadcd08dd-b113-4fc5-96d8-9efce286956e_1280x1664.gif" width="40%"/>

<br/>
<br/>

A VPN, or Virtual Private Network, is a technology that creates a secure, encrypted connection over a less secure network, such as the public internet. The primary purpose of a VPN is to provide privacy and security to data and communications.

A VPN acts as a tunnel through which the encrypted data goes from one location to another. Any external party cannot see the data transferring.

A VPN works in 4 steps:
* Step 1 - Establish a secure tunnel between our device and the VPN server.
* Step 2 - Encrypt the data transmitted.
* Step 3 - Mask our IP address, so it appears as if our internet activity is coming from the VPN server.
* Step 4 - Our internet traffic is routed through the VPN server.

Advantages of a VPN:
* Privacy
* Anonymity
* Security
* Encryption
* Masking the original IP address

Disadvantages of a VPN:
* VPN blocking
* Slow down connections
* Trust in VPN provider





<br/>
<br/>


---

## Networking devices

### Hub 
A Hub's job is to connect devices in your network together

Assume Host A B C D are connected by a Hub, and Host A want to send some data to Host C   
When Hub receives data from Hub A, it sends it to every port except A ie B C and D   
B and D discard the data, only C accepts the data   

* A hub uses **Half duplex**, which means it can't send and receive data at the same time without causing data collision

* Hub is a Layer 1 device, meaning it has no knowledge of addresses

Downfalls of a hub:   
* Wastes Bandwidth (host B and D receive unwanted data)  
* Security risk (host B and D receive unwanted data)  
* Half duplex
* Layer 1 device 

Hubs are old technology, they have now been replaced by switches



### Bridge

Bridges were introduced to combat some shortcomings of hubs   
They segment network into smaller sections. When data reaches a bridge, it decides wether or not to forward the data by looking at source and destination MAC address   

* Bridges are a Layer 2 device, they can understand and learn MAC addresses
* Full duplex - Data can be sent and received on each section at the same time
* A bridge usually has 2 ports (fewer than hubs)

Bridges are not used anymore, they are replaced by switches



### Switch

Switches connect devices in a network, but can also learn which port connects to which host

A switch has something called MAC address table which is like a hash `{ Mac_address: port }`   
Assume Host A wants to send some data to Host C, since the address table is empty, data is forwarded to hosts B C D   
The switch now learns Host A mac address can be reached on port 1 `{ AAAA:AAAA:AAAA : 1 }`   
When Host C sends data back to Host A, the switch sends data only to host A, `{ AAAA:AAAA:AAAA : 1, CCCC:CCCC:CCCC : 3 }`   

* Switch is a Layer 2 device, it can understand and learn MAC addresses
* Full duplex - Data can be sent and received at the same time
* Saves bandwidth 

<br/>
<br/>
<br/>

---

## Transport Layer Protocols
  
### TCP (Transmission Control Protocol)

TCP Header

<img src="https://cdn.networklessons.com/wp-content/uploads/2015/07/tcp-header.png" width="30%"  />

<br/>

* TCP is a connection-oriented protocol, meaning it establishes a connection between the sender and receiver before data exchange begins using 3 way handshake
  * The TCP handshake is a process to establish a connection between a client and a server. It involves three steps
  * 1 SYN (Synchronize) : The client sends a TCP segment with the SYN flag set to the server, indicating its intention to establish a connection
  * 2 SYN-ACK (Synchronize-Acknowledge) : The server responds with a TCP segment that has both the SYN and ACK flags set, acknowledging the client's request and expressing its readiness to establish a connection
  * 3 ACK (Acknowledge) : The client sends a final ACK segment, confirming the server's acknowledgment. At this point, the connection is established, and data transfer can begin.
* TCP is a reliable protocol that ensures data is delivered accurately and in order.

* It does this by breaking data into segments, assigning sequence numbers to each segment, and using checksums to detect errors. If a segment is lost or corrupted, TCP will resend it.   

* TCP headers are larger compared to UDP due to the inclusion of various control flags, sequencing information, acknowledgment, and other features

* TCP is commonly used for applications where data integrity, reliability, and ordered delivery are critical, such as file transfers, email, and web browsing.

<br/>

### UDP (User Datagram Protocol)

UDP Header

<img src="https://www.imperva.com/learn/wp-content/uploads/sites/13/2019/01/UDP-packet.jpg" width="30%"  />

<br/>

* UDP is a connectionless protocol, meaning it does not establish a connection before data transfer. Each UDP packet is treated independently.

* UDP is an unreliable protocol that does not guarantee data delivery or order. Some packets may be lost or arrive out of order.

* UDP headers are smaller compared to TCP headers, as UDP lacks some of the features present in TCP, such as acknowledgment and sequencing.

* It is faster than TCP because it does not have the overhead of error checking and retransmission. 

* UDP is a good choice for applications that require real-time data transmission, such as voice and video calls, online gaming, live streaming, where some data loss is acceptable.



<br/>
<br/>

---

## Network Protocols

### HTTP (Hypertext Transfer Protocol)

* HTTP is the foundation of data communication on the World Wide Web. It is a protocol used for transferring hypertext (text with links) between web browsers and web servers.   

* It operates over the TCP protocol and uses a client-server model. HTTP is stateless, meaning each request from a client to a server is independent and not related to previous requests.   

* Common methods include GET (retrieve), POST (submit data), PUT (update), DELETE (remove).   

* HTTP header Includes metadata about the request or response   

* Example Use Cases: Loading web pages, submitting forms, fetching resources.

<br/>

### HTTPS (Hypertext Transfer Protocol Secure)

* HTTPS is a secure version of HTTP. It provides a secure and encrypted connection between a web browser and a web server, ensuring that data transmitted between them is encrypted and protected from potential eavesdropping or tampering.

* HTTPS uses TLS (Transport Layer Security) or SSL (Secure Sockets Layer) protocols to establish a secure connection. 

* Before secure communication begins, a process called the SSL/TLS handshake occurs. It involves the negotiation of encryption algorithms and the exchange of cryptographic keys.

* HTTPS typically operates on port 443. URLs that use HTTPS have "https://" in the beginning, indicating a secure connection.

* Websites using HTTPS obtain SSL/TLS certificates from Certificate Authorities (CAs). These certificates verify the authenticity of the website's identity.

* Google and other search engines favor HTTPS-secured websites, considering it as a ranking factor.

* It is commonly used for secure transactions, such as online banking or e-commerce, login credentials, and any application where the confidentiality and integrity of data are crucial.

<br/>

### WebSockets

Enables real-time, two-way communication between web browsers and servers.
Primarily operates at the Application Layer (Layer 7), building upon established protocols like HTTP (Layer 7) but offering a different communication model.

WebSockets are often used in applications that require low-latency communication, such as online chat, online gaming, and real-time collaboration tools.

<br/>

### REST (Representational State Transfer)

* REST is an architectural style that guides the design of networked applications.

* RESTful APIs (Application Programming Interfaces) adhere to REST principles, emphasizing scalability, simplicity, and a uniform interface.

* One of the key principles of REST is statelessness. Each request from a client to a server contains all the information needed to understand and fulfill that request. The server does not store any state about the client between requests.

* In REST, everything is treated as a resource, which can be a physical entity (like a database record) or a logical concept (like an account). Each resource is identified by a unique URI (Uniform Resource Identifier).

* RESTful APIs (Application Programming Interfaces) use standard HTTP methods to perform operations on resources

* Resources are represented in different formats, such as JSON or XML. Clients interact with these representations to perform operations on resources.

* RESTful APIs are commonly used in web services, cloud services, and mobile application backends. They provide a flexible and scalable way for clients to interact with server resources.


#### Uniform Resource Identifiers (URIs)

* URIs are Strings identifying resources on the internet, URIs include both URLs and URNs. 

* URLs are used to locate resources on the internet, specifying the protocol, host, and path.

Examples of URLs:   
http://www.example.com/index.html   
This URL points to the "index.html" resource on the web server at "www.example.com" using the HTTP protocol.    


https://api.example.com/data   
This URL refers to the "data" resource on the secure web API at "api.example.com" using the HTTPS protocol.    

ftp://ftp.example.com/documents/file.txt   
This URL specifies the location of the "file.txt" document on an FTP server at "ftp.example.com."


* URNs are used for naming resources without implying their location, typically in standardized namespaces

Examples of URNs:   
urn:isbn:0451450523   
This URN represents an International Standard Book Number (ISBN) and uniquely identifies a book.   

urn:oid:2.16.840   
This URN represents an Object Identifier (OID) and is used to uniquely identify objects in a distributed computing environment.    


<br/>

### GraphQL

GraphQL is a query language and runtime for APIs. It allows clients to request only the data they need, reducing over-fetching or under-fetching of information compared to traditional REST APIs.

GraphQL provides a more flexible and efficient way for clients to interact with APIs by enabling them to define the structure of the response according to their specific requirements.

https://www.youtube.com/watch?v=eIQh02xuVw4

TODO 

<br/>

### FTP

FTP is a standard network protocol used to transfer files from one host to another over a TCP-based network, such as the internet.

FTP allows users to upload and download files, create directories, and perform other file-related operations. It can operate in either an active or passive mode for data transfer.

<br/>

### SMTP
SMTP is a protocol used for sending emails. It is responsible for the transfer of emails from a sender's mail server to the recipient's mail server.

SMTP operates over the TCP protocol and uses a store-and-forward mechanism. It is widely used in email communication, allowing different mail servers to exchange emails across the internet.

<br/>

### DNS
Where does DNS sit in the osi model?   
DNS, the Domain Name System, doesn't directly "fit" into the OSI model. It operates conceptually within the Application Layer (Layer 7), but acts independently of the layered communication structure established by the OSI model   

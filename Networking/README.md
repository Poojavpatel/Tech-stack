# Networking

## Table of contents

- [Computer Networking](#computer-networking)
- [OSI Model](#osi-model)
  - [Application layer](#1-application-layer)
    - [HTTP](#http)
    - [HTTPS](#https)
    - [WebSockets](#websockets)
    - [REST](#rest)
    - [GraphQL](#graphql)
    - [FTP](#ftp)
    - [SMTP](#smtp)
    - [DNS](#dns)
  - [Presentation layer](#2-presentation-layer)
  - [Session layer](#3-session-layer)
  - [Transport layer](#4-transport-layer)
    - [TCP](#tcp)
    - [UDP](#udp)
  - [Network layer](#5-network-layer)
    - [IP](#ip)
    - [NAT](#nat-network-address-translation)
    - [Subnetting](#subnetting)
    - [Routing](#routing)
  - [Data Link layer](#6-data-link-layer)
    - [Hub](#hub)
    - [Switch](#switch)
    - [Hub vs Switch](#hub-vs-switch)
  - [Physical layer](#7-physical-layer)   
- [Example of sending a message](#example-of-sending-a-message)
- [Firewalls](#firewalls)
- [DHCP (Dynamic Host Configuration Protocol)](#dhcp-dynamic-host-configuration-protocol)
- [Wireless Networking](#wireless-networking)
- [Packet Analysis](#packet-analysis)
- [VPN](#vpn)


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

[What is OSI Model | Real World Examples](https://www.youtube.com/watch?v=0y6FtKsg6J4)

Layers in OSI model
1. Application layer
1. Presentation layer
1. Session layer
1. Transport layer
1. Network layer
1. Data Link layer 
1. Physical layer

   
Layer 1 2 3 are called software layers   
Layer 4 links top and bottom layers   
Layer 5 6 7 are called Hardware layers   

<br/>
<br/>


## 1. Application layer
Deals with user applications like web browsers or email clients

### HTTP

### HTTPS

### WebSockets
Enables real-time, two-way communication between web browsers and servers.
Primarily operates at the Application Layer (Layer 7), building upon established protocols like HTTP (Layer 7) but offering a different communication model.

### REST

### GraphQL

### FTP

### SMTP

### DNS
Where does DNS sit in the osi model?   
DNS, the Domain Name System, doesn't directly "fit" into the OSI model. It operates conceptually within the Application Layer (Layer 7), but acts independently of the layered communication structure established by the OSI model   

<br/>

## 2. Presentation layer

Formats data for the application layer and vice versa

<br/>

## 3. Session layer

Establishes, manages, and terminates communication sessions between applications

<br/>

## 4. Transport layer

Ensures reliable data delivery between end systems

### TCP

### UDP 

<br/>

## 5. Network layer

Routes packets of data across networks

### IP
IPv4 and IPv6 addressing.   
Difference between public and private IP addresses.   

### NAT (Network Address Translation)
Translates private IP addresses within a network to a single public IP address for external communication.

### Subnetting
Subnetting logically divides a single network into smaller subnetworks, allowing for better network organization, traffic control, and security. It affects how IP addresses are assigned and interpreted within a network

### Routing
Routing is the process of determining the best path for packets to travel across a network to reach their destination. Routing protocols enable routers to communicate and exchange information about network topology, allowing them to dynamically learn and update their routing tables.

Routing protocols
RIP, OSPF, and BGP

<br/>

## 6. Data Link layer 

Connect one physical node to another in a network via protocols like ethernet or wifi

### Hub

### Switch 

### Hub vs Switch



<br/>

## 7. Physical layer

Transmits raw data bits over the physical medium (cables, etc.)   
Fibre optic cables that literally carry light through point A to point B



<br/>



<br/>
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

### Firewalls
Filter traffic based on security rules, spanning multiple layers depending on configuration.

<br/>

---

### DHCP (Dynamic Host Configuration Protocol)
Automatically assigns IP addresses and other network configurations to devices

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
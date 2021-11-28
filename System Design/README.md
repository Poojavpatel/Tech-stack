# What is System Design

System - Architecture or collection of software/technology, that communicate with each other,in order to serve a set of **users**, to filfill a **requirement**

System can be designed keeping three things in mind
1. Components 
2. Users
3. Requirements

Real world Systems - Building, Hospital, Theatre (components - walls, chairs, beds)
Computing Systems - Netflix, Twitter, Logger (components - database, caching, servers, application)

System Design - The Process of understanding user requirements and selecting components/softwares/technologies to serve the need of system

Components 
1. Logical entities  - Data, Database, Cache, Application, Message queue, Infrastructure
2. Tangible entities (Technologies) - Redis, aws, google cloud, react js, Java, Python

A system may or may not have presentation layer (eg - logger system)

# System Design Interviews - Step by step

## Step 1 - Requirements clarifications
   
Clarify all these
   
* ### Functional Requirements
  what features are expected - upload video, show feed, cater to multiple resolutions, cater to different internet speeds etc
   
* ### Non Functional requirements
  What non functional requirements are expected - high availability, low latency, consistency vs performance, fault tolerence et
   
* ### Capacity Estimation
  1. What scale is expected from the system (e.g., number of new tweets, number of tweet views, number of timeline generations per sec., etc.)
  1. DAU (Daily active users), Creators ratio
  2. How much storage will we need?
  3. What network bandwidth usage are we expecting? This will be crucial in deciding how we will manage traffic and balance load between servers.


## Step 2 - Defining data model

## Step 3 - High-level design
* Design monolith first and then try to break it 

## Step 4 - Detailed Design

Ask yourself 
* How should we partition our data to distribute it to multiple databases? 
* Should we try to store all the data of a user on the same database? What issue could it cause?
* How much and at which layer should we introduce cache to speed things up?
* Since users’ timeline will contain the most recent (and relevant) tweets, should we try to store our data so that it is optimized for scanning the latest tweets?
* What components need better load balancing?

## Step 5 - Identifying and resolving bottlenecks

* Is there any **single point of failure** in our system? What are we doing to mitigate it?
* Do we have enough **replicas** of the data so that we can still serve our users if we lose a few servers?
* Do we have enough **copies of different services running** such that a few failures will not cause a **total system shutdown**?
* How are we **monitoring the performance** of our service? Do we get **alerts** whenever critical components fail or their performance degrades?

# System design basics 

## Key Characteristics of Distributed Systems
### Scalability     
* Capability of a system, process, or a network to grow and manage increased demand
* **Horizontal Scaling - Adding more servers into your pool of resources**
* **Vertical Scaling - Increasing capacity of a server (adding more ram, cpu, memory)**   
scaling beyond that capacity often involves downtime and comes with an upper limit

<br/>

### Reliability    

  * Reliability is the probability that a product will continue to work normally over a specified interval of time, under specified conditions
  * Considered reliable if it keeps delivering its services even when one or several of its software or hardware components fail
  * If a user has added an item to their shopping cart, the system is expected not to lose it.    
  A reliable distributed system <ins>**achieves this through redundancy**</ins> of both the software components and data.    
  If the server carrying the user’s shopping cart fails, another server that has the exact replica of the shopping cart should replace it   
  * <ins>**redundancy has a cost**</ins> and a reliable system has to pay that to achieve such resilience for services by eliminating every single point of failure.

<br/>

### Availability    
  * System should be always available to the end user irrespective of location, network failure, etc
  * Availability is the time a system remains operational to perform its required function in a specific period
  * Availability takes into account maintainability, repair time, spares availability, and other logistics considerations
  * Reliability is availability over time considering the full range of possible realworld conditions that can occur


<br/>

### Reliability Vs. Availability   
  * If a system is reliable, it is available. However, if it is available, it is not necessarily reliable
  * In other words, high reliability contributes to high availability, but it is possible to achieve a high availability even with an unreliable product by minimizing repair time and ensuring that spares are always available when they are needed

<br/>
   
### Efficiency    
  System should full fill requirements in terms of speed, accuracy, memory
  * Two standard measures of its efficiency are
    1. Response time (latency) - the delay to obtain the first item
    1. Throughput (bandwidth) - the number of items delivered in a given time unit (e.g, a second).
  * The two measures correspond to the following unit costs:
    1. Number of messages globally sent by the nodes of the system regardless of the message size.
    1. Size of messages representing the volume of data exchanges
 
<br/>

  
### Serviceability or Manageability    
  * How easy it is to operate and maintain
  * Repair and Maintainece should be quick, accesible and affordable
   
<br/>
<br/>


## Load Balancing

* Used to distribute traffic across a cluster of servers to improve responsiveness and availability of applications
* By balancing application requests across multiple servers, a load balancer reduces individual server load   
 and prevents any one **application server from becoming a single point of failure**,   
thus improving overall application **availability and responsiveness**
* LB also keeps track of the status of all the resources

<br/>

* To utilize full scalability and redundancy, we can try to balance the load at each layer of the system.   
 We can add LBs at three places
 1. Between the user and the web server
 1. Between web servers and an internal platform layer, like application servers or cache servers
 1. Between internal platform layer and database

<br/>

  Benefits of Load Balancing
* Users experience faster, uninterrupted service. Users won’t have to
wait for a single struggling server to finish its previous tasks. Instead,
their requests are immediately passed on to a more readily available
resource.
* Service providers experience less downtime and higher throughput.
Even a full server failure won’t affect the end user experience as the
load balancer will simply route around it to a healthy server.
* Load balancing makes it easier for system administrators to handle
incoming requests while decreasing wait time for users.
* Smart load balancers provide benefits like predictive analytics that
determine traffic bottlenecks before they happen. As a result, the smart
load balancer gives an organization actionable insights. These are key
to automation and can help drive business decisions.
* System administrators experience fewer failed or stressed components.
Instead of a single device performing a lot of work, load balancing has
several devices perform a little bit of work.

<br/>

* Health Checks - Load balancers should only forward traffic to “healthy”
backend servers. To monitor the health of a backend server, “health checks”
regularly attempt to connect to backend servers to ensure that servers are
listening. If a server fails a health check, it is automatically removed from the
pool, and traffic will not be forwarded to it until it responds to the health
checks again.


* Algorithms load balancers use to decide which server will serve a req 
1. <ins>Least Connection Method</ins> - Server with the least active connections gets the req
1. <ins>Least Response Time Method</ins> - Server with the fewest active connections and the lowest average response time
1. <ins>Least Bandwidth Method</ins> -  Server that is currently serving the least amount of traffic measured in Mbps.
1. <ins>Round Robin</ins> - Circular manner 
1. <ins>Weighed Round Robin</ins> - Each server has a attached weight (integer value that indicates processing capacity), servers with higher
weights get more connections than those with less weights.
1. <ins>IP Hash Based</ins> -  Hash of the IP address of the client is calculated to redirect the request to a server  

<!-- Problem with hash based - When a new server is added to the pool, the hash function changes, hence all existing entries need to be shifted acc to new hashes -->
<br/>

* Redundant Load Balancers
The load balancer can be a single point of failure; to overcome this, a second
load balancer can be connected to the first to form a cluster. Each LB
monitors the health of the other and, since both of them are equally capable
of serving traffic and failure detection, in the event the main load balancer
fails, the second load balancer takes over.

<br/>
<br/>

## Caching
* Caches take advantage of the locality of reference principle: recently requested data is likely to be requested again
* Caching can be at all levels from Frontend cache, load balancer cache, Backend Cache, Hardware, OS, Web application etc   
* Cache Invalidation is a challenge    
(Cache invalidation means that when the original data is updates, cache should be in sync and return updated data)    
(Keeping cache coherent with the source of truth ie database)

<br/>  

* 3 methods for cache invalidation  
  1. <ins>Write through Cache</ins> - When making a db update.. update the cache first and then the db   
  Latency ↑ ie Speed ↓, Reliability ↑ 
  1. <ins>Write Back cache</ins> - After making DB update, return response to FE, then update cache   
  Speed ↑ , Reliability ↓
  1. <ins>Write-around cache</ins> - 

<br/>  

* Methods to decide which cache to clear
  1. <ins>FIFO/ Round Robin</ins>
  1. <ins>Least Recently Used</ins> 
  1. <ins>Most Recently Used</ins>
  1. <ins>Least Frequently Used</ins>

<br/>  

* ### Content Distribution Network (CDN)
* for sites serving large amounts of static media
* In a typical CDN setup, a request will first ask the CDN for a
piece of static media; the CDN will serve that content if it has it locally
available.    
If it isn’t available, the CDN will query the back-end servers for the
file, cache it locally, and serve it to the requesting user.
* 

<br/>
<br/>


## Data Partitioning
* Distributing data across various databases
* **Horizontal Scaling - Adding more servers**
* **Vertical Scaling - Increasing capacity of a server (adding more ram, cpu, memory)**

* Methods to decide which db entries go in which server
1. <ins>Based on Property</ins> - Eg all users with name A in one server, with B in another, etc   
Division of pincode by state 
Uniformity ↓,  Insert/retrival Simplicity ↑
2. <ins>Hash Based</ins> - Uniformity ↑



<br/>
<br/>


## Indexes

* Database indexes enable faster retrival of data 
* Indexes should only be on certain columns that are read using a propety often
* Unnecessary use of indexes may increase the memory of db and make retrivals slower infact
* How indexing works 

  Suppose users table is often fetched by name,   
  Creating an index on name will create a new table which will contain names in ascending order and pointer to the actual row in original table
    
  Hence O(n) -> O(log n)
    
  Since creating an index creates a new table, Memory used ↑   
  The new table needs to be updated whenever the original table updates, hence Complexity ↑   


<br/>
<br/>


## Proxies

<br/>
<br/>


## Redundancy and Replication

<br/>
<br/>


## SQL vs. NoSQL

#### SQL Advantages
* Structured Data
* ACID Compliant
   
#### SQL Disadvantages
* Scale vertically
* Adding a property is expensive (unecessary space taken by columns with no entries)

#### NoSQL Advantages
* Unstructured
* Adding or removing properties is very easy
* Scale horizontally

#### NoSQL Disadvantages
* Not easily ACID complient, has BASE properties


<br/>
<br/>


## CAP Theorem

C - Consistency    
A - Availability    
P - Partition tolerence   


<br/>
<br/>


## PACELC Theorem 

<br/>
<br/>


## Consistent Hashing

<br/>
<br/>


## Long-Polling vs WebSockets vs Server-Sent Events

<br/>
<br/>


## Bloom Filters 

* Suppose you work at a library and a customer approches with a book name, how do you tell him wether you have the book or not, Traversing whole library is possible but inefficient
* Maintain a Hash - Save a hash which contains names of all books in library, gets bigger with no of books
* Bloom Filters - Take a board with all cells marked with a number as 'OFF',   
Pass the names of all books through a hash function, and mark the output values as 'ON'   
When a customer asks for a book, pass the book title through the hash function and check if its on 
   

  False Negatives - Entry of a book can be marked as 'ON' if a book is not avialble,   
  This happens when two titles produce the name hash value    
  To prevent this use multiple hash functions

<br/>
<br/>


## Quorum 


<br/>
<br/>

## Leader and Follower 


<br/>
<br/>

## Heartbeat

<br/>
<br/>


## Checksum

<br/>
<br/>


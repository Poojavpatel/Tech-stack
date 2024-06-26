### Table of Contents

1. [What is System Design](#what-is-system-design)
1. [System design basics](#system-design-basics)
   1. [Key Characteristics of Distributed Systems](#key-characteristics-of-distributed-systems)
      1. [Scalability](#1-scalability)
      1. [Reliability](#2-reliability)
      1. [Availability](#3-availability)
      1. [Efficiency](#4-efficiency)
      1. [Serviceability or Manageability](#5-serviceability-or-manageability)
   1. [Load Balancing](#load-balancing)
   1. [Caching](#caching)
      1. [Cache invalidation](#cache-invalidation)
      1. [Cache eviction](#cache-eviction-policies)
          1. [LRU Cache](#cache-eviction-policies)
      1. [Content Distribution Network (CDN)](#content-distribution-network-cdn)
      1. [Distributed Caching](#distributed-caching)
   1. [Data Partitioning (Sharding)](#data-partitioning-sharding)
   1. [Indexes](#indexes)
   1. [Proxies](#proxies)
      1. [Forward Proxy](#forward-proxy-or-http-proxy)
      1. [Open Proxy](#open-proxy)
      1. [Reverse Proxy](#reverse-proxy)
   1. [Redundancy and Replication](#redundancy-and-replication)
   1. [Horizontal vs Vertical Scaling](#horizontal-vs-vertical-scaling)
   1. [CAP Theorem](#cap-theorem)
   1. [PACELC Theorem](#pacelc-theorem)
   1. [Consistent Hashing](#consistent-hashing)
   1. [Real-Time Communication Methods](#real-time-communication-methods)
      1. [Short polling](#short-polling) 
      1. [Long-Polling](#long-polling) 
      1. [Web sockets](#web-sockets) 
      1. [Server-Sent Events](#server-sent-events) 
      1. [Webhooks](#webhooks) 
      1. [Zapier](#zapier) 
   1. [Long-Polling vs WebSockets vs Server-Sent Events](#long-polling-vs-websockets-vs-server-sent-events)
   1. [Bloom Filters](#bloom-filters)
   1. [Quorum](#quorum)
   1. [Leader and Follower](#leader-and-follower)
   1. [Heartbeat](#heartbeat)
   1. [Checksum](#checksum)
   1. [SLI, SLO, and SLA](#sli-slo-and-sla)
   1. [Message Queue](#message-queue)
   1. [Distributed message queue](#distributed-message-queue)
   1. [Logging Monitoring Alerting](#logging-monitoring-alerting)
1. [System Design - Choosing database](#system-design---choosing-database)
1. [Virtualization](#virtualization)
   1. [Bare Metal](#bare-metal)
   1. [Virtual Machines (VMs)](#virtual-machines-vms)
   1. [Containerization](#containerization)
1. [API Design](./API_design.md)
1. [Development and deployment](#development-and-deployment)
   1. [Deployment strategies](#deployment-strategies)
1. [Software Architecture Patterns](../SoftwareArchitecture/README.md)
1. [Technologies & Frameworks](#technologies--frameworks)
   1. [Kafka](#kafka)
1. [System Design Interviews](./Interviews.md)
<br/>

## What is System Design

System - Architecture or collection of software/technology, that communicate with each other,in order to serve a set of **users**, to filfill a **requirement**

System can be designed keeping three things in mind

1. Components
2. Users
3. Requirements

Real world Systems - Building, Hospital, Theatre (components - walls, chairs, beds)
Computing Systems - Netflix, Twitter, Logger (components - database, caching, servers, application)

System Design - The Process of understanding user requirements and selecting components/softwares/technologies to serve the need of system

Components

1. Logical entities - Data, Database, Cache, Application, Message queue, Infrastructure
2. Tangible entities (Technologies) - Redis, aws, google cloud, react js, Java, Python

A system may or may not have presentation layer (eg - logger system)

<br/>
<br/>
<br/>

---

## System design basics

### Key Characteristics of Distributed Systems

#### 1. Scalability

- Capability of a system, process, or a network <ins>to grow and manage increased demand</ins>
- **Horizontal Scaling - Adding more servers into your pool of resources**
- **Vertical Scaling - Increasing capacity of a server (adding more ram, cpu, memory)**  
  scaling beyond that capacity often involves downtime and comes with an upper limit

<br/>

#### 2. Reliability

  > Reliability is achieved through redundancy

- Considered reliable if it keeps <ins>delivering its services even when one or several of its software or hardware components fail</ins>
- If a user has added an item to their shopping cart, the system is expected not to lose it.  
  A reliable distributed system <ins>**achieves this through redundancy**</ins> of both the software components and data.  
  If the server carrying the user’s shopping cart fails, another server that has the exact replica of the shopping cart should replace it
- <ins>**redundancy has a cost**</ins> and a reliable system has to pay that to achieve such resilience for services by eliminating every single point of failure.

<br/>

#### 3. Availability

- System should be always available to the end user irrespective of location, network failure, etc
- Availability is the time a system remains operational to perform its required function in a specific period
- Availability takes into account maintainability, repair time, spares availability, and other logistics considerations
- Reliability is availability over time considering the full range of possible realworld conditions that can occur

<br/>

#### Reliability Vs. Availability

- **If a system is reliable, it is available. However, if it is available, it is not necessarily reliable**
- In other words, **high reliability contributes to high availability, but it is possible to achieve a high availability even with an unreliable product by minimizing repair time** and ensuring that spares are always available when they are needed

<br/>
   
#### 4. Efficiency    
  System should fullfill requirements in terms of speed, accuracy, memory
  * Two standard measures of its efficiency are
    1. Response time (latency) - the delay to obtain the first item
    1. Throughput (bandwidth) - the number of items delivered in a given time unit (e.g, a second).
  * The two measures correspond to the following unit costs:
    1. Number of messages globally sent by the nodes of the system regardless of the message size.
    1. Size of messages representing the volume of data exchanges
 
<br/>

#### 5. Serviceability or Manageability

- How easy it is to operate and maintain
- Repair and Maintainece should be quick, accesible and affordable

<br/>
<br/>

---

### Load Balancing

- Used to distribute traffic across a cluster of servers to improve responsiveness and **availability** of applications
- By balancing application requests across multiple servers, a load balancer reduces individual server load  
   and prevents any one **application server from becoming a single point of failure**,  
  thus improving overall application **availability and responsiveness**
- LB also keeps track of the status of all the resources

<br/>

- To utilize full scalability and redundancy, we can try to balance the load at each layer of the system.  
  We can add LBs at three places

1.  Between the user and the web server
1.  Between web servers and an internal platform layer, like application servers or cache servers
1.  Between internal platform layer and database

<br/>

Benefits of Load Balancing

- Users experience faster, uninterrupted service. Users won’t have to
  wait for a single struggling server to finish its previous tasks. Instead,
  their requests are immediately passed on to a more readily available
  resource.
- Service providers experience less downtime and higher throughput.
  Even a full server failure won’t affect the end user experience as the
  load balancer will simply route around it to a healthy server.
- Load balancing makes it easier for system administrators to handle
  incoming requests while decreasing wait time for users.
- Smart load balancers provide benefits like predictive analytics that
  determine traffic bottlenecks before they happen. As a result, the smart
  load balancer gives an organization actionable insights. These are key
  to automation and can help drive business decisions.
- System administrators experience fewer failed or stressed components.
  Instead of a single device performing a lot of work, load balancing has
  several devices perform a little bit of work.

<br/>

- Health Checks - Load balancers should only forward traffic to “healthy”
  backend servers. To monitor the health of a backend server, “health checks”
  regularly attempt to connect to backend servers to ensure that servers are
  listening. If a server fails a health check, it is automatically removed from the
  pool, and traffic will not be forwarded to it until it responds to the health
  checks again.

<br/>

- Redundant Load Balancers
  The load balancer can be a single point of failure; to overcome this, a second
  load balancer can be connected to the first to form a cluster. Each LB
  monitors the health of the other and, since both of them are equally capable
  of serving traffic and failure detection, in the event the main load balancer
  fails, the second load balancer takes over.

<br/>

- Algorithms load balancers use to decide which server will serve a req

1. <ins>Least Connection Method</ins> - Server with the least active connections gets the req
1. <ins>Least Response Time Method</ins> - Server with the fewest active connections and the lowest average response time
1. <ins>Least Bandwidth Method</ins> - Server that is currently serving the least amount of traffic measured in Mbps.
1. <ins>Round Robin</ins> - Circular manner
1. <ins>Weighed Round Robin</ins> - Each server has a attached weight (integer value that indicates processing capacity), servers with higher
   weights get more connections than those with less weights.
1. <ins>IP Hash Based</ins> - Hash of the IP address of the client is calculated to redirect the request to a server

<!-- Problem with hash based - When a new server is added to the pool, the hash function changes, hence all existing entries need to be shifted acc to new hashes -->

<br/>
<br/>

### Caching

- Caches take advantage of the locality of reference principle: recently requested data is likely to be requested again
- Caching can be at all levels from Frontend cache, load balancer cache, Backend Cache, Hardware, OS, Web application etc
- Cache Invalidation is a challenge  
  (Cache invalidation means that when the original data is updates, cache should be in sync and return updated data)  
  (Keeping cache coherent with the source of truth ie database)

What we generally implement redis cache on the Backend,    
  FE requests for an item, If item not found in cache, fetch fresh from DB, update the cache and send it to FE



#### Cache invalidation

  1. <ins>Write through Cache</ins> - Data is written into the cache and the corresponding database at the same time   
     Latency ↑ ie Speed ↓, Consistency ↑
  1. <ins>Write-around cache</ins> - Data is written directly to db, bypassing the cache  
     disadvantage that a read request for recently written data will create a “cache miss”
  1. <ins>Write Back cache</ins> - Data is updated on cache only and sent to client, DB update happens after specified intervals or conditions   
     Speed ↑ , Latency ↓, Throughput ↑, Risk of data loss

  <!-- After making DB update, return response to FE, then update cache    -->



#### Cache eviction policies 
Methods to decide which cache to clear
1. <ins>FIFO/ Round Robin</ins>
1. <ins>Least Recently Used</ins>

    - LRU in redis - https://tokers.github.io/posts/lru-and-lfu-in-redis-memory-eviction/

    - TODO
      https://www.interviewcake.com/concept/java/lru-cache

    - A Least Recently Used (LRU) Cache organizes items in order of use, allowing you to quickly identify which item hasn't been used for the longest amount of time.

    - Under the hood, an LRU cache is often implemented by pairing a doubly linked list with a hash map.

    - Advantage - Super fast accesses : LRU caches store items in order from most-recently used to least-recently used. That means both can be accessed in O(1) time.

    - Advantage - Super fast updates : Each time an item is accessed, updating the cache takes O(1) time

    - Disadvantage - Space heavy : An LRU cache tracking n items requires a linked list of length n, and a hash map holding n items. That's  O(n) space, but it's still two data structures (as opposed to one)


1. <ins>Most Recently Used</ins>
1. <ins>Least Frequently Used</ins>

<br/>

### Content Distribution Network (CDN)
- For sites serving large amounts of static media
- In a typical CDN setup, a request will first ask the CDN for a
  piece of static media; the CDN will serve that content if it has it locally
  available.  
  If it isn’t available, the CDN will query the back-end servers for the
  file, cache it locally, and serve it to the requesting user.
- CDN works because network latency plays a huge role
- CDN serves file from a region physically/geographically closer to them
- Since Data is replicated in CDN it prevents a single point of failure

#### Distributed Caching

Distributed caching is a strategy employed in distributed systems to optimize data access and enhance performance by storing frequently accessed information across multiple nodes. In this approach, a cache system is set up across a network, with each node maintaining a portion of the cached data in a key-value format. When a request is made for specific data, the system first checks the cache. If the data is found (cache hit), it is swiftly returned to the requester, avoiding the need to retrieve it from the primary data storage and thereby reducing latency. In the case of a cache miss, where the requested data is not in the cache, the system fetches the data from the primary storage, updates the cache, and then delivers the data. Distributed caching systems implement scalability by adding more nodes, load balancing to evenly distribute requests, and fault tolerance mechanisms to handle node failures. This strategy significantly improves response times and overall system efficiency by strategically storing and retrieving frequently accessed data in a distributed manner

##### Tools/Services to implement caching

**Caching**
1. Local Caching Libraries
    1. Memcached: A simple and high-performance in-memory caching system
    1. Redis: An advanced key-value store that supports various data structures.

1. Web Server Caching
    1. Varnish: A web application accelerator that caches HTTP responses, improving website performance.

1. Client-Side Caching
    1. LocalStorage and SessionStorage: Browser-based storage options for caching data on the client side.

**Distributed Caching**

1. Distributed Caching Systems
    1. Redis Cluster: A distributed version of Redis that provides partitioning and high availability.
    1. Apache Ignite: An in-memory computing platform that includes a distributed cache.

1. Cloud-Based Services
    1. Amazon ElastiCache: A fully managed caching service supporting both Memcached and Redis.
    1. Azure Cache for Redis: A fully managed Redis service on the Azure cloud platform.

1. Data Grids
    1. Hazelcast: An open-source in-memory data grid that supports distributed caching.
    1. Infinispan: A distributed caching and data grid platform.


<br/>
<br/>

---

### Data Partitioning (Sharding)

- Distributing databases accross multiple machines to improve manageability, performance, availability, and load balancing of an application

Partitioning methods

1. Horizontal Partitioning (Range based partitioning)   
   Eg - all zip codes below 5000  
   Partitions may not be uniform
1. Vertical Partitioning   
   divide our data to store tables related to a specific feature  
   Eg photos, user data etc
1. Directory based Partitioning -

Partitioning Criteria

1. Key or Hash-based partitioning
1. List partitioning
1. Round-robin partitioning
1. Composite partitioning

<br/>

Common Problems of Sharding

- Joins and Denormalization
- Referential integrity (foreign keys)
- Rebalancing


[How Pinterest scaled (using db sharding)](../Databases/README.md#how-pinterest-scaled-to-11-million-users-with-sql-db)

<br/>
<br/>

### Indexes

- Database indexes enable faster retrival of data
- Indexes should only be on certain columns that are read using a propety often
- Unnecessary use of indexes may increase the memory of db and make retrivals slower infact
- How indexing works

  Suppose users table is often fetched by name,  
  Creating an index on name will create a new table which will contain names in ascending order and pointer to the actual row in original table

  Hence O(n) -> O(log n)

  Since creating an index creates a new table, Memory used ↑  
  The new table needs to be updated whenever the original table updates, hence Complexity ↑

<br/>
<br/>

### Proxies

- Intermediate server between the client and the back-end server
- Clients connect to proxy servers to request for a service like a web page, file, connection, etc.
- Proxies are used to <ins>filter requests, log requests, or sometimes transform requests (by adding/removing headers, encrypting/decrypting, or compressing a resource)</ins>

Proxy Server Types
There are several types of proxies, each serving specific functions

#### Forward Proxy (or HTTP Proxy)

Acts on behalf of clients (users) to access resources from the internet.
Conceals the user's IP address, providing anonymity.
Often used for content filtering, access control, and improving network performance.

Imagine you want to access the internet, but you don't want websites to know your real identity (your IP address).
A forward proxy acts like a middleman between you and the websites you visit. When you request a website, the proxy makes the request on your behalf, and the website sees the proxy's IP address instead of yours. It hides your identity.

#### Open Proxy

An open proxy, also known as a public proxy, is a proxy server that is accessible to any internet user without any authentication. It means that anyone can connect to and use the open proxy server without requiring any username or password. Open proxies can be intentionally set up for public use, or they may be misconfigured or compromised servers that allow unauthorized access.

Users may use open proxies for anonymity, bypassing content restrictions, security testing, or circumventing censorship

Uses of open proxies

1. Anonymity and Privacy - Users may use open proxies to hide their IP addresses and enhance online anonymity. This can be for privacy reasons or to bypass restrictions imposed by websites or networks

1. Bypassing Content Restrictions - Enables access to geographically restricted or censored content

1. Security Testing - Employed by security professionals for penetration testing and research

1. Load Balancing - Improves performance by distributing network traffic and caching content

1. Web Scraping - Utilized for automated data extraction from websites for various purposes

1. Malicious Activities - Unfortunately, open proxies can be exploited for cybercrimes, such as DDoS attacks and malware distribution.


#### Reverse Proxy

Operates on behalf of servers, handling requests from clients.
Enhances security by hiding the server's IP address and handling tasks like load balancing.
Commonly used to improve web server performance, security, and scalability

Think of a situation where many people want to access a specific website, and that website wants to stay safe and perform well.
A reverse proxy stands in front of the web server and takes requests on behalf of the server. When users want to access the website, they interact with the reverse proxy, which then communicates with the actual web server to get the content. It helps the server stay hidden and secure.

**Difference between a forward proxy and a reverse proxy**

A forward proxy handles client requests to access the internet, while a reverse proxy manages requests on behalf of servers, enhancing security and performance

#### Anonymous Proxy



#### Transparent Proxy

A transparent proxy intercepts and redirects traffic without requiring user configuration, often used for content filtering and caching

TODO : different types of proxies

<br/>
<br/>

### Redundancy and Replication

- Redundancy is the duplication of critical components or functions of a system
  with the intention of increasing the reliability of the system, usually in the
  form of a backup or fail-safe, or to improve actual system performance
- Redundancy plays a key role in removing the single points of failure in the
  system and provides backups if needed in a crisis
- Replication means sharing information to ensure consistency between
  redundant resources, such as software or hardware components, to improve
  reliability, fault-tolerance, or accessibility.
- Replication is widely used in many database management systems (DBMS),
  usually with a master-slave relationship between the original and the
  copies
- The master gets all the updates, which then ripple through to the
  slaves. Each slave outputs a message stating that it has received the update
  successfully, thus allowing the sending of subsequent updates.

<br/>
<br/>

### Horizontal vs Vertical Scaling

The heart of the difference is the approach to adding computing resources to your infrastructure

> With vertical scaling (scaling up), you’re adding more power to your existing machine

> In horizontal scaling (scaling out), you get the additional resources into your system by adding more machines to your network, sharing the processing and memory workload across multiple devices.

<br/>

#### Why Horizontal scaling Is Better Than Vertical Scaling

Horizontal scaling is almost always more desirable than vertical scaling because you don’t get caught in a resource deficit. Instead of taking your server offline while you’re scaling up to a better one, horizontal scaling lets you keep your existing pool of computing resources online while adding more to what you already have. When your app is scaled horizontally, you have the benefit of elasticity.

- Instant and continuous availability
- No limit to hardware capacity
- Cost can be tied to use
- You’re not stuck always paying for peak demand
- Built-in redundancy
- Easy to size and resize properly to your needs

<br/>

---

### CAP Theorem

Refer:   
[CAP Theorem Simplified | Byte Byte Go](https://www.youtube.com/watch?v=BHqjEjzAicA)   
[CAP Theorem Simplified | Scalar](https://www.youtube.com/watch?v=8UryASGBiR4)   


<img src="https://i.ytimg.com/vi/BHqjEjzAicA/maxresdefault.jpg" width="50%" />

<br/>

The CAP Theorem is a concept in computer science that explains the trade-offs between consistency, availability, and partition tolerance in distributed systems.

- Consistency: Consistency refers to the property of a system where all nodes have a consistent view of the data. It means all clients see the same data at the same time no matter which node they connect to.     
Consistency is achieved by updating several nodes before allowing further reads. 

- Availability: Availability refers to the ability of a system to respond to requests from users at all times.   
Availability is achieved by replicating the data across different servers.

- Partition tolerance: Partition tolerance refers to the ability of a system to continue operating even if there is a network partition.    
A network partition happens when nodes in a distributed system are unable to communicate with each other due to network failures.   


When there is a network partition, a system must choose between consistency and availability. If the system prioritizes consistency, it may become unavailable until the partition is resolved. If the system prioritizes availability, it may allow updates to the data, which could result in data inconsistencies until the partition is resolved.

> As with many things in software engineering, this is about tradeoffs   
And the choices are not always black and white


**Example 1:**      

Consider a tiny bank that has only two ATMs connected by a cable, there is no central db     
The ATM supports 3 operations Deposit, Withdrawal and check balance. At any point bank balance should not go below zero   
Balance data is stored on both ATMs   
When personA with balance of 50rs deposits 20rs, the balance is updated to 70 on both the ATMs   

Assume a network partition occurs (wire broken), both ATMs are now not able to communicate with each other   
According to CAP theorem, In this case, the system must either prioritize consistency or availability   
Suppose the system prioritizes consistency, the ATMs will refuse to process any deposits or withdrawals till the partition is resolved. This will ensure balance are consistent in both ATMs but system will be unavailable for some time   
Suppose the system prioritizes availability, personA with balance of 70rs, can withdraw 50rs form ATM1 and 40rs form ATM2. making his balance less than 0, which should not be allowed   

In real world though, we can choose some degree of consistency and availability    
Eg ATMs can allow check balance, deposits and withdraw smaller amounts and only refuse larger withdrawals    

**Example 2:**      

Consider a social media platform   
During a network partition if two users are commenting on the same post, one person may not be able to see comment of another user until partition is resolved   
For a social media platforms it is often acceptable to prioritize availability over the cost of two users seeing slightly different views some of the time    


#### Reconciliation     
When the network partition is healed, distributed systems must decide how to handle updates to the data and resolve inconsistencies   
This is like merging git changes   

There are two main approaches

**Eventual Consistency**   
After a partition is resolved, the system works to converge towards a consistent state over time, allowing updates made during the partition to propagate through the system.   
Conflict resolution mechanisms as mentioned below may be employed to handle conflicting updates.   
* Last Writer Wins (LWW) - In this approach, each update is associated with a timestamp, and conflicts are resolved by choosing the update with the latest timestamp as the winner.

* Vector clocks are used to track the partial ordering of events in a distributed system. Each replica maintains a vector clock, and conflicts are resolved by comparing the vector clocks to determine the causal relationship between updates

* Similar to vector clocks, version vectors track the versions of data at different replicas. Conflicts are resolved by comparing version vectors to identify the most recent version.

* CRDTs (Conflict-free Replicated Data Types) are data structures designed to be replicated across multiple nodes in a network without the need for coordination during updates. They are inherently conflict-free and support automatic resolution.

* Some distributed systems use [quorums](#quorum) or consensus algorithms to make decisions on conflicting updates. Nodes may vote on the correct value, and a majority decision is considered the winner.

* Merge functions : Merge functions define how conflicting updates should be combined to produce a merged result. This approach is common in systems where the data has a semistructured or nested nature.

**Strong Consistency with Conflict Resolution**   

Some systems prioritize strong consistency and use conflict resolution mechanisms to address inconsistencies.

When a partition is healed, the system may need to reconcile conflicting updates by selecting a winner or merging conflicting changes based on predefined rules or application-specific logic.

This approach often involves more complex conflict resolution strategies and may impact availability during the reconciliation process.

* Timestamps and Ordering - The update with the latest timestamp is often considered the winning update. A distributed relational database that uses timestamp-based concurrency control.

* Pessimistic Locking - Use locks to ensure exclusive access to data during updates. Conflicts are avoided by preventing concurrent access, and the system can explicitly reject conflicting updates.Traditional relational databases often use row-level or table-level locks.

* Optimistic Concurrency Control - Allow concurrent updates, but when conflicts are detected during the commit phase, the system rolls back conflicting transactions and asks the user or application to resolve the conflict.

* Two-Phase Commit (2PC) - In a distributed transactional context, the two-phase commit protocol is used to ensure that all nodes either commit or abort a transaction. If conflicts are detected, the protocol can decide to abort the transaction and roll back the changes.

* Custom Conflict Resolution Logic - Example A content management system where conflicts in document edits are resolved based on predefined rules such as authorship or priority.

* Human Intervention - In some cases, when conflicts cannot be automatically resolved, the system may involve human intervention. Users or administrators are notified of conflicts, and they make decisions on how to resolve them.

<br/>
<br/>
<br/>

### PACELC Theorem

**Why are network partitions considered inevitable in distributed systems**   
Network partitions, or temporary breaks in communication between nodes, are inevitable in distributed systems due to factors like geographic distribution, hardware failures, software bugs, network maintenance, and unpredictable events. The CAP theorem acknowledges the presence of partitions and requires a trade-off between ensuring Consistency and Availability in the face of these partitions.
  

```js
  if(partition P){
    choose between availability A and consistency C
  } else {
    choose between latency L and consistency C
  }
  ```

- We cannot avoid partition in a distributed system, therefore, according to the CAP theorem, a distributed system should choose between consistency or availability.


- ACID (Atomicity, Consistency, Isolation, Durability) databases, such as RDBMSs like MySQL, Oracle, and Microsoft SQL Server, chose consistency (refuse response if it cannot check with peers)

- BASE (Basically Available, Soft-state, Eventually consistent) databases, such as NoSQL databases like MongoDB, Cassandra, and Redis, chose availability (respond with local data without ensuring it is the latest with its peers).

- #### The PACELC theorem states that in a system that replicates data:

  if there is a partition (‘P’), a distributed system can tradeoff between availability and consistency (i.e., ‘A’ and ‘C’);
  Else (‘E’), when the system is running normally in the absence of partitions, the system can tradeoff between latency (‘L’) and consistency (‘C’).

- Image todo

- Dynamo and Cassandra are PA/EL systems: They choose availability over consistency when a partition occurs; otherwise, they choose lower latency
- BigTable and HBase are PC/EC systems: They will always choose consistency, giving up availability and lower latency.
- MongoDB can be considered PA/EC (default configuration): MongoDB works in a primary/secondaries configuration. In the default configuration, all writes and reads are performed on the primary. As all replication is done asynchronously (from primary to secondaries), when there is a network partition in which primary is lost or becomes isolated on the minority side, there is a chance of losing data that is unreplicated to secondaries, hence there is a loss of consistency during partitions. Therefore it can be concluded that in the case of a network partition, MongoDB chooses availability, but otherwise guarantees consistency. Alternately, when MongoDB is configured to write on majority replicas and read from the primary, it could be categorized as PC/EC.

<br/>
<br/>

### Consistent Hashing

[What is Consistent Hashing and Where is it used?](https://www.youtube.com/watch?v=zaRkONvyGr8&list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX&index=4)

Consistent Hashing is a technique used in distributed computing and data storage systems to distribute data across multiple nodes while minimizing the reorganization of data when the number of nodes changes. It provides a way to efficiently map keys to nodes in a way that remains stable even as nodes are added or removed.

In traditional hashing, when the number of nodes changes, most keys need to be remapped to different nodes, causing significant overhead. Consistent Hashing minimizes this remapping by ensuring that only a fraction of keys need to be moved when the number of nodes changes.

##### How Consistent Hashing Works:

* Ring Structure:
Nodes and keys are placed on a virtual ring. Each node is assigned a range on the ring, and keys are distributed along the ring.

* Hash Function:
A hash function is used to map both nodes and keys onto points on the ring. This allows for easy determination of which node is responsible for a given key.

* Adding or Removing Nodes:
When a new node is added or a node is removed, only the keys that fall within the range of the affected node and its immediate successor need to be remapped. The majority of keys and nodes remain unchanged.

##### Use Cases of Consistent Hashing
* Load Balancing:
Distributes traffic across multiple servers in a way that minimizes the need for remapping when servers are added or removed.

* Distributed Databases:
Efficiently allocates data across nodes, allowing for seamless scaling and rebalancing in distributed database systems.

* Content Delivery Networks (CDNs):
Determines which server or edge location should serve specific content, ensuring efficient content delivery.

* Peer-to-Peer Networks:
Allocates responsibility for storing or retrieving data to nodes in peer-to-peer networks.

* Distributed File Systems:
Decides where to store data blocks across multiple nodes in distributed file systems.

##### Example
Let's imagine you have a group of friends sitting in a circle, and you want to distribute snacks among them. Each friend has a specific range on the circle assigned to them, and the snacks are placed at different points on the circle.

Now, let's say a new friend joins the group, and they need to be given a portion of the snacks. With a normal approach, you might need to rearrange the snacks for everyone. However, with consistent hashing, the new friend is only responsible for the snacks in their immediate range. This means only the snacks within the new friend's assigned part of the circle and the next friend's part need to be adjusted. The rest of the snacks, belonging to the other friends, remain where they are.

Similarly, if a friend needs to leave, only the snacks within their assigned range and the next friend's range need adjustment. The rest of the snacks stay where they are.

In consistent hashing, when you add or remove a friend (or node), you only need to worry about the specific portion of the "circle" assigned to them and the portion assigned to the next friend. This minimizes the need to reshuffle or redistribute everything, making it more efficient and less disruptive. This concept is applied to efficiently manage data distribution in distributed systems when nodes are added or removed.

In a simple consistent hashing scenario, when a friend leaves, the next friend in the circle not only takes responsibility for the snacks in the leaving friend's range but also for the snacks of the friend who left.

Original Scenario:

Friend A has snacks from position 0 to 10.
Friend B has snacks from position 11 to 20.
Friend C has snacks from position 21 to 30.

If Friend B Leaves:

Friend A will now be responsible for snacks from position 0 to 20.
Friend C remains responsible for snacks from position 21 to 30.

So, you're correct that the immediate next friend (Friend A, in this case) will indeed have more snacks after Friend B leaves.

This behavior is a trade-off in consistent hashing. While it reduces the amount of reshuffling needed when a friend leaves, it can result in some temporary imbalance in the distribution of responsibilities. In practical systems, additional techniques, such as virtual nodes or replication, are often employed to mitigate this imbalance and ensure a more even distribution over time.

<br/>
<br/>
<br/>

## Real-Time Communication Methods

Refer https://www.pubnub.com/guides/long-polling/

We will use an example of me (server) baking a cake, and my friend (client) who needs cakes (data)   

### Short polling
Traditionally, web browsers use a pull-based approach to fetch data from servers. The client sends a request to the server, which responds with the requested data. This approach, known as short polling, can create delays in communication as the client has to send requests to check for updates repeatedly.

Eg - My friend will come knock the door every 15 mins to check if the cake is baked, take cake if ready, if not come again after 15 mins

<br/>

### Long-Polling
On the other hand, long polling is a push-based approach that allows the server to send updates to the client as soon as they are available. Here's how it works:
1. The client initiates a request to the server, typically through an HTTP request.
1. Instead of immediately responding, the server holds the request open, keeping the connection active.
1. If no new data is available, the server waits until it has something to send back.
1. Once the server has new data or a predefined timeout occurs, it responds to the client with the latest information.
1. Upon receiving the response, the client immediately sends another request to the server to maintain the connection.
1. This cycle of sending requests and receiving responses continues, ensuring real-time updates.

Long polling effectively simulates a real-time connection between the client and the server by keeping the request-response cycle open for an extended period. It allows the server to push updates to the client as soon as they are available and eliminates the need for the client to check for updates repeatedly.

Long-Polling is suitable when real-time updates are not critical, and there is no need for bidirectional communication

Eg - My friend will come and stand on the door for 5 mins, if in that time cake gets baked, he will take and come back for next   
If cake is not ready, he will go and come back and stand on door for another 5 mins   

<br/>

### Web sockets

[Websockets](../Networking/WebSockets.md)

WebSocket is a full-duplex communication protocol that enables real-time communication between the client and server over a single, long-lived connection. It provides a more efficient and low-latency alternative to long polling. WebSocket enables bidirectional data flow, allowing the client and server to send messages asynchronously. It eliminates the need for frequent HTTP requests and reduces network overhead. WebSocket is well-suited for applications requiring instant updates and real-time interaction.

WebSockets are ideal for applications requiring low-latency, bidirectional communication. It's suitable for real-time features, such as chat applications, online gaming, or collaborative editing tools.

Eg - Me and my friend will stay on a call throughout the process, I will keep updating him with cake status without him inquiring

<br/>

### Server-Sent Events
SSE is a unidirectional communication technology that allows the server to push data to the client over a single, long-lived HTTP connection. With SSE, the server can send multiple updates to the client without requiring the client to make requests continuously. The server initiates the connection and sends data as a series of events. The client receives these events and can handle them as needed.

SSE is suitable when you need server-initiated updates in a unidirectional flow (from server to client). It's a simpler alternative to WebSockets for scenarios where bidirectional communication is not necessary.   
Example: In a financial application where users need real-time stock updates pushed from the server without requiring immediate user input.   

Eg - I will text my friend every time i make significant progress, like "In the oven", "cake ready"

<br/>

### Webhooks

[What is a Webhook - Youtube video](https://www.youtube.com/watch?v=mrkQ5iLb4DM)


Webhooks are extensively used by payment related apps like stripe, Razorpay   

Webhook flow:   
1. We have a website where we sell courses, courses have a buy now button
1. We configure stripe webhook to send a message to our EC2 server, whenever someone clicks on buy now button on course (webhook event)
1. A user clicks on a course buy now button
1. Stripe sends a message to our server with some metadata
1. We retrieve the user and course from this metadata, add the course to his subscriptions
1. The user will now be able to see this course under his subscriptions


How to know if req to server is coming from stripe and not an attacker?   
1. Stripe gives us a secret key
1. Whenever strip sends us a message, it hashes a string using this secret key
1. We hash the string using our secret key
1. If both of them matches, we know that message came from stripe
1. Also these messages are sent over HTTPs which adds some security too 

What if sending message from stripe to server fails?    
* Stripe retries after some time based on exponential backoff algorithm   
Meaning if 1 req fails, rerequest after 2 sec, rerequest after 4 seconds, rerequest after 8 seconds, and so on   
* This is done to not bombard your server   


Note : Make webhooks idempotent. Incase the webhook triggers more than once, it should not cause any issues

Watchout for webhook overload   
To ensure you server can take load of existing FE requests along with webhook requests when your app gets popular, use a queue   
The webhook can put data in a queue, and your server can process it one by one



Eg - I give my friend a buzzer, and press it every time a cake is done. Here buzzer is the webhook which is triggered on action of cake baking done

#### Are server sent events and webhooks related

Server-Sent Events (SSE) and webhooks are related in the sense that they both involve server-initiated communication to push updates or events to clients. However, they are distinct concepts, and their implementations and use cases can differ

Server-Sent Events (SSE):
* SSE is a standard allowing a server to push real-time updates to clients over a single HTTP connection.
* The communication is one-way, from the server to the client.
* SSE is typically used for scenarios where the server needs to push continuous or periodic updates to the client in a unidirectional manner.

Webhooks:
* Webhooks are HTTP callbacks or user-defined HTTP callbacks initiated by the server to notify the client about events or updates.
* Webhooks can be used for bidirectional communication, as the client can provide an endpoint for the server to send notifications.
* Webhooks are often set up by the client, and the server triggers them when specific events occur.


<br/>

#### Zapier webhooks

Note : At assembly we used [Zapier](https://zapier.com/workflows) webhooks to create automated flows 
Zapier allows us to do actions based on events, eg send a slack message once flow is submitted

Zapier works as such   
* Step 1 : A trigger starts your automation (a person submitted a flow response)
* Step 2 : Actions are what your automation does when it's triggered (send slack message to group, update docs)
* Step 3 : That’s it! You’ve created a Zap

<br/>
<br/>
<br/>
<br/>

---



### Bloom Filters

[What Are Bloom Filters?](https://www.youtube.com/watch?v=kfFacplFY4Y)

A Bloom filter is a space-efficient probabilistic data structure used to test whether a given element is a member of a set. It provides a way to quickly check if an element is definitely not in a set or may be in the set. Bloom filters are widely used in various computer science applications where quick set membership tests are crucial.

##### Understanding bloom filters

- Suppose you work at a library and a customer approches with a book name, how do you tell him wether you have the book or not, Traversing whole library is possible but inefficient
- Maintain a Hash - Save a hash which contains names of all books in library, gets bigger with no of books
- Bloom Filters - Take a board with all cells marked with a number as 'OFF',  
  Pass the names of all books through a hash function, and mark the output values as 'ON'  
  When a customer asks for a book, pass the book title through the hash function and check if its on

  False Negatives - Entry of a book can be marked as 'ON' if a book is not avialble,  
   This happens when two titles produce the name hash value  
   To prevent this use multiple hash functions

##### How bloom filters work

1. Initialization:
A Bloom filter starts as an array of bits, all set to 0.
1. Hash Functions: 
Multiple independent hash functions are chosen.
When an element is added to the set, it is hashed by each function, and the corresponding bits in the array are set to 1.
1. Membership Test: 
To check if an element is in the set, the same hash functions are applied to the element.
If all corresponding bits in the array are 1, the element may be in the set (a false positive is possible due to hash collisions).
If any of the bits are 0, the element is definitely not in the set.

##### Key Characteristics

1. False Positives: Bloom filters can produce false positives (indicating an element is in the set when it's not) but no false negatives (if it says an element is not in the set, it's definitely not).

1. Space Efficiency: Bloom filters are memory-efficient because they use a small number of bits per element compared to traditional data structures like hash tables

1. Quick Membership Tests: Membership tests are extremely fast, as they only involve checking a few bits in the array

##### Use Cases
1. Caching Systems:
Bloom filters are used in caching systems to quickly check if a requested item is likely to be in the cache before performing a more time-consuming lookup.
1. Distributed Systems:
In distributed systems, Bloom filters can be used to reduce the number of unnecessary network requests by quickly checking if an item may exist on a remote node.
1. Spell Checking:
Bloom filters are applied in spell-checking algorithms to quickly determine if a word may be misspelled.
1. Network Routing Tables:
Bloom filters can be used in network routers to quickly check whether a destination IP address might be in a routing table

<br/>
<br/>

### Quorum

A quorum refers to the minimum number of votes or participants required for a decision or operation to be considered valid or successful. It plays a crucial role in distributed systems and databases, ensuring that a sufficient number of nodes agree on a particular action to maintain consistency and reliability. Quorums help prevent issues such as split-brain scenarios and ensure that the system remains operational even in the presence of failures.

Here are two common use cases where quorum is applied:

Distributed Databases:   
In distributed databases using techniques like replication or sharding, quorum is employed to determine how many copies of data must agree on a read or write operation.   
For example, in a system with data replicated across three nodes, a quorum of two may be required for a successful write operation. This means that at least two out of the three nodes must acknowledge the write for it to be considered successful.

   
Consensus Algorithms:   
Quorums are fundamental in consensus algorithms, where a group of nodes must agree on a decision or a leader in a distributed system.
For instance, in the Paxos consensus algorithm, a majority quorum is required for a decision to be accepted. If there are five nodes, at least three must agree for the consensus to be reached.


<br/>
<br/>

### Leader and Follower

In system design, especially in distributed systems, the terms "Leader" and "Follower" often refer to roles assigned to nodes within a group of nodes. These roles play a significant role in achieving coordination, consistency, and fault tolerance in distributed systems

Leader
* The leader is a designated node responsible for making decisions, coordinating actions, and maintaining overall control of the system.
* The leader often handles tasks like accepting write requests, making decisions in consensus algorithms, or coordinating the distribution of work among nodes.
* Having a single leader simplifies decision-making and helps ensure consistency in the system.

Follower
* Followers are nodes that do not have decision-making authority on their own.
* They typically replicate data or state from the leader and respond to read requests. In consensus algorithms, followers vote in agreement with the leader.
* Followers play a crucial role in providing fault tolerance. If the leader fails, followers can elect a new leader or carry out the necessary tasks to maintain system functionality.

##### Use cases
* Consensus Algorithms:
In consensus algorithms like Paxos or Raft, the leader is responsible for proposing decisions, and followers accept or reject these proposals. This ensures that the distributed system reaches a consensus on the state of the system.

* Distributed Databases:
In distributed databases with replication, a leader-follower model is often employed. The leader handles write requests, and followers replicate the data to maintain consistency.

* Load Balancing:
In systems with load balancing, a leader may be responsible for distributing tasks or requests among the followers to ensure even utilization of resources.

* Fault Tolerance:
Leaders and followers contribute to fault tolerance. If a leader node fails, followers can promote a new leader, ensuring continuous operation

<br/>
<br/>

### Heartbeat

In system design, a "heartbeat" is a regularly transmitted signal or message between nodes or components in a distributed system to indicate their liveliness and status. Heartbeats serve as a form of health check, allowing nodes to monitor the availability and responsiveness of each other.

##### Here's how heartbeat works in system design:

* Regular Signaling   
Nodes or components send periodic heartbeat signals to indicate that they are still operational and responsive.

* Monitoring Health   
Other nodes or a central monitoring system receive these heartbeats and use them to assess the health and availability of the sending nodes.
If a node stops sending heartbeats or exhibits an irregular pattern, it may be considered unhealthy or potentially failed.

* Fault Detection   
Heartbeats are crucial for detecting faults, failures, or network issues in a distributed system.
If a node fails to send heartbeats within the expected timeframe, it can trigger actions such as restarting the node, redirecting traffic to healthy nodes, or initiating failover mechanisms.

* Dynamic Configuration   
Heartbeats can be used to dynamically configure the system based on the current state of nodes. For example, adjusting load balancing or replication based on the health of individual components.

* Preventing Split-Brain Scenarios   
In systems with multiple nodes or clusters, heartbeats help prevent split-brain scenarios, where nodes become isolated due to network issues. If heartbeats are not received, it can be an indication of network partitioning.

##### Use Cases:

* Cluster Management:   
Heartbeats are widely used in managing clusters of servers or nodes to ensure that each node is operational and part of the active cluster.

* Load Balancing:   
Load balancers may use heartbeats to monitor the health of servers and route traffic only to healthy and responsive servers.

* Distributed Databases:   
In distributed databases, nodes may exchange heartbeats to coordinate tasks, monitor replication status, and detect failures.

* High Availability Systems:   
Heartbeats are integral to high availability systems where rapid detection and response to node failures are critical.

* Network Monitoring:   
Heartbeats can be part of network monitoring systems to track the availability and performance of network devices.

<br/>
<br/>

### Checksum

- In a distributed system, while moving data between components, it is possible that the data fetched from a node may arrive corrupted. This corruption can occur because of faults in a storage device, network, software, etc. How can a distributed system ensure data integrity, so that the client receives an error instead of corrupt data?

- Calculate a checksum and store it with data.
  To calculate a checksum, a cryptographic hash function like MD5, SHA-1, SHA-256, or SHA-512 is used. The hash function takes the input data and produces a string (containing letters and numbers) of fixed length; this string is called the checksum.
- When a system is storing some data, it computes a checksum of the data and stores the checksum with the data. When a client retrieves data, it verifies that the data it received from the server matches the checksum stored. If not, then the client can opt to retrieve that data from another replica.

Interview Question -   
[In user service how do I verify request came from auth service and not malicious source](../Auth/README.md#interview-questions-related-to-jwt)

<br/>
<br/>

### SLI, SLO, and SLA

https://www.youtube.com/watch?v=LKpIirL8f-I&t=790s

- SLA or Service Level Agreement is a contract that the service provider promises customers on service availability, performance, etc.
- SLO or Service Level Objective is a goal that service provider wants to reach.
- SLI or Service Level Indicator is a measurement the service provider uses for the goal.

TODO : notes from video

<br/>

### Message Queue

A message queue is a form of communication between different software components or systems, allowing them to exchange messages asynchronously. In a message queue system, messages are sent by producers and received by consumers. Messages are temporarily stored in the queue until the consumer is ready to process them. This decouples the sender and receiver, allowing for more scalable and flexible communication between components.

Key Concepts of Message Queue:

* Producers: Components or applications that send messages to the queue.   
* Queue: The storage mechanism that holds messages until they are consumed.   
* Consumers: Components or applications that retrieve and process messages from the queue.   
* Asynchronous Communication: Producers and consumers operate independently, and messages are stored in the queue until consumed.   



TODO : notes

<br/>

### Distributed message queue

#### Message Queue
In a traditional message queue, communication happens within a single system or application. It's a mechanism for asynchronous communication between components or services within the same application or server. Messages are sent from producers to a central queue, and consumers retrieve and process those messages.

Example of Message Queue:   
Imagine a simple e-commerce application. The order processing component generates an order message and puts it into a queue. The inventory management component, acting as a consumer, retrieves the order message from the queue and updates the inventory accordingly.


#### Distributed message queue

A distributed message queue extends the concept of a message queue to operate across multiple nodes or servers in a distributed system. This allows for communication and coordination between components that may be running on different machines or in different locations. This is crucial for building scalable and fault-tolerant systems where components may be distributed across a network.

Example of Distributed Message Queue:   
Consider an e-commerce platform with microservices architecture. Each microservice (e.g., order processing, payment, shipping) runs on different servers. A distributed message queue allows these microservices to communicate by sending messages across the network. For instance, when an order is placed, a message is sent to the distributed queue, and various microservices in different locations consume and process that order.   

Popular examples of distributed message queues include Apache Kafka, RabbitMQ, and Amazon SQS (Simple Queue Service). These systems provide features that support reliable, scalable, and fault-tolerant communication in distributed environments.

<br/>

### Logging Monitoring Alerting

<br/>
<br/>
<br/>

---

## System Design - Choosing database

[Everything related to databases](../Databases/README.md)

<br/>
<br/>

---

### Virtualization

##### Why do we need to run multiple operating systems on a single machine ?
1. Testing    
Imagine you're creating software that should work on different operating systems like Windows, macOS, and Linux. By using virtual machines, you can test your software on each operating system without needing separate physical devices for each. This helps ensure your software works correctly on all intended platforms.

2. Compatibility   
Some applications might have specific dependencies or requirements that only work on certain operating systems. 

##### What are some applications or software that only work on certain operating systems
Certain applications or software have specific technical requirements or dependencies that are closely tied to a particular operating system

1. APIs and Frameworks
    * DirectX: A collection of APIs designed for handling tasks related to multimedia, especially game and video programming. It is primarily used in Microsoft Windows operating systems.
    * Core Audio: An API provided by Apple for audio and MIDI programming on macOS and iOS. Applications that rely on Core Audio may only function properly on Apple's operating systems.

2. Library Dependencies
    * .NET Framework: A software framework developed by Microsoft that primarily runs on Microsoft Windows. Applications built on the .NET Framework may have dependencies that are specific to the Windows environment.
    * Cocoa: A set of frameworks and APIs provided by Apple for developing software on macOS and iOS. Applications that use Cocoa frameworks may not be compatible with other operating systems.

3. Hardware Dependencies 
    * Device Drivers: Some applications, especially those that interact closely with hardware components like graphics cards, printers, or specialized peripherals, may rely on specific device drivers that are designed for a particular operating system. For example, certain gaming applications may require graphics card drivers that are optimized for Windows.

4. System Architecture
    * 32-bit vs. 64-bit Applications: Some software is designed to work exclusively on either 32-bit or 64-bit operating systems. Certain applications, especially those that require extensive memory usage, might be optimized for 64-bit systems and may not function properly on 32-bit systems, and vice versa.


#### Bare Metal

Bare metal refers to a computer system or server that runs directly on the underlying hardware without any intermediary software.   
In this scenario, the operating system directly interacts with the hardware, providing high performance and full access to the resources.    
Bare metal is often used when high performance and direct control over hardware resources are crucial, typically for tasks such as high-performance computing, data processing, and handling heavy workloads.

Bare metal provides direct access to hardware resources, while VMs and containers share underlying hardware resources.

##### Providers offering services for bare metal

* **Amazon EC2 Bare Metal**: EC2 Bare Metal instances, you can deploy and manage your applications on dedicated hardware while still benefiting from the scalability, security, and reliability offered by the AWS cloud platform. This service provides a unique option for organizations that require the capabilities of a public cloud infrastructure while maintaining the advantages of running applications on dedicated physical hardware

* **IBM Cloud Bare Metal Servers**: IBM offers bare metal servers that provide dedicated physical servers for workloads requiring high performance and direct access to hardware resources.

* **Oracle Cloud Infrastructure Bare Metal**: Oracle provides bare metal cloud services that offer high-performance, dedicated compute power with full access to the underlying hardware for workloads with demanding performance and security requirements.

##### At what stage is it used ?

* Deployment: Bare metal is used for deploying applications that require high performance and direct access to hardware resources. It is often preferred for tasks such as running resource-intensive applications, high-performance databases, and specific hardware optimizations that demand dedicated hardware resources.

#### Virtual Machines (VMs)

Virtual machines are software-based emulations of physical computers. They enable multiple operating systems to run on a single physical machine, each with its own set of resources.    
VMs provide isolation between different applications and operating systems, allowing for efficient resource utilization and the ability to run multiple applications on a single physical server.     
This technology is particularly useful for consolidating hardware resources, creating development and testing environments, and enabling efficient use of computing resources in cloud computing.   

VMs emulate hardware and can run multiple operating systems, whereas containers share the host operating system's kernel and are more lightweight.

##### Providers offering services for virtual machines (VMs)

* **Amazon Elastic Compute Cloud (Amazon EC2)**: Amazon EC2 is a web service provided by Amazon Web Services (AWS) that offers resizable compute capacity in the cloud. It provides secure, scalable, and on-demand virtual server instances known as virtual machines (VMs) to users. 
Each of these virtual servers acts as an independent computing environment, complete with its own operating system and resources, allowing you to run applications and services in a manner similar to physical servers but without the need to manage actual hardware.

* **Microsoft Azure Virtual Machines**: Microsoft Azure provides a wide range of virtual machines for various computing workloads, allowing users to run applications on virtualized hardware resources in the cloud.

* **Google Cloud Compute Engine**: Google Cloud offers virtual machine instances that enable users to deploy and manage applications on the Google Cloud Platform using customizable virtual machine configurations.

##### At what stage is it used ?
* Development: VMs are commonly used during the development stage for testing applications on different operating systems and software configurations. Developers can create VMs to simulate various environments and ensure the application works seamlessly across different platforms.

* Deployment: VMs are used during deployment to create multiple isolated environments on a single physical server. They help in consolidating hardware resources, optimizing resource utilization, and providing a flexible and scalable infrastructure for deploying and managing applications.


#### Containerization
Containerization is a lightweight form of virtualization that allows applications and their dependencies to be packaged together.    
Containers share the host operating system's kernel, making them more lightweight and efficient than VMs.    
They provide a consistent runtime environment across different computing environments, enabling developers to build, ship, and run applications seamlessly.    Containers are ideal for creating portable, scalable, and consistent development and deployment environments, making them popular in modern software development and deployment workflows.

Containers are faster to start and require fewer resources compared to VMs.

Bare metal provides the highest performance, while VMs offer a good balance between performance and flexibility. Containers provide lightweight, portable environments that promote scalability and consistency.

##### Providers offering services for containerization

* **Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS)**: AWS also provides containerization services through Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS), which allow users to run and manage containers easily on AWS. These services are specifically designed for container orchestration and management, providing scalable and efficient solutions for deploying and managing containerized applications

* **Docker**: Docker provides a platform for developers and system administrators to build, ship, and run distributed applications using containerization technology.

* **Kubernetes**: Kubernetes is an open-source container orchestration platform that helps automate the deployment, scaling, and management of containerized applications, often used in conjunction with cloud services such as AWS, Azure, and Google Cloud.

##### At what stage is it used ?

* Development: Containerization is used during the development stage to create a consistent runtime environment for applications. Developers use containers to package and isolate applications with their dependencies, ensuring that the application runs consistently across different development and testing environments.

* Deployment: Containerization is widely used during deployment for building and deploying applications in a consistent and portable manner. Containers provide a lightweight and scalable solution for deploying applications, enabling efficient resource utilization and facilitating seamless deployment across different computing environments.

---



<br/>
<br/>
<br/>

---

### Development and deployment

#### Deployment strategies

1. Scheduled or Maintenance Window Deployment   
Scheduled or Maintenance Window Deployment is a traditional strategy where software updates are deployed during predefined off-peak hours or maintenance windows, typically at night, to minimize user impact. This approach involves planned downtime, thorough testing before deployment, and a rollback plan for quick reversion in case of issues. The strategy aims to provide predictability for downtime and reduce disruptions by choosing times of lower user activity.

1. Blue-Green Deployment   
A blue-green deployment is a software release strategy that minimizes downtime and risk during the deployment process. In this approach, two identical production environments, often referred to as "blue" and "green," are maintained. At any given time, only one of these environments is live and serving production traffic while the other remains inactive.

1. Canary Releases   
A canary release is a deployment strategy where a new version of an application is gradually rolled out to a subset of users or servers before being made available to the entire user base. This subset of users or servers acts as the "canary in the coal mine," providing early feedback on the new release.   
In assembly we used Split to release a feature for only some users using feature flags   
[Split feature flags](https://www.split.io/product/feature-flags/)

1. Emergency (Red-Black) Deployment:   
In an emergency or red-black deployment, the existing version (red) is replaced entirely by the new version (black). This is a faster deployment strategy suitable for critical fixes or urgent updates.



---

## Technologies & Frameworks

<br/>
<br/>

### Kafka

6 scenarios/areas that Kafka is commonly referenced in system design interviews (https://levelup.gitconnected.com/6-things-you-need-to-know-about-kafka-before-using-it-in-a-system-design-interview-1fc31451732c)

1. Async Processing and Decoupling

- Kafka models a distributed messaging queue with message producers on one end and message consumers on the other. It’s a form of asynchronous processing. The producers need not wait for the messages to be consumed. That’s the first design pattern of Kafka we should recognize in a system design interview. It’d be awkward to use Kafka in a synchronous setting where the producers need to block-wait for the consumers’ responses.
- In theory, we could achieve the same async effect if we have the producers send a RPC directly to the consumers, expecting only an ACK as the response; or have the consumers fetch directly via an endpoint exposed by the producers. The advantage of using kafka is that it decouples the producers and consumers so that they can be developed, deployed, and managed separately. Once a common message contract is agreed upon, the producers will keep generating the messages and send them to Kafka. Interested consumers will pull from Kafka to retrieve the messages. Producers and consumers don’t need to know about each other’s address. They both only talk to a logically centralized service — kafka. Neither do they need to care about each other’s capacity. They can be monitored and scaled separately. In a system design review, in addition to development, it’s often a bonus point to call out operation and maintenance, which many candidates neglect.

<br/>

2. Persistent Message Store

- Now that the producers and consumers are out of sync, it’s easy for the producers to create an excessive amount of messages that the consumers can not process in time. This is another design pattern we need to highlight for Kafka in a system design interview.
  The message retention in Kafka is configurable, making it adaptive to a wide variety of requirements

> It’s effectively a durable cache that buffers the unprocessed messages, providing a cushion for our system to handle bursty load or consumer failure.

- Kafka’s persistent message store is also highly efficient. It embraces a log-based structure and only appends messages to the end of a file. In case the interviewer questions its efficiency, load tests have shown that it can be as fast as the network [2]. In addition, Kafka employs a standardized binary message format for both communication and storage, which reduces the processing overhead, and often enables using the sendfile [3] system call to transfer bytes between the network and disk directly.

- A desired side-effect of the log-based store is that it preserves ordering of the messages (see the fine print in the next section). The state of consumption can be captured in a simple offset variable that points to the next to-be-consumed message. Consumers advance the offset as they consume messages and can even rewind it to replay the history. This largely simplifies the retry logic, which provides a higher level of primitives for us to answer questions in the system design interview.

3. Message Routing and Load Sharding

- Kafka supports topic-based message routing. Both producers’ and consumers’ interactions with Kafka pertain to specific topics. Topics logically separate and categorize messages. Kafka makes sure that the right messages are delivered to the consumers which subscribe to the respective topics. In a system design interview, Kafka topics can be used as a routing mechanism. For example, all the user click activities go to one topic and all the system logs go to another. It simplifies our system design diagrams because the upstream systems only need to talk to a unified messaging endpoint. Kafka takes care of multiplexing the messages to the appropriate downstream systems.
- Kafka also supports partitions inside a topic. Producers send messages directly to the corresponding topic partitions. A message’s partition is determined by the message partition key. Messages in the same topic partition are stored together and in the same order as they’re sent in. Messages from one topic partition can only be consumed by one consumer instance at any given time. A consumer instance is allowed to consume messages from multiple topic partitions in parallel. If a consumer instance dies, a different one will need to stand in. This can be done manually or automatically via consumer groups. The concept of partition effectively shards the load inside a topic because different partitions inside a topic operate in parallel.
  The combination of topic and partitions can also be used as a shuffling mechanism. This system design interview post [4] uses Kafka to organize and count streaming updates.

<br/>

4. Replication and Resilience

- So far, we’ve referred to Kafka as a centralized service. The interviewer may ask <ins>if that creates a single point of failure</ins>. It doesn’t. But in order to answer the question well, we need to know what safeguards Kafka has to defend itself in the event of failure.
- The typical deployment of Kafka involves multiple machines. Clients are provided with multiple Kafka server addresses in configuration as a bootstrap, through which they’ll discover all the Kafka servers. Clients can switch to a different server if a particular one fails. All Kafka servers have the ability to provide clients with the latest metadata so that clients know which servers to talk to for their intended functionality and data requests.
- Internally, Kafka uses Zookeeper to coordinate controller election and store information such as cluster membership, access control, and topic configs. Zookeeper itself is a distributed system that’s resilient to partial failures. Of course we’ll need to deploy Zookeeper in a distributed fashion. The naive single Zookeeper instance setup is not going to withstand failures.
- Each topic partition is replicated across Kafka servers. One server will be the leader of that topic partition. It can also lead other topic partitions at the same time. All reads/writes of the topic partition go through the leader. A set of followers passively replicate the leader’s copy of the topic partition. The followers of this topic partition can be leaders of other topic partitions. Some number of the followers can be configured to run in sync mode, which means that a message is only committed when safely replicated in all sync followers. If the leader fails, a sync follower will pick up the duty.
- The interviewer probably won’t ask you to explain the full solution to a distributed log replication problem, as it’s very complex and too domain specific. But if you do want to be fully prepared, you can check out this blog post series [5] that goes in depth about the area.

<br/>

5. Client Failure and Message Delivery Semantics

- System design interviewers love to ask about the failure scenarios. A producer could fail before or after the message is committed. It has no way of knowing but to retry, which generates duplicates if the message is already committed. To fence off duplicates, the producer includes a Kafka-assigned ID and a monotonically increasing sequence number when sending messages. Kafka rejects the message if there is already a committed message from the same producer (identified by the Kafka-assigned ID) that has an equal or higher sequence number. Obviously, it’s the producer’s responsibility to keep track of the ID and sequence number.
- A consumer could fail after processing the message but before persisting the offset, in which case retry reprocesses the message. If it chooses to persist the offset first, it could fail after persisting the offset but before processing the message, in which case retry leads to a skipped message. So it looks like it’s either at-least-once or at-most-once. What about the widely acclaimed exactly-once? Well, it turns out exactly-once is only possible in a very limited scenario, i.e, the message processing and offset storage need to happen in the same transaction. The transaction can be a traditional database transaction that stores both the output of the message and the updated offset in the same commit. Kafka also has a transaction semantics in publishing to multiple topics, which allows consumers to store the output and offset atomically in two recipient Kafka topics. This blog post [6] has a more elaborate explanation about how Kafka transactions work, though it’s highly unlikely that the interviewer would require those specific details.

<br/>

6. Scalability Characteristics

- Another common Kafka gotcha in system design interviews is that people don’t pay attention to its scalability characteristics. Even though Kafka does not impose any hard limit on the number of topics and partitions, there are some internal constraints. Kafka stores the topics and partitions information in Zookeeper. Zookeeper’s availability can be enhanced by adding more instances, but its capacity is bottlenecked by individual nodes. In addition, Kafka assigns one server to act as the controller to manage the topics and partitions metadata. The controller needs to keep track of the partition leaders, and handle leader changes. And when the controller itself fails, the cluster needs to elect a new controller and transfer the metadata management to the newly elected controller. The controller role is crucial in a Kafka cluster. Increasing the cardinality of topics and partitions leads to higher overhead that may overwhelm the controller. Another aspect to take into consideration is that each partition is a physical file folder, within which there are multiple data files and index files for various log segments. \* So there is also the filesystem overhead in managing a large number of partitions. Finally, don’t forget that all the partitions are replicated, which multiplies the overhead.
- Thousands of topics and tens of thousands of partitions are definitely on the large end of the spectrum. The typical Kafka paradigm is fewer and larger topics with a reasonable amount of partitions. So the design of one Kafka topic per user and even one partition per user in a system design interview may be frowned upon. If you find yourselves heading to that rabbit hole, you may want to step back and consider whether a distributed key-value store like Cassendra is more appropriate.



### Resources 

https://github.com/ashishps1/awesome-system-design-resources?tab=readme-ov-file
https://github.com/ashishps1/awesome-low-level-design
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

<br/>
<br/>
<br/>

---

# System design basics 

## Key Characteristics of Distributed Systems
### 1. Scalability     
* Capability of a system, process, or a network <ins>to grow and manage increased demand</ins>
* **Horizontal Scaling - Adding more servers into your pool of resources**
* **Vertical Scaling - Increasing capacity of a server (adding more ram, cpu, memory)**   
scaling beyond that capacity often involves downtime and comes with an upper limit

<br/>

### 2. Reliability    

  * Considered reliable if it keeps <ins>delivering its services even when one or several of its software or hardware components fail</ins>
  * If a user has added an item to their shopping cart, the system is expected not to lose it.    
  A reliable distributed system <ins>**achieves this through redundancy**</ins> of both the software components and data.    
  If the server carrying the user’s shopping cart fails, another server that has the exact replica of the shopping cart should replace it   
  * <ins>**redundancy has a cost**</ins> and a reliable system has to pay that to achieve such resilience for services by eliminating every single point of failure.

<br/>

### 3. Availability    
  * System should be always available to the end user irrespective of location, network failure, etc
  * Availability is the time a system remains operational to perform its required function in a specific period
  * Availability takes into account maintainability, repair time, spares availability, and other logistics considerations
  * Reliability is availability over time considering the full range of possible realworld conditions that can occur


<br/>

### Reliability Vs. Availability   
  * **If a system is reliable, it is available. However, if it is available, it is not necessarily reliable**
  * In other words, **high reliability contributes to high availability, but it is possible to achieve a high availability even with an unreliable product by minimizing repair time** and ensuring that spares are always available when they are needed

<br/>
   
### 4. Efficiency    
  System should fullfill requirements in terms of speed, accuracy, memory
  * Two standard measures of its efficiency are
    1. Response time (latency) - the delay to obtain the first item
    1. Throughput (bandwidth) - the number of items delivered in a given time unit (e.g, a second).
  * The two measures correspond to the following unit costs:
    1. Number of messages globally sent by the nodes of the system regardless of the message size.
    1. Size of messages representing the volume of data exchanges
 
<br/>

  
### 5. Serviceability or Manageability    
  * How easy it is to operate and maintain
  * Repair and Maintainece should be quick, accesible and affordable
   
<br/>
<br/>

---

## Load Balancing

* Used to distribute traffic across a cluster of servers to improve responsiveness and **availability** of applications
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

<br/>

* Redundant Load Balancers
The load balancer can be a single point of failure; to overcome this, a second
load balancer can be connected to the first to form a cluster. Each LB
monitors the health of the other and, since both of them are equally capable
of serving traffic and failure detection, in the event the main load balancer
fails, the second load balancer takes over.

<br/>

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
<br/>

## Caching
* Caches take advantage of the locality of reference principle: recently requested data is likely to be requested again
* Caching can be at all levels from Frontend cache, load balancer cache, Backend Cache, Hardware, OS, Web application etc   
* Cache Invalidation is a challenge    
(Cache invalidation means that when the original data is updates, cache should be in sync and return updated data)    
(Keeping cache coherent with the source of truth ie database)

<br/>  

* 3 methods for cache invalidation  
  1. <ins>Write through Cache</ins> -  Data is written into the cache and the corresponding database at the same time
  Latency ↑ ie Speed ↓, Consistency ↑  
  1. <ins>Write-around cache</ins> - Data is written directly to db, bypassing the cache   
  disadvantage that a read request for recently written data will create a “cache miss” 
  1. <ins>Write Back cache</ins> -  Data is updated on cache only and sent to client, DB update happens after specified intervals or conditions
  Speed ↑ , Latency ↓, Throughput ↑, Risk of data loss
  

  <!-- After making DB update, return response to FE, then update cache    -->

<br/>  

* ### Cache eviction policies - Methods to decide which cache to clear
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
* CDN works because network latency plays a huge role
* CDN serves file from a region physically/geographically closer to them
* Since Data is replicated in CDN it prevents a single point of failure

<br/>
<br/>

---

## Data Partitioning (Sharding)
* Distributing databases accross multiple machines to improve manageability, performance, availability, and load balancing of an application

* Partitioning methods
1. Horizontal Partitioning (Range based partitioning) - Eg - all zip codes below 5000   
Partitions may not be uniform
1. Vertical Partitioning - divide our data to store tables related to a specific feature   
Eg photos, user data etc
1. Directory based Partitioning - 

* Partitioning Criteria
1. Key or Hash-based partitioning
1. List partitioning
1. Round-robin partitioning
1. Composite partitioning

<br/>

 Common Problems of Sharding
 * Joins and Denormalization
 * Referential integrity (foreign keys)
 * Rebalancing

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

* Intermediate server between the client and the back-end server
* Clients connect to proxy servers to request for a service like a web page, file, connection, etc.
* Proxies are used to <ins>filter requests, log requests, or sometimes transform requests (by adding/removing headers, encrypting/decrypting, or compressing a resource)</ins>

Proxy Server Types
* Open Proxy
  * Anonymous Proxy 
  * Trаnspаrent Proxy
* Reverse Proxy

<br/>
<br/>


## Redundancy and Replication

* Redundancy is the duplication of critical components or functions of a system
with the intention of increasing the reliability of the system, usually in the
form of a backup or fail-safe, or to improve actual system performance
* Redundancy plays a key role in removing the single points of failure in the
system and provides backups if needed in a crisis
* Replication means sharing information to ensure consistency between
redundant resources, such as software or hardware components, to improve
reliability, fault-tolerance, or accessibility.
* Replication is widely used in many database management systems (DBMS),
usually with a master-slave relationship between the original and the
copies
* The master gets all the updates, which then ripple through to the 
slaves. Each slave outputs a message stating that it has received the update
successfully, thus allowing the sending of subsequent updates.

<br/>
<br/>

## Horizontal vs Vertical Scaling

The heart of the difference is the approach to adding computing resources to your infrastructure
> With vertical scaling (scaling up), you’re adding more power to your existing machine

> In horizontal scaling (scaling out), you get the additional resources into your system by adding more machines to your network, sharing the processing and memory workload across multiple devices.

<br/>

### Why Horizontal scaling Is Better Than Vertical Scaling
Horizontal scaling is almost always more desirable than vertical scaling because you don’t get caught in a resource deficit. Instead of taking your server offline while you’re scaling up to a better one, horizontal scaling lets you keep your existing pool of computing resources online while adding more to what you already have. When your app is scaled horizontally, you have the benefit of elasticity.

* Instant and continuous availability
* No limit to hardware capacity
* Cost can be tied to use
* You’re not stuck always paying for peak demand
* Built-in redundancy
* Easy to size and resize properly to your needs

<br/>

---


## CAP Theorem

https://www.youtube.com/watch?v=8UryASGBiR4    
https://www.youtube.com/watch?v=k-Yaq8AHlFA   

* CAP theorem states that it is impossible for a distributed software system to
simultaneously provide more than two out of three of the following
guarantees (CAP)   
C - Consistency    
A - Availability    
P - Partition tolerence   

* Consistency: All nodes see the same data at the same time. Consistency is
achieved by updating several nodes before allowing further reads.
* Availability: Every request gets a response on success/failure. Availability is
achieved by replicating the data across different servers.
* Partition tolerance: The system continues to work despite message loss or
partial failure. A system that is partition-tolerant can sustain any amount of
network failure that doesn’t result in a failure of the entire network. Data is
sufficiently replicated across combinations of nodes and networks to keep the
system up through intermittent outages.

* TODO : Inser image

* TODO : Take notes from both youtube videos

<br/>
<br/>


## PACELC Theorem 

* 
  ```js
  if(partition P){
    choose between availability A and consistency C
  } else {
    choose between latency L and consistency C
  }
  ```

* We cannot avoid partition in a distributed system, therefore, according to the CAP theorem, a distributed system should choose between consistency or availability. 

* ACID (Atomicity, Consistency, Isolation, Durability) databases, such as RDBMSs like MySQL, Oracle, and Microsoft SQL Server, chose consistency (refuse response if it cannot check with peers)

* BASE (Basically Available, Soft-state, Eventually consistent) databases, such as NoSQL databases like MongoDB, Cassandra, and Redis, chose availability (respond with local data without ensuring it is the latest with its peers).

* ### The PACELC theorem states that in a system that replicates data:
  if there is a partition (‘P’), a distributed system can tradeoff between availability and consistency (i.e., ‘A’ and ‘C’);
  Else (‘E’), when the system is running normally in the absence of partitions, the system can tradeoff between latency (‘L’) and consistency (‘C’).

* Image todo

* Dynamo and Cassandra are PA/EL systems: They choose availability over consistency when a partition occurs; otherwise, they choose lower latency
* BigTable and HBase are PC/EC systems: They will always choose consistency, giving up availability and lower latency.
* MongoDB can be considered PA/EC (default configuration): MongoDB works in a primary/secondaries configuration. In the default configuration, all writes and reads are performed on the primary. As all replication is done asynchronously (from primary to secondaries), when there is a network partition in which primary is lost or becomes isolated on the minority side, there is a chance of losing data that is unreplicated to secondaries, hence there is a loss of consistency during partitions. Therefore it can be concluded that in the case of a network partition, MongoDB chooses availability, but otherwise guarantees consistency. Alternately, when MongoDB is configured to write on majority replicas and read from the primary, it could be categorized as PC/EC.


<br/>
<br/>


## Consistent Hashing

[What is Consistent Hashing and Where is it used?](https://www.youtube.com/watch?v=zaRkONvyGr8&list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX&index=4)

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

* In a distributed system, while moving data between components, it is possible that the data fetched from a node may arrive corrupted. This corruption can occur because of faults in a storage device, network, software, etc. How can a distributed system ensure data integrity, so that the client receives an error instead of corrupt data?

* Calculate a checksum and store it with data.
To calculate a checksum, a cryptographic hash function like MD5, SHA-1, SHA-256, or SHA-512 is used. The hash function takes the input data and produces a string (containing letters and numbers) of fixed length; this string is called the checksum.
* When a system is storing some data, it computes a checksum of the data and stores the checksum with the data. When a client retrieves data, it verifies that the data it received from the server matches the checksum stored. If not, then the client can opt to retrieve that data from another replica.

<br/>
<br/>

## SLI, SLO, and SLA

https://www.youtube.com/watch?v=LKpIirL8f-I&t=790s   

* SLA or Service Level Agreement is a contract that the service provider promises customers on service availability, performance, etc.
* SLO or Service Level Objective is a goal that service provider wants to reach.
* SLI or Service Level Indicator is a measurement the service provider uses for the goal.

TODO : notes from video

<br/>


## Message Queue

TODO : notes

<br/>

## Distributed message queue

TODO : notes

<br/>

## Logging Monitoring Alerting



<br/>
<br/>
<br/>

---
# System Design - Choosing database 

<br/>
<br/>

## When to choose which database

<br/>


* Caching - Use Key Value store - Redis, MemeCache 
* Image/Video - Use Blob Storage - Amazon S3 (+ CDN)
* Text searching - Text Search Engine - Elastic search, Solr (Both are build on Lucene)
* Application Metrics tracking system - Time series Database - Influx DB, Open TSDB 
* Analytics - Data warehouse - Hadoop
* Structured Data and Need ACID - SQL
* Unstructured Data, no/less relations, No ACID needed - Mongo DB, Couch base
* Unstructured Data, Ever Increasing data - Cassandra DB, HBase
* Social network Graphs, Recommendation Engine & Product Recommendation System, Knowledge Graph - Graph databases - Neo4j


<br/>

## Time series Database 
https://www.youtube.com/watch?v=cODCpXtPHbQ

TODO - Notes from video

<br/>
<br/>

## File Storage vs Blob Storage

https://www.youtube.com/watch?v=tndzLznxq40

TODO - Notes from video

<br/>
<br/>

## Data warehouse, Database for analytics - Hadoop

Dump all data with querying capabilities on top of it to support reports 

<br/>
<br/>

### RDBMS advantages:

* <ins>Simple structure</ins>   
  It has a simple structure that matches most kinds of data you normally have in a program.
* <ins>Ideal for consistent data systems</ins>   
  If you don't need a dynamic information system for massive amounts of data and you're not dealing with numerous data types, an RDBMS offers great speed and stability.
* <ins>JOIN operations</ins>   
  It uses SQL, which is commonly used and inherently supports JOIN operations.
* <ins>ACID compliance</ins>   
  Atomicity, Consistency, Isolation, and Durability of database systems.   
  Serves validity of database transactions, reduce anomalies, safeguard data integrity, and create stable database systems.    
* <ins>Allows fast data updating</ins>   
  All the DB is saved on one machine, and relations between records are used as pointers, this means you can update a record once and all its related records will update immediately.
* <ins>Better support options</ins>  
  Because RDBMS databases have been around for over 40 years, it's easier to get support, add-on products, and integrate data from other systems.


<br/>
<br/>

### RDBMS disadvantages:

* <ins>No support for objects, arrays, etc</ins>  
  Relational does not support OOP based objects, even representing simple lists is very complicated.
* <ins>Less efficient with NoSQL formats</ins>   
  Most RDBMSs are now compatible with NoSQL data formats, but they don't work with them as efficiently as non-relational databases.
* <ins>Query execution time depends on the size of the table</ins>   
  Since each query is done on a table — the query execution time depends on the size of the table. This is a significant limitation that requires us to keep our tables relatively small and perform optimizations on our DB in order to scale.
* <ins>Scalability challenges</ins>   
  RDBMSs have a more difficult time scaling up in response to massive growth compared to NoSQL databases.
* <ins>Sharding difficulties</ins>   
  Sharding is the process of dividing a large database into smaller parts for easier management.
* <ins>Vertical Scaling</ins>   
  In relational DBs scaling is done by adding more computing power to the machine that holds your DB (Vertical Scaling).Since there is a limit for the computing power machines can provide and since adding resources to your machine can require some downtime.

<br/>
<br/>

### Non-relational DBMS advantages:

* <ins>Store diverse types of data</ins>   
  NoSQL databases give you unlimited freedom to store diverse types of data in the same place. This offers the flexibility to add new and different types of data to your database at any time.
* <ins>Represent all data structures</ins>   
  You can represent almost all data structures including OOP based objects, lists, and dictionaries using good old JSON.
* <ins>No data preparation required</ins>   
  When there isn't time to design a complex model, and you need to get a database running fast, non-relational databases save a lot of time.
* <ins>Querying is very fast</ins>   
  each record is independent and therefore the query time is independent of the DB’s size and supports parallelity.
* <ins>Supports schema validation</ins>   
  Although NoSQL is unschematized by nature, it often supports schema validation, meaning you can make a collection schematized, the schema won’t be as simple as a table, it will be a JSON schema with specific fields.
* <ins>Excellent for handling "big data" analytics</ins>   
  The main reason why NoSQL databases are becoming more popular is that they remove the bottleneck of needing to categorize and apply strict structures to massive amounts of information. NoSQL databases like HBase, Cassandra, and CouchDB support the speed and efficiency of server operations while offering the capacity to work with large amounts of data.
* <ins>Easier to scale</ins>   
  NoSQL databases are easier to scale. They're designed to be fragmented across multiple data centers without much difficulty.
* <ins>Horizontal Scaling</ins>   
  In NoSQL, scaling the DB is done by adding more machines and distributing your data between them (Horizontal Scaling). This allows us to automatically add resources to our DB when needed without causing any downtime.

<br/>
<br/>

### Non-relational DBMS disadvantages:

* <ins>Atomic transactions are not inherently supported</ins>   
  you can add it yourself in code by using verification and revert mechanism, but since the records are divided between machines it cannot be an atomic process and race conditions can occur.
* <ins>JOIN operations are not inherently supported</ins>
* <ins>Compatibility and standardization challenges</ins>   
  Newer NoSQL database systems also lack the high degree of compatibility and standardization offered by SQL-based alternatives. You may find that the data in your non-relational database management system doesn't readily integrate with other products and services.
* <ins>Updating the data is a slow process</ins>   
  Since the data can be divided between machines and can be duplicated.
* <ins>Lack of tools</ins>   
  Since the system is relatively new compared to SQL-based RDBMS solutions, there aren't as many tools to assist with performance testing and analysis.

<br/>
<br/>

### How to Choose the Right Type of Database
Here are some factors you should keep in mind when selecting a database management system:

1. Atomicity

If atomicity is a top priority for you, stick to a relational database. Atomicity in database management promotes consistency in a database. It rests on the principle of atomic transactions. These are series of operations that are considered as a composite operation. In other words, either all operations in an atomic transaction occur, or none at all. The simplest example of an atomic transaction is transferring money from account A to account B. Balance from account A should be deducted and the requisite number should be added to account B. Both the operations need to be successful for the transaction to be successful.

2. Vertical or horizontal scaling

If your data strategy rests on vertical scaling, a relational database is fine. Vertical scaling adds more compute power to a sever instead of adding more servers to the system. It is preferred when there are limited number of users and not a lot of querying involved. In that sense, vertical scaling might be suitable for business-facing startups. The basic advantages of vertical scaling are speed and simplicity.

On the other hand, if you are expecting higher loads in terms of users or querying, horizontal scaling is a much cheaper solution. NoSQL databases employ horizontal scaling. Instead of adding more compute power to a server, they distribute the load across servers, and hence, the name. Horizontal scaling, and in turn, NoSQL databases, give businesses more elasticity. However, running join operations is difficult on these systems.

3. Speed

If speed is more important than ACID compliance, a non-relational database, such as a document database, is a better bet. For instance, in the case of real-time data, such as sensor data, some compromise in data integrity can be tolerated in favour of speed. In a non-relational database, each record is an independent entity. Thus, it is possible to run multiple queries simultaneously irrespective of the size of the database.

<br/>

References
* [Which Modern Database Is Right for Your Use Case] (https://www.xplenty.com/blog/which-database/)
* [How to Choose the Right Database] (https://towardsdatascience.com/how-to-choose-the-right-database-afcf95541741)

<br/>
<br/>

---

## Databases and Analogies with SQL 

| Name                  | Database         | Table         | Row           | Column          | Index        | Query language                                     | |
| :---:                 | :-:              | :-:           |:-:            |:-:              |:-:           | :-:                                                |:-:     |
| SQL                   | Database         | Table         | Row           | Column          | Index        | SQL                                                |
| MongoDB               | Database         | Collection    | Document      | Fields          | Index        | MQL                                                | Aggregations          
| Elastic search        | Index            | Types/Patterns| Document      | Fields          | -            | Over RESTful APIs Query DSL (Domain Specific Language) |
| Cassandra             | Key spaces       | Table         |               |                 |              | Cassandra Query Language (CQL) |
| Neo4j                 | Database         | Labels        | Node          | Properties      |              | Cypher Query Language (CQL)|

<br/>
<br/>

## Databases according to CAP theorem

In terms of partition, database can be PA - PARTITION AVAILABLE or PC - PARTITION CONSISTENT
If no partition, database can be EL - ELSE LATENCY or EC - ELSE CONSISTENT

SQL - PC EC
   
HBase - PC EC   
Big Table - PC EC   
   
Dynamo DB - PA EL   
Cassandra - PA EL   
Redis - PA EL   

Mongo DB - PA EC (default config), PC EC (if configured to write on majority replicas)

<br/>
<br/>

---

# API Design

## Desiging a good API

https://www.youtube.com/watch?v=_YlYuNMTCc8

TODO - Notes from video

<br/>
<br/>

## API rate limiting 

https://www.youtube.com/watch?v=YSW3UE5AFD4

TODO - Notes from video

### 4 Ways to implement API rate limiting
1. Token Bucket
1. Leaky Bucket
1. Fixed Window
1. Sliding Window

<br/>
<br/>

## Put vs Patch

https://www.youtube.com/watch?v=LJajkjI5RHE

* PUT request performs UPSERT query, ie If resource exists {update it} else {create it}
* For PUT requests, client is suposed to send user_id in req body, and it would upsert it
* user_id cannot be send in url as users/123, as if 123 does not exist it would give a 404
* PUT req <ins>replaces the entire entry with req body sent</ins>, eg you sent req without age, so age would get blank in entry 
* PATCH is used when you want to just update a few attributes, Only the fields to be updated are to be sent in req body
* PATCH reduces overhead as client does not have to send all fields in req body

<br/>
<br/>
<br/>

---

# Technologies & Frameworks

<br/>
<br/>

## Kafka
6 scenarios/areas that Kafka is commonly referenced in system design interviews (https://levelup.gitconnected.com/6-things-you-need-to-know-about-kafka-before-using-it-in-a-system-design-interview-1fc31451732c)
1. Async Processing and Decoupling   
* Kafka models a distributed messaging queue with message producers on one end and message consumers on the other. It’s a form of asynchronous processing. The producers need not wait for the messages to be consumed. That’s the first design pattern of Kafka we should recognize in a system design interview. It’d be awkward to use Kafka in a synchronous setting where the producers need to block-wait for the consumers’ responses.
* In theory, we could achieve the same async effect if we have the producers send a RPC directly to the consumers, expecting only an ACK as the response; or have the consumers fetch directly via an endpoint exposed by the producers. The advantage of using kafka is that it decouples the producers and consumers so that they can be developed, deployed, and managed separately. Once a common message contract is agreed upon, the producers will keep generating the messages and send them to Kafka. Interested consumers will pull from Kafka to retrieve the messages. Producers and consumers don’t need to know about each other’s address. They both only talk to a logically centralized service — kafka. Neither do they need to care about each other’s capacity. They can be monitored and scaled separately. In a system design review, in addition to development, it’s often a bonus point to call out operation and maintenance, which many candidates neglect.

<br/>

2. Persistent Message Store
* Now that the producers and consumers are out of sync, it’s easy for the producers to create an excessive amount of messages that the consumers can not process in time. This is another design pattern we need to highlight for Kafka in a system design interview. 
The message retention in Kafka is configurable, making it adaptive to a wide variety of requirements

> It’s effectively a durable cache that buffers the unprocessed messages, providing a cushion for our system to handle bursty load or consumer failure.

* Kafka’s persistent message store is also highly efficient. It embraces a log-based structure and only appends messages to the end of a file. In case the interviewer questions its efficiency, load tests have shown that it can be as fast as the network [2]. In addition, Kafka employs a standardized binary message format for both communication and storage, which reduces the processing overhead, and often enables using the sendfile [3] system call to transfer bytes between the network and disk directly.

* A desired side-effect of the log-based store is that it preserves ordering of the messages (see the fine print in the next section). The state of consumption can be captured in a simple offset variable that points to the next to-be-consumed message. Consumers advance the offset as they consume messages and can even rewind it to replay the history. This largely simplifies the retry logic, which provides a higher level of primitives for us to answer questions in the system design interview.

3. Message Routing and Load Sharding
* Kafka supports topic-based message routing. Both producers’ and consumers’ interactions with Kafka pertain to specific topics. Topics logically separate and categorize messages. Kafka makes sure that the right messages are delivered to the consumers which subscribe to the respective topics. In a system design interview, Kafka topics can be used as a routing mechanism. For example, all the user click activities go to one topic and all the system logs go to another. It simplifies our system design diagrams because the upstream systems only need to talk to a unified messaging endpoint. Kafka takes care of multiplexing the messages to the appropriate downstream systems.
* Kafka also supports partitions inside a topic. Producers send messages directly to the corresponding topic partitions. A message’s partition is determined by the message partition key. Messages in the same topic partition are stored together and in the same order as they’re sent in. Messages from one topic partition can only be consumed by one consumer instance at any given time. A consumer instance is allowed to consume messages from multiple topic partitions in parallel. If a consumer instance dies, a different one will need to stand in. This can be done manually or automatically via consumer groups. The concept of partition effectively shards the load inside a topic because different partitions inside a topic operate in parallel.
The combination of topic and partitions can also be used as a shuffling mechanism. This system design interview post [4] uses Kafka to organize and count streaming updates.

<br/>

4. Replication and Resilience
* So far, we’ve referred to Kafka as a centralized service. The interviewer may ask <ins>if that creates a single point of failure</ins>. It doesn’t. But in order to answer the question well, we need to know what safeguards Kafka has to defend itself in the event of failure.
* The typical deployment of Kafka involves multiple machines. Clients are provided with multiple Kafka server addresses in configuration as a bootstrap, through which they’ll discover all the Kafka servers. Clients can switch to a different server if a particular one fails. All Kafka servers have the ability to provide clients with the latest metadata so that clients know which servers to talk to for their intended functionality and data requests.
* Internally, Kafka uses Zookeeper to coordinate controller election and store information such as cluster membership, access control, and topic configs. Zookeeper itself is a distributed system that’s resilient to partial failures. Of course we’ll need to deploy Zookeeper in a distributed fashion. The naive single Zookeeper instance setup is not going to withstand failures.
* Each topic partition is replicated across Kafka servers. One server will be the leader of that topic partition. It can also lead other topic partitions at the same time. All reads/writes of the topic partition go through the leader. A set of followers passively replicate the leader’s copy of the topic partition. The followers of this topic partition can be leaders of other topic partitions. Some number of the followers can be configured to run in sync mode, which means that a message is only committed when safely replicated in all sync followers. If the leader fails, a sync follower will pick up the duty.
* The interviewer probably won’t ask you to explain the full solution to a distributed log replication problem, as it’s very complex and too domain specific. But if you do want to be fully prepared, you can check out this blog post series [5] that goes in depth about the area.

<br/>

5. Client Failure and Message Delivery Semantics
* System design interviewers love to ask about the failure scenarios. A producer could fail before or after the message is committed. It has no way of knowing but to retry, which generates duplicates if the message is already committed. To fence off duplicates, the producer includes a Kafka-assigned ID and a monotonically increasing sequence number when sending messages. Kafka rejects the message if there is already a committed message from the same producer (identified by the Kafka-assigned ID) that has an equal or higher sequence number. Obviously, it’s the producer’s responsibility to keep track of the ID and sequence number.
* A consumer could fail after processing the message but before persisting the offset, in which case retry reprocesses the message. If it chooses to persist the offset first, it could fail after persisting the offset but before processing the message, in which case retry leads to a skipped message. So it looks like it’s either at-least-once or at-most-once. What about the widely acclaimed exactly-once? Well, it turns out exactly-once is only possible in a very limited scenario, i.e, the message processing and offset storage need to happen in the same transaction. The transaction can be a traditional database transaction that stores both the output of the message and the updated offset in the same commit. Kafka also has a transaction semantics in publishing to multiple topics, which allows consumers to store the output and offset atomically in two recipient Kafka topics. This blog post [6] has a more elaborate explanation about how Kafka transactions work, though it’s highly unlikely that the interviewer would require those specific details.

<br/>

6. Scalability Characteristics
* Another common Kafka gotcha in system design interviews is that people don’t pay attention to its scalability characteristics. Even though Kafka does not impose any hard limit on the number of topics and partitions, there are some internal constraints. Kafka stores the topics and partitions information in Zookeeper. Zookeeper’s availability can be enhanced by adding more instances, but its capacity is bottlenecked by individual nodes. In addition, Kafka assigns one server to act as the controller to manage the topics and partitions metadata. The controller needs to keep track of the partition leaders, and handle leader changes. And when the controller itself fails, the cluster needs to elect a new controller and transfer the metadata management to the newly elected controller. The controller role is crucial in a Kafka cluster. Increasing the cardinality of topics and partitions leads to higher overhead that may overwhelm the controller. Another aspect to take into consideration is that each partition is a physical file folder, within which there are multiple data files and index files for various log segments. * So there is also the filesystem overhead in managing a large number of partitions. Finally, don’t forget that all the partitions are replicated, which multiplies the overhead.
* Thousands of topics and tens of thousands of partitions are definitely on the large end of the spectrum. The typical Kafka paradigm is fewer and larger topics with a reasonable amount of partitions. So the design of one Kafka topic per user and even one partition per user in a system design interview may be frowned upon. If you find yourselves heading to that rabbit hole, you may want to step back and consider whether a distributed key-value store like Cassendra is more appropriate.

<br/>


<br/>
<br/>

<br/>
<br/>


<br/>
<br/>


<br/>
<br/>

---

<br/>
<br/>

# System Design Interviews - Step by step

## Step 1 - Requirements clarifications
   
Clarify all these
   
* ### Functional Requirements
  * what features are expected - upload video, show feed, cater to multiple resolutions, cater to different internet speeds etc   
  * **For Functional Requirements, consider analytics too**
  * If you need response **real time/very fast**, call it **Minimal Latency**
   
* ### Non Functional requirements
  What non functional requirements are expected - high availability, low latency, consistency vs performance, fault tolerence et
   
* ### Capacity Estimation
  1. What scale is expected from the system (e.g., number of new tweets, number of tweet views, number of timeline generations per sec., etc.)
  1. DAU (Daily active users), Creators ratio
  2. How much storage will we need?
  3. What network bandwidth usage are we expecting? This will be crucial in deciding how we will manage traffic and balance load between servers.
    
  <br/>

  **Consider Bandwidth estimation, Read/Write ratio, Cache memory estimation too with Traffic estimation, Memory estimation**   
  For traffic estimation, calculate Reads/second, Writes/second

* ### Write conclusions
  Write to read ratio consider when data storage

<br/>

## Step 2 - Defining data model

* List down tables in db and their schemas
* Consider Database design too 

```javascript
// Example of db design for URL shortening service

* Store billions of records 
* Reads > writes
* No relation among records

// Since we do not need joins, ACID properties, and since horizontal scaling is preferable in this senario
// NoSQL will be a better choice
```

<br/>

## DESIGN A MONOLITH FIRST AND THEN TRY TO BREAK IT

## Step 3 - High-level design
* Design monolith first and then try to break it 
* **Ask yourself how will you scale each major service**

<br/>

## Step 4 - Detailed Design

Ask yourself 
* How should we partition our data to distribute it to multiple databases? 
* Should we try to store all the data of a user on the same database? What issue could it cause?
* How much and at which layer should we introduce cache to speed things up?
* Since users’ timeline will contain the most recent (and relevant) tweets, should we try to store our data so that it is optimized for scanning the latest tweets?
* What components need better load balancing?

* Along with mentioning cache, LB, **Mention cache evection policy, cache invalidation policy, Load balancing algo too**

<br/>

## Step 5 - Identifying and resolving bottlenecks

* Is there any **single point of failure** in our system? What are we doing to mitigate it?
* Do we have enough **replicas** of the data so that we can still serve our users if we lose a few servers?
* Do we have enough **copies of different services running** such that a few failures will not cause a **total system shutdown**?
* How are we **monitoring the performance** of our service? Do we get **alerts** whenever critical components fail or their performance degrades?


<br/>
<br/>
<br/>

---

## Tips and Tricks

* **For Functional Requirements, consider analytics too**
* For Functional Requirements, If you need response **real time/very fast**, call it **Minimal Latency**
* For Capacity Estimation consider **Bandwidth estimation, Read/Write ratio, Cache memory estimation too with Traffic estimation, Memory estimation**
* After basic HDD Ask yourself how will you **scale each major service**
* For traffic estimation, calculate Reads/second, Writes/second
* In Step 2 Defining data model, Consider **Database Design** too
* In Step 4 Detailed Design, Along with mentioning cache, LB, **Mention cache evection policy, cache invalidation policy, Load balancing algo too**

<br/>
<br/>

---
# Random Notes

### Why choose S3
* Backed by AWS
* Reliable
* SLA 
* Can hook up S3 to CDN
* Since Data is replicated in CDN it prevents a single point of failure
* Note - S3 is not mutable

### Always save meta data of media in NOSQL databases, as it is more flexible, fast for analysis, Horizontal scalable and you dont have joins

### For media, check if we need to support different resolutions and devices

### Akamai - Akamai is the leading content delivery network (CDN) services provider for media and software delivery, and cloud security solutions.
Amazon CloudFront is a global content delivery network (CDN) service built for high-speed, low-latency performance, security, and developer ease-of-use.

### Since a modern-day server can have 256GB memory, we can easily fit all the cache into one machine

### Think about Security and Permission

### In a system design review, in addition to development, it’s often a bonus point to call out operation and maintenance, which many candidates neglect

<br/>



---

# Architecture

* Client side interface (usually web app, app, website, etc)
   
* Client server communication (usually REST, long polling, web sockets, server side if two way communication)
* Server and its microservices
* Introduce queues if req for processing user requests
* Client server communication protocol (usually HTTP over TCP/IP or UDP, FTP)
* Databases   
(Database Partitioning)
* S3 for static media storage 
* Databases replica 
* Server to server communication (message queue or REST)
* Load balancers 
* Cache 

<br/>
<br/>


# System Design Examples

## Scaling a local pizza shop

<br/>
<br/>

## URL Shortening service like TinyURL
(done offline)

<br/>
<br/>

## Design a WhatsApp Chat messaging system design

https://leetcode.com/discuss/interview-question/system-design/1588415/WhatsAppMessaging-Chat-System-Design

<br/>
<br/>

## Design TikTok

https://www.youtube.com/watch?v=07BVxmVFDGY


<br/>
<br/>

## Design a B2B application used by Retail stores
   

```json
retail store B2B
offline stores
  
any size (local retailer to Dmart, reliance fresh etc)
  
  
product catelogue
Inventory management 
ordering products from vendors
users & their purchases, payment record 
Invoice 
company structure 
  
customer -> service -> vendors
  
  
company 
id : 
name ,
prime location 
locations
no of outlets 
active 
  
  
product 
name 
price
selling price 
discount
features
SKU 
images 
url 
company_id : ''
  
customer 
name 
address
phone
order total : 
  

payment 
amount : 
customer id : 
company id : 
order id : 
payment date : ''
  
order items 
123 : 
123 : '', name: , price, disc
date : ''
  
  

  
POST /payment/
{
	"orderItems": [],
  "customerId": "",
  "comapany id" : "",
}
```

### Notes from this design
* For B2B consider Both perspective, To Consumer as well as to bussiness
* When defining schema, specially mention the foreign keys and relations, Eg - product belongs to a company
* When saving payments data / order data, Instead of using product_id forign key, dump product data, as price may change and we want an entry of older price at which it was purchased
* For tables like Order, Payment etc Date Time of transaction is a MUST
* 

---

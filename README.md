## Microservices vs Monolithic Systems

<br/>

### Monolithic Architecture
* Monolithic structure is where frontend, backend, storage etc is done within the same application
* Monoliths **communicate within the system** since all parts are running in the same process
* This type is **Highly coupled** as every function is relient on another 

<br/>

### Microservice Architecture
> Microservice is decoupling of entire application into small small services 
* [What are Microservices](https://www.youtube.com/watch?v=j3XufmvEMiM)
* The application is divided into small services, where **each microservice is developed seperately**
* Finished application is the sum of its microservices
* For these microservices to **communicate with each other, a message queue is used**
* Its easy to add features, make changes, and maintain written code
* **Different services can be simultaneously developed without disrupting others**
* Different services can be written in **different languages**
* **Isolates falut to a single service**, if one service goes down, rest of the app is still working
* **No need to deploy the entire application**
* Microservices can communicate among each other over HTTP uing REST API

### Best Practices for Microservice Architecture
* We can dockerise each microservice 
* Seperate build for each application

---

## Brownfield vs. Greenfield

### Brownfield software development 
Refers to the development and deployment of a new software system in the presence of existing or legacy software systems. This implies that any new software architecture must take into account and coexist with previously created code


### Greenfield software development 
Refers to developing a system for a totally new environment and requires development from a clean slate – no legacy code around. It is an approach used when you're starting fresh and with no restrictions or dependencies.

---

## When to choose which database

<br/>

### Cheat Sheet
* For cache — use a key-value DB (Redis).
* For graph-like data — use a graph DB.
* If you tend to query on subsets of columns /features — use column DB.
* For all other use cases — Relational or Document DB.

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


> A race condition is an undesirable situation that occurs when a device or system attempts to perform two or more operations at the same time (two or more threads can access shared data and they try to change it at the same time).   
Because the thread scheduling algorithm can swap between threads at any time, you don't know the order in which the threads will attempt to access the shared data.

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

---

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

## Race Conditions and Deadlock

### Dekker's Algorithm
[Race Conditions and How to Prevent Them - A Look at Dekker's Algorithm](https://www.youtube.com/watch?v=MqnpIwN7dz0)

---

## Pigeon Hole Principle

[What Is the Pigeonhole Principle?](https://www.youtube.com/watch?v=B2A2pGrDG8I)

---

## Bloom Filters

[What Are Bloom Filters?](https://www.youtube.com/watch?v=kfFacplFY4Y)

---

## PWA - Progressive Web Apps

* 

--- 

### 


```mermaid
  graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
```
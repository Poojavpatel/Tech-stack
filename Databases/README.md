## Database

### Table of contents
- [Databases]()
  - [SQL](../SQL/README.md)
  - [Mongo db](../Mongodb/README.md)
  - [DynamoDB](../AWS/DynamoDB.md)
  - [Redis](../Redis/README.md)
  - [Cassandra](../Cassandra/README.md)
  - [Neo4J](./Neo4j.md)
- [When to choose which database](#when-to-choose-which-database---cheat-sheet)
  - [Time series Database](#time-series-database)
  - [File Storage vs Blob Storage](#file-storage-vs-blob-storage)
  - [Data warehouse, Database for analytics - Hadoop](#data-warehouse-database-for-analytics---hadoop)
  - [RDBMS advantages](#rdbms-advantages)
  - [RDBMS disadvantages](#rdbms-disadvantages)
  - [Non-relational DBMS advantages](#non-relational-dbms-advantages)
  - [Non-relational DBMS disadvantages](#non-relational-dbms-disadvantages)
  - [How to Choose the Right Type of Database](#how-to-choose-the-right-type-of-database)
- [Databases and Analogies with SQL](#databases-and-analogies-with-sql)
- [Databases according to CAP theorem](#databases-according-to-cap-theorem)
- [Can you not scale SQL databases?](#can-you-not-scale-sql-databases)
- [Database Design](#database-design)

<br/>
<br/>
<br/>


### When to choose which database - Cheat Sheet
- Caching - Use Key Value store - Redis, MemeCache
- Image/Video - Use Blob Storage - Amazon S3 (+ CDN)
- Text searching - Text Search Engine - Elastic search, Solr (Both are build on Lucene)
- Application Metrics tracking system - Time series Database - Influx DB, Open TSDB
- Analytics - Data warehouse - Hadoop
- Structured Data and Need ACID - SQL
- Unstructured Data, no/less relations, No ACID needed - Mongo DB, Couch base
- Unstructured Data, Ever Increasing data - Cassandra DB, HBase
- Social network Graphs, Recommendation Engine & Product Recommendation System, Knowledge Graph - Graph databases - Neo4j

<br/>

### Time series Database

https://www.youtube.com/watch?v=cODCpXtPHbQ

TODO - Notes from video

<br/>

### File Storage vs Blob Storage

https://www.youtube.com/watch?v=tndzLznxq40

TODO - Notes from video

<br/>

### Data warehouse, Database for analytics - Hadoop

Dump all data with querying capabilities on top of it to support reports

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


<br/>
<br/>

---

### Databases and Analogies with SQL

|      Name      |  Database  |     Table      |   Row    |   Column   | Index |                     Query language                     |              |
| :------------: | :--------: | :------------: | :------: | :--------: | :---: | :----------------------------------------------------: | :----------: |
|      SQL       |  Database  |     Table      |   Row    |   Column   | Index |                          SQL                           |
|    MongoDB     |  Database  |   Collection   | Document |   Fields   | Index |                          MQL                           | Aggregations |
| Elastic search |   Index    | Types/Patterns | Document |   Fields   |   -   | Over RESTful APIs Query DSL (Domain Specific Language) |
|   Cassandra    | Key spaces |     Table      |          |            |       |             Cassandra Query Language (CQL)             |
|     Neo4j      |  Database  |     Labels     |   Node   | Properties |       |              Cypher Query Language (CQL)               |

<br/>
<br/>

### Databases according to CAP theorem

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

### Can you not scale SQL databases?
Is it true that when you userbase/scale increases you will need to move to a NOSQL db?   
Many companies with huge scale use SQL, how do they do it ?   

The perception of SQL databases being difficult to scale is changing   
While it's true that NoSQL databases have been traditionally associated with horizontal scaling, modern SQL databases have evolved and adopted strategies to handle large-scale applications

Companies like Facebook, Google, and Amazon use SQL databases at a massive scale by implementing these strategies. The key is to carefully design the database architecture, leverage modern technologies, and adopt best practices for scalability.    

While NoSQL databases are suitable for certain use cases, SQL databases remain a robust choice for applications that demand strong consistency, complex queries, and transactional integrity at scale.

Here's an explanation of how SQL databases achieve scalability
1. Horizontal Scaling   
To overcome the limitations of vertical scaling, modern SQL databases have adopted horizontal scaling strategies.
Horizontal scaling involves distributing the data and workload across multiple servers, forming a cluster.
Each server in the cluster is responsible for a portion of the data, and together they handle the overall workload

2. Sharding   
Sharding is a technique used in horizontal scaling where the dataset is divided into smaller, more manageable parts called shards.
Each shard is stored on a separate server, allowing the database to distribute the load across multiple machines.
Sharding can be done based on certain criteria such as ranges of data, geographic location, or other factors

3. Replication   
Replication involves creating copies of the database and distributing them across multiple servers.
One server serves as the primary (read and write operations), while others act as replicas (read-only operations).
This improves read scalability and provides fault tolerance. If one server fails, another can take over.

4. Caching   
Caching frequently accessed data in memory can significantly improve the performance of SQL databases.
This is particularly effective for read-heavy workloads, as it reduces the need to fetch data from disk

5. Cloud-Based Solutions
Cloud platforms offer scalable infrastructure, allowing databases to leverage cloud services for dynamic scaling.
Auto-scaling features and managed database services make it easier to adapt to varying workloads.

6. Advanced Architectural Designs   
Database management systems have evolved with features designed for scalability, such as distributed transaction management and global consistency

<br/>


#### How amazon scales its SQL database

Amazon scales its SQL databases, particularly with Amazon RDS, using the following key strategies:

1. Multi-AZ Deployment: Maintains a primary database with a backup replica in a different location for high availability.

1. Read Replicas: Creates copies of the primary database for handling read queries, distributing the workload.

1. Sharding: Splits large datasets into smaller shards, managed independently for improved scalability.

1. Amazon Aurora: Utilizes the high-performance, distributed architecture of Amazon Aurora for both read and write operations.

1. Elastic Load Balancing: Distributes incoming database traffic across multiple instances, preventing bottlenecks.

1. Auto Scaling and Cloud Infrastructure: Integrates with AWS Auto Scaling for dynamic adjustments based on demand, leveraging the flexibility of cloud infrastructure.

<br/>

#### How Pinterest scaled to 11 Million Users (with SQL db)

[How Pinterest Scaled to 11 Million Users With Only 6 Engineers](https://www.youtube.com/watch?v=QRlP6BI1PFA&t=68)

The speaker starts the video with how Pinterest was launched in 2010 and the tech stack they used at that time. Then he talks about the explosive growth Pinterest experienced and the challenges they faced in scaling their tech stack. 

He mentioned that they explored two solutions: clustering and sharding.   
Pinterest uses sharding to solve the problem of scaling their database. Sharding is a technique where a large database is partitioned into smaller, more manageable pieces called shards. Each shard is essentially a small database and is hosted on a separate server. Unlike clustering, each shard acts independently of one another and does not cross communicate.

Here are the steps Pinterest took to shard their database:

* Denormalize their database: They combined their tables in order to get rid of the usage of foreign keys and joins. This may include redundant data, however because in a sharded environment you cannot directly access data that resides in another shard.

* Introduce read replicas: They introduced read replicas to handle read queries and improve overall database performance. They also introduced caching to reduce the amount of traffic hitting the database.

* Sharding: They created virtual shards with eight physical servers each hosting 512 databases and all databases having all tables. They then used multimaster replication approach where each master was assigned to a different availability Zone in case of failure the system would immediately switch to the other master and spin up a new one right away.

* ID sharding: They used an ID sharding strategy where the records ID tells you exactly which shard to look for each data use a 64bits ID structure where the first 16 bits is used to determine the shard ID.

Sharding did come with some issues:

* They had to give up on foreign keys, joins and constraints. These logics were instead moved to the application layer as you cannot join on two different shards.

* They lost all transaction capabilities. Transactions are a sequence of one or more operations that are executed as a single unit ensuring atomicity, consistency, isolation and durability where either all operations are successfully completed or none are applied at all. This fails in a sharded environment due to multiple reasons.

* Schema changes require a lot more planning.

some key takeaways from the video

* Your architecture is doing the right thing if you can just spin up more boxes to solve your problems.

* The less your data move across your notes the more stable your architecture is.

* Everything will fail so try to keep it simple.


<br/>
<br/>

---

## Database Design 

[Database Design playlist](https://www.youtube.com/watch?v=-C2olg3SfvU&list=PLZDOU071E4v6epq3GS0IqZicZc3xwwBN_)

### Tips and tricks
* When defining schema, specially mention the foreign keys and relations, Eg - product belongs to a company
* When saving payments data / order data, Instead of using product_id forign key, dump product data, as price may change and we want an entry of older price at which it was purchased
* For tables like Order, Payment etc Date Time of transaction is a MUST
* Never use business field as a primary key, as the value can change, and you don't have control over this field (eg Govt decides to update format of Pan card etc), some values may be restricted to some countries (eg social security number only exists in US)
* Use snake_case or kebab-case to store db names, do not use spaces
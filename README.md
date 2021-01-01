## When to choose which database

<br/>

### RDBMS advantages:

* ACID compliance: If a database system is "ACID compliant," it satisfies a set of priorities that measure the atomicity, consistency, isolation, and durability of database systems. The more ACID-compliant a database is, the more it serves to guarantee the validity of database transactions, reduce anomalies, safeguard data integrity, and create stable database systems. Generally, SQL-based RDBMSs achieve a high level of ACID compliance, but NoSQL databases give up this distinction to gain speed and flexibility when dealing with unstructured data.
* Ideal for consistent data systems: With a SQL-based RDBMS, your information will remain in the structure you originally create. If you don't need a dynamic information system for massive amounts of data—and you're not dealing with numerous data types—an RDBMS offers great speed and stability.
* Better support options: Because RDBMS databases have been around for over 40 years, it's easier to get support, add-on products, and integrate data from other systems.
* It has a simple structure that matches most kinds of data you normally have in a program.
* It uses SQL, which is commonly used and inherently supports JOIN operations.
* Allows fast data updating. All the DB is saved on one machine, and relations between records are used as pointers, this means you can update a record once and all its related records will update immediately.

<br/>
<br/>

### RDBMS disadvantages:

* Scalability challenges and difficulties with sharding: RDBMSs have a more difficult time scaling up in response to massive growth compared to NoSQL databases. These databases also present challenges when it comes to sharding. Sharding is the process of dividing a large database into smaller parts for easier management. If you're dealing with a conservative database that you don't expect to change a lot in the years ahead, the sharding and scaling challenges related to RDBMS solutions may never apply to you. On the other hand, if you plan to scale up and grow in the years ahead, a non-relational database system (NoSQL-based) could be a better match for your needs.
* Less efficient with NoSQL formats: Most RDBMSs are now compatible with NoSQL data formats, but they don't work with them as efficiently as non-relational databases.
* Since each query is done on a table — the query execution time depends on the size of the table. This is a significant limitation that requires us to keep our tables relatively small and perform optimizations on our DB in order to scale.
* In relational DBs scaling is done by adding more computing power to the machine that holds your DB, this method is called ‘Vertical Scaling’. Why is it a disadvantage? since there is a limit for the computing power machines can provide and since adding resources to your machine can require some downtime.
* Relational does not support OOP based objects, even representing simple lists is very complicated.

<br/>
<br/>

### Non-relational DBMS advantages:

* Excellent for handling "big data" analytics: The main reason why NoSQL databases are becoming more popular is that they remove the bottleneck of needing to categorize and apply strict structures to massive amounts of information. NoSQL databases like HBase, Cassandra, and CouchDB support the speed and efficiency of server operations while offering the capacity to work with large amounts of data.
* No limits on types of data you can store: NoSQL databases give you unlimited freedom to store diverse types of data in the same place. This offers the flexibility to add new and different types of data to your database at any time.
* Easier to scale: NoSQL databases are easier to scale. They're designed to be fragmented across multiple data centers without much difficulty.
* No data preparation required: When there isn't time to design a complex model, and you need to get a database running fast, non-relational databases save a lot of time.
* It allows you to keep objects with different structures.
* You can represent almost all data structures including OOP based objects, lists, and dictionaries using good old JSON.
* Although NoSQL is unschematized by nature, it often supports schema validation, meaning you can make a collection schematized, the schema won’t be as simple as a table, it will be a JSON schema with specific fields.
* Querying NoSQL is very fast, each record is independent and therefore the query time is independent of the DB’s size and supports parallelity.
* In NoSQL, scaling the DB is done by adding more machines and distributing your data between them, this method is called ‘Horizontal Scaling’. This allows us to automatically add resources to our DB when needed without causing any downtime.

<br/>
<br/>

### Non-relational DBMS disadvantages:

* More difficult to find support: Because the NoSQL community doesn't have 40 years of history and development behind it, it could be more difficult to find experienced users when you need to troubleshoot.
* Lack of tools: Since the system is relatively new compared to SQL-based RDBMS solutions, there aren't as many tools to assist with performance testing and analysis.
* Compatibility and standardization challenges: Newer NoSQL database systems also lack the high degree of compatibility and standardization offered by SQL-based alternatives. You may find that the data in your non-relational database management system doesn't readily integrate with other products and services.
* Updating the data is a slow process in Document DB since the data can be divided between machines and can be duplicated.
* Atomic transactions are not inherently supported. you can add it yourself in code by using verification and revert mechanism, but since the records are divided between machines it cannot be an atomic process and race conditions can occur.

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
<br/>

### Cheat Sheet
* For cache — use a key-value DB (Redis).
* For graph-like data — use a graph DB.
* If you tend to query on subsets of columns /features — use column DB.
* For all other use cases — Relational or Document DB.

<br/>
<br/>

References
* [Which Modern Database Is Right for Your Use Case] (https://www.xplenty.com/blog/which-database/)
* [How to Choose the Right Database] (https://towardsdatascience.com/how-to-choose-the-right-database-afcf95541741)

---
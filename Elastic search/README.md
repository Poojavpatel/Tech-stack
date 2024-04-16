# Elastic Search

## Table of contents

- [Terminologies](#elastic-search-terminologies)
- [Analogies with SQL](#databases-and-analogies-with-sql)   
- [ELK Stack](#elk-stack)
- [Indexing and retrieval in Elasticsearch](#indexing-and-retrieval-in-elasticsearch)
  - [Inverted index](#inverted-index)
- [Can elastic search be used as a primary db](#can-elastic-search-be-used-as-a-primary-database)
- [Elasticsearch anti-patterns and bad practices](#elasticsearch-anti-patterns-and-bad-practices)

<br/>
<br/>
<br/>

### Elastic search terminologies

https://www.youtube.com/watch?v=LqXj1oC1FH0


<br/>



[Elastic Search and ELK Stack playlist](https://www.youtube.com/watch?v=lnEzmQHa6Co&list=PLa6iDxjj_9qVaf5CsXWP-GAgZoVwKowjx)

## Databases and Analogies with SQL 

| Name                  | Database         | Table         | Row           | Column          | Index        | Query language                                     | |
| :---:                 | :-:              | :-:           |:-:            |:-:              |:-:           | :-:                                                |:-:     |
| SQL                   | Database         | Table         | Row           | Column          | Index        | SQL                                                |
| MongoDB               | Database         | Collection    | Document      | Fields          | Index        | MQL                                                | Aggregations          
| Elastic search        | Index            | Types/Patterns| Document      | Fields          | -            | Over RESTful APIs Query DSL (Domain Specific Language) |
| Cassandra             | Key spaces       | Table         |               |                 |              | Cassandra Query Language (CQL) |
| Neo4j                 | Database         | Labels        | Node          | Properties      |              | Cypher Query Language (CQL)|

---

<br/>
<br/>



## ELK Stack

https://www.youtube.com/watch?v=ZP0NmfyfsoM

### Elastic search
* Actual storage

### Kibana
* UI Dashboard, visualization to interact with the system

### Log stash
* Take Input -> Transform -> Stash into elastic search

<br/>
<br/>


---

<br/>
<br/>

Crash course - https://www.youtube.com/watch?v=cI-WQ1hYYt8

```js
// Dump


t3/h/_search
t3/h/_update

{
  "query: { "match_all" : {} }
}

// type of queries
match_all
match
match_phrase
multi_match
common_terms
query_string
exists
range
regex
fuzzy

// data types
keywords
text
term - exact match

//aggrigations
 
```

-- 
## Mapping 

<br/>
<br/>
<br/>

---

## Indexing and retrieval in Elasticsearch

[How indexing and retrieval algorithms work in Elasticsearch](https://youtu.be/fcIzAg63WyI?si=Kv-emLAoUmC2HAOw)

Elasticsearch uses a technique called indexing to build an index out of all the documents that we give it for indexing. Then when we give it a search query, it searches in this index and as a result of this it can return us all the results with extremely low latency

A document is the basic unit of data in Elasticsearch

Elasticsearch builds an [inverted index](#inverted-index). An inverted index is similar to the index you find in the back of a book. It is a data structure that allows for fast full-text search

### The algorithm for creating this index is as follows:
* Elasticsearch is provided with a set of all documents and it will tokenize the contents of each and every document. Tokenize means it will split the text into different words.

* Then it will create a unique set of all these words which will be in sorted order so there will be no repetition of terms only unique terms will be there in this set. The terms in the set will also be normalized. They might be stemmed and various kind of nlp techniques might be applied on it, which is fully configurable by the user. And many stop words might have been removed from this unique set. 

* After that with each term we will associate the list of documents in which those terms are found.




### How the search results are sorted according to relevance.
A few basic terms
* Term frequency (TF) refers to the frequency of a term in a given document. 
* Document frequency (DF) refers to the frequency of a particular term across all documents in the corpus. 
* IDF is the mathematical reciprocal of document frequency. 
* Relevance is just the product of TF and IDF or TF divided by DF. 

<br/>

### Inverted index

The inverted index is typically stored in a data structure optimized for efficient lookups, such as a hash table or a tree.   
In practice, Elasticsearch's inverted index may include additional information such as term frequency, positional information, and optimizations for compression and speed.

Let's consider a simplified example   
Suppose we have three documents:
* Document 1: "The quick brown fox jumps over the lazy dog."
* Document 2: "A brown cat sits next to a sleeping dog."
* Document 3: "The lazy dog is sleeping in the sun."

Inverted Index: 
```js
Term       | Documents
-----------|---------------------------------------------------
a          | 2
brown      | 1, 2
cat        | 2
dog        | 1, 2, 3
fox        | 1
in         | 3
is         | 3
jumps      | 1
lazy       | 1, 3
next       | 2
over       | 1
quick      | 1
sleeping   | 2, 3
sits       | 2
sun        | 3
the        | 1, 3
to         | 2
```

```js
// In practice, Elasticsearch's inverted index may include additional information such as term frequency, positional information, and optimizations for compression and speed.

Term       | Documents                         | TF            | Positions
-----------|-----------------------------------|---------------|---------------------
a          | 2                                 | 2             | 1, 7
brown      | 1, 2                              | 1:1, 2:1     | 3:1, 1:2
cat        | 2                                 | 1             | 2
dog        | 1, 2, 3                           | 1:1, 2:1, 3:2| 5:1, 9:1, 7:1
fox        | 1                                 | 1             | 4
in         | 3                                 | 1             | 1
is         | 3                                 | 1             | 2
jumps      | 1                                 | 1             | 2
lazy       | 1, 3                              | 1:1, 3:1     | 6:1, 1:2
next       | 2                                 | 1             | 3
over       | 1                                 | 1             | 5
quick      | 1                                 | 1             | 2
sleeping   | 2, 3                              | 1:1, 2:1     | 6:1, 3:2
sits       | 2                                 | 1             | 4
sun        | 3                                 | 1             | 5
the        | 1, 3                              | 1:2, 3:1     | 1:1, 7:1, 1:2
to         | 2                                 | 1             | 4

```

Optimizations for compression and speed might involve techniques such as using variable byte encoding for storing integer values, employing dictionary compression for frequently occurring terms, and employing data structures like trie or compressed bitmaps for efficient storage and retrieval of positional information.   

These enhancements provide more detailed information about the occurrences of terms within documents, allowing for more sophisticated search and ranking algorithms in Elasticsearch.


<br/>
<br/>

---

## Can elastic search be used as a primary database?

Interview question at Zype tech round 1:   
Instead of using MongoDB as the primary db and elastic search as the secondary db, why can’t we only use elastic search for both storing data and searching, what is something that is lacking in elastic search as compared to mongodb

While Elasticsearch is indeed a powerful tool for storing and searching data, there are several reasons why it might not be ideal to use it exclusively, especially when compared to MongoDB   

Elasticsearch excels at searching. It offers powerful features like stemming, faceting, and relevancy scoring, making it ideal for complex search queries.

* Data Structure Flexibility - Elasticsearch is more structured around documents and indexing, which might not be as flexible for certain data models   
While Elasticsearch can store data in JSON documents, it enforces a schema on those documents for indexing purposes. This can be less flexible than MongoDB's schema-less approach, which allows for more diverse data structures.

* Transactions and ACID Compliance - Elasticsearch lacks built-in support for transactions and does not provide the same level of data consistency guarantees.

* Complex Query Support - 
While Elasticsearch excels at full-text search and complex queries using its powerful search DSL (Domain Specific Language), MongoDB also offers rich query capabilities, including aggregation pipelines and geospatial queries. Depending on your application's requirements, MongoDB might provide better support for certain types of queries.

* Scalability and Performance: Both MongoDB and Elasticsearch are designed to scale horizontally, but they excel in different use cases. MongoDB is optimized for general-purpose document storage and retrieval, while Elasticsearch is optimized for near real-time search and analytics.

* CRUD operations: MongoDB offers a wider range of functionalities for CRUD (Create, Read, Update, Delete) operations compared to Elasticsearch. Elasticsearch is optimized for search, and updates require reindexing the affected documents.

> Updating documents in elastic search using update_api can be a very expensive operation

### How are documents updated in Elastic search   

Refer - [Elasticsearch anti-patterns and bad practices to be aware of](https://www.youtube.com/watch?v=gWXkAhnYFYw)

Updating a document is a multi stage process   
1. read current _source
1. merge _source with new document
1. index result
1. mark original documet as deleted 
1. Space is freeded up after luciene, the shard holding the document performs a merge

The result of an insert, update or delete operation is immediately visible once the transaction is commited in a relational db
However in elastic search, queries can return old data, even after operation is flushed to disk.
Refresh needs to occur to see visible updates, which is an expensive operation

<br/>
<br/>

### Elasticsearch anti-patterns and bad practices 

Refer - [Elasticsearch anti-patterns and bad practices to be aware of](https://www.youtube.com/watch?v=gWXkAhnYFYw)
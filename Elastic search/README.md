# Elastic Search

## Table of contents


<br/>
<br/>
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

Elasticsearch builds an inverted index. An inverted index is similar to the index you find in the back of a book. It is a data structure that allows for fast full-text search

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



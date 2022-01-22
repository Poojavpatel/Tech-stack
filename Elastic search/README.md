# Elastic Search

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
## Message Queues (Message Brokers)

Architecture of a message queue
* Producers create messages and deliver them to the message queue
* Consumers connect to the queue and subscribe messages from the queue
* Messages placed onto the queue are stored until the consumer acknowledge them
* Message queue provide asynchronous communication protocol
  (one system puts a message onto a message queue and does not require an immediate response to continue processing)
  This way decouples producers from the consumers
 
## Redis (Remote dictionary server)

* Redis is an in-memory key-value data structure store.
* Redis provides data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams
* Redis has built-in replication, Lua scripting, LRU eviction, transactions, and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster
* Redis is very fast as everything is stored in memory, no hardware involved
* Most popular on AWS as complex cloud deployment
* Though redis is an in memory db (ie cache) which is volatile, over the years development has been made in making it persistent by dumping data to the disk asynchronously at intervals

Redis can be used for
* As a database
* Caching
* Session Management
* Message queue (Message Broker)
* Publisher subscriber model

```bash
> set "name" "pooja"
> get "name"

# publisher subscriber model
> subscribe "myStream"                # myStream is the channel name
> publish "myStream" "Hello world"    # send message to the channel from different redis cli in different bash
(integer) 1                           # denotes one message got published, "Hello world" is recieved by the channel
```

## Redis LRU (Cache Eviction Policy)

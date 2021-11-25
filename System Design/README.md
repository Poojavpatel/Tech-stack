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
  what features are expected - upload video, show feed etc
   
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

* Is there any single point of failure in our system? What are we doing to mitigate it?
* Do we have enough replicas of the data so that we can still serve our users if we lose a few servers?
* Do we have enough copies of different services running such that a few failures will not cause a total system shutdown?
* How are we monitoring the performance of our service? Do we get alerts whenever critical components fail or their performance degrades?

# System design basics 

### Key Characteristics of Distributed Systems
* Scalability  -   capability of a system, process, or a network to grow and manage increased demand
* Reliability
* Availability
* Efficiency
* Serviceability or Manageability

### Load Balancing

### Caching

### Data Partitioning

### Indexes

### Proxies

### Redundancy and Replication

### SQL vs. NoSQL

### CAP Theorem

### PACELC Theorem 

### Consistent Hashing

### Long-Polling vs WebSockets vs Server-Sent Events

### Bloom Filters 

### Quorum 

### Leader and Follower 

### Heartbeat

### Checksum
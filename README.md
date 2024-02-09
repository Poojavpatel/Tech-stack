# Tech stack

## Table of contents

**Languages**
- [Node js](Node/README.md)
- [Javascript](Javascript/README.md)
- [Typescript](Typescript/README.md)
- [Python](Python/README.md)
- [Go](Golang/README.md)

**Frontend**
- [React js](React/README.md)
- [Vue js](Vue/README.md)
- [Next js](Nextjs/README.md)

**Databases**
- [Databases](Databases/README.md)
- [SQL](SQL/README.md)
- [Mongo db](Mongodb/README.md)
- [DynamoDB](AWS/DynamoDB.md)
- [Redis](Redis/README.md)
- [Cassandra](Cassandra/README.md)

**Coding styles**
- [TDD](TDD/Readme.md)
- [OOPS](OOPS/README.md)
- [Solid principles](DesignPatterns/README.MD#solid-principles)
- [Design patterns](DesignPatterns/README.MD)
- [DDD](DDD/Implementation/README.md)

**System design**
- [System Design](System%20Design/README.md)
- [Software architecture patterns](SoftwareArchitecture/README.md)
- [Auth](Auth/README.md)

**Web**
- [Browsers,HTTP](Browsers%20Http%20Web/README.md)
- [Jquery and Browser JS](Jquery%20and%20Browser%20JS/README.md)
- [CSS](CSS%20SCSS%20SASS/README.md)

**DevOps**
- [DevOps](DevOps/README.md)
- [AWS](AWS/README.md)
- [Docker](Docker/README.md)

**OS**
- [Linux/Unix](Linux/README.md)

**Computer science fundamentals**
- [CS Fundamentals](ComputerScience/README.md)
- [Auth](Auth/README.md)

**Others**
- [Regex](Regex/README.md)
- [Kafka](Kafka/README.md)
- [Git](Git/README.md)
- [Elastic search](Elastic%20search/README.md)

**Data Science**
- [Data science](DataScience/README.md)

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

---

### Breaking the Myth - Disk access is slow as compared to memory access

https://www.youtube.com/watch?v=UNUz1-msbOM
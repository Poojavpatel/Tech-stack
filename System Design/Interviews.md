# System Design Interviews

## Table of Contents

- [System Design Interviews - Step by step](#system-design-interviews---step-by-step)
  - [Step 1 - Requirements Clarifications](#step-1---requirements-clarifications)
    - [Functional Requirements](#functional-requirements)
    - [Non-Functional Requirements](#non-functional-requirements)
    - [Capacity Estimation](#capacity-estimation)
  - [Step 2 - Defining Data Model](#step-2---defining-data-model)
  - [Step 3 - High-level Design](#step-3---high-level-design)
  - [Step 4 - Detailed Design](#step-4---detailed-design)
  - [Step 5 - Identifying and Resolving Bottlenecks](#step-5---identifying-and-resolving-bottlenecks)
- [Tips and Tricks](#tips-and-tricks)
- [Random Notes](#random-notes)
- [Architecture](#architecture)
- [System Design Examples](#system-design-examples)
  - [Scaling a Local Pizza Shop](#scaling-a-local-pizza-shop)
  - [URL Shortening Service like TinyURL](#url-shortening-service-like-tinyurl)
  - [Design a WhatsApp Chat Messaging System](#design-a-whatsapp-chat-messaging-system)
  - [Design TikTok](#design-tiktok)
  - [Design a B2B Application Used by Retail Stores](#design-a-b2b-application-used-by-retail-stores)

<br/>
<br/>
<br/>

## System Design Interviews - Step by step

### Step 1 - Requirements clarifications

Clarify all these

- #### Functional Requirements
  - what features are expected - upload video, show feed, cater to multiple resolutions, cater to different internet speeds etc
  - **For Functional Requirements, consider analytics too**
  - If you need response **real time/very fast**, call it **Minimal Latency**
- #### Non Functional requirements
  What non functional requirements are expected - high availability, low latency, consistency vs performance, fault tolerence et
- #### Capacity Estimation

  1. What scale is expected from the system (e.g., number of new tweets, number of tweet views, number of timeline generations per sec., etc.)
  1. DAU (Daily active users), Creators ratio
  1. How much storage will we need?
  1. What network bandwidth usage are we expecting? This will be crucial in deciding how we will manage traffic and balance load between servers.

  <br/>

  **Consider Bandwidth estimation, Read/Write ratio, Cache memory estimation too with Traffic estimation, Memory estimation**  
  For traffic estimation, calculate Reads/second, Writes/second

- #### Write conclusions
  Write to read ratio consider when data storage

<br/>

### Step 2 - Defining data model

- List down tables in db and their schemas
- Consider Database design too

```javascript
// Example of db design for URL shortening service

* Store billions of records
* Reads > writes
* No relation among records

// Since we do not need joins, ACID properties, and since horizontal scaling is preferable in this senario
// NoSQL will be a better choice
```

<br/>

> DESIGN A MONOLITH FIRST AND THEN TRY TO BREAK IT

### Step 3 - High-level design

- Design monolith first and then try to break it
- **Ask yourself how will you scale each major service**

<br/>

### Step 4 - Detailed Design

Ask yourself

- How should we partition our data to distribute it to multiple databases?
- Should we try to store all the data of a user on the same database? What issue could it cause?
- How much and at which layer should we introduce cache to speed things up?
- Since users’ timeline will contain the most recent (and relevant) tweets, should we try to store our data so that it is optimized for scanning the latest tweets?
- What components need better load balancing?

- Along with mentioning cache, LB, **Mention cache evection policy, cache invalidation policy, Load balancing algo too**

<br/>

### Step 5 - Identifying and resolving bottlenecks

- Is there any **single point of failure** in our system? What are we doing to mitigate it?
- Do we have enough **replicas** of the data so that we can still serve our users if we lose a few servers?
- Do we have enough **copies of different services running** such that a few failures will not cause a **total system shutdown**?
- How are we **monitoring the performance** of our service? Do we get **alerts** whenever critical components fail or their performance degrades?

<br/>
<br/>
<br/>

---

### Tips and Tricks

- **For Functional Requirements, consider analytics too**
- For Functional Requirements, If you need response **real time/very fast**, call it **Minimal Latency**
- For Capacity Estimation consider **Bandwidth estimation, Read/Write ratio, Cache memory estimation too with Traffic estimation, Memory estimation**
- After basic HDD Ask yourself how will you **scale each major service**
- For traffic estimation, calculate Reads/second, Writes/second
- In Step 2 Defining data model, Consider **Database Design** too
- In Step 4 Detailed Design, Along with mentioning cache, LB, **Mention cache evection policy, cache invalidation policy, Load balancing algo too**

<br/>
<br/>

---

### Random Notes

* Why choose S3

  - Backed by AWS
  - Reliable
  - SLA
  - Can hook up S3 to CDN
  - Since Data is replicated in CDN it prevents a single point of failure
  - Note - S3 is not mutable

* Always save meta data of media in NOSQL databases, as it is more flexible, fast for analysis, Horizontal scalable and you dont have joins

* For media, check if we need to support different resolutions and devices

* Akamai - Akamai is the leading content delivery network (CDN) services provider for media and software delivery, and cloud security solutions.

* Amazon CloudFront is a global content delivery network (CDN) service built for high-speed, low-latency performance, security, and developer ease-of-use.
AWS offers a CDN service called Amazon CloudFront, which integrates seamlessly with S3 to accelerate content delivery.

* If your primary concern is delivering web content (images, videos, scripts) with low latency and high performance, you would typically use a CDN like Akamai or a combination of Amazon S3 and Amazon CloudFront.

* Can i hook up s3 to Akamai? Yes, you can integrate Amazon S3 (Simple Storage Service) with Akamai, and it's a common practice to do so for optimizing content delivery

* Since a modern-day server can have 256GB memory, we can easily fit all the cache into one machine

* Think about Security and Permission

* In a system design review, in addition to development, it’s often a bonus point to call out operation and maintenance, which many candidates neglect

<br/>

---

## Architecture

- Client side interface (usually web app, app, website, etc)
- Client server communication (usually REST, long polling, web sockets, server side if two way communication)
- Server and its microservices
- Introduce queues if req for processing user requests
- Client server communication protocol (usually HTTP over TCP/IP or UDP, FTP)
- Databases  
  (Database Partitioning)
- S3 for static media storage
- Databases replica
- Server to server communication (message queue or REST)
- Load balancers
- Cache

<br/>
<br/>

## System Design Examples

### Scaling a local pizza shop

<br/>
<br/>

### URL Shortening service like TinyURL

https://www.youtube.com/watch?v=zgIyzEEXfiA

(done offline)

<br/>
<br/>

### Design a WhatsApp Chat messaging system design

https://leetcode.com/discuss/interview-question/system-design/1588415/WhatsAppMessaging-Chat-System-Design

<br/>
<br/>

### Design TikTok

https://www.youtube.com/watch?v=07BVxmVFDGY

<br/>
<br/>

### Design a B2B application used by Retail stores

Note : This was asked in system design round by Assembly

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

- For B2B consider Both perspective, To Consumer as well as to bussiness
- When defining schema, specially mention the foreign keys and relations, Eg - product belongs to a company
- When saving payments data / order data, Instead of using product_id forign key, dump product data, as price may change and we want an entry of older price at which it was purchased
- For tables like Order, Payment etc Date Time of transaction is a MUST

## API Design

### Table of Contents
1. [Designing a good API](#desiging-a-good-api)
1. [API rate limiting](#api-rate-limiting)
1. [Put vs Patch](#put-vs-patch)
1. [Before pushing your code to production](#before-pushing-your-code-to-production)


<br/>
<br/>
<br/>

### Designing a good API

https://www.youtube.com/watch?v=_YlYuNMTCc8

https://www.youtube.com/watch?v=_gQaygjm_hg

TODO - Notes from video

<br/>
<br/>

### API rate limiting

https://www.youtube.com/watch?v=YSW3UE5AFD4

TODO - Notes from video

API rate limiting is a strategy used to control the rate at which clients or applications can make requests to an API (Application Programming Interface). It is implemented to prevent abuse, ensure fair usage, and protect the API server from being overwhelmed by a large number of requests. By setting limits on the number of requests a client can make within a specified time frame, API rate limiting helps maintain a balance between resource utilization and availability.



#### Ways to implement API rate limiting

1. Token Bucket   
In this algorithm, clients are assigned tokens at a fixed rate. Each API request consumes a token. When a client runs out of tokens, it must wait until new tokens are replenished.   
Pros: Simple implementation, allows bursts of requests.   
Cons: May not be suitable for scenarios where a smooth rate of requests is required.   

1. Leaky Bucket   
Similar to the token bucket, the leaky bucket algorithm enforces a constant output rate. Requests are added to the "bucket," and if the bucket is full, excess requests are discarded.   
Pros: Predictable and steady rate limiting.   
Cons: May result in discarding excess requests, which might not be suitable for certain use cases.   

1. Fixed Window   
In this approach, a counter is incremented for each request within a fixed time window (e.g., 1 minute). When the counter exceeds the allowed limit, further requests are rejected until the window resets.   
Pros: Simple to implement.   
Cons: Prone to sudden spikes in traffic at the start of each time window.   

1. Sliding Window    
A sliding window log maintains a timestamped log of requests within a time window. By summing up the requests within the window, the rate is calculated and compared against the limit.   
Pros: More accurate representation of recent request patterns.   
Cons: Increased implementation complexity compared to fixed window counter.   

1. Distributed Rate Limiting:   
In distributed systems, rate limiting can be more challenging. A centralized approach may lead to a single point of failure. Distributed rate limiting involves using techniques like consistent hashing or token distribution across nodes to ensure a distributed and scalable solution.


<br/>
<br/>

### Put vs Patch

https://www.youtube.com/watch?v=LJajkjI5RHE

- PUT request performs UPSERT query, ie If resource exists {update it} else {create it}
- For PUT requests, client is suposed to send user_id in req body, and it would upsert it
- user_id cannot be send in url as users/123, as if 123 does not exist it would give a 404
- PUT req <ins>replaces the entire entry with req body sent</ins>, eg you sent req without age, so age would get blank in entry
- PATCH is used when you want to just update a few attributes, Only the fields to be updated are to be sent in req body
- PATCH reduces overhead as client does not have to send all fields in req body

### Before pushing your code to production

* Revisit PRD - Revisit PRD to ensure all edge cases and scenarios are covered in code
* Throughout test cases - ensure all test cases pass before pushing code to production
* Code review - Have peers review code for quality
* Feature release - Use tools like split to release feature for a set of customers, after proper testing open feature to all
* Rollback plan - Have a revert code pipeline or stop script setup 
* Alerting and monitoring - Setup monitoring and alerting setup on datadog
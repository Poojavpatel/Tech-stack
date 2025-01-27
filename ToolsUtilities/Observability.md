## Monitoring

Monitoring 4 golden signals
1. Latency - time it takes for a request to travel from client to server and back
1. Traffic - Number of requests a system receives over a time period
1. Error - Percentage of requests that result into errors (4xx or 5xx status codes)
1. Saturation - Measures resource utilization including CPU, disk space, memory capacity, etc

Limit alerts, if there are too much people will unsubscribe, if they are too little, we will miss on imp alerts

## Observability

3 Pillars observability
1. Logs - chronological record of events
1. Metrics - quantitative measurements that offer a snapshot of systems performance over time
1. Traces - tracks flow of request through multiple systems, and components of systems

Limit logs, have sufficient logs to be able to debug and troubleshoot issues, don't have too many logs that can create confusion and increase storage costs

## Application performance management (APM)



## Observability vs. Monitoring   
https://www.youtube.com/watch?v=vY61h6cSkVA

Observability is a broader concept that includes monitoring

Analogy: Doctor getting a alert when patient heart rate crosses certain limit is monitoring, doctor checks heart rates over last few hours, recommended meds, etc that is observability

There are 3 pillars of observability, now with metrics if you add alerts and dashboards, thats monitoring
1. Logs 
1. Metrics + alerts + dashboard = Monitoring
1. Traces

## Observability vs. Monitoring vs APM
https://www.youtube.com/watch?v=CAQ_a2-9UOI

<br/>
<br/>

## Logging 

In my current Fastify project, deployed via Docker, we’ve added debug and error logs. 
However, accessing these logs in production requires relying on a DevOps person to retrieve them using docker logs, which delays the debugging process. Since our organization avoids using services like CloudWatch to cut costs, I’m looking for a cost-effective or free solution to view logs more efficiently and independently.

1. Use a Centralized Logging System (Self-Hosted)   
You can set up a lightweight, open-source logging stack to centralize and visualize logs from your Fastify app
    1. ELK Stack (Elasticsearch, Logstash, Kibana)
    1. EKK Stack (Elasticsearch, Fluentd/Fluent Bit, Kibana)
    1. Graylog
1. Lightweight Open-Source Tools
    1. Loki + Grafana
    1. Logrotate
1. Stream Logs to a Web-Based Dashboard -    
like Papertrail which gives 50 MB/month of logs in free tier, this is only good for local small projects
1. Host Logs Locally on the Docker Host -    
what we currently do, Logs are stored as JSON files on the Docker host by default
use command `docker logs <container_id> > logs.txt`
1. Write logs to a file - not recommended

<br/>
<br/>

### EFK Stack (Elasticsearch, Fluentd/Fluent Bit, Kibana)

<img src="https://logz.io/wp-content/uploads/2018/06/flow-chart.png" width="60%">

#### Workflow of the EFK Stack
1. Log Collection (Fluentd/Fluent Bit):   
Logs are collected from various sources (e.g., Fastify app, Docker containers, system logs).
The logs are parsed, structured (e.g., JSON), and forwarded to Elasticsearch.
2. Log Storage (Elasticsearch):   
Logs are stored in Elasticsearch as structured documents.
Indexing makes it easy to search and analyze the logs.
3. Log Visualization (Kibana):   
Kibana reads data from Elasticsearch and displays it in an interactive, web-based dashboard.
You can search for specific logs, analyze trends, and set up alerts.

#### Advantages of the EFK Stack
* Cost-Effective: Open-source and free to use (you just need server resources).
* Scalable: Can handle large-scale log volumes.
* Customizable: Add plugins and configure to match your needs.
* Real-Time Monitoring: See logs as they are generated.
* Flexible Log Processing: Fluentd/Fluent Bit allows you to transform logs (e.g., filter sensitive data).

#### My take and notes
https://www.youtube.com/watch?v=HGTBANm0VY4&list=PLdpzxOOAlwvJUIfwmmVDoPYqXXUNbdBmb&index=4

* Lets say you have 3 apps deployed on a kubernetes cluster 
* Fluent Bit is deployed as DaemonSet, ie on each node of kubernetes cluster
* Fluent bit reads logs from pods of kubernetes cluster and forwards the logs to elastic search
* Logs are saved in elastic search db, you can use ebs to take timely snapshots or backup of data, etc
* Kibana is a visualization dashboard to view the logs, you can query as per needs

#### Implementation of the EFK Stack
You need an elastic search cluster setup with nodes

https://github.com/iam-veeramalla/observability-zero-to-hero/tree/main/day-5

You can view logs in kibana as such   
<img src="https://docs.kublr.com/images/logging/95_logs.png" width="80%">
<img src="https://i.ytimg.com/vi/BacBQiTonzU/maxresdefault.jpg" width="80%">

### Why prefer Fluentd over logstash
* Fluentd is a lightweight alternative to Logstash, and works for 99% use cases
* Fluentd is vendor agnostic ie you can use other technologies with it, while logstash can only be used with elastic 

<br/>
<br/>

### Graylog
* Free and open source logging platform
* Easier to set up and use compared to ELK

<img src="https://user-images.githubusercontent.com/14058396/71859320-37c04d80-30cd-11ea-9570-a7b4f01de9d3.png" width="80%">

### Loki + Grafana
<img src="https://www.atatus.com/blog/content/images/2022/02/grafana-loki-work.png" width="80%">

* Unlike Kibana, which primarily focuses on log and event data analysis within the ELK stack, Grafana sets its sights on enhancing monitoring metrics. 
* It particularly supports time-series data visualization from various data sources such as InfluxDB, OpenTSDB, and Prometheus


Grafana Explained in Under 5 Minutes   
https://www.youtube.com/watch?v=lILY8eSspEo

<br/>
<br/>

#### EFK Stack vs Loki Grafana
ELK advantages   
* If your use case requires complex log queries, such as full-text search, aggregations, and filtering across large datasets, EFK excels.
* Ideal for debugging issues where finding specific logs across multiple services or timelines is crucial
* EFK is well-suited for applications with high log volumes (e.g., enterprise applications or microservices ecosystems).
* Elasticsearch can handle large amounts of data and offers advanced indexing
* If you need to collect and correlate logs from various sources (e.g., application logs, system logs, network logs), Fluentd/Fluent Bit offers a rich plugin ecosystem to handle diverse log formats and protocols

ELK disadvantages   
* Resource-Intensive: Elasticsearch can consume significant memory and CPU
* Setup Complexity: Requires proper configuration and maintenance for Fluentd, Elasticsearch, and Kibana.
* Storage Costs: Elasticsearch indexes logs, which can take up significant disk space
* Use EFK When you have DevOps expertise to manage the stack

Loki advantages
* If your main goal is to view logs in a structured way without needing advanced indexing or full-text search, Loki is perfect
* Loki stores logs in a highly compressed format and doesn’t index the content, making it much lighter
* Loki works seamlessly with Grafana, so you can correlate logs with metrics (e.g., CPU, memory, request rates)
* Suitable for smaller systems or applications with moderate log volumes
* Loki is easier to set up compared to EFK, with fewer moving parts. You just need Loki and Grafana, and logs can be pushed directly from your application or Docker

Loki disadvantages
* Limited Search Capabilities: Loki doesn’t offer full-text search; it focuses on log streams and labels.
* No Advanced Analytics: Not suitable for cases where you need in-depth log analysis or aggregations.
* Smaller Ecosystem: Fewer plugins and integrations compared to Fluentd

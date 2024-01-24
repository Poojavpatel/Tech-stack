# DynamoDB

DynamoDB, short for Amazon DynamoDB, is a fully managed NoSQL database service provided by Amazon Web Services (AWS). 
* It is designed to provide fast and predictable performance with seamless scalability.
* DynamoDB is particularly well-suited for applications that require low-latency and high-throughput access to data, and where the data patterns may evolve over time.

### Key features of DynamoDB

1. Managed Service: DynamoDB is a fully managed service, which means that AWS handles administrative tasks such as hardware provisioning, setup, configuration, monitoring, and maintenance, allowing developers to focus on building applications.

1. NoSQL Database: DynamoDB is a NoSQL database, which means it does not rely on a traditional relational database management system (RDBMS) structure. Instead, it uses a key-value and document data model, making it flexible and schema-less.

1. Scalability: DynamoDB can scale horizontally to handle increasing workloads and storage requirements. You can easily increase or decrease the throughput capacity of a DynamoDB table with a few clicks in the AWS Management Console or through API calls.

1. Low-Latency Performance: It provides low-latency performance, making it suitable for applications that require fast and responsive data access.

1. Consistency Models: DynamoDB offers two consistency models: eventually consistent reads and strongly consistent reads. Developers can choose the consistency level that best suits their application requirements.

1. Global Tables: DynamoDB supports global tables, allowing you to replicate your data across multiple AWS regions for improved availability and fault tolerance.

### DynamoDB Streams

DynamoDB Streams is a feature of Amazon DynamoDB that captures and provides a time-ordered sequence of changes made to items in a DynamoDB table. It enables real-time streaming of these modifications, allowing developers to trigger custom actions, maintain data history, and integrate with other AWS services for event-driven architectures.   

    
Developers can use DynamoDB Streams to maintain an audit trail of changes to items in a table. This can be useful for scenarios where you need to track changes over time or perform forensic analysis.   

DynamoDB Streams operates asynchronously, meaning that it doesn't impact the performance of read and write operations on the DynamoDB table.

DynamoDB Streams can be integrated with various AWS services, such as AWS Lambda, Amazon Kinesis, and Amazon Simple Notification Service (SNS). This allows you to trigger custom business logic or analytics based on changes to the DynamoDB table.

#### Trigger Lambda from Dynamodb stream
[Configure an AWS Lambda function to run in response to a change in an Amazon DynamoDB table](../SoftwareArchitecture//README.md#dynamodb-streams)
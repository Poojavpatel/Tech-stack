# Amazon Web Services

Amazon Web Services (AWS) is a secure cloud services platform, offering compute power, database storage, content delivery and other functionality to help businesses scale and grow.
   
In simple words AWS allows you to do the following things-
* Running web and application servers in the cloud to host dynamic websites.
* Securely store all your files on the cloud so you can access them from anywhere.
* Using managed databases like MySQL, PostgreSQL, Oracle or SQL Server to store information.
* Deliver static and dynamic files quickly around the world using a Content Delivery Network (CDN).
* Send bulk email to your customers.

## Compute
* <ins>EC2 (Elastic Compute Cloud)</ins> — **These are just the virtual machines in the cloud on which you have the OS level control. You can run whatever you want in them.**
* <ins>Lambda</ins> — AWS’s serverless technology that allows you to run functions in the cloud. It’s a huge cost saver as you pay only when your functions execute.
* LightSail — If you don’t have any prior experience with AWS this is for you. It automatically deploys and manages compute, storage and networking capabilities required to run your applications.
* ECS (Elastic Container Service) — It is a highly scalable container service to allows you to run Docker containers in the cloud.
* EKS (Elastic Container Service for Kubernetes) — Allows you to use Kubernetes on AWS without installing and managing your own Kubernetes control plane. It is a relatively new service.
* Batch — It enables you to easily and efficiently run batch computing workloads of any scale on AWS using Amazon EC2 and EC2 spot fleet.
* Elastic Beanstalk — Allows automated deployment and provisioning of resources like a highly scalable production website.

## Storage
* <ins>S3 (Simple Storage Service)</ins> — Storage service of AWS in which we can store objects like files, folders, images, documents, songs, etc. It cannot be used to install software, games or Operating System.
* EFS (Elastic File System) — Provides file storage for use with your EC2 instances. It uses NFSv4 protocol and can beused concurrently by thousands of instances.
* Glacier — It is an extremely low-cost archival service to store files for a long time like a few years or even decades.
* Storage Gateway — It is a virtual machine that you install on your on-premise servers. Your on-premise data can be backed up to AWS providing more durability.

## Databases
* RDS (Relational Database Service) — Allows you to run relational databases like MySQL, MariaDB, PostgreSQL, Oracle or SQL Server. These databases are fully managed by AWS like installing antivirus and patches.
* DynamoDB — It is a highly scalable, high-performance NoSQL database. It provides single-digit millisecond latency at any scale.
* Elasticache — It is a way of caching data inside the cloud. It can be used to take load off of your database by caching most frequent queries.
* Neptune — It has been launched recently. It is a fast, reliable and scalable graph database service.
* RedShift — It is AWS’s data warehousing solution that can be used to run complex OLAP queries.

## Networking & Content Delivery
* <ins>CloudFront</ins> -It is AWS’s Content Delivery Network (CDN) that consists of Edge locations that cache resources.
* VPC (Virtual Private Cloud) — It is simply a data center in the cloud in which you deploy all your resources. It allows you to better isolate your resources and secure them.
* Route53 — It is AWS’s highly available DNS (Domain Name System) service. You can register domain names through it.
* Direct Connect — Using it you can connect your data center to an Availability zone using a high speed dedicated line.
* API Gateway — Allows you to create, store and manage APIs at scale.

## Management Tools
* <ins>CloudWatch</ins> — It can be used to monitor AWS environments like CPU utilization of EC2 and RDS instances and trigger alarms based on different metrics.
* CloudFormation — It is a way of turning infrastructure into the cloud. You can use templates to provision a whole production environment in minutes.
* CloudTrail — A way of auditing AWS resources. It logs all changes and API calls made to AWS.

<br/>
<br/>
<br/>

* Reference - [What is AWS and What can you do with it](https://blog.usejournal.com/what-is-aws-and-what-can-you-do-with-it-395b585b03c)
# AWS

## Table of contents
- [Amazon Web Services](#amazon-web-services)
- [AWS Services](#aws-services)
    - [Essentials](#essentials)
      - [IAM (Identity and Access Management)](#iam-identity-and-access-management)
      - [Cognito](#cognito)
      - [Secrets Manager](#secrets-manager)
      - [Systems Manager Parameter Store](#systems-manager-parameter-store)
      - [Elastic Compute Cloud (EC2)](#elastic-compute-cloud-ec2)
      - [Lambda](#lambda)
      - [S3 (Simple Storage Service)](#s3-simple-storage-service)
      - [DocumentDB](#documentdb)
      - [CloudWatch](#cloudwatch)
      - [SQS (Simple Queue Service)](#sqs-simple-queue-service)
  - [Compute](#compute)
    - [Elastic Compute Cloud (EC2)](#elastic-compute-cloud-ec2)
    - [Lambda](#lambda)
    - [Elastic Beanstalk](#elastic-beanstalk)
    - [LightSail](#lightsail)
  - [Storage](#storage)
    - [S3 (Simple Storage Service)](#s3-simple-storage-service)
  - [Databases](#databases)
    - [RDS (Relational Database Service)](#rds-relational-database-service)
    - [DynamoDB](#dynamodb)
    - [DocumentDB](#documentdb)
    - [Elasticsearch](#elasticsearch)
    - [Elasticache](#elasticache)
    - [Timestream](#timestream)
    - [Neptune](#neptune)
    - [RedShift](#redshift)
  - [Notification and Messaging Services](#notification-and-messaging-services)
    - [SQS (Simple Queue Service)](#sqs-simple-queue-service)
    - [SNS (Simple Notification Service)](#sns-simple-notification-service)
    - [SES (Simple Email Service)](#ses-simple-email-service)
  - [Networking & Content Delivery](#networking--content-delivery)
    - [CloudFront](#cloudfront)
    - [VPC (Virtual Private Cloud)](#vpc-virtual-private-cloud)
      - [AWS PrivateLink](#aws-privatelink)
    - [Amazon Route53](#amazon-route53)
    - [Direct Connect](#direct-connect)
    - [API Gateway](#api-gateway)
  - [Monitoring and Management Tools](#monitoring-and-management-tools)
    - [CloudWatch](#cloudwatch)
    - [Auto Scaling](#auto-scaling)
    - [CloudFormation](#cloudformation)
    - [CloudTrail](#cloudtrail)
  - [Container Services](#container-services)
    - [Elastic Container Registry (ECR)](#elastic-container-registry-ecr)
    - [Elastic Container Service (ECS)](#elastic-container-service-ecs)
    - [Elastic Kubernetes Service (EKS)](#elastic-kubernetes-service-eks)
  - [AI and Machine Learning Services](#ai-and-machine-learning-services)
    - [Rekognition](#rekognition)
- [Availability Zone (AZ)](#availability-zone-az)
   - [Zones vs regions](#should-i-deploy-across-two-regions-or-two-zones-within-same-region)
   - [Load balancing in Zones vs regions](#load-balancing-between-regions-and-availability-zones)
- [Elastic Block Store (EBS)](#elastic-block-store-ebs)
- [EC2 vs ECS vs EKS vs Lambda](#ec2-vs-ecs-vs-eks-vs-lambda)
- [ETCD](#etcd)
- [What is Kubernetes?](#what-is-kubernetes)


---

## Amazon Web Services

Reference - [What is AWS and What can you do with it](https://blog.usejournal.com/what-is-aws-and-what-can-you-do-with-it-395b585b03c)   
Amazon Web Services (AWS) is a secure cloud services platform, offering compute power, database storage, content delivery and other functionality to help businesses scale and grow.
   
In simple words AWS allows you to do the following things-
* Running web and application servers in the cloud to host dynamic websites.
* Securely store all your files on the cloud so you can access them from anywhere.
* Using managed databases like MySQL, PostgreSQL, Oracle or SQL Server to store information.
* Deliver static and dynamic files quickly around the world using a Content Delivery Network (CDN).
* Send bulk email to your customers.

---
## AWS Services

Refer - https://www.youtube.com/watch?v=JIbIYCM48to

## Essentials
### IAM (Identity and Access Management)

Manages access to AWS services and resources securely.
### Cognito

Identity management for web and mobile applications.

### Secrets Manager
AWS Secrets Manager is specifically designed for storing, managing, and retrieving sensitive information such as API keys, database passwords, and other secrets. It enables you to rotate, manage, and retrieve database credentials, API keys, and other secrets throughout their lifecycle.

### Systems Manager Parameter Store
Use AWS Systems Manager Parameter Store to store configuration data and secrets, including environment variables. Parameter Store allows you to securely store and manage configuration information such as database connection strings, API keys, and other sensitive data.

## Compute

### Elastic Compute Cloud (EC2)
Virtual servers in the cloud


### Lambda
AWS’s serverless technology that allows you to run functions in the cloud. It’s a huge cost saver as you pay only when your functions execute.
Serverless compute service that runs code in response to events

### Elastic Beanstalk
Platform as a Service (PaaS) for deploying and managing applications.   
Allows automated deployment and provisioning of resources like a highly scalable production website.

https://www.youtube.com/watch?v=uiM1xzOX8Qg

### LightSail
Simplified compute instances with pre-configured templates.   
If you don’t have any prior experience with AWS this is for you. It automatically deploys and manages compute, storage and networking capabilities required to run your applications.


## Storage
### S3 (Simple Storage Service)
Storage service of AWS in which we can store objects like files, folders, images, documents, songs, etc. It cannot be used to install software, games or Operating System.

<!-- ### EFS (Elastic File System)
Provides file storage for use with your EC2 instances. It uses NFSv4 protocol and can beused concurrently by thousands of instances.
### Glacier
It is an extremely low-cost archival service to store files for a long time like a few years or even decades.
### Storage Gateway
It is a virtual machine that you install on your on-premise servers. Your on-premise data can be backed up to AWS providing more durability. -->

## Databases
### RDS (Relational Database Service)
Allows you to run relational databases like MySQL, MariaDB, PostgreSQL, Oracle or SQL Server. These databases are fully managed by AWS like installing antivirus and patches.
### DynamoDB
It is a highly scalable, high-performance NoSQL database. It provides single-digit millisecond latency at any scale.   
[DynamoDB](./DynamoDB.md)
### DocumentDB
This is exactly like mongodb just a different name   
Managed NoSQL database service compatible with MongoDB

### Elasticsearch
Managed Elasticsearch service.
### Elasticache
This is redis on cloud   
It is a way of caching data inside the cloud. It can be used to take load off of your database by caching most frequent queries.
### Timestream
Fully managed, serverless time-series database.
### Neptune
It has been launched recently. It is a fast, reliable and scalable graph database service.
### RedShift
It is AWS’s data warehousing solution that can be used to run complex OLAP queries.

## Notification and Messaging Services
### SQS (Simple Queue Service)
Managed message queue service for decoupling the components of a cloud application.

### SNS (Simple Notification Service)

Fully managed messaging service.
### SES (Simple Email Service)

Email sending and receiving service.

## Networking & Content Delivery

### CloudFront
It is AWS’s Content Delivery Network (CDN) that consists of Edge locations that cache resources.

<br/>

### VPC (Virtual Private Cloud)
A Virtual Private Cloud (VPC) is a logically isolated section of the Amazon Web Services (AWS) cloud where you can launch AWS resources in a virtual network that you define. It provides a way to logically isolate and segment your AWS infrastructure, allowing you to create a private and secure environment for your resources

VPCs provide a flexible and scalable foundation for deploying and managing AWS resources. They are a fundamental building block for creating secure, isolated, and customized network environments within the AWS cloud.

#### Key features and components of AWS VPC include:

1. Isolation: A VPC provides network isolation for your resources, allowing you to create a private and controlled environment. You can define IP address ranges, subnets, and route tables within the VPC.

1. Subnets: You can divide your VPC into subnets, each associated with a specific availability zone in a region. Subnets allow you to organize and group resources, and they are fundamental to achieving fault tolerance and high availability.

1. IP Addressing: You have control over the IP address range of your VPC, allowing you to define the IP address space according to your needs. You can also create subnets within the VPC with their own IP address ranges.

1. Routing Tables: VPCs use route tables to determine where network traffic is directed. You can create and customize route tables to control the flow of traffic between subnets and to external networks.

1. Internet Gateway: An internet gateway allows resources within the VPC to access the internet and vice versa. It facilitates communication between instances in the VPC and the internet.

1. Security Groups and Network Access Control Lists (NACLs): Security groups and NACLs provide security at the instance and subnet level. Security groups act as firewalls at the instance level, while NACLs operate at the subnet level, controlling inbound and outbound traffic.

1. VPN Connections and Direct Connect: VPCs support virtual private network (VPN) connections and AWS Direct Connect, enabling secure communication between your on-premises data center and resources within the VPC.

1. Elastic Load Balancing (ELB): You can deploy Elastic Load Balancers within your VPC to distribute incoming traffic across multiple instances for increased availability and fault tolerance.

1. VPC Endpoints: VPC endpoints allow you to privately connect your VPC to supported AWS services without requiring internet access. This enhances security and reduces data transfer costs.

1. Peering: VPC peering enables direct communication between VPCs, allowing resources in different VPCs to communicate with each other as if they were on the same network.
   

#### AWS PrivateLink

AWS PrivateLink is a service that enables you to access services over an Amazon VPC (Virtual Private Cloud) endpoint rather than over the public internet. This enhances security, improves performance, and simplifies network architectures. PrivateLink provides a way to connect your VPC directly to supported AWS services or to your own services hosted on AWS without traversing the internet.
It is particularly useful for scenarios where data privacy, security, and compliance are top priorities.

Key features of AWS PrivateLink:


1. Private Connectivity:   
PrivateLink allows you to create a private connection between your VPC and AWS services without exposing the traffic to the public internet.

1. VPC Endpoints:   
A VPC endpoint is an entry point in your VPC that enables you to privately access supported AWS services. These endpoints are powered by AWS PrivateLink.

1. Secure and Efficient:   
Traffic between your VPC and the AWS service travels over the Amazon network backbone, providing a highly secure and efficient connection.

1. Service Availability:   
Various AWS services, such as Amazon S3, Amazon DynamoDB, AWS Lambda, and more, offer support for AWS PrivateLink. This allows you to access these services privately.

1. Own Services Integration:   
If you host your own services on AWS, you can configure them to be accessed privately by other VPCs or accounts using AWS PrivateLink.

1. Regional Service:   
AWS PrivateLink is a regional service, meaning that the VPC endpoint and the service must be in the same AWS region.

1. DNS Resolution:   
AWS PrivateLink uses its own DNS resolution, which means that the endpoints are accessed by resolving to private IP addresses within your VPC.


Interview Question    
How can a lambda communicate with a VPC?    
In AWS, Lambda functions can communicate with a Virtual Private Cloud (VPC) through a feature called VPC integration
Associate the Lambda function with a specific VPC during creation or configuration   
Specify the subnets within the chosen VPC where the Lambda function should run   
Define a security group for the Lambda function to control inbound and outbound traffic   
Ensure the Lambda function's execution role has the necessary permissions to interact with resources within the VPC   

[In user service how do I verify request came from auth service and not malicious source](../Auth/README.md#interview-questions-related-to-jwt)

<br/>

### Amazon Route53
It is AWS’s highly available DNS (Domain Name System) service. You can register domain names through it.

Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service. It is designed to give developers and businesses an extremely reliable and cost effective way to route end users to Internet applications by translating names like www.example.com into the numeric IP addresses like 192.0.2.1 that computers use to connect to each other. Amazon Route 53 is fully compliant with IPv6 as well.

Amazon Route 53 effectively connects user requests to infrastructure running in AWS – such as Amazon EC2 instances, Elastic Load Balancing load balancers, or Amazon S3 buckets – and can also be used to route users to infrastructure outside of AWS. You can use Amazon Route 53 to configure DNS health checks, then continuously monitor your applications’ ability to recover from failures and control application recovery with Route 53 Application Recovery Controller.

Amazon Route 53 can also be used as a [load balancer between two AWS regions](#between-two-regions)


### Direct Connect
Using it you can connect your data center to an Availability zone using a high speed dedicated line.
### API Gateway
Allows you to create, store and manage APIs at scale.

## Monitoring and Management Tools
### CloudWatch 
It can be used to monitor AWS environments like CPU utilization of EC2 and RDS instances and trigger alarms based on different metrics.
### Auto Scaling
Automatically adjusts the number of EC2 instances based on demand.
### CloudFormation 
It is a way of turning infrastructure into the cloud. You can use templates to provision a whole production environment in minutes.
### CloudTrail 
A way of auditing AWS resources. It logs all changes and API calls made to AWS.

## Container Services
### Elastic Container Registry (ECR) 
is a fully managed Docker container registry.
### Elastic Container Service (ECS)
Highly scalable container service for Docker containers.
### Elastic Kubernetes Service (EKS)
Managed Kubernetes service.

https://www.youtube.com/watch?v=NA2YZJw09fs

## AI and Machine Learning Services
### Rekognition:
Image and video analysis service.



<br/>
<br/>

---

## Availability Zone (AZ)
   
An AWS Availability Zone (AZ) is essentially a data center or a cluster of data centers operated by Amazon Web Services (AWS). Each Availability Zone is isolated from others, but they are all within the same geographical region

AWS Regions consist of multiple Availability Zones, and each Availability Zone is identified by a unique name within that region (e.g., us-east-1a, us-east-1b)   

Each Availability Zone is designed to be isolated from failures in other Availability Zones, providing redundancy and high availability for AWS services and applications. 

**What it Looks Like:**   
Picture it like different buildings within a city. Each building (Availability Zone) has its own infrastructure, power supply, and networking facilities. However, they are close enough to be part of the same city (AWS region).

### Key features of an Availability Zone :
* Redundant Infrastructure: Each Availability Zone is equipped with its own power, cooling, and networking infrastructure. This ensures that if one data center experiences a failure, the others can continue to operate independently.

* Low Latency Connectivity: Availability Zones within a region are connected through low-latency links, allowing for fast and reliable communication between them.

* Fault Isolation: The isolation of Availability Zones helps prevent correlated failures. For example, if there is a power outage in one Availability Zone, it should not affect the others.

* High Availability: Deploying applications and resources across multiple Availability Zones enhances the availability and fault tolerance of your architecture. AWS customers can distribute their applications across multiple Availability Zones to achieve higher reliability.

### Should I deploy across two regions or two zones within same region?

The decision between deploying your application across different regions (e.g., US-East and Asia-India) or within the same region across different Availability Zones (e.g., us-east-1a and us-east-1b) depends on your specific requirements, including factors such as latency, data sovereignty, disaster recovery, and cost considerations.

**Considerations:**

1. Global User Base   
If your user base is distributed globally, deploying in multiple regions may be necessary to provide optimal performance for all users

1. Compliance and Regulatory Requirements   
Ensure that your deployment aligns with any compliance or regulatory requirements relevant to your industry

1. Cost Analysis   
Evaluate the cost implications of data transfer, infrastructure, and resource utilization for both deployment options

**Deploying Across Different Regions**   
Pros   
1. If you have a global user base, deploying in the region closest to your end-users can significantly reduce latency
1. Some applications need to comply with data sovereignty regulations, and deploying in specific regions can help meet those requirements
1. Provides a higher level of disaster recovery by having resources in geographically separated locations   

Cons   

1. If your application requires communication between regions, there might be higher latency compared to communication within the same region
1. Managing resources across different regions introduces additional complexity in terms of networking, data synchronization, and application architecture
1. Data transfer costs between regions may be higher compared to data transfer within the same region

### Load balancing between regions and availability zones
AWS Elastic Load Balancers (ELBs) can distribute traffic across multiple Availability Zones within a single region, but they are not designed to distribute traffic across different regions.   
Each Elastic Load Balancer is associated with a specific region and operates within that region's network boundary   

#### Between two zones within same region
* AWS ELBs, such as the Application Load Balancer (ALB) and Network Load Balancer (NLB), are region-specific.
* You can configure an ELB to distribute incoming traffic across multiple instances or resources in different Availability Zones within the same region.

#### Between two regions   
If you have resources deployed in different regions, you would typically use DNS-based global load balancing solutions or application-level mechanisms to distribute traffic among those regions.   
For distributing traffic across different regions, AWS offers the following services   
* [Amazon Route 53](#amazon-route53)   
While not a load balancer in the traditional sense, Route 53 is AWS's scalable and highly available Domain Name System (DNS) web service.   
Route 53 supports various routing policies, including Latency-Based Routing and Geolocation Routing, which allow you to direct traffic to different regions based on factors such as user latency or geographic location.

* AWS Global Accelerator   
AWS Global Accelerator is a service that uses Anycast IP addresses to route traffic over the AWS global network to optimal AWS endpoint locations.

<br/>
<br/>



---

## Elastic Block Store (EBS)

AWS Elastic Block Store (EBS) is Amazon's block-level storage solution used with the EC2 cloud service to store persistent data. This means that the data is kept on the AWS EBS servers even when the EC2 instances are shut down.
<br/>
EBS volumes are limited to 1 TB and can be attached to only a single EC2 instance. If you want to use the same EBS volume on multiple EC2 instances, you will have to replicate the EBS volume and attach the replicas to the other instances

<br/>
<br/>


---

## EC2 vs ECS vs EKS vs Lambda

<br/>
<br/>

---

## ETCD 

Note : ETCD is not a service of AWS; however, it is a crucial component in many systems and platforms, including Kubernetes, which can be run on AWS

A distributed, reliable key-value store for the most critical data of a distributed system   

It is often associated with container orchestration platforms like Kubernetes, where it is used to store configuration data, metadata, and other essential information.

ETCD is a strongly consistent, distributed key-value store that provides a reliable way to store data that needs to be accessed by a distributed system or cluster of machines. It gracefully handles leader elections during network partitions and can tolerate machine failure, even in the leader node

<br/>
<br/>



---

## What is kubernetes ? 
Kubernetes is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation.    
It has a large, rapidly growing ecosystem. Kubernetes services, support, and tools are widely available

* What is CM in Kubernetes?   
Configuration management with Containers | Kubernetes

* What is CCM in Kubernetes?   
The cloud controller manager lets you link your cluster into your cloud provider's API, and separates out the components that interact with that cloud platform from components that only interact with your cluster



<!-- Kubernetes  and Node Components :- 
     


 

kube-apiserver:-
The API server is a component of the Kubernetes control plane that exposes the Kubernetes API. The API server is the front end for the Kubernetes control plane.

The main implementation of a Kubernetes API server is kube-apiserver. kube-apiserver is designed to scale horizontally—that is, it scales by deploying more instances. You can run several instances of kube-apiserver and balance traffic between those instances.

etcd :-
Consistent and highly-available key value store used as Kubernetes' backing store for all cluster data.

If your Kubernetes cluster uses etcd as its backing store, make sure you have a back up plan for those data.

You can find in-depth information about etcd in the official documentation.

kube-scheduler:-
Control plane component that watches for newly created Pods with no assigned node, and selects a node for them to run on.

Factors taken into account for scheduling decisions include: individual and collective resource requirements, hardware/software/policy constraints, affinity and anti-affinity specifications, data locality, inter-workload interference, and deadlines.

kube-controller-manager:-
Control plane component that runs controller processes.

Logically, each controller is a separate process, but to reduce complexity, they are all compiled into a single binary and run in a single process.

Some types of these controllers are:

Node controller: Responsible for noticing and responding when nodes go down.

Job controller: Watches for Job objects that represent one-off tasks, then creates Pods to run those tasks to completion.

Endpoints controller: Populates the Endpoints object (that is, joins Services & Pods).

Service Account & Token controllers: Create default accounts and API access tokens for new namespaces.

cloud-controller-manager:- 
A Kubernetes control plane component that embeds cloud-specific control logic. The cloud controller manager lets you link your cluster into your cloud provider's API, and separates out the components that interact with that cloud platform from components that only interact with your cluster.

The cloud-controller-manager only runs controllers that are specific to your cloud provider. If you are running Kubernetes on your own premises, or in a learning environment inside your own PC, the cluster does not have a cloud controller manager.

As with the kube-controller-manager, the cloud-controller-manager combines several logically independent control loops into a single binary that you run as a single process. You can scale horizontally (run more than one copy) to improve performance or to help tolerate failures.

The following controllers can have cloud provider dependencies:

Node controller: For checking the cloud provider to determine if a node has been deleted in the cloud after it stops responding

Route controller: For setting up routes in the underlying cloud infrastructure

Service controller: For creating, updating and deleting cloud provider load balancers

Node Components
Node components run on every node, maintaining running pods and providing the Kubernetes runtime environment.

kubelet:-
An agent that runs on each node in the cluster. It makes sure that containers are running in a Pod.

The kubelet takes a set of PodSpecs that are provided through various mechanisms and ensures that the containers described in those PodSpecs are running and healthy. The kubelet doesn't manage containers which were not created by Kubernetes.

kube-proxy:- 
kube-proxy is a network proxy that runs on each node in your cluster, implementing part of the Kubernetes Service concept.

kube-proxy maintains network rules on nodes. These network rules allow network communication to your Pods from network sessions inside or outside of your cluster.

kube-proxy uses the operating system packet filtering layer if there is one and it's available. Otherwise, kube-proxy forwards the traffic itself.

---

what is aws ecr
Amazon Elastic Container Registry (Amazon ECR) is an AWS managed container image registry service that is secure, scalable, and reliable.

What is ECR and ECS in AWS?

Amazon ECR is integrated with Amazon ECS, allowing you to easily store, run, and manage container images for applications running on Amazon ECS. All you need to do is specify the Amazon ECR repository in your task definition and Amazon ECS will retrieve the appropriate images for your applications.

What is EC2 and ECR?
Amazon Elastic Container Registry (Amazon ECR) is an Amazon Web Service (AWS) product that stores, manages and deploys Docker images, which are managed clusters of Amazon EC2 instances.
 -->

# Amazon Web Services
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

---

## Availability Zone (AZ) in AWS


An Availability Zone (AZ) is one or more discrete data centers with redundant power, networking, and connectivity in an AWS Region.

<br/>
<br/>

---

## Elastic Beanstalk

https://www.youtube.com/watch?v=uiM1xzOX8Qg


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


## Amazon Elastic Kubernetes Service (EKS)
Managed Kubernetes Service

https://www.youtube.com/watch?v=NA2YZJw09fs


<br/>
<br/>

---

## EC2 vs ECS vs EKS vs Lambda

<br/>
<br/>

---

## ETCD 

A distributed, reliable key-value store for the most critical data of a distributed system

* etcd is a strongly consistent, distributed key-value store that provides a reliable way to store data that needs to be accessed by a distributed system or cluster of machines. It gracefully handles leader elections during network partitions and can tolerate machine failure, even in the leader node

<br/>
<br/>

---

## Amazon Route 53

Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service. It is designed to give developers and businesses an extremely reliable and cost effective way to route end users to Internet applications by translating names like www.example.com into the numeric IP addresses like 192.0.2.1 that computers use to connect to each other. Amazon Route 53 is fully compliant with IPv6 as well.

Amazon Route 53 effectively connects user requests to infrastructure running in AWS – such as Amazon EC2 instances, Elastic Load Balancing load balancers, or Amazon S3 buckets – and can also be used to route users to infrastructure outside of AWS. You can use Amazon Route 53 to configure DNS health checks, then continuously monitor your applications’ ability to recover from failures and control application recovery with Route 53 Application Recovery Controller.

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


What is kubernetes ? 
            Kubernetes is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. It has a large, rapidly growing ecosystem. Kubernetes services, support, and tools are widely available

Kubernetes  and Node Components :- 
     


 

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
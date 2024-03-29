# DevOps

## Table of contents

- [Roadmap to learn DevOps](#roadmap-to-learn-devops)
- [Cloud Computing](#cloud-computing)
  - [Cloud computing services categories](#cloud-computing-services-categories)
  - [IAAS](#infrastructure-as-a-service-iaas)
  - [PAAS](#platform-as-a-service-paas)
  - [SAAS](#software-as-a-service-saas)
- [Ansible](#ansible)

<br/>
<br/>

### Roadmap to learn DevOps
Basics   
1. Understand how devops fits in SDLC
1. Linux OS
1. Basic Linux shell commands  
1. Resource management Linux shell commands  
1. Virtualization
1. Shell scripting
1. Version control (Git)
1. CI/CD
1. CI tools (Jenkins, Github actions)
1. Configuration management ([Ansible](#ansible))
1. Ansible playbooks

Good to learn    
1. Infrastructure automation using Terraform
1. Terraform scripts
1. Containerization
1. Docker
1. Kubernetes

Advance 
1. Monitoring
1. Kubernetes projects
1. Cloud platforms AWS/Azure

<br/>
<br/>

## Cloud Computing

Cloud computing is a technology model that enables on-demand access to a shared pool of computing resources, such as servers, storage, networking, and services, over the internet.  

Instead of owning and maintaining physical hardware, users can leverage scalable and flexible resources provided by cloud service providers.   

This approach allows for cost-effective, on-the-fly provisioning of resources, and it supports various applications, services, and workloads without the need for significant upfront investments in infrastructure.

### Cloud computing services categories

<img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F6bdb5c72-770d-4175-92e0-93a90bad32da_1600x977.jpeg" width="50%" />

Refer - https://blog.bytebytego.com/p/what-is-sso-episode-7



### Infrastructure as a Service (IaaS)

IaaS provides virtualized computing resources over the internet. It includes virtual machines, storage, and networking

Users can rent virtualized hardware and infrastructure, allowing them to deploy and run their own software, applications, and operating systems.

Examples: 
* Microsoft Azure Virtual Machines
* Google Compute Engine
* IBM Cloud Virtual Servers
* DigitalOcean
* Amazon EC2 (Elastic Compute Cloud)
* Amazon S3 (Simple Storage Service)
* Amazon RDS (Relational Database Service)
* Amazon VPC (Virtual Private Cloud)
* Amazon EBS (Elastic Block Store)
* Amazon ELB (Elastic Load Balancer)
* Amazon Route 53 (Domain Name System)
* Amazon DynamoDB (NoSQL Database)
* Amazon Glacier (Low-cost Storage)
* Amazon SQS (Simple Queue Service)

### Platform as a Service (PaaS)

PaaS provides a higher-level platform that includes not only the infrastructure but also development tools, middleware, and services to help developers build, deploy, and manage applications.

Developers can focus on coding and application development without worrying about managing the underlying infrastructure. PaaS abstracts away complexities, making it easier to develop, test, and deploy applications. 

Examples:
* Heroku
* Google App Engine
* Microsoft Azure App Service
* Red Hat OpenShift
* IBM Cloud Foundry
* SAP Cloud Platform
* AWS Elastic Beanstalk
* AWS Lambda
* AWS App Runner
* AWS CodePipeline
* AWS CodeBuild
* AWS CodeDeploy
* AWS Step Functions
* Amazon API Gateway
* AWS Elastic Container Service (ECS)
* AWS Elastic Kubernetes Service (EKS)

### Software as a Service (SaaS)

SaaS delivers fully developed and ready-to-use software applications over the internet.

Users can access and use software applications through a web browser without the need for installation or maintenance. SaaS providers handle software updates, security, and infrastructure management. 

Examples: 
* Google Workspace
* Microsoft Office 365
* Salesforce
* Dropbox
* Slack
* Zoom


<br/>
<br/>


### Ansible 

[Fireship Ansible in 100 Seconds](https://www.youtube.com/watch?v=xRMPKQweySE)


Ansible, an open-source automation tool that uses a declarative approach to describe IT infrastructure.

Ansible is a popular configuration management tool that uses YAML code to automate tasks on Linux servers. It increases efficiency and reduces human error.

Ansible works by making one machine a control node. The control node connects to other managed nodes and sends them an Ansible module over SSH. This module can configure the machine's dependencies, update network settings, provision databases, or any other task that needs to be done repeatedly.

Ansible playbooks contain a series of jobs called plays. Each play is a set of instructions that can be run on one or more target hosts. Ansible playbooks are idempotent, meaning they won't make changes unless they are necessary.

<br/>
<br/>

### Terraform

Terraform helps you avoid manually configuring infrastructure through the graphical user interface (GUI) of your cloud provider. This can be time-consuming and error-prone, especially when you need to reproduce the same configuration multiple times.

Terraform is an infrastructure as code tool that allows you to define and manage your infrastructure in a safe and efficient way. It uses a declarative language, which means you describe what you want your infrastructure to look like, and Terraform takes care of provisioning the resources.

Benefits of Terraform:
* It eliminates the need to manually configure your cloud infrastructure through the graphical user interface (GUI) of your cloud provider, which can be time-consuming and error-prone.
* It allows you to define your infrastructure as code, which makes it easy to easy to track changes, version control, share, reuse, and reproduce your infrastructure in different environments.
* Terraform uses a human-readable language called HashiCorp Configuration Language (HCL) or JSON, which makes it easy to understand and maintain your infrastructure code.
* Terraform is an open-source tool, which means it is free to use and there is a large community of developers who contribute to its development.


How Terraform works:
* You start by defining your infrastructure in a .tf file.
* The file consists of Terraform blocks, providers, and resources.
* Providers connect Terraform to different cloud providers like AWS, Google Cloud, and Azure.
* Resources define the actual infrastructure components you want to create in the cloud, such as virtual machines, storage buckets, and networks.


Key Terraform commands:
* terraform init: Initializes the Terraform project.
* terraform apply: Creates or modifies infrastructure based on the configuration.
* terraform show: Shows the current state of your infrastructure.
* terraform destroy: Removes the infrastructure defined in the configuration file.
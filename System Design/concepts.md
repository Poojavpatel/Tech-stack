## Table of contents
- [Chaos Engineering](#chaos-engineering)

<br/>
<br/>
<br/>

## Chaos Engineering

### Chaos Engineering Tools

https://www.harness.io/blog/chaos-engineering-tools

[Chaos Mesh](https://chaos-mesh.org/)      
Break Your System Constructively.    
Chaos Mesh brings various types of fault simulation to Kubernetes and has an enormous capability to orchestrate fault scenarios. It helps you conveniently simulate various abnormalities that might occur in reality during the development, testing, and production environments and find potential problems in the system.

[Chaos Monkey](https://netflix.github.io/chaosmonkey/)   
Chaos Monkey is responsible for randomly terminating instances in production to ensure that engineers implement their services to be resilient to instance failures.   
Netflix’s Chaos Monkey is an open-source chaos engineering tool originally created by Netflix developers. It was developed to help test their system reliability and resiliency after moving to the AWS cloud. The software functions by implementing continuous unpredictable attacks. Chaos Monkey uses the basic fundamental approach of terminating one or more virtual machine instances

The configurability of Chaos Monkey allows for easy scheduling and close monitoring. The technology is easily replicable but can cause headaches if users are unprepared for the aftermath of attacks. Users can check for outages prior to deployment but must be able to write and edit custom Go code.

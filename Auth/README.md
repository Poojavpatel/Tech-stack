Everything related to Authentication, Authorization, Sessions, web tokens, cookies, sso, saml, etc

## Table of contents

- [Hashing](#hashing)
- [Encryption](#encryption)
- [JSON Web Token (JWT)](#json-web-token-jwt)
- [Explaining Sessions Tokens, JWT, SSO, and OAuth](#explaining-session-tokens-jwt-sso-and-oauth-in-one-diagram)
- [SAML](#security-assertion-markup-language-saml)
- [Social sign-in](#social-sign-in)
- [SSO](#sso-single-sign-on)
  - [Social sign-in vs SSO](#social-sign-in-vs-sso)

<br/>

### Hashing

Hashing is a one-way function that transforms input data (of any size) into a fixed-size string of characters, which is typically a hash code. The key characteristic is that it's a one-way process — given a hash, it's computationally difficult (if not practically impossible) to reverse it to obtain the original input.

Hashing is commonly used to store passwords securely. Instead of storing actual passwords, applications store the hash of the password. When a user logs in, the system hashes the entered password and compares it with the stored hash.

```bash
Original Password: "secret123"
Hashed Password: "2c6ee52f1c2eff532b1197c0b1ddcbee"
```

#### When to Use Hashing in Login Systems

* Hashing for Passwords During Storage    
Store hashed passwords in the database. When a user creates an account or changes their password, hash the password and store the hash

* Hashing for Passwords During Verification   
When a user tries to log in, hash the entered password and compare it with the stored hash. If they match, the password is correct.

  ```js
  const bcrypt = require('bcrypt');

  const originalPassword = "secret123";
  bcrypt.hash(originalPassword, 10, (err, hash) => {
    // Store 'hash' in the database
  });

  const enteredPassword = "userInput123";
  // Retrieve 'storedHash' from the database
  bcrypt.compare(enteredPassword, storedHash, (err, result) => {

  });
  ```


<br/>

### Encryption

Encryption is a two-way process that transforms data into a format that is not easily readable without the corresponding decryption key. Unlike hashing, encryption is reversible.

Encryption is used to protect sensitive data during transmission or storage. For example, when sending data over the internet (e.g., login credentials), it's often encrypted to prevent unauthorized access.

```bash
Original Data: "Hello, this is a secret message."
Encrypted Data: "xj02l94s1hd8v2jd7f..."
```

#### When to Use Encryption in Login Systems

* During Transmission: Use encryption (e.g., HTTPS) to protect sensitive data transmitted between the user's device and the server. This includes login credentials and any other confidential information.

<br/>

### JSON Web Token (JWT)

JWT is a standardized way to represent information between two parties securely. It is a compact and self-contained token that can carry claims (statements) about a user or other entities and is commonly used for authentication and authorization purposes.

A JWT consists of three parts: a header, a payload, and a signature. These parts are base64-encoded and concatenated with dots to form the JWT.

Example JWT
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Example JWT Payload
```js
{
  "sub": "1234567890",  // subject, meant to uniquely identify the subject of the JWT, typically the userId
  "name": "John Doe",
  "iat": 1516239022     // issued at, represents the UNIX timestamp at which the JWT was issued or created
}
```


#### Authentication in a Web Application

**Traditional Session Approach**

1. Before JWT, traditional session-based authentication was common.   
1. When a user logged in, the server would create a session and store session information on the server side.   
1. The server would then provide the user with a session ID, typically stored in a cookie.   
1. For each subsequent request, the session ID would be sent to the server to identify the user's session.

**JWT Approach**
1. User logs in   
1. Server creates a JWT containing user information (claims) and sends it to the client.   
1. The client typically stores it, storage mechanisms include browser cookies, local storage, or session storage
1. The client includes the JWT in the header of each request as such   
`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
`     
1. The server extracts the JWT from the header, verifies the JWT's signature using the secret key or public key associated with the issuer (the entity that created the JWT)
1. The server checks the expiration (exp) and issued at (iat) claims to ensure the token is still valid and hasn't expired.
1. If the signature is valid, and the claims are satisfactory, the server considers the user authenticated based on the information contained in the JWT

Note - JWTs are typically not stored on the server, They are designed to be self-contained tokens, meaning all the necessary information is included in the token itself, the client is responsible for storing the JWT


#### Advantages of JWT

1. Stateless and Scalable   
JWTs are stateless, meaning all necessary information is contained within the token itself. This eliminates the need for server-side storage of session information, making it easier to scale applications.

1. Decentralized   
Since the token carries all necessary information, different services or microservices can independently verify and use the information without relying on a centralized server.

1. Cross-Domain Authentication
JWTs can be sent as part of an HTTP request header or in the URL, making them suitable for cross-domain authentication in web applications

#### Code to create and verify jwt

  ```ts
  import * as jwt from 'jsonwebtoken';

  const secretKey = 'your-secret-key';
  const user = {
    id: '123',
    username: 'john_doe',
  };

  // Function to create a JWT
  function createToken(user: any): string {
    const expiresIn = '1h';
    const token = jwt.sign(user, secretKey, { expiresIn });
    return token;
  }

  // Function to verify a JWT
  function verifyToken(token: string): any | null {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      return null;
    }
  }

  // Creating a JWT
  const accessToken = createToken(user);
  console.log('Generated JWT:', accessToken);

  // Verifying a JWT
  const verifiedUser = verifyToken(accessToken);
  ```

#### Interview questions related to JWT
Q - How is authentication done using JWT on backend, explain flow    
A - FE sends JWT token to BE while hitting an api, User role is extracted from the token and attached to the request in auth middleware, this req is forwarded to the usecase for it, in the usecase the role is checked   
Q - In case this is a microservice architecture, In user service how do we verify if a request is forwarded from auth service and not malicious source   
A - One way is to use a checksum   

Improvement 1 -    
Using a checksum alone might not be the most suitable method for verifying the authenticity of a request between services. A checksum typically provides integrity verification, ensuring that the data hasn't been altered during transit. However, it doesn't inherently authenticate the sender or prevent malicious entities from generating valid checksums.

For a more robust security solution, consider incorporating one or more of the following methods:
* Token-Based Authentication:
Use tokens or API keys generated by the Auth service and sent with the request. The User service can validate these tokens to ensure the request is coming from a trusted source.
* Request Signing:
Employ asymmetric cryptography to sign the request with a private key in the Auth service and verify the signature using a corresponding public key in the User service. This ensures both integrity and authenticity.

* Mutual TLS (Transport Layer Security):
Implement mutual TLS to establish a secure communication channel between services, authenticating both the Auth service and the User service.

* JWT (JSON Web Token):
Use JWTs with signatures to authenticate and share information securely between services.

* Custom Headers or Metadata:
Include specific headers or metadata in the request that can be verified by the User service. This could be a unique identifier, authentication key, or other information known only to the trusted parties.

Improvement 2 -    
Both the Auth service and the User service can independently verify the JWT using the shared secret or public key

Improvement 3 -    
[Using AWS VPC and private links](../AWS/README.md#aws-privatelink)   
To ensure that requests coming to your User service originate from the Auth service and not from a malicious source, you can use AWS VPC and PrivateLink along with additional security measures

1. Place both the Auth service and the User service within an Amazon Virtual Private Cloud (VPC). This ensures that communication between these services occurs within the private network.
1. Set up an AWS PrivateLink for the Auth service. This involves creating a VPC endpoint for the Auth service within your VPC. This endpoint allows the User service to securely communicate with the Auth service over the AWS network
1. Use security groups and network access control lists (NACLs) to control inbound and outbound traffic. Specifically, configure the security groups of the Auth service's endpoint to allow traffic only from the IP address range of the User service.
1. When the Auth service forwards a request to the User service, include a custom header or token in the request. This header should contain a piece of information that acts as a proof of authenticity, such as a shared secret or a specific identifier known only to the Auth and User services
1. In the User service, verify the custom header or token in each incoming request. Ensure that the header matches the expected value or contains the correct information. If the verification fails, reject the request as potentially coming from a malicious source.
1. Implement logging and monitoring mechanisms to keep track of incoming requests, including information about the source and any failed verification attempts. This helps in identifying and responding to potential security incidents.

<br/>
<br/>

### Explaining Session Tokens, JWT, SSO, and OAuth in One Diagram

<p align="left">
<img src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F041727d8-aaba-4c1d-8b74-b2c26e2e05e2_1446x1890.png" width="700px" >
</p>

<br/>

## Security Assertion Markup Language (SAML)

Its primary role in online security is that it enables you to access multiple web applications using one set of login credentials

SAML works by passing information about users, logins, and attributes between the identity provider and service providers. Each user logs in once to Single Sign On with the identify provider, and then the identify provider can pass SAML attributes to the service provider when the user attempts to access those services

<br/>

## Social Sign-In   
Social sign-in refers to the practice of using credentials from a social media platform (such as Facebook, Google, Twitter, or LinkedIn) to log in to a third-party website or application.   
Users can sign in to a service using their existing social media account credentials, eliminating the need to create a new account for each service.   

Benefits
* Simplifies the registration and login process for users.
* Enables developers to access user data from the social platform (with user consent), making it easier to personalize the user experience.
* Can increase user engagement as it reduces the friction associated with account creation.

## SSO (Single sign-on)

Single sign-on is an authentication scheme that allows a user to log in with a single ID to any of several related, yet independent, software systems. True single sign-on allows the user to log in once and access services without re-entering authentication factors

Single Sign-On is an authentication process that allows a user to log in once and gain access to multiple connected systems or services without the need to re-enter credentials for each one.

SSO is commonly used within an organization or a network of related services. Once a user logs in to one system, they are granted access to other systems without the need for additional authentication.

Benefits   
* Improves user experience by reducing the number of times a user has to log in.
* Enhances security by centralizing authentication processes and reducing the need for users to remember multiple passwords.
* Simplifies user management and reduces the risk of password-related issues.

MyTake
Assembly app was 

### Social sign-in vs SSO

Social sign-in and Single Sign-On (SSO) are both authentication mechanisms, but they serve different purposes and operate in distinct contexts
* Scope   
Social sign-in is typically used for external services, allowing users to log in using their social media accounts for convenience.   
SSO is often implemented within an organization or a network of related services to streamline access for users across those services.   

* Authentication Source   
Social sign-in relies on the authentication provided by a user's social media account   
SSO relies on a centralized authentication system that manages user credentials and access across multiple services   

* User Experience   
Social sign-in simplifies the user experience for external services, reducing the effort required for account creation and login   
SSO simplifies the user experience within a connected system of services, eliminating the need for users to repeatedly log in   

<br/>

## What is difference between SAML and SSO?

SAML 2.0 (Security Assertion Mark-up Language) is an umbrella standard that covers federation, identity management and single sign-on (SSO).

<br/>
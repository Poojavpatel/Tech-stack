Everything related to Authentication, Authorization, Sessions, web tokens, cookies, sso, saml, etc

## Table of contents

- [Hashing](#hashing)
- [Encryption](#encryption)
- [JSON Web Token (JWT)](#json-web-token-jwt)
- [Explaining Sessions Tokens, JWT, SSO, and OAuth](#explaining-session-tokens-jwt-sso-and-oauth-in-one-diagram)
- [SAML](#security-assertion-markup-language-saml)
- [SSO](#sso-single-sign-on)

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

## SSO (Single sign-on)

Single sign-on is an authentication scheme that allows a user to log in with a single ID to any of several related, yet independent, software systems. True single sign-on allows the user to log in once and access services without re-entering authentication factors

<br/>

## What is difference between SAML and SSO?

SAML 2.0 (Security Assertion Mark-up Language) is an umbrella standard that covers federation, identity management and single sign-on (SSO).

<br/>
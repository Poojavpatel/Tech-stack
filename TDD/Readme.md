# TDD

### Table of contents



<br/>
<br/>

---

Difference between equal and eql in Chai Library

- equal: Asserts that the target is strictly (===) equal to the given value.

Strictly equal (or ===) means that your are comparing exactly the same object to itself:

```js
var myObj = {
  testProperty: "testValue",
};
var anotherReference = myObj;

expect(myObj).to.equal(anotherReference); // The same object, only referenced by another variable
expect(myObj).to.not.equal({ testProperty: "testValue" }); // Even though it has the same property and value, it is not exactly the same object
```

- eql: Asserts that the target is deeply equal to value.
  Deeply Equal on the other hand means that every property of the compared objects (and possible deep linked objects) have the same value.

```js
var myObject = {
  testProperty: "testValue",
  deepObj: {
    deepTestProperty: "deepTestValue",
  },
};
var anotherObject = {
  testProperty: "testValue",
  deepObj: {
    deepTestProperty: "deepTestValue",
  },
};
var myOtherReference = myObject;

expect(myObject).to.eql(anotherObject); // is true as all properties are the same, even the inner object (deep) one
expect(myObject).to.eql(myOtherReference); // is still also true for the same reason
```

### Playwright 
End-to-end testing automation tool

<br/>

---

### Testing helper libraries

[faker-js](https://www.npmjs.com/package/@faker-js/faker)

Faker.js is a JavaScript library that provides a set of utilities for generating fake and random data. It's often used in testing, development, and prototyping scenarios where you need placeholder or dummy data. Faker.js allows you to generate realistic-looking data such as names, addresses, emails, phone numbers, and more.

```js
userId: faker.string.uuid(),
username: faker.internet.userName(),
email: faker.internet.email(),
avatar: faker.image.avatar(),
password: faker.internet.password(),
birthdate: faker.date.birthdate(),
registeredAt: faker.date.past(),
```

[Sinon.JS](https://www.npmjs.com/package/sinon)

Sinon.js is a JavaScript library that provides standalone test spies, stubs, and mocks for JavaScript. It is commonly used in conjunction with testing frameworks like Mocha, Jasmine, or Jest to facilitate unit testing and help with the isolation of code during testing.

Spies: Spies are functions that record information about function calls, such as the number of times they were called and with what arguments. Sinon's spies allow you to observe how functions are used in your code without modifying their behavior.

Stubs: Stubs are similar to spies but can also replace the original function with custom behavior. This is useful when you want to control the output of a function or simulate certain conditions during testing.

Mocks: Mocks provide a way to set expectations on how functions should be called. They combine the functionality of spies and stubs and are particularly useful for defining and enforcing interfaces during testing.

```js
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

// Sample module with an HTTP request function
const httpModule = {
  async makeHttpRequest(url) {
    // Some complex logic to make an actual HTTP request
    // We'll stub this function for testing
    return "Response from HTTP request";
  }
};

// Function that depends on the HTTP request
function processHttpResponse() {
  // Some logic to process the HTTP response
  const response = httpModule.makeHttpRequest("https://example.com/api/data");
  return `Processed: ${response}`;
}

// Test case using Mocha and Chai with Sinon.js
describe('processHttpResponse function', () => {
  it('should process the HTTP response', async () => {
    // Stub the makeHttpRequest function to avoid actual HTTP requests
    const httpStub = sinon.stub(httpModule, 'makeHttpRequest').resolves('Stubbed response');

    // Call the function that depends on the HTTP request
    const result = processHttpResponse();

    // Assert that the stubbed response is processed correctly
    expect(result).to.equal('Processed: Stubbed response');

    // Assert that the makeHttpRequest function was called with the correct URL
    expect(httpStub.calledWith('https://example.com/api/data')).to.be.true;

    // Restore the original function to avoid affecting other tests
    httpStub.restore();
  });
});
```

```js
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

// Sample module with an external service
const externalService = {
  login(username, password) {
    // Actual login logic, not important for this example
  },
  fetchData() {
    // Actual data fetching logic, not important for this example
  }
};

// Function that depends on the external service
function performLoginAndFetchData(username, password) {
  externalService.login(username, password);
  return externalService.fetchData();
}

// Test case using Mocha and Chai with Sinon.js mocks
describe('performLoginAndFetchData function', () => {
  it('should perform login and fetch data', () => {
    // Create a mock for the external service
    const serviceMock = sinon.mock(externalService);

    // Set expectations on the mock
    serviceMock.expects('login').once().withArgs('testUser', 'testPassword');
    serviceMock.expects('fetchData').once();

    // Call the function that depends on the external service
    const result = performLoginAndFetchData('testUser', 'testPassword');

    // Assert the result (if needed)
    // ...

    // Verify that the expectations were met
    serviceMock.verify();

    // Restore the original behavior of the external service
    serviceMock.restore();
  });
});
```
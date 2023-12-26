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

## Playwright 
End-to-end testing automation tool
/*
In this example, The fly method is implemented differently in each derived class to reflect the specific behavior of each bird type.
The Liskov Substitution Principle is upheld because we can pass both Sparrow and Ostrich objects to this function without causing any issues. The program behaves correctly because the fly method in each derived class respects the expected behavior of the base class Bird, even though it may do nothing for an ostrich.
In summary, the Liskov Substitution Principle ensures that derived classes can be used interchangeably with their base class without breaking the program's correctness 
*/

class Bird {
  fly() {
    console.log("The bird is flying.");
  }
}

class Sparrow extends Bird {
  fly() {
    console.log("The sparrow is flying.");
  }
}

class Ostrich extends Bird {
  fly() {
    // Ostriches cannot fly, so this method should not do anything.
  }
}

function makeBirdFly(bird: Bird) {
  bird.fly();
}

const sparrow = new Sparrow();
const ostrich = new Ostrich();

makeBirdFly(sparrow); // Output: "The sparrow is flying."
makeBirdFly(ostrich); // Output: No message (correct behavior for an ostrich)

/*
In this modified example, we've introduced a violation of the Liskov Substitution Principle 
by having the Penguin class provide an implementation for the fly method that doesn't align with the expected behavior of the base class Bird
The Liskov Substitution Principle states that derived classes should be substitutable for their base class
However, in this case, when we call makeBirdFly(Penguin), the Penguin class is not behaving like a typical bird
It's providing a message suggesting it's trying to fly, which is misleading and incorrect because penguin is a flightless bird
*/

class Penguin extends Bird {
  fly() {
    console.log("The penguin is trying to fly, but it can't.");
  }
}

const penguin = new Penguin();

makeBirdFly(penguin); // Output: "The penguin is trying to fly, but it can't."

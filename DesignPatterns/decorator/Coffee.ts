// Step 1: Define an interface for the component (base class).
interface Coffee {
  cost(): number;
}

// Step 2: Create a concrete component (base class implementation).
class SimpleCoffee implements Coffee {
  cost(): number {
      return 5; // Cost of a simple coffee
  }
}

// Step 3: Create decorator classes that extend the component and add behavior.
class MilkDecorator implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
      this.coffee = coffee;
  }

  cost(): number {
      return this.coffee.cost() + 2; // Add the cost of milk
  }
}

class SugarDecorator implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
      this.coffee = coffee;
  }

  cost(): number {
      return this.coffee.cost() + 1; // Add the cost of sugar
  }
}

// Step 4: Client code that uses decorators.
const myCoffee: Coffee = new SimpleCoffee();
console.log("Cost of simple coffee:", myCoffee.cost()); // 5

const coffeeWithMilk: Coffee = new MilkDecorator(myCoffee);
console.log("Cost of coffee with milk:", coffeeWithMilk.cost()); // 7

const coffeeWithMilkAndSugar: Coffee = new SugarDecorator(coffeeWithMilk);
console.log("Cost of coffee with milk and sugar:", coffeeWithMilkAndSugar.cost()); // 8

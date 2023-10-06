abstract class Item {
  abstract getPrice(): number;
}

class Product extends Item {
  constructor(private name: string, private price: number) {
    super();
  }

  getPrice(): number {
    return this.price;
  }
}

class Box extends Item {
  private items: Item[] = [];

  addItem(item: Item): void {
    this.items.push(item);
  }

  getPrice(): number {
    let total = 0;
    for (const item of this.items) {
      /* 
        This method leverages polymorphism
        If the item is a product, its getPrice method is called
        If the item is a box, the box's getPrice method is called recursively
      */
      total += item.getPrice();
    }
    return total;
  }
}

// Usage
const laptop = new Product("Laptop", 1000);
const smartphone = new Product("Smartphone", 500);

console.log(`Total cost of laptop: $${laptop.getPrice()}`) // 1000

const accessoryBox = new Box();
accessoryBox.addItem(new Product("Keyboard", 50));
accessoryBox.addItem(new Product("Mouse", 30));

console.log(`Total cost of accessoryBox: $${accessoryBox.getPrice()}`) // 80

const bigBox = new Box();
bigBox.addItem(laptop);
bigBox.addItem(smartphone);
bigBox.addItem(accessoryBox);

console.log(`Total cost of the big box: $${bigBox.getPrice()}`); // 1580
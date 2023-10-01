/* 
Checking if adhering to DIP improves anything
*/
// interface IOrderService {
//   getOrder(orderId: number): Order;
// }

// class OrderService implements IOrderService {
//   getOrder(orderId: number): Order {
//     return {id: orderId, item: "Shoe"}
//   }
// }

// class OrderProcessor {
//   constructor(private orderService: IOrderService) {}

//   processOrder(orderId: number): void {
//     const order = this.orderService.getOrder(orderId);
//     order.state = "processed";
//   }
// }

interface IOrderService {
  getOrder(orderId: number, itemType: string): Order;
}

class OrderService implements IOrderService {
  getOrder(orderId: number, itemType: string): Order {
    if (itemType === "Shoe") {
      return { id: orderId, item: "Shoe", size: "10", color: "blue" };
    } else if (itemType === "Hat") {
      return { id: orderId, item: "Hat", size: "M", color: "black" };
    } else {
      return { id: orderId, item: "Generic", size: "M", color: "red" };
    }
  }
}

class OrderProcessor {
  constructor(private orderService: IOrderService) {}

  processOrder(orderId: number): void {
    const order = this.orderService.getOrder(orderId, "Shoe");
    order.state = "processed";
  }
}

/* I had to make the same change while adhering to dip too */
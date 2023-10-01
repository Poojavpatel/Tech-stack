/* Not Adhering to DIP - High-level module OrderProcessor directly depends on a low-level module OrderService */
type Order = { id: number; item: string; state?: string, size?: string, color?: string }

// class OrderService {
//   getOrder(orderId: number): Order {
//     return {id: orderId, item: "Shoe"}
//   }
// }

// class OrderProcessor {
//   constructor(private orderService: OrderService) {}

//   processOrder(orderId: number): void {
//     const order = this.orderService.getOrder(orderId);
//     order.state = "processed";
//   }
// }

// const orderService = new OrderService();
// const processor = new OrderProcessor(orderService);

/*
We are trying to figure out what exactly is the limitation with this implementation
It states that OrderProcessor and OrderService are tightly coupled. Any change to the OrderService class can directly impact the OrderProcessor
*/

/*
Now, let's say you need to change the behavior of the getOrder method in the OrderService class, and check type of item before returning
Because OrderProcessor directly depends on OrderService and its getOrder method, this change in the behavior of getOrder affects the OrderProcessor class
*/

// class OrderService {
//   getOrder(orderId: number, itemType: string): Order {
//     if (itemType === "Shoe") {
//       return { id: orderId, item: "Shoe", size: "10", color: "blue" };
//     } else if (itemType === "Hat") {
//       return { id: orderId, item: "Hat", size: "M", color: "black" };
//     } else {
//       return { id: orderId, item: "Generic", size: "M", color: "red" };
//     }
//   }
// }

// class OrderProcessor {
//   constructor(private orderService: OrderService) {}

//   processOrder(orderId: number): void {
//     /* Had to add an extra param here */
//     const order = this.orderService.getOrder(orderId, "Shoe");
//     order.state = "processed";
//   }
// }

// const orderService = new OrderService();
// const processor = new OrderProcessor(orderService);

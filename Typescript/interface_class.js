function drawPoint(point) {
    // draw a point with x,y cordinate
}
drawPoint({ x: 5, y: 7 });
drawPoint({ name: 'Pooja' });
// This function expects a point but we get no error even when passing string, to fix this
// 1. Object literal
function drawPoint2(point) {
    // draw a point with x,y cordinate
}
drawPoint2({ x: 5, y: 7 });
function drawPoint3(point) {
    // draw a point with x,y cordinate
}
drawPoint3({ x: 5, y: 7 });
// drawPoint3({name: 'Pooja'}) // Argument of type '{ name: string; }' is not assignable to parameter of type 'IPoint'. Object literal may only specify known properties, and 'name' does not exist in type 'IPoint'
// Problem with this implementation is that it violates cohesion
// In OOP there is a concept of cohesion, which states that related properties should belong to a single unit
// Here since IPoint and drawPoint both are related to a point, they should be placed together
// Using Class
// all related properties and methods are grouped together
// class Point {
//   x : number;
//   y : number
//   drawPoint3 = () => {
//     console.log(`Drawing point ${this.x} ${this.y}`)
//   }
// }
// const a = new Point();
// a.x = 5;
// a.y = 10;
// a.drawPoint3();
// Instead of declaring all properties seperately, use constructor
class Point2 {
    // z is an optional argument
    constructor(x, y, z) {
        this.drawPoint3 = () => {
            console.log(`Drawing point ${this.x} ${this.y} ${this.z}`);
        };
        this.x = x;
        this.y = y;
        this.x = x;
    }
}
const b = new Point2(10, 20);
b.drawPoint3();
//// Access Modifier
class Point {
    constructor(x, y, z) {
        this.drawPoint = () => {
            console.log(`Drawing point ${this.x} ${this.y} ${this.z}`);
        };
        this.x = x;
        this.y = y;
        this.x = x;
    }
}
const point = new Point(2, 3, 4);
point.z = 5;
/// Shorthand for constructor
class Point3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.drawPoint = () => {
            console.log(`Drawing point ${this.x} ${this.y} ${this.z}`);
        };
    }
}
//// Properties in typescript
// normally set and get using functions
class Point4 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    getX() {
        return this.x;
    }
    setX(value) {
        // after some basic validation
        this.x = value;
    }
}
const p = new Point4(1, 2);
console.log(p.getX()); // 1
p.setX(6);
console.log(p.getX()); // 6
// using properties
class Point5 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get X() {
        return this.x;
    }
    set X(value) {
        // after some basic validation
        this.x = value;
    }
}
const q = new Point5(1, 2);
console.log(q.X); // 1
q.X = 6;
console.log(q.X); // 6

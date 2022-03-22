// abstract class Shape {
// 	abstract draw() { // Method 'draw' cannot have an implementation because it is marked abstract
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 	}
// }
var Shape = /** @class */ (function () {
    function Shape() {
    }
    Shape.prototype.calculateArea = function () {
    };
    return Shape;
}());
// const shape = new Shape(); // Cannot create an instance of an abstract class
// class Circle extends Shape{ // Non-abstract class 'Circle' does not implement inherited abstract member 'draw' from class 'Shape'
// 	constructor() { // Constructors for derived classes must contain a 'super' call
// 	}
// }
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super.call(this) || this;
    }
    Circle.prototype.draw = function () {
        // draw a circle
    };
    return Circle;
}(Shape));

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
var Student = /** @class */ (function () {
    function Student() {
    }
    Student.prototype.breath = function () {
        console.log('Student Breathing');
    };
    Student.prototype.run = function () {
        console.log('Student running');
    };
    return Student;
}());
var pooja = new Student();
pooja.breath();
pooja.run();
console.log(pooja.name);
//// extends
var Human = /** @class */ (function () {
    function Human() {
    }
    Human.prototype.breath = function () {
        console.log('Human Breathing');
    };
    Human.prototype.walk = function () {
        console.log('Human walking');
    };
    return Human;
}());
var Student2 = /** @class */ (function (_super) {
    __extends(Student2, _super);
    function Student2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Student2.prototype.learn = function () {
        console.log('Student2 learning');
    };
    Student2.prototype.walk = function () {
        _super.prototype.walk.call(this);
        console.log('Walk completed');
    };
    return Student2;
}(Human));
var swati = new Student2();
swati.learn();
swati.breath();
swati.walk();

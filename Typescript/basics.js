//// Types in typescript 
let c;
let d;
let e;
let f = [5, 7, 9];
let g = ['a', 'b', 'c'];
let h = ['a', 1, true];
//// Enum in typescript
const colorRed = 1;
const colorGreen = 2;
const colorBlue = 3;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
// declaring an enum automatically asigns numbers sequentially
let red = Color.Red;
console.log(red); // 0
console.log(Color.Blue); // 2
// a better way is to assign values explicitly, so that if we add lets say purple before blue it wont mess blue
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 0] = "Red";
    Color2[Color2["Green"] = 1] = "Green";
    Color2[Color2["Blue"] = 2] = "Blue";
})(Color2 || (Color2 = {}));
;
// in js enums are compiled as 
// (function (Color) {
//     Color[Color["Red"] = 0] = "Red";
//     Color[Color["Green"] = 1] = "Green";
//     Color[Color["Blue"] = 2] = "Blue";
// })(Color || (Color = {}));
//// Type Assertions
// let a = 5;
// a = 'tyu';  // Type 'string' is not assignable to type 'number'
// since we defined a as 5, type of a is considered number, hence when we try to assign a = 'tyu' we get an error
let b;
b = 5;
b = 'ghb';
b = true;
// since we only declared b, type of b is considered as any, hence typescript has no issues if we set it to string or boolean
let message = 'hello';
// when we type message. we get intellisense of all string methods
message.endsWith('o');
let message2;
message2 = 'world';
// when we type message2. we DO NOT get intellisense of all string methods as type of message2 is considered as any
message2.endsWith('d');
// Type Assertions is explicity telling typescript the type of a variable, Type Assesrtion is done just to get intellicence 
// Note - Type Assertions does not change the type of this variable at runtime, its purely a way to tell ts compiler about type of a variable
message2.endsWith('d');
message2.endsWith('d');

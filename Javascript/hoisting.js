console.log(name) // undefined
// console.log(age) // ReferenceError: age is not defined, process exits
var name = 'pooja'

/* 
var items    This is a variable declaration
items = 10   This is assignment
In Hoisting only declarations are moved to the top, not assignments
*/

sayHello();   // Hello There

function sayHello(){
  console.log('Hello There');
}

sayBye(); // TypeError: sayBye is not a function, process exits

var sayBye = function(){
  console.log('Byee');
}

/* 
only the variable declaration 'var sayBye' is moved to the top, and since its a variable not a function, gives error 
*/

console.log(age); // ReferenceError: age is not defined
const age = 23;

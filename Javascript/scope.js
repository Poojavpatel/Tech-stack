// const name = 'pooja';
// const age = '23';

// function sayName(){
//   console.log(`Hello i am ${name}`);
//   function sayAge(){
//     console.log(`My age is ${age}`);
//   }
//   sayAge();
// }
// sayName();


const name = 'pooja';
const age = '23';

function sayName(){
  console.log(`Hello i am ${name}`);    // Hello i am pooja
  function sayAge(){
    const age = '10';
    console.log(`My age is ${age}`);    // My age is 10
  }
  sayAge();
}
sayName();
console.log('age:', age);               // age: 23

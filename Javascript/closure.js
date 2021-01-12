// var add = (function () {
//   var counter = 0;
//   return function () {counter += 1; return counter}
// })();

// console.log('add:', add);

// add();
// add();
// add();

function outer(outerVariable){
  return function inner(innerVariable){
    console.log('outerVariable:', outerVariable);
    console.log('innerVariable:', innerVariable);
  }
}

const newFunction = outer('a');

// console.log('outerVariable:', outerVariable);   // outerVariable is not defined
// since outerVariable has a function scope, and the function is done executing, it does not exist anymore

newFunction('b');  // outerVariable: a innerVariable: b
// the inner function is still able to access the outerVariable, even after it has gone out of scope
// Closure, the inner function is inside the outer function so it saves the outerVariable and keeps track of it
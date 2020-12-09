function cb1(){
  console.log(1);
}
function cb2(){
  console.log(2);
}
setImmediate(cb1);
console.log(3);
process.nextTick(cb2);

console.log(("0 || 1 ="+(0 || 1)));
console.log(("1 || 2 ="+(1 || 2)));
console.log(("0 && 1 ="+(0 && 1)));
console.log(("1 && 2 ="+(1 && 2)));

function foo(){
  let a=b=0;
  a++;
  return a;
}
foo();

console.log(typeof a);
console.log(typeof b);

const clothes = ['shirt', 'jacket'];
clothes.length = 0;

console.log(clothes);
console.log(clothes[0]);

let racer = function() {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
  console.log("current event loop");
}
racer()

let racer1 = function() {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
  console.log("current event loop");
}
let racer2 = function() {
  process.nextTick(() => console.log("nextTick"));
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
  console.log("current event loop");
}
let racer3 = function() {
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
  setTimeout(() => console.log("timeout"), 0);
  console.log("current event loop");
}
racer1()
racer2()
racer3()
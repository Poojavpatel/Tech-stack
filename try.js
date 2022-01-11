// slice splice
// const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
// console.log(fruits.splice(1, 3));

// function a (name, age, weight, ...args) {
//   const b = args;
//   console.log('-name--', name);
//   console.log('-age--', age);
//   console.log('-weight--', weight);
//   console.log('-b--', b);
// }

// a("pooja", 20, 20, 40, 50, 60, 70);

// var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
// var person2 = {firstName: 'Kelly', lastName: 'King'};

// function say(greeting) {
//     console.log(greeting + ' ' + this.firstName + ' ' + this.lastName);
// }

// say.bind(person1, ['hello'])();

// function* showPrices(i) {
//   while (i < 3) {
//     yield i++;
//   }
// }

//creating an object for our function showPrices
// const gfg = showPrices(0); 
// console.log(gfg);                 // Object [Generator] {}
// console.log(gfg.next());          // { value: 0, done: false }
// console.log(gfg.next());          // { value: 1, done: false }
// console.log(gfg.next());          // { value: 2, done: false }
// console.log(gfg.next());          // { value: undefined, done: true }

// Promises, async/await 
// axios.get('users', (response) => {
//   // gets userid here
//   axios.get('profile/userid', () => {
//     // gets profile age here

//   })
// })

// const p = new Promise((resolve, reject) => {
//   if(true){
//     resolve(response);
//   } else {
//     reject();
//   }
// })

// p.then((response) => {

// })
// .catch(error => {

// })

// // 
// async function a() {

// }

// const b = await a();

// const posts =[
//   { title:"Post 1", body:"This is Post 1" },
//   { title:"Post 2", body:"This is Post 2" }
// ];

// function getPosts(){
//   setTimeout(() => {
//       console.log(posts);
//   },1000)
// }

// function createPost(post){
//   setTimeout(() => {
//     posts.push(post)
//   },2000)
// }

// getPosts();
// createPost({ title:"Post 3", body:"This is Post 3" })

// Callback
// const posts =[
//   { title:"Post 1", body:"This is Post 1" },
//   { title:"Post 2", body:"This is Post 2" }
// ];

// function getPosts(){
//   setTimeout(() => {
//       console.log(posts);
//   },1000)
// }

// function createPost(post, cb = () => {}){
//   setTimeout(() => {
//     posts.push(post);
//     cb();
//   },2000)
// }

// createPost({ title:"Post 3", body:"This is Post 3" }, getPosts)

// Promises
// const posts =[
//   { title:"Post 1", body:"This is Post 1" },
//   { title:"Post 2", body:"This is Post 2" }
// ];

// function getPosts(){
//   setTimeout(() => {
//     console.log(posts);
//   },1000)
// }

// function createPost(post){
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       posts.push(post);
//       resolve();
//     },2000)
//   })
// }

// createPost({ title:"Post 3", body:"This is Post 3" })
// .then((response) => {
//   getPosts();
// })
// .catch(() => {})

// async await 
// const posts =[
//   { title:"Post 1", body:"This is Post 1" },
//   { title:"Post 2", body:"This is Post 2" }
// ];

// function getPosts(){
//   setTimeout(() => {
//     console.log(posts);
//   },1000)
// }

// function createPost(post){
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       posts.push(post);
//       resolve();
//     },2000)
//   })
// }

// async function a () {
//   await createPost({ title:"Post 3", body:"This is Post 3" });
//   getPosts();
// }
// a();

// Redux 
// redux -> store.js reducers actions 
// reducers -> index .js userReducer.js
// actions -> types .js AddUser .js

// // store.js 
// const redux = require('redux');
// const rootReducer = ( currentState = 0, action ) => { 
//   return currentState;
// };
// const store = redux.createStore( rootReducer );
// console.log(store.getState());

// // reducers/index.js
// import { combineReducers } from "redux";
// export default combineReducers({
//   cartStore: cartReducer,
//   userStore: userReducer
// });

// // reducers/userReducer.js
// const initialState = {
//   users : [],
// }

// const userReducer = (state = initialState, action) => {
//   switch(action.type){
//     case 'AddUser': 
//       let stateObj = { ...state };
//       stateObj.customer = action.payload;
//       stateObj.isLoggedIn = true;
//       return stateObj;
//   }
// }
// export default userReducer;

// // actions/AddUser.js
// export const addUser = (addData) => {
//   return (dispatch) => {
//     dispatch({
//       type: AddUser,
//       payload: addData,
//     });
//   };
// }

// var and function declarations go to top
// only declaration not assignments

// console.log('---a--', a);       // undefined
// console.log('---b--', b);       // undefined
// console.log('---c--', c);       // Cannot access 'c' before initialization, process exits
// console.log('---d--', d);       // Cannot access 'd' before initialization, process exits
// console.log('---e--', e);       // undefined
// console.log('---f--', f);       // undefined
// console.log('---e()--', e());   // e is not a function, process exits
// console.log('---f()--', f());   // f is not a function, process exits
// console.log('---g--', g);       // [Function: g]
// console.log('---g()--', g());   // 30

// var a;
// var b = 5;
// const c = 3;
// let d = 10
// var e = function () {
//   return 100;
// }
// var f = () => {
//   return 50;
// }
// function g () {
//   return 30;
// }

// IIFE
// (() => {
//   const a = 5;
//   var b = 10;
//   console.log('Hello');
// })()
// console.log('---a--', a);      
// console.log('---b--', b);      

// Closure
// function outer(outerVar){
//   return function inner(innerVar){
//     return [outerVar, innerVar];
//   }
// }

// const a = outer(5);
// console.log('---a--', a);  
// const b = a(7);
// console.log('---b--', b);      

// let q = (
//   function (){
//     let initialValue = 0;
//     return function () {
//       initialValue += 1;
//       return initialValue;
//     }
//   }
// )();

// console.log('---q--', q);  
// console.log('---q()--', q()); 
// console.log('---q()--', q()); 
// console.log('---q()--', q());  

// for(var i=0; i<3; i++){
//   setTimeout(() => {console.log(i)}, 1000)
// }

// for(var i=0; i<3; i++){
//   (function(i){
//     setTimeout(() => {console.log(i)}, 1000)
//   })(i)
// }

// function a () {
//   console.log('-a--', this);
// }
// const b = () => {
//   console.log('-b--', this);
// }
// a();
// b();

// -a-- Object [global] {
//   global: [Circular],
//   clearInterval: [Function: clearInterval],
//   clearTimeout: [Function: clearTimeout],
//   setInterval: [Function: setInterval],
//   setTimeout: [Function: setTimeout] {
//     [Symbol(nodejs.util.promisify.custom)]: [Function]
//   },
//   queueMicrotask: [Function: queueMicrotask],
//   clearImmediate: [Function: clearImmediate],
//   setImmediate: [Function: setImmediate] {
//     [Symbol(nodejs.util.promisify.custom)]: [Function]
//   }
// }

// -b-- {}

var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
function a() {
  console.log(this);
}
const p = a.bind(person1);
p();
// -a-- {}
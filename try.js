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

// var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
// function a() {
//   console.log(this);
// }
// const p = a.bind(person1);
// p();
// -a-- {}


///TODO 
// react use effect when exactly it runs
// react all hooks 
// react lifecycle methods
// DSA approaches note down
// interview notes in notion

// normalization in sql
// read fundamentals from https://github.com/donnemartin/system-design-primer
// Read difference between HTTP and FTP
// Design Patterns
// Message queue 
// Distributed message queue
// PUT vs PATCH 
// Elastic search 
// Kafka 
// Network protocols and proxies


// System design examples
// TinyURL
// Pastebin
// Instagram, Twitter
// Dropbox
// Facebook messanger, Whatsapp
// Youtube, Netflix
// Typeahead
// API Rate limiter
// Twitter search 
// Web crawler
// Yelp, Nearby friends
// Tinder 
// Uber, Ola
// book my show, ticket master
// Online softwares of drawing diagram - https://app.creately.com/diagram/WKZaAqxAYyL/edit


// Design Custom Quora
// 1. Users should be able to post, delete or Update questions
// 1a. Users can tag topics to the questions.
// 2. User can answer to question
// 2a. Users can reply to answers in threads
// 3. Upvote or downvote questions or answers

// Q1: DB choices?
// Q2: Database or class design

// -------------------------------------

// q: aaa
//  a: aaaa
//   r1 : b
//    r2: b1
//     r3: 
//   r: r2
//  a: bbb
// CODE BELOW

// -------


// question  
// text : 
// author : 


// response (answer/reply)
// id: 123
// question_id : 
// parent_id: response_id / null


// vote 
// id : 
// entity_id : response_id / question_id
//  +1
//  author : 
 
//  123-456

// Q.Given an array of integers and a number k, write a function that returns true if the given array can be divided into pairs such that the sum of every pair is divisible by k.

// Input: arr = [9, 7, 5, 3], k = 6 
// Output: true 
// We can divide the array into (9, 3) and 
// (7, 5). Sum of both of these pairs 
// is a multiple of 6.

// Input: arr = [1,2,3,4,5,6], k = 10
// [‘v’,’v’,’v’,v,v,1]
// Output: false 

// Input: arr =[1,2,3,4,5,10,6,7,8,9], k = 5

// Output: true 

// Input: arr = [9, 7, 5, 3, 1], k = 6 
// Output: false 

// Input: arr = [-1,1,-2,2,-3,3,-4,4], k = 3
// Output: true




// function isDivisible(numbers, k) {
//   let i = 0;
//   let j = i+1;
//   let marked = 0;
//   while(i < numbers.length && j < numbers.length){
//     if(numbers[i] == 'v'){
//       i++;
//     }
//     if(numbers[j] == 'v'){
//       j++;
//     }
//     if((numbers[j] + numbers[i]) > 0 && (numbers[j] + numbers[i] + k) % k == 0){
//       numbers[i] = 'v';
//       numbers[j] = 'v';
//       marked+= 2;
//       i++;
//       j = i + 1;
//     } else {
//       j++;
//     }
//     console.log('numbers', numbers);
//   }
//   console.log('numbers', numbers);
//   return marked == numbers.length;
// }

// console.log(isDivisible([-1,1,-2,2,-3,3,-4,4], 3))

// const myFunc = (...args) => {
//   console.log('args', args);
//   };
//   myFunc(1, 'a', new Date());

// var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
// var person2 = {firstName: 'Kelly', lastName: 'King'};

// function say(greeting) {
//     console.log(greeting + ' ' + this.firstName + ' ' + this.lastName);
// }

// say('Hey There'); // Hey There undefined undefined
// say.call(person1, 'Hello'); // Hello Jon Kuperman
// say.call(person2, 'Hello'); // Hello Kelly King

class Book{
  #cost
  constructor(title,author,year,cost){
    this.title=title;
    this.author=author;
    this.year=year;
    this.#cost = cost;
  }
  setCost(newCost) {
    this.#cost = newCost;
  }
  #updateAuthor(author) {
    this.author=author;
  }
}

const book1 = new Book('murder','bella','2002', 500);
console.log(book1); // Book { title: 'murder', author: 'bella', year: '2002' }
console.log(book1.cost); // undefined
// console.log(book1.#cost); // SyntaxError: Private field '#cost' must be declared in an enclosing class
book1.setCost(700);
// book1.#updateAuthor('elle');

// vscode on hover shows - Property '#cost' is not accessible outside class 'Book' because it has a private identifier
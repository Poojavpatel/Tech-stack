# Its_all_Javascript
A collection of all pure JS (ES6) code snippets 

* ## [Javascript Array Methods - map() filter() reduce() sort()](https://gist.github.com/Poojavpatel/14477c2201ba29cdfbb0c1bef8d9dc81)

* ## [Object oriented programming in javascript](https://gist.github.com/Poojavpatel/48e17c3ecd47a01836fd3e520874fe7c)

* ## [Asynchronous Javascript](https://gist.github.com/Poojavpatel/05713f3af15e68671a02f47733349570)

* ### More array methods
```javascript
const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];
const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 }
];

// .some checks if atleast one element in your array is what u are looking for
// is atleast one person 19

// const adult = people.some( function(person) {
//     const currentyear = (new Date()).getFullYear();
//     if (currentyear -  person.year >= 19) {
//         return true;
//     }
// });
const adult = people.some((person) => {
    const currentyear = (new Date()).getFullYear();
    return (currentyear -  person.year >= 19);
});
console.log(adult);
console.log({adult});

// every checks if all elements are what u are looking for
// is everyone 19
const alladult = people.every( (person) => {
    const currentyear = (new Date()).getFullYear();
    return (currentyear -  person.year >= 19);
});
console.log(alladult);
console.log({alladult});

// Find is like filter but instead of returning subset it returns first item it finds
// find comment with id 823423
const commenta = comments.find( (comment) => {
    return (comment.id === 823423);
});
console.log(commenta);

//Find Index outputs the index
const index=comments.findIndex( (comment)=>{
    return (comment.id === 823423);
});
console.log(index);

// How to delete it from the array  2 methods
// 1)Splice(startfromindex , splicehowmany);  
comments.splice(index ,1); 
console.table(comments);
// 2)make a new array with start 0 to index + (index+1) to the end
// The ... are the spread operator ,to spead these elements in array
const newcomments = [
    ...comments.slice(0,index),
    ...comments.slice(index+1)
];
console.table(newcomments);
```
---

* ### Check if an element exists in an array
```javascript
const myarray = [10,20,20,10,10,30,50,10,20];
myarray.includes(20)                // true
```
---


* ### Sort an array in JS
```javascript
var points = [40, 100, 1, 5, 25, 10];

//ascending
points.sort((a, b) =>  a - b );
console.log('points:', points);
points.sort((a, b) =>  a > b );
console.log('points:', points);

//descending
points.sort((a, b) =>  b - a );
console.log('points:', points);
points.sort((a, b) =>  a < b );
console.log('points:', points);
```
---

* ### indexOf () operator
```javascript
x=[1,2,3]
console.log(x);                         //[ 1, 2, 3 ]
console.log(x[-1]);                     //undefined
x[-1]=5;
console.log(x);                         //[ 1, 2, 3, '-1': 5 ]
console.log(x[-1]);                     //5

console.log(x.indexOf(5));              //-1
console.log(x.indexOf(1000000));        //-1
console.log(x.indexOf(254982));         //-1
// indexOf() looks for a value in an array, if it does not find it,
// it returns -1

console.log(x[x.indexOf(5)]);           //5
console.log(x[x.indexOf(1000000)]);     //5
console.log(x[x.indexOf(254982)]);      //5
```
---
* ### creating a reusable method using Array.prototype

```javascript
const Students = [];
class Student{
    constructor(name,course,college){
        this.name=name;
        this.course=course;
        this.college=college;
        Students.push(this);
    }
}
const s1=new Student('Priya','BE','Thakur');
const s2=new Student('Rohan','MS','Stevens');
const s3=new Student('Jay','BE','Thadomal');
const s4=new Student('Mansi','ME','Thakur');
const s5=new Student('Sneha','Diploma','Thakur');

// Grouping students by specified college name
const thakurStudents = Students.filter((student) => {
    if(student.college == 'Thakur'){
        return true;
    }
});
console.log("Students from college Thakur :");
console.table(thakurStudents);

// Generalising - creating a reusable method that can be used to group by any property name
Array.prototype.groupBy = function(prop) {
    return this.reduce(function(groups, item) {
      const val = item[prop]
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, {})
};

const collegeGroup = Students.groupBy('college');
console.log("Grouping by college name:")
console.log(collegeGroup);
```
---
* ### Substring
```javascript
var str = "Hello world!";
var res = str.substring(1, 4);          // ell 
```
---


* ### String Reverse
```javascript
function FirstReverse(str){ 
   return str.split("").reverse().join("");         
}
/* The split() method splits a String object into an array of string by separating the string into sub strings.  ["h", "e", "l", "l", "o"]
The reverse() method reverses an array in place     ["o", "l", "l", "e", "h"]
The join() method joins all elements of an array into a string.     "olleh" */

const ans = FirstReverse("Hello world");
console.log('Reversed string is', ans);
```
---

* ### String Reverse using For loop
```javascript
function reverseString(str) {
    let rev = "";
    for (let i = str.length-1; i >= 0 ; i--) {
        rev = rev + str[i];
    }
    return rev;
}
console.log('reversed string is', reverseString("Hello world"));
```
---
* ### Check wether input scentence is palindrome or not
```javascript
const readline = require('readline').createInterface({input: process.stdin,output: process.stdout})

readline.question(`Enter a scentence to check if its a palindrome or not:`, (scentence) => {
    s1 = scentence.replace(/\s/g,'').trim().toLowerCase();
    const rev = s1.split("").reverse().join("");
    if(s1==rev){result='a'}
    else{result='not a'}
    console.log(`The scentence "${scentence}" is ${result} palindrome`);
    readline.close()
})
```
---

* ### Capitalize first letter of each word
    Using the JavaScript language, have the function LetterCapitalize(str) take the str parameter being passed and capitalize the first letter of each word. Words will be separated by only one space.
```javascript
function LetterCapitalize(str) {
    let foo = str.split(" ");
    for(let i=0 ; i<foo.length ; i++){
       foo[i] = foo[i].charAt(0).toUpperCase() + foo[i].substring(1);
    }
    foo = foo.join(" ");
    return foo;
}
     
console.log('answer:', LetterCapitalize("i ran there"));
```
---

* ### Change letter
    Using the JavaScript language, have the function LetterChanges(str) take the str parameter being passed and modify it using the following algorithm.   Replace every letter in the string with the letter following it in the alphabet (ie. c becomes d, z becomes a). Then capitalize every vowel in this new string (a, e, i, o, u) and finally return this modified string.  
       
    Input : "hello*3"  Output : "Ifmmp*3" Input : "fun times!" Output : "gvO Ujnft!" 
```javascript
function LetterChanges(str) { 
    let copy = str;
    for (let i = 0; i < str.length; i++) {
        if(copy[i].match(/^[A-Za-z]+$/)){
            let foo = String.fromCharCode(copy.charCodeAt(i) + 1);
            // console.log('foo', foo);
            // console.log('copy', copy);
            copy = copy.replace( copy[i] , foo);
        }
    }
    for (let i = 0; i < copy.length; i++) {
        if(copy[i].match(/[aeiouAEIOU]/)){
            copy = copy.replace(copy[i],copy[i].toUpperCase());
            // console.log('copy:', copy);
        }
    }
    return copy;       
}
 
console.log('answer:', LetterChanges("hello*3")); 
console.log('answer:', LetterChanges("fun times!"));
```
---
* ### Find sum of all border elements of a matrix
```javascript
const a = [
    [1,1,1,1,1],
    [5,1,1,1,7],
    [3,1,1,1,5],
    [2,2,2,2,2]
]

const nrows = a.length;         //4
const ncols = a[0].length;      //5

const arrSum = arr => arr.reduce((total,no) => total + no, 0)
// console.log(arrSum([1,2,3]));

console.log('sum of first row', arrSum(a[0]));               //sum of first row
console.log('sum of last row', arrSum(a[nrows - 1]));        //sum of last row
sum = arrSum(a[0]) + arrSum(a[nrows - 1]) ;

for (let i = 1; i < nrows-1 ; i++) {
    sum += a[i][0] + a[i][ncols - 1];
}                                                // adding first n last ele of remaining rows

console.log('sum of border elements of matrix is:', sum)
```
---

* ### Max () operator
```javascript
console.log(Math.max());
// -Infinity

console.log( Math.max([1,2,3]));
// NaN

console.log( Math.max(...[1,2,3]));
// 3
```
---

* ### Number.MIN_VALUE 
    Number.MIN_VALUE is a number closest to zero that can be represented in js
```javascript
let i = Number.MIN_VALUE;
console.log('i:', i);           //5e-324

console.log(i*i);               //0
console.log(i+1);               //1
console.log(i-1);               //-1
console.log(i/i);               //1
```
---



* ### Higher order functions
A Higher order function is a function that takes a function as an argument or a function that returns a function as an argument
```javascript
//1- a function that accepts a function as an argument
document.addEventListener('click',myFunction);
function myFunction(){
    console.log('You clicked ..');
}

//2- a function that returns a function as an argument
function MultiplyMe(multiplier){
    return function(x){
        return x * multiplier; 
    }
}

let doubleMe = MultiplyMe(2);
let tripleMe = MultiplyMe(3);

console.log(doubleMe(10));
console.log(tripleMe(5));

//3- Useful higher order function examples (that are a part of core js)
// forEach is a function that takes a function as an argument and runs it for each ele in an array
let colors=['red','green','yellow','blue','grey'];
colors.forEach(saySomething);

function saySomething(color){
    console.log(`${color} is a great color`);
}
```
---

* ### Fetch and query data from an API using Axios in node
```javascript
const axios = require('axios');

async function getData(){
    try {
        const blob = await axios.get('http://www.espncricinfo.com/ci/engine/match/1157752.json'); 
        console.log("data successfully fetched");
        // console.log('innings', blob.data.innings[0].runs);
        const i1 = blob.data.innings[0].runs;
        const w1 = blob.data.innings[1].runs;
        const w2 = blob.data.innings[2].runs;
        console.log("Runs scored by India in first inning : "+ i1);
        console.log("Runs scored by West Indies in first inning : "+ w1);
        console.log("India enforced a follow-on");
        console.log("Runs scored by West Indies in second inning : "+ w2);
    } catch (error) {
        console.log("error fetching");
    }   
}
getData();
```
---



* ### Input output from terminal in node
```javascript
const readline = require('readline').createInterface({input: process.stdin,output: process.stdout})

readline.question(`Enter your name: `, (name) => {
    console.log(`Hello ${name}, Welcome`);
    readline.close()
})
```
---
* ### Javascript Clock
```javascript
const secondHand = document.querySelector('.sec');
const minuteHand = document.querySelector('.min');
const hourHand = document.querySelector('.hour');

function setDate() {
   const now = new Date();
   //console.log(now);
   const seconds = now.getSeconds();
   const minutes = now.getMinutes();
   let hours = now.getHours();
   if (hours > 12) {
       hours = hours - 12;
   }
   console.log(` ${hours}hr ${minutes}min ${seconds}sec`);
   // 0s is 0deg , 30s is 180deg , 60s is 360deg
   // 1hr 30deg ,3hr 90deg , 6hr 180deg, 12hr 0deg 
   const secondDegrees = ((seconds/60) * 360) - 90 ;
   const minuteDegrees = ((minutes/60) * 360) - 90 ;
   const hourDegrees = ((hours/12) * 360) - 90 ;
   //console.log(secondDegrees);
   secondHand.style.transform = `rotate(${secondDegrees}deg)` ;
   minuteHand.style.transform = `rotate(${minuteDegrees}deg)` ;
   hourHand.style.transform = `rotate(${hourDegrees}deg)` ;

}
setInterval(setDate,1000);
```
---
* ### Ajax request to an API
```javascript
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET','https://poojavpatel.github.io/ajaxtest/pets.json');
ourRequest.onload = function(){
	console.log(ourRequest.responseText);

	ourData = ourRequest.responseText;
	console.log(ourData[0]);  /* returns only [ */
	a = ourData[1].species;
	console.log(a);  /*this is undefined:( */
	/*happens as browser sees it as text file | we need to specify its JSON*/

	myData = JSON.parse(ourRequest.responseText);
	console.log(myData[0]);
	a = myData[1].species;
        b = myData[1].name;
        c = myData[1].foods.likes[1];
	console.log(a,b,c);

};
ourRequest.send();
```
---
* ### Title
```javascript
code
```
---




* ### Title
```javascript
code
```
---


fetch call is sent from main call stack to web api call stack
once it is done everything is pushed back to call back queue
Event loop keeps on looking at the main call stack,

What is callback


Mocha is test runner
chai is an insertion library

Jest is testing framework

blanket and jscoverage , instanbul - for code coverage

closure


## Javascript - The wierd parts

1. ### Closure
    JavaScript variables can belong to the local or global scope.   
    Global variables can be made local (private) with closures.   

    > Global and local variables with the same name are different variables. Modifying one, does not modify the other.   
    > Variables created without the keyword var, are always global, even if they are created inside a function.

    ```javascript
    /*To use a closure, simply define a function inside another function and expose it. To expose a function, return it or pass it to another function.

    The inner function will have access to the variables in the outer function scope, even after the outer function has returned.*/

    var add = (function () {
    var counter = 0;
    return function () {counter += 1; return counter}
    })();
    ```
    The variable add is assigned the return value of a self-invoking function.

    The self-invoking function only runs once. It sets the counter to zero (0), and returns a function expression.

    This way add becomes a function. The "wonderful" part is that it can access the counter in the parent scope.

    This is called a JavaScript closure. It makes it possible for a function to have "private" variables.

    The counter is protected by the scope of the anonymous function, and can only be changed using the add function.
    > A closure is a function having access to the parent scope, even after the parent function has closed.
    ---


1. ### Hoisting

```javascript

```

1. ### Scope and Context

```javascript

```

1. ### Hoisting

```javascript

```

1. ### Hoisting

```javascript

```

### Asynchronous Javascript

Asynchronous JavaScript is Javascript code which has some calls or functions(that take long time to execute) that run without affecting the current flow of execution

The Problem - 
```javascript
const posts =[
    { title:"Post 1", body:"This is Post 1" },
    { title:"Post 2", body:"This is Post 2" }
];

// Getting posts takes 1 sec
function getPosts(){
    setTimeout(() => {
        let output = '';
        posts.forEach((post) => {
            output += `${post.title} \n`
        })
        console.log(output);
    },1000)
}

// Creating a post takes 2 sec
function createPost(post){
    setTimeout(() => {
        posts.push(post)
    },2000)
}

getPosts();
createPost({ title:"Post 3", body:"This is Post 3" })
```
Output - 
```javascript
Post 1
Post 2

```

### The getPosts returns only two posts as the third post took more time to be created
---
The Solution - 
We deal with this using

1. ### Call Backs   

    > A callback is a function that is to be executed after another function has finished executing   
    
    Here we pass the getPosts as a callback to createPost    
    ie. getPost will run once createPost is done

1. ### Promise

    >Promise constructor takes only one argument,a callback function.\
    Callback function takes two arguments, resolve and reject\
    Perform operations inside the callback function and if everything went well then call resolve.\
    If desired operations do not go well then call reject.

    >Promises can be consumed by registering functions using .then and .catch methods.   
    then()   
    then() is invoked when a promise is resolved   
    catch()   
    catch() is invoked when a promise is either rejected or some error has occured in execution.

    Let the createPost return a promise  
    If the promise is "resolved" , "then" call the getPosts   
    else if the promise is "rejected" , "catch" and display the error msg

1. ### Async-await
    > Async-await is a special syntax to work with promises in a more comfortable fashion   
    Async functions are created by prepending the word async before the function declaration   
    Asynchronous functions can be paused with await, the keyword that can only be used inside an async function. Await returns whatever the async function returns when it is done.

    we declare an async function a and inside the function await for the promise   
    after that we call the getPosts
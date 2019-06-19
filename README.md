# Its_all_Javascript
A collection of all pure JS (ES6) code snippets 

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
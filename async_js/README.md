### Asynchronous Javascript

Asynchronous 

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
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
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);

            const error = false;
            if(!error){
                resolve();
            }else{
                reject("Something went wrong!!");
            }
        },2000)
    })
}

createPost({ title:"Post 3", body:"This is Post 3" })
    .then(getPosts)
    .catch(err => console.log(err));

// Promise.all - resolved if all promises are resolved
// Promise.all([promise1, promise2, promise3]).then((values) => console.log(values));
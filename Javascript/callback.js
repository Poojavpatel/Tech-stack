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
function createPost(post , callback){
    setTimeout(() => {
        posts.push(post);
        callback();
    },2000)
}

createPost({ title:"Post 3", body:"This is Post 3" },getPosts);

// console.log('Hi');
// setTimeout(() => {
//     console.log('I am a callback function');
// },0)
// console.log('Finish');
// console.log('Hi');
// setTimeout(() => {
//     console.log('I am a callback function');
// },2000)

// console.log('Finish');

console.log('Hi');
setTimeout(() => {
    console.log('I am a slower callback function');
},3000)
console.log('Hello');
setTimeout(() => {
    console.log('I am a faster callback function');
},1000)
console.log('Done');
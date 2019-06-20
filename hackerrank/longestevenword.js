const scent = "hey";
const words = scent.split(" ");

console.log(words);

const evenwords = words.filter((word)=>{
    if(word.length % 2 == 0){
        return true;
    }
    }).sort((a,b) => {
    return a.length < b.length;
})
console.log(evenwords.length);


if(evenwords.length != 0){
    console.log(evenwords[0]);
}else{
    console.log("00");
}




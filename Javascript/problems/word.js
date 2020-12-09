const word="apple"

res = word.split('').reverse();
res.splice(2,res.length)
console.log(res);
res = res.join(" ");
console.log(res);

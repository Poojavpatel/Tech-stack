numbers=[10,20,30];

const summition = numbers.reduce((sum,no) => {
    return sum+no;
},0);

console.log(summition)
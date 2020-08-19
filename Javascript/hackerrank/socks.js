const n=9;
const ar=[10,20,20,10,10,30,50,10,20];
const alt =[];
var count =0;

for(var i=0 ; i<n ; i++){
    if(alt.includes(ar[i])){
        var ind = alt.indexOf(ar[i]);
        alt.splice(ind,1);
        console.log(alt);
        count = count + 1;
    }
    else{
        alt.push(ar[i]);
        console.log(alt);
    }
}
console.log("Pairs are :",count);
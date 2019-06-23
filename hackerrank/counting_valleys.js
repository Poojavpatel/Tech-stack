class Stack{
    constructor(){
        this.items=[];
        this.mountain=0;
        this.valley=0;
    }
    push(item){
        this.items.push(item);
    }
    pop(){
        if (this.items.length == 0) 
            return "Underflow"; 
        return this.items.pop();
    }
    peek() 
    {
        return this.items[this.items.length - 1]; 
    }
    stacklength(){
        return this.items.length;
    }
}
const hill = new Stack();

function countValley(n, s){
    console.log(s);
    var pointer =0;
    if(s[pointer] == 'U')
}

function OneHill( s, nextind ){
    const firstchar = s[nextind];
    console.log("Added as",firstchar);
    hill.push(firstchar);
    var i = nextind + 1;
    while(hill.stacklength() && i<n ){
        (s[i] == firstchar) ? hill.push(firstchar) : hill.pop();
        console.log('hill:',hill.items);
        i = i+1;
    }
}

// countValley(8,['D','D','U','U','U','U','D','D']);
// countValley(8,['U','D','D','D','U','D','U','U']);
countValley(12,['U','U','U','D','U','D','D','D','D','D','U','U']);
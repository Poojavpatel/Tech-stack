class Stack{
    constructor(){
        this.items=[];
        this.count=0;
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
const mountain = new Stack();
const valley = new Stack();

function countValley(n,s){
    var nextind = 0;
    console.log(s);
    if(s[nextind] == 'U'){
        mountain.push('U');
        var i=1;
        while(mountain.stacklength() && i<n){
            (s[i] == 'U') ? mountain.push('U') : mountain.pop();
            console.log('Mountain:',mountain.items);
            i=i+1;
        }
        mountain.count += 1;
        nextind = i;
        console.log('Next index',nextind);
    }
    elseif()
};

// countValley(8,['D','D','U','U','U','U','D','D']);
// countValley(8,['U','D','D','D','U','D','U','U']);
countValley(12,['U','U','U','D','U','D','D','D','D','D','U','U']);
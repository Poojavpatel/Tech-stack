class Stack{
    constructor(){
        this.items=[]
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
}

function countValley(n,s){
    console.log(s)
    if(s[0]=='U'){

        while
    }elseif(s[0] == 'D'){

    }
};

countValley(8,['D','D','U','U','U','U','D','D']);
countValley(8,['U','D','D','D','U','D','U','U']);
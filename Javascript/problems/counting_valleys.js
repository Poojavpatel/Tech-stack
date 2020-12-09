class Stack{
    constructor(){
        this.items=[];
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
    // console.log(s);
    let valleys = 0;
    let index=0;
    while(index<n){
        if(s[index]=='U'){
            hill.push('U');
            let i=index+1;
            while(i<n && hill.stacklength()){
                (s[i]=='U')?hill.push('U'):hill.pop();
                // console.log(hill.items);
                i+=1;
            }
            index=i;
            // console.log("index",i);
        }
        else{
            hill.push('D');
            let i=index+1;
            while(i<n && hill.stacklength()){
                (s[i]=='D')?hill.push('D'):hill.pop();
                // console.log(hill.items);
                i+=1;
            }
            valleys += 1;
            // console.log("Valleys",valleys);
            index=i;
            // console.log("index",i);
        }
    }
    return valleys;
}

// countValley(8,['D','D','U','U','U','U','D','D']);                    //Valleys=1
// countValley(8,['U','D','D','D','U','D','U','U']);                    //Valleys=1
countValley(12,['U','U','U','D','U','D','D','D','D','D','U','U']);      //Valleys=1
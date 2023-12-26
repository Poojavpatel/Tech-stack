// Union type: number or string
let myVariable: number | string;

myVariable = 42;      
myVariable = "Hello"; 
// myVariable = true;

// Another way of defining a union type
type numberOrStringType = number | string;
let myVariable2 : numberOrStringType;

myVariable2 = 42;
myVariable2 = "Hello";
// myVariable2 = true;

/* Generics */
function identity<T>(arg: T): T {
  return arg;
}

const numberIdentity: number = identity(42);
const stringIdentity: string = identity("Hello");

const result1: number = identity<number>(42);
// const result2: number = identity<string>("Hello");  

type abc = "a" | "b" | "c";
type RemoveC<TType> = TType extends "c" ? never : TType;
type ab = RemoveC<abc>;
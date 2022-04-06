const hasNumber = (testString) => {
    return /\d/.test(testString);
}

// console.log(hasNumber('123456'));     // true
// console.log(hasNumber('abcdef'));     // false
// console.log(hasNumber('123abc'));     // true
// console.log(hasNumber('abc123'));     // true
// console.log(hasNumber('abc123abc'));  // true

const isNumeric = (testString) => {
    return /^\d+$/.test(testString);
}

console.log(isNumeric('123456'));     // true
console.log(isNumeric('abcdef'));     // false
console.log(isNumeric('123abc'));     // false
console.log(isNumeric('abc123'));     // false
console.log(isNumeric('abc123abc'));  // false 

// const check = (testString) => {
//     return .test(testString);
// }
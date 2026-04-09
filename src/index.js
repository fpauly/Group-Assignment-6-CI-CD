'use strict';

const { add, subtract, multiply, divide } = require('./calculator');

console.log('Calculator Demo');
console.log('---------------');
console.log(`add(5, 3)        = ${add(5, 3)}`);
console.log(`subtract(10, 4)  = ${subtract(10, 4)}`);
console.log(`multiply(6, 7)   = ${multiply(6, 7)}`);
console.log(`divide(15, 3)    = ${divide(15, 3)}`);

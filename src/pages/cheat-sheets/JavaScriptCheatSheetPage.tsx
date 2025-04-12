import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaJs, FaSearch } from 'react-icons/fa';
import CheatSheetCategoryIndex from '../../components/cheat-sheets/CheatSheetCategoryIndex';

// Interface for command data
interface JavaScriptExample {
  code: string;
  description: string;
  output?: string;
}

// Interface for command category
interface CodeCategory {
  title: string;
  examples: JavaScriptExample[];
}

// JavaScript code examples organized by category
const javascriptExamplesData: CodeCategory[] = [
  {
    title: 'Variables & Declarations',
    examples: [
      {
        code: '// var (function-scoped, hoisted)\nvar x = 10;\n\n// let (block-scoped, not hoisted)\nlet y = 20;\n\n// const (block-scoped, immutable binding, not hoisted)\nconst z = 30;',
        description: 'Variable declarations with var, let, and const',
      },
      {
        code: '// var can be redeclared\nvar count = 1;\nvar count = 2; // Valid\n\n// let and const cannot be redeclared\nlet name = "John";\n// let name = "Jane"; // SyntaxError\n\n// const cannot be reassigned\nconst PI = 3.14;\n// PI = 3.14159; // TypeError',
        description: 'Redeclaration and reassignment rules',
      },
      {
        code: '// Block scope with let and const\n{\n  let blockScoped = "I am block-scoped";\n  const alsoBlockScoped = "Me too";\n  var notBlockScoped = "I am function-scoped";\n}\n\n// console.log(blockScoped); // ReferenceError\n// console.log(alsoBlockScoped); // ReferenceError\nconsole.log(notBlockScoped); // "I am function-scoped"',
        description: 'Block scope demonstration',
      },
      {
        code: '// Temporal Dead Zone (TDZ)\n// console.log(tdz); // ReferenceError\nlet tdz = "Temporal Dead Zone";',
        description: 'Temporal Dead Zone with let and const',
      },
    ],
  },
  {
    title: 'Data Types',
    examples: [
      {
        code: '// Primitive types\nconst num = 42;           // Number\nconst float = 3.14;       // Number (floating point)\nconst str = "Hello";      // String\nconst bool = true;        // Boolean\nconst n = null;           // Null\nconst u = undefined;      // Undefined\nconst sym = Symbol("id"); // Symbol (unique identifier)\nconst bigInt = 9007199254740991n; // BigInt\n\n// Check type\nconsole.log(typeof num);    // "number"\nconsole.log(typeof str);    // "string"\nconsole.log(typeof bool);   // "boolean"\nconsole.log(typeof n);      // "object" (historical bug)\nconsole.log(typeof u);      // "undefined"\nconsole.log(typeof sym);    // "symbol"\nconsole.log(typeof bigInt); // "bigint"',
        description: 'Primitive data types and typeof operator',
      },
      {
        code: '// Object types\nconst obj = { name: "John", age: 30 };  // Object\nconst arr = [1, 2, 3];                  // Array\nconst func = function() { return 42; }; // Function\nconst date = new Date();               // Date\nconst regex = /\\d+/g;                  // RegExp\nconst map = new Map();                 // Map\nconst set = new Set();                 // Set\n\n// Check type\nconsole.log(typeof obj);   // "object"\nconsole.log(typeof arr);   // "object"\nconsole.log(typeof func);  // "function"\nconsole.log(typeof date);  // "object"\nconsole.log(typeof regex); // "object"\nconsole.log(typeof map);   // "object"\nconsole.log(typeof set);   // "object"\n\n// Better type checking\nconsole.log(Array.isArray(arr));           // true\nconsole.log(obj instanceof Object);         // true\nconsole.log(date instanceof Date);          // true\nconsole.log(Object.prototype.toString.call(arr)); // "[object Array]"',
        description: 'Object data types and type checking',
      },
      {
        code: '// String methods\nconst text = "  Hello, World!  ";\nconsole.log(text.length);        // 16\nconsole.log(text.trim());         // "Hello, World!"\nconsole.log(text.toUpperCase());  // "  HELLO, WORLD!  "\nconsole.log(text.toLowerCase());  // "  hello, world!  "\nconsole.log(text.replace("Hello", "Hi")); // "  Hi, World!  "\nconsole.log(text.split(", "));    // ["  Hello", "World!  "]\nconsole.log(text.indexOf("World")); // 9\nconsole.log(text.includes("Hello")); // true\nconsole.log(text.startsWith("  He")); // true\nconsole.log(text.endsWith("!  ")); // true\nconsole.log(text.substring(2, 7)); // "Hello"\nconsole.log(text.slice(2, 7));    // "Hello"',
        description: 'Common string methods',
      },
      {
        code: '// Number methods\nconst num = 42.1234;\nconsole.log(num.toFixed(2));      // "42.12" (string)\nconsole.log(num.toPrecision(3));   // "42.1" (string)\nconsole.log(num.toString());      // "42.1234"\nconsole.log(parseInt("42.5"));    // 42\nconsole.log(parseFloat("42.5"));  // 42.5\nconsole.log(Number.isInteger(42)); // true\nconsole.log(Number.isNaN(NaN));   // true\nconsole.log(Number.isFinite(42)); // true\nconsole.log(Number.MAX_SAFE_INTEGER); // 9007199254740991\nconsole.log(Number.MIN_SAFE_INTEGER); // -9007199254740991',
        description: 'Number methods and properties',
      },
    ],
  },
  {
    title: 'Operators',
    examples: [
      {
        code: '// Arithmetic Operators\nlet a = 10, b = 3;\nconsole.log(a + b);  // 13 (Addition)\nconsole.log(a - b);  // 7 (Subtraction)\nconsole.log(a * b);  // 30 (Multiplication)\nconsole.log(a / b);  // 3.3333... (Division)\nconsole.log(a % b);  // 1 (Modulus/Remainder)\nconsole.log(a ** b); // 1000 (Exponentiation, ES2016)\n\n// Increment and Decrement\nlet c = 5;\nconsole.log(c++); // 5 (post-increment: returns, then increments)\nconsole.log(c);   // 6\nconsole.log(++c); // 7 (pre-increment: increments, then returns)\n\nlet d = 5;\nconsole.log(d--); // 5 (post-decrement)\nconsole.log(d);   // 4\nconsole.log(--d); // 3 (pre-decrement)',
        description: 'Arithmetic operators',
      },
      {
        code: '// Assignment Operators\nlet x = 10;     // Basic assignment\nx += 5;         // x = x + 5 (15)\nx -= 3;         // x = x - 3 (12)\nx *= 2;         // x = x * 2 (24)\nx /= 4;         // x = x / 4 (6)\nx %= 4;         // x = x % 4 (2)\nx **= 3;        // x = x ** 3 (8)\n\n// Logical assignment (ES2021)\nlet obj = { count: 0 };\n// Logical OR assignment (assigns if left side is falsy)\nobj.count ||= 10;  // obj.count = obj.count || 10 (10)\n\n// Logical AND assignment (assigns if left side is truthy)\nobj.count = 42;\nobj.count &&= 0;   // obj.count = obj.count && 0 (0)\n\n// Nullish coalescing assignment (assigns if left side is null/undefined)\nobj.count = undefined;\nobj.count ??= 5;   // obj.count = obj.count ?? 5 (5)',
        description: 'Assignment operators including logical assignment',
      },
      {
        code: '// Comparison Operators\nlet a = 5, b = "5";\nconsole.log(a == b);   // true (equality, type coercion)\nconsole.log(a === b);  // false (strict equality, no type coercion)\nconsole.log(a != b);   // false (inequality)\nconsole.log(a !== b);  // true (strict inequality)\nconsole.log(a > 3);    // true (greater than)\nconsole.log(a < 10);   // true (less than)\nconsole.log(a >= 5);   // true (greater than or equal)\nconsole.log(a <= 5);   // true (less than or equal)',
        description: 'Comparison operators',
      },
      {
        code: '// Logical Operators\nlet x = true, y = false;\nconsole.log(x && y);  // false (logical AND)\nconsole.log(x || y);  // true (logical OR)\nconsole.log(!x);      // false (logical NOT)\n\n// Short-circuit evaluation\nlet a = 0;\nlet b = a || 42;     // 42 (a is falsy, so b gets 42)\n\nlet c = "hello";\nlet d = c && "world"; // "world" (c is truthy, so d gets "world")\n\n// Nullish coalescing operator (ES2020)\nlet e = null;\nlet f = e ?? "default"; // "default" (e is null, so f gets "default")\n\nlet g = 0;\nlet h = g ?? "default"; // 0 (g is 0, not null/undefined, so h gets 0)',
        description: 'Logical operators and short-circuit evaluation',
      },
      {
        code: '// Ternary (Conditional) Operator\nlet age = 20;\nlet status = age >= 18 ? "adult" : "minor";\nconsole.log(status); // "adult"\n\n// Nested ternary\nlet score = 85;\nlet grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";\nconsole.log(grade); // "B"',
        description: 'Ternary (conditional) operator',
      },
      {
        code: '// Spread Operator (...)\n// With arrays\nconst arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]\nconsole.log(combined);\n\n// Clone an array\nconst original = [1, 2, 3];\nconst clone = [...original];\nconsole.log(clone); // [1, 2, 3]\n\n// With objects (ES2018)\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { b: 3, c: 4 }; // Note: b will be overwritten\nconst mergedObj = { ...obj1, ...obj2 }; // { a: 1, b: 3, c: 4 }\nconsole.log(mergedObj);\n\n// Clone an object\nconst originalObj = { x: 1, y: 2 };\nconst clonedObj = { ...originalObj };\nconsole.log(clonedObj); // { x: 1, y: 2 }',
        description: 'Spread operator with arrays and objects',
      },
      {
        code: '// Rest Parameter (...)\n// Collect remaining function arguments into an array\nfunction sum(...numbers) {\n  return numbers.reduce((total, num) => total + num, 0);\n}\n\nconsole.log(sum(1, 2, 3, 4, 5)); // 15\n\n// Rest with destructuring (arrays)\nconst [first, second, ...rest] = [1, 2, 3, 4, 5];\nconsole.log(first); // 1\nconsole.log(second); // 2\nconsole.log(rest); // [3, 4, 5]\n\n// Rest with destructuring (objects, ES2018)\nconst { a, b, ...remaining } = { a: 1, b: 2, c: 3, d: 4 };\nconsole.log(a); // 1\nconsole.log(b); // 2\nconsole.log(remaining); // { c: 3, d: 4 }',
        description: 'Rest parameter in functions and destructuring',
      },
    ],
  },
  {
    title: 'Control Flow',
    examples: [
      {
        code: '// if, else if, else\nconst age = 25;\n\nif (age < 18) {\n  console.log("Minor");\n} else if (age >= 18 && age < 65) {\n  console.log("Adult");\n} else {\n  console.log("Senior");\n}\n// Output: "Adult"',
        description: 'Conditional statements with if, else if, and else',
        output: 'Adult',
      },
      {
        code: '// switch statement\nconst day = "Monday";\n\nswitch (day) {\n  case "Monday":\n    console.log("Start of work week");\n    break;\n  case "Friday":\n    console.log("End of work week");\n    break;\n  case "Saturday":\n  case "Sunday":\n    console.log("Weekend");\n    break;\n  default:\n    console.log("Midweek");\n}\n// Output: "Start of work week"',
        description: 'Switch statement with cases and break',
        output: 'Start of work week',
      },
      {
        code: '// for loop\nfor (let i = 0; i < 3; i++) {\n  console.log(`Index: ${i}`);\n}\n// Output: "Index: 0", "Index: 1", "Index: 2"',
        description: 'Traditional for loop',
        output: 'Index: 0\nIndex: 1\nIndex: 2',
      },
      {
        code: '// for...of loop (ES6) - iterating over iterable values\nconst colors = ["red", "green", "blue"];\n\nfor (const color of colors) {\n  console.log(color);\n}\n// Output: "red", "green", "blue"',
        description: 'for...of loop for iterables (arrays, strings, etc.)',
        output: 'red\ngreen\nblue',
      },
      {
        code: '// for...in loop - iterating over object properties\nconst person = { name: "John", age: 30, job: "developer" };\n\nfor (const key in person) {\n  console.log(`${key}: ${person[key]}`);\n}\n// Output: "name: John", "age: 30", "job: developer"',
        description: 'for...in loop for object properties',
        output: 'name: John\nage: 30\njob: developer',
      },
      {
        code: '// while loop\nlet count = 0;\n\nwhile (count < 3) {\n  console.log(`Count: ${count}`);\n  count++;\n}\n// Output: "Count: 0", "Count: 1", "Count: 2"',
        description: 'while loop',
        output: 'Count: 0\nCount: 1\nCount: 2',
      },
      {
        code: '// do...while loop\nlet num = 0;\n\ndo {\n  console.log(`Number: ${num}`);\n  num++;\n} while (num < 3);\n// Output: "Number: 0", "Number: 1", "Number: 2"',
        description: 'do...while loop (always executes at least once)',
        output: 'Number: 0\nNumber: 1\nNumber: 2',
      },
      {
        code: '// break statement\nfor (let i = 0; i < 5; i++) {\n  if (i === 3) {\n    break; // exit the loop\n  }\n  console.log(`Item: ${i}`);\n}\n// Output: "Item: 0", "Item: 1", "Item: 2"',
        description: 'break statement to exit a loop',
        output: 'Item: 0\nItem: 1\nItem: 2',
      },
      {
        code: '// continue statement\nfor (let i = 0; i < 5; i++) {\n  if (i === 2) {\n    continue; // skip this iteration\n  }\n  console.log(`Value: ${i}`);\n}\n// Output: "Value: 0", "Value: 1", "Value: 3", "Value: 4"',
        description: 'continue statement to skip an iteration',
        output: 'Value: 0\nValue: 1\nValue: 3\nValue: 4',
      },
      {
        code: '// labeled statements\nouterLoop: for (let i = 0; i < 3; i++) {\n  for (let j = 0; j < 3; j++) {\n    if (i === 1 && j === 1) {\n      break outerLoop; // break out of outer loop\n    }\n    console.log(`i=${i}, j=${j}`);\n  }\n}\n// Output: "i=0, j=0", "i=0, j=1", "i=0, j=2", "i=1, j=0"',
        description: 'Labeled statements with break and continue',
        output: 'i=0, j=0\ni=0, j=1\ni=0, j=2\ni=1, j=0',
      },
    ],
  },
  {
    title: 'Functions',
    examples: [
      {
        code: '// Function Declaration\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("John")); // "Hello, John!"',
        description: 'Function declaration syntax',
        output: 'Hello, John!',
      },
      {
        code: '// Function Expression\nconst sayHello = function(name) {\n  return `Hello, ${name}!`;\n};\n\nconsole.log(sayHello("Jane")); // "Hello, Jane!"',
        description:
          'Function expression (anonymous function assigned to a variable)',
        output: 'Hello, Jane!',
      },
      {
        code: '// Arrow Function (ES6)\nconst add = (a, b) => a + b; // Implicit return\nconsole.log(add(5, 3)); // 8\n\n// Multi-line arrow function\nconst multiply = (a, b) => {\n  const result = a * b;\n  return result;\n};\nconsole.log(multiply(4, 2)); // 8',
        description: 'Arrow function syntax with implicit and explicit returns',
        output: '8\n8',
      },
      {
        code: '// Default Parameters (ES6)\nfunction greetUser(name = "Guest", greeting = "Hello") {\n  return `${greeting}, ${name}!`;\n}\n\nconsole.log(greetUser()); // "Hello, Guest!"\nconsole.log(greetUser("John")); // "Hello, John!"\nconsole.log(greetUser("Jane", "Welcome")); // "Welcome, Jane!"',
        description: 'Function parameters with default values',
        output: 'Hello, Guest!\nHello, John!\nWelcome, Jane!',
      },
      {
        code: '// Rest Parameters (ES6)\nfunction sum(...numbers) {\n  return numbers.reduce((total, num) => total + num, 0);\n}\n\nconsole.log(sum(1, 2, 3)); // 6\nconsole.log(sum(1, 2, 3, 4, 5)); // 15',
        description: 'Rest parameters to collect multiple arguments',
        output: '6\n15',
      },
      {
        code: '// Immediately Invoked Function Expression (IIFE)\n(function() {\n  const secret = "I am private";\n  console.log(secret);\n})();\n// Output: "I am private"\n\n// IIFE with arrow function\n(() => {\n  const secret = "I am also private";\n  console.log(secret);\n})();\n// Output: "I am also private"',
        description: 'Immediately Invoked Function Expression (IIFE)',
        output: 'I am private\nI am also private',
      },
      {
        code: '// Closures\nfunction createCounter() {\n  let count = 0; // This variable is enclosed in the returned function\n  \n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\nconsole.log(counter()); // 3',
        description:
          'Closures: functions that remember their lexical environment',
        output: '1\n2\n3',
      },
      {
        code: '// Function methods: call, apply, bind\nconst person = {\n  name: "John",\n  greet: function(greeting) {\n    return `${greeting}, I am ${this.name}`;\n  }\n};\n\nconst anotherPerson = { name: "Jane" };\n\n// call: invoke with a specific \'this\' and individual arguments\nconsole.log(person.greet.call(anotherPerson, "Hi")); // "Hi, I am Jane"\n\n// apply: invoke with a specific \'this\' and arguments as an array\nconsole.log(person.greet.apply(anotherPerson, ["Hello"])); // "Hello, I am Jane"\n\n// bind: creates a new function with a bound \'this\'\nconst janeGreet = person.greet.bind(anotherPerson);\nconsole.log(janeGreet("Hey")); // "Hey, I am Jane"',
        description: 'Function methods: call, apply, and bind',
        output: 'Hi, I am Jane\nHello, I am Jane\nHey, I am Jane',
      },
      {
        code: '// Generator Functions (ES6)\nfunction* countUp(max) {\n  for (let i = 0; i < max; i++) {\n    yield i;\n  }\n}\n\nconst generator = countUp(3);\nconsole.log(generator.next()); // { value: 0, done: false }\nconsole.log(generator.next()); // { value: 1, done: false }\nconsole.log(generator.next()); // { value: 2, done: false }\nconsole.log(generator.next()); // { value: undefined, done: true }',
        description: 'Generator functions with yield',
        output:
          '{ value: 0, done: false }\n{ value: 1, done: false }\n{ value: 2, done: false }\n{ value: undefined, done: true }',
      },
    ],
  },
  {
    title: 'Arrays',
    examples: [
      {
        code: '// Creating arrays\nconst fruits = ["apple", "banana", "orange"]; // Array literal\nconst numbers = new Array(1, 2, 3);       // Array constructor\nconst emptyArray = [];                    // Empty array\nconst filledArray = Array(3).fill("x");   // Create array with 3 "x" values\nconsole.log(filledArray); // ["x", "x", "x"]',
        description: 'Different ways to create arrays',
        output: '["x", "x", "x"]',
      },
      {
        code: '// Accessing array elements\nconst colors = ["red", "green", "blue"];\nconsole.log(colors[0]);      // "red" (first element)\nconsole.log(colors[2]);      // "blue" (third element)\nconsole.log(colors[colors.length - 1]); // "blue" (last element)\nconsole.log(colors.at(-1));   // "blue" (last element using at() - ES2022)',
        description: 'Accessing array elements by index',
        output: 'red\nblue\nblue\nblue',
      },
      {
        code: '// Basic array methods\nconst fruits = ["apple", "banana"];\n\n// Add elements\nfruits.push("orange");     // Add to end\nfruits.unshift("mango");   // Add to beginning\nconsole.log(fruits); // ["mango", "apple", "banana", "orange"]\n\n// Remove elements\nconst last = fruits.pop();   // Remove from end\nconst first = fruits.shift(); // Remove from beginning\nconsole.log(last);   // "orange"\nconsole.log(first);  // "mango"\nconsole.log(fruits); // ["apple", "banana"]',
        description: 'Basic array methods for adding and removing elements',
        output:
          '["mango", "apple", "banana", "orange"]\norange\nmango\n["apple", "banana"]',
      },
      {
        code: '// Array transformation methods\nconst numbers = [1, 2, 3, 4, 5];\n\n// map: transform each element\nconst doubled = numbers.map(num => num * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]\n\n// filter: keep elements that pass a test\nconst evens = numbers.filter(num => num % 2 === 0);\nconsole.log(evens); // [2, 4]\n\n// reduce: accumulate values\nconst sum = numbers.reduce((total, num) => total + num, 0);\nconsole.log(sum); // 15\n\n// find: get first element that passes a test\nconst found = numbers.find(num => num > 3);\nconsole.log(found); // 4\n\n// findIndex: get index of first element that passes a test\nconst foundIndex = numbers.findIndex(num => num > 3);\nconsole.log(foundIndex); // 3',
        description: 'Array transformation methods (map, filter, reduce, find)',
        output: '[2, 4, 6, 8, 10]\n[2, 4]\n15\n4\n3',
      },
      {
        code: '// Other useful array methods\nconst letters = ["a", "b", "c", "d"];\n\n// slice: extract a portion (non-destructive)\nconst sliced = letters.slice(1, 3);\nconsole.log(sliced);  // ["b", "c"]\nconsole.log(letters); // ["a", "b", "c", "d"] (original unchanged)\n\n// splice: change contents by removing/replacing elements (destructive)\nconst removed = letters.splice(1, 2, "x", "y");\nconsole.log(removed); // ["b", "c"] (removed elements)\nconsole.log(letters); // ["a", "x", "y", "d"] (modified array)\n\n// join: combine elements into a string\nconsole.log(letters.join("-")); // "a-x-y-d"\n\n// includes: check if array contains a value\nconsole.log(letters.includes("x")); // true\n\n// indexOf: find index of an element\nconsole.log(letters.indexOf("y")); // 2\nconsole.log(letters.indexOf("z")); // -1 (not found)',
        description:
          'Other useful array methods (slice, splice, join, includes, indexOf)',
        output:
          '["b", "c"]\n["a", "b", "c", "d"]\n["b", "c"]\n["a", "x", "y", "d"]\na-x-y-d\ntrue\n2\n-1',
      },
      {
        code: '// Array sorting\nconst fruits = ["orange", "apple", "banana"];\n\n// sort: sort elements in place (alphabetically by default)\nfruits.sort();\nconsole.log(fruits); // ["apple", "banana", "orange"]\n\n// Custom sort (numbers)\nconst numbers = [10, 5, 8, 1, 7];\nnumbers.sort((a, b) => a - b); // Ascending\nconsole.log(numbers); // [1, 5, 7, 8, 10]\n\nnumbers.sort((a, b) => b - a); // Descending\nconsole.log(numbers); // [10, 8, 7, 5, 1]',
        description: 'Sorting arrays with sort() method',
        output:
          '["apple", "banana", "orange"]\n[1, 5, 7, 8, 10]\n[10, 8, 7, 5, 1]',
      },
      {
        code: '// Array destructuring (ES6)\nconst colors = ["red", "green", "blue", "yellow", "purple"];\n\n// Basic destructuring\nconst [first, second] = colors;\nconsole.log(first, second); // "red" "green"\n\n// Skip elements\nconst [, , third] = colors;\nconsole.log(third); // "blue"\n\n// Rest pattern\nconst [primary, ...secondary] = colors;\nconsole.log(primary);   // "red"\nconsole.log(secondary); // ["green", "blue", "yellow", "purple"]\n\n// Default values\nconst [a, b, c = "default"] = ["one", "two"];\nconsole.log(c); // "default"',
        description: 'Array destructuring assignment',
        output:
          'red green\nblue\nred\n["green", "blue", "yellow", "purple"]\ndefault',
      },
      {
        code: '// Array iteration methods\nconst numbers = [1, 2, 3];\n\n// forEach: execute a function for each element\nnumbers.forEach(num => console.log(num * 2));\n// Output: 2, 4, 6\n\n// some: check if at least one element passes a test\nconst hasEven = numbers.some(num => num % 2 === 0);\nconsole.log(hasEven); // true\n\n// every: check if all elements pass a test\nconst allPositive = numbers.every(num => num > 0);\nconsole.log(allPositive); // true\n\n// flat: flatten nested arrays (ES2019)\nconst nested = [1, [2, [3, 4]]];\nconsole.log(nested.flat());    // [1, 2, [3, 4]]\nconsole.log(nested.flat(2));   // [1, 2, 3, 4]',
        description: 'Array iteration methods (forEach, some, every, flat)',
        output: '2\n4\n6\ntrue\ntrue\n[1, 2, [3, 4]]\n[1, 2, 3, 4]',
      },
    ],
  },
  {
    title: 'Objects',
    examples: [
      {
        code: '// Object creation\nconst person = {           // Object literal\n  name: "John",\n  age: 30,\n  isEmployed: true\n};\n\nconst emptyObject = {};    // Empty object\nconst user = new Object(); // Object constructor\nuser.name = "Jane";\nuser.age = 25;\n\n// Object.create()\nconst prototype = { species: "human" };\nconst student = Object.create(prototype);\nstudent.name = "Alice";\nconsole.log(student.name);    // "Alice"\nconsole.log(student.species); // "human" (inherited)',
        description: 'Different ways to create objects',
        output: 'Alice\nhuman',
      },
      {
        code: '// Accessing object properties\nconst user = { name: "John", age: 30 };\n\n// Dot notation\nconsole.log(user.name); // "John"\n\n// Bracket notation\nconsole.log(user["age"]); // 30\n\n// Dynamic property access\nconst prop = "name";\nconsole.log(user[prop]); // "John"\n\n// Default values with OR operator\nconsole.log(user.email || "No email provided"); // "No email provided"\n\n// Default values with nullish coalescing\nconsole.log(user.email ?? "No email provided"); // "No email provided"',
        description: 'Ways to access object properties',
        output: 'John\n30\nJohn\nNo email provided\nNo email provided',
      },
      {
        code: '// Object methods\nconst calculator = {\n  value: 0,\n  add(x) {\n    this.value += x;\n    return this;\n  },\n  subtract(x) {\n    this.value -= x;\n    return this;\n  },\n  getValue() {\n    return this.value;\n  }\n};\n\n// Method chaining\nconst result = calculator.add(5).subtract(2).getValue();\nconsole.log(result); // 3',
        description: 'Object methods and method chaining',
        output: '3',
      },
      {
        code: '// Object property shorthand (ES6)\nconst name = "Alice";\nconst age = 25;\n\n// Instead of { name: name, age: age }\nconst person = { name, age };\nconsole.log(person); // { name: "Alice", age: 25 }\n\n// Computed property names (ES6)\nconst propName = "job";\nconst user = {\n  name: "Bob",\n  [propName]: "Developer" // Computed property name\n};\nconsole.log(user); // { name: "Bob", job: "Developer" }',
        description: 'Object property shorthand and computed property names',
        output: '{ name: "Alice", age: 25 }\n{ name: "Bob", job: "Developer" }',
      },
      {
        code: '// Object destructuring (ES6)\nconst person = {\n  name: "John",\n  age: 30,\n  address: {\n    city: "New York",\n    country: "USA"\n  }\n};\n\n// Basic destructuring\nconst { name, age } = person;\nconsole.log(name, age); // "John" 30\n\n// Destructuring with new variable names\nconst { name: userName, age: userAge } = person;\nconsole.log(userName, userAge); // "John" 30\n\n// Nested destructuring\nconst { address: { city, country } } = person;\nconsole.log(city, country); // "New York" "USA"\n\n// Default values\nconst { name: n, job = "Unknown" } = person;\nconsole.log(n, job); // "John" "Unknown"\n\n// Rest pattern\nconst { name: nm, ...rest } = person;\nconsole.log(nm);   // "John"\nconsole.log(rest); // { age: 30, address: { city: "New York", country: "USA" } }',
        description: 'Object destructuring assignment',
        output:
          'John 30\nJohn 30\nNew York USA\nJohn Unknown\nJohn\n{ age: 30, address: { city: "New York", country: "USA" } }',
      },
      {
        code: '// Object methods from Object class\nconst person = { name: "John", age: 30 };\nconst address = { city: "New York", country: "USA" };\n\n// Object.keys(): get array of property names\nconsole.log(Object.keys(person)); // ["name", "age"]\n\n// Object.values(): get array of property values\nconsole.log(Object.values(person)); // ["John", 30]\n\n// Object.entries(): get array of [key, value] pairs\nconsole.log(Object.entries(person)); // [["name", "John"], ["age", 30]]\n\n// Object.assign(): copy properties from one object to another\nconst merged = Object.assign({}, person, address);\nconsole.log(merged); // { name: "John", age: 30, city: "New York", country: "USA" }\n\n// Object.freeze(): prevent object modification\nObject.freeze(person);\n// person.age = 31; // Error in strict mode, silently fails otherwise\n\n// Object.seal(): prevent adding/removing properties\nObject.seal(address);\n// address.zip = "10001"; // Error in strict mode, silently fails otherwise',
        description: 'Static methods from Object class',
        output:
          '["name", "age"]\n["John", 30]\n[["name", "John"], ["age", 30]]\n{ name: "John", age: 30, city: "New York", country: "USA" }',
      },
      {
        code: '// Optional chaining (ES2020)\nconst user = {\n  name: "Alice",\n  address: {\n    city: "Boston"\n  },\n  getInfo() {\n    return `${this.name} from ${this.address.city}`;\n  }\n};\n\n// Without optional chaining\n// const zipCode = user.address && user.address.zipCode; // undefined\n\n// With optional chaining\nconst zipCode = user.address?.zipCode;\nconsole.log(zipCode); // undefined\n\n// Nested optional chaining\nconst userCity = user.address?.city;\nconsole.log(userCity); // "Boston"\n\n// With methods\nconst info = user.getInfo?.();\nconsole.log(info); // "Alice from Boston"\n\n// Non-existent method\nconst data = user.getData?.();\nconsole.log(data); // undefined',
        description:
          'Optional chaining operator (?.) for safely accessing nested properties',
        output: 'undefined\nBoston\nAlice from Boston\nundefined',
      },
      {
        code: '// Object spread operator (ES2018)\nconst person = { name: "John", age: 30 };\nconst job = { title: "Developer", company: "Acme Inc" };\n\n// Merge objects\nconst employee = { ...person, ...job };\nconsole.log(employee); // { name: "John", age: 30, title: "Developer", company: "Acme Inc" }\n\n// Clone an object\nconst clone = { ...person };\nconsole.log(clone); // { name: "John", age: 30 }\n\n// Override properties\nconst updated = { ...person, age: 31 };\nconsole.log(updated); // { name: "John", age: 31 }',
        description: 'Object spread operator for merging and cloning objects',
        output:
          '{ name: "John", age: 30, title: "Developer", company: "Acme Inc" }\n{ name: "John", age: 30 }\n{ name: "John", age: 31 }',
      },
    ],
  },
  {
    title: 'ES6+ Features',
    examples: [
      {
        code: '// Classes (ES6)\nclass Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  \n  greet() {\n    return `Hello, my name is ${this.name}`;\n  }\n  \n  // Static method\n  static createAnonymous() {\n    return new Person("Anonymous", 0);\n  }\n}\n\nconst john = new Person("John", 30);\nconsole.log(john.greet()); // "Hello, my name is John"\n\n// Inheritance\nclass Employee extends Person {\n  constructor(name, age, jobTitle) {\n    super(name, age); // Call parent constructor\n    this.jobTitle = jobTitle;\n  }\n  \n  greet() {\n    return `${super.greet()} and I am a ${this.jobTitle}`;\n  }\n}\n\nconst jane = new Employee("Jane", 28, "Developer");\nconsole.log(jane.greet()); // "Hello, my name is Jane and I am a Developer"',
        description:
          'ES6 Classes with inheritance, methods, and static methods',
        output:
          'Hello, my name is John\nHello, my name is Jane and I am a Developer',
      },
      {
        code: "// Modules (ES6)\n// Export (in file math.js)\n// export const PI = 3.14159;\n// export function add(a, b) { return a + b; }\n// export default function multiply(a, b) { return a * b; }\n\n// Import (in another file)\n// import multiply, { PI, add } from './math.js';\n// import * as math from './math.js';\n// console.log(PI);           // 3.14159\n// console.log(add(2, 3));    // 5\n// console.log(multiply(4, 5)); // 20\n// console.log(math.PI);      // 3.14159",
        description: 'ES6 Modules with import and export',
      },
      {
        code: '// Template Literals (ES6)\nconst name = "John";\nconst age = 30;\n\n// String interpolation\nconst greeting = `Hello, my name is ${name} and I am ${age} years old.`;\nconsole.log(greeting); // "Hello, my name is John and I am 30 years old."\n\n// Multi-line strings\nconst multiLine = `This is a\nmulti-line\nstring.`;\nconsole.log(multiLine);\n\n// Tagged templates\nfunction highlight(strings, ...values) {\n  return strings.reduce((result, str, i) => {\n    return result + str + (values[i] ? `<strong>${values[i]}</strong>` : \'\');\n  }, \'\');\n}\n\nconst highlighted = highlight`My name is ${name} and I am ${age} years old.`;\nconsole.log(highlighted); // "My name is <strong>John</strong> and I am <strong>30</strong> years old."',
        description:
          'Template literals for string interpolation and multi-line strings',
        output:
          'Hello, my name is John and I am 30 years old.\nThis is a\nmulti-line\nstring.\nMy name is <strong>John</strong> and I am <strong>30</strong> years old.',
      },
      {
        code: '// Promises (ES6)\n// Creating a promise\nconst fetchData = () => {\n  return new Promise((resolve, reject) => {\n    // Simulating async operation\n    setTimeout(() => {\n      const success = true;\n      if (success) {\n        resolve("Data fetched successfully");\n      } else {\n        reject("Error fetching data");\n      }\n    }, 1000);\n  });\n};\n\n// Using promises\nfetchData()\n  .then(data => {\n    console.log(data); // "Data fetched successfully"\n    return "Processed " + data;\n  })\n  .then(processedData => {\n    console.log(processedData); // "Processed Data fetched successfully"\n  })\n  .catch(error => {\n    console.error(error);\n  })\n  .finally(() => {\n    console.log("Operation completed"); // Always executes\n  });',
        description: 'Promises for handling asynchronous operations',
        output:
          'Data fetched successfully\nProcessed Data fetched successfully\nOperation completed',
      },
      {
        code: '// Async/Await (ES2017)\nasync function fetchUserData() {\n  try {\n    // Simulating API call\n    const response = await fetch(\'https://api.example.com/users\');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error("Error fetching user data:", error);\n    throw error; // Re-throw to allow caller to handle\n  }\n}\n\n// Using async/await with promise chaining\nasync function displayUserData() {\n  try {\n    const userData = await fetchUserData();\n    console.log(userData);\n    \n    // You can still use .then() with async functions\n    return processUserData(userData)\n      .then(result => console.log(result));\n  } catch (error) {\n    console.error("Error in displayUserData:", error);\n  }\n}',
        description: 'Async/await for more readable asynchronous code',
      },
      {
        code: '// Map and Set (ES6)\n// Map: key-value pairs where keys can be any type\nconst userMap = new Map();\nuserMap.set("name", "John");\nuserMap.set(42, "answer");\nuserMap.set(true, "boolean key");\n\nconsole.log(userMap.get("name")); // "John"\nconsole.log(userMap.has(42));      // true\nconsole.log(userMap.size);         // 3\n\n// Iterating over a Map\nfor (const [key, value] of userMap) {\n  console.log(`${key}: ${value}`);\n}\n\n// Set: collection of unique values\nconst uniqueNumbers = new Set([1, 2, 3, 3, 4, 4, 5]);\nconsole.log(uniqueNumbers.size);  // 5\nconsole.log(uniqueNumbers.has(3)); // true\n\nuniqueNumbers.add(6);\nuniqueNumbers.delete(1);\n\n// Iterating over a Set\nfor (const num of uniqueNumbers) {\n  console.log(num);\n}',
        description: 'Map and Set collections for specialized data structures',
        output:
          'John\ntrue\n3\nname: John\n42: answer\ntrue: boolean key\n5\ntrue\n2\n3\n4\n5\n6',
      },
      {
        code: '// Symbol (ES6)\n// Creating symbols\nconst id = Symbol("id");\nconst anotherId = Symbol("id");\n\nconsole.log(id === anotherId); // false (each Symbol is unique)\n\n// Using symbols as object keys\nconst user = {\n  name: "John",\n  [id]: 123456 // Symbol as a property key\n};\n\nconsole.log(user[id]); // 123456\nconsole.log(Object.keys(user)); // ["name"] (Symbols are not enumerable)\n\n// Well-known symbols\nconst iterable = {\n  [Symbol.iterator]: function* () {\n    yield 1;\n    yield 2;\n    yield 3;\n  }\n};\n\nfor (const item of iterable) {\n  console.log(item);\n}',
        description: 'Symbols for unique identifiers and meta-programming',
        output: 'false\n123456\n["name"]\n1\n2\n3',
      },
      {
        code: '// Other ES6+ Features\n\n// Default parameters (ES6)\nfunction greet(name = "Guest") {\n  return `Hello, ${name}!`;\n}\nconsole.log(greet()); // "Hello, Guest!"\n\n// Destructuring (ES6)\nconst [a, b] = [1, 2];\nconst { x, y } = { x: 10, y: 20 };\n\n// Spread operator (ES6)\nconst arr1 = [...[1, 2], 3, 4];\nconst obj1 = { ...{ a: 1 }, b: 2 };\n\n// Rest parameters (ES6)\nfunction sum(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\n\n// Object/Array methods (ES6+)\nObject.entries({ a: 1, b: 2 });\nArray.from("hello");\n[1, 2, 3].includes(2);\n\n// Optional chaining (ES2020)\nconst user = { address: { street: "Main St" } };\nconst street = user?.address?.street;\n\n// Nullish coalescing (ES2020)\nconst value = null ?? "default";\n\n// Logical assignment (ES2021)\nlet x = 0;\nx ||= 42; // x = x || 42\n\n// Numeric separators (ES2021)\nconst billion = 1_000_000_000;\n\n// Top-level await (ES2022)\n// await fetch("https://api.example.com/data");',
        description: 'Summary of other important ES6+ features',
        output: 'Hello, Guest!',
      },
    ],
  },
  {
    title: 'Web APIs',
    examples: [
      {
        code: '// DOM Manipulation\n// Selecting elements\nconst element = document.getElementById("myId");\nconst elements = document.getElementsByClassName("myClass");\nconst elementsByTag = document.getElementsByTagName("div");\nconst queryElement = document.querySelector(".myClass");\nconst queryAllElements = document.querySelectorAll("div.item");\n\n// Creating and modifying elements\nconst newDiv = document.createElement("div");\nnewDiv.textContent = "Hello World";\nnewDiv.className = "container";\nnewDiv.style.color = "blue";\n\n// Appending elements\ndocument.body.appendChild(newDiv);\n\n// Removing elements\n// element.remove(); // Modern way\n// element.parentNode.removeChild(element); // Older way\n\n// Event handling\nelement.addEventListener("click", function(event) {\n  console.log("Element clicked", event);\n});\n\n// Event delegation\ndocument.body.addEventListener("click", function(event) {\n  if (event.target.matches(".btn")) {\n    console.log("Button clicked", event.target);\n  }\n});',
        description: 'DOM (Document Object Model) manipulation basics',
      },
      {
        code: '// Fetch API (ES2015)\n// Basic GET request\nfetch("https://api.example.com/data")\n  .then(response => {\n    if (!response.ok) {\n      throw new Error(`HTTP error! Status: ${response.status}`);\n    }\n    return response.json(); // Parse JSON response\n  })\n  .then(data => {\n    console.log("Data received:", data);\n  })\n  .catch(error => {\n    console.error("Fetch error:", error);\n  });\n\n// POST request with options\nfetch("https://api.example.com/submit", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n    "Authorization": "Bearer token123"\n  },\n  body: JSON.stringify({\n    name: "John",\n    age: 30\n  })\n})\n.then(response => response.json())\n.then(data => console.log(data));\n\n// Using fetch with async/await\nasync function fetchData() {\n  try {\n    const response = await fetch("https://api.example.com/data");\n    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error("Error:", error);\n  }\n}',
        description: 'Fetch API for making HTTP requests',
      },
      {
        code: '// Timers\n// setTimeout: execute once after a delay\nconst timeoutId = setTimeout(() => {\n  console.log("This runs after 2 seconds");\n}, 2000);\n\n// Clear a timeout\nclearTimeout(timeoutId);\n\n// setInterval: execute repeatedly at intervals\nconst intervalId = setInterval(() => {\n  console.log("This runs every 1 second");\n}, 1000);\n\n// Clear an interval\nclearInterval(intervalId);\n\n// requestAnimationFrame: for smooth animations\nfunction animate() {\n  // Update animation\n  console.log("Animation frame");\n  \n  // Request next frame\n  requestAnimationFrame(animate);\n}\n\n// Start animation\nconst animationId = requestAnimationFrame(animate);\n\n// Stop animation\ncancelAnimationFrame(animationId);',
        description: 'JavaScript timers and animation frame',
      },
      {
        code: '// Local Storage API\n// Store data\nlocalStorage.setItem("username", "john_doe");\nlocalStorage.setItem("preferences", JSON.stringify({ theme: "dark", fontSize: "large" }));\n\n// Retrieve data\nconst username = localStorage.getItem("username");\nconsole.log(username); // "john_doe"\n\nconst preferences = JSON.parse(localStorage.getItem("preferences"));\nconsole.log(preferences.theme); // "dark"\n\n// Remove specific item\nlocalStorage.removeItem("username");\n\n// Clear all items\n// localStorage.clear();\n\n// Session Storage (similar API, but data persists only for the session)\nsessionStorage.setItem("sessionId", "12345");\nconst sessionId = sessionStorage.getItem("sessionId");',
        description: 'Web Storage API (localStorage and sessionStorage)',
        output: 'john_doe\ndark',
      },
      {
        code: '// JSON Handling\n// Parse JSON string to JavaScript object\nconst jsonString = \'{"name":"John","age":30,"isAdmin":false}\';\nconst user = JSON.parse(jsonString);\nconsole.log(user.name); // "John"\n\n// Convert JavaScript object to JSON string\nconst person = {\n  name: "Alice",\n  age: 25,\n  hobbies: ["reading", "swimming"],\n  address: {\n    city: "New York",\n    zipCode: "10001"\n  }\n};\n\nconst personJson = JSON.stringify(person);\nconsole.log(personJson);\n// Output: {"name":"Alice","age":25,"hobbies":["reading","swimming"],"address":{"city":"New York","zipCode":"10001"}}\n\n// Pretty-print JSON with indentation\nconst prettyJson = JSON.stringify(person, null, 2);\nconsole.log(prettyJson);',
        description: 'JSON parsing and stringification',
        output:
          'John\n{"name":"Alice","age":25,"hobbies":["reading","swimming"],"address":{"city":"New York","zipCode":"10001"}}',
      },
    ],
  },
];

const JavaScriptCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<CodeCategory[]>(
    javascriptExamplesData
  );
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  // Filter examples based on search query
  const filterExamples = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(javascriptExamplesData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = javascriptExamplesData
      .map((category) => {
        const matchedExamples = category.examples.filter(
          (example) =>
            example.code.toLowerCase().includes(query) ||
            example.description.toLowerCase().includes(query) ||
            (example.output && example.output.toLowerCase().includes(query))
        );

        return {
          ...category,
          examples: matchedExamples,
        };
      })
      .filter((category) => category.examples.length > 0);

    setFilteredData(filtered);
  }, [searchQuery]);

  // Apply filtering when search query changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      filterExamples();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filterExamples]);

  // Handle copy to clipboard
  const handleCopy = async (text: string, exampleId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus({ ...copyStatus, [exampleId]: '✓' });
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [exampleId]: '' }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus({ ...copyStatus, [exampleId]: 'Failed!' });
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [exampleId]: '' }));
      }, 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          <FaJs className="inline-block mr-2" /> JavaScript (ES6+) Cheat Sheet
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference of modern JavaScript syntax (ES6+), common
          methods, and core concepts. Click the copy button to copy any code
          snippet to your clipboard.
        </p>
      </header>

      {/* Category Index */}
      <CheatSheetCategoryIndex categories={javascriptExamplesData} />

      {/* Search Bar */}
      <div className="mb-6 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code examples or descriptions..."
              className="w-full p-2 pl-10 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-inner"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="ml-2 p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Examples by Category */}
      <div className="space-y-8">
        {filteredData.length > 0 ? (
          filteredData.map((category) => (
            <section
              key={category.title}
              id={category.title.replace(/\s+/g, '-').toLowerCase()}
              className="p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid"
            >
              <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.examples.map((example, index) => {
                  const exampleId = `${category.title}-${index}`;
                  return (
                    <div
                      key={exampleId}
                      className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                            <div className="flex items-center justify-between">
                              <div className="overflow-hidden max-w-[calc(100%-30px)]">
                                <pre className="text-primary-text dark:text-dark-primary-text whitespace-pre-wrap break-all">
                                  {example.code}
                                </pre>
                              </div>
                              <button
                                onClick={() =>
                                  handleCopy(example.code, exampleId)
                                }
                                className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0"
                                title="Copy to clipboard"
                              >
                                {copyStatus[exampleId] ? (
                                  <span className="text-xs">
                                    {copyStatus[exampleId]}
                                  </span>
                                ) : (
                                  <FaCopy />
                                )}
                              </button>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            {example.description}
                          </p>
                          {example.output && (
                            <div className="mt-2 font-mono text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded text-gray-600 dark:text-gray-400">
                              Output: {example.output}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        ) : (
          <div className="p-4 text-center border-2 border-border-color dark:border-dark-border-color">
            <p className="text-gray-700 dark:text-gray-300">
              No examples found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* About JavaScript Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About JavaScript (ES6+)
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>JavaScript</strong> is a high-level, interpreted programming
            language that conforms to the ECMAScript specification. ES6
            (ECMAScript 2015) and later versions introduced significant
            enhancements to the language.
          </p>
          <p>
            <strong>Key features of modern JavaScript:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Block-scoped variables with let and const</li>
            <li>Arrow functions and enhanced function parameters</li>
            <li>Classes and inheritance</li>
            <li>Modules for better code organization</li>
            <li>Promises and async/await for asynchronous programming</li>
            <li>Destructuring, spread, and rest operators</li>
            <li>Template literals for string interpolation</li>
            <li>Enhanced object literals and property accessors</li>
            <li>New data structures like Map, Set, and WeakMap</li>
            <li>Iterators, generators, and symbols</li>
          </ul>
          <p className="mt-2">
            JavaScript is the primary language for web development, but is also
            widely used for server-side development (Node.js), mobile
            applications, desktop applications, and even machine learning.
          </p>
          <p>
            For more information, visit the{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              MDN Web Docs
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default JavaScriptCheatSheetPage;

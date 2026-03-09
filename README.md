# 1️⃣ Difference between var, let, and const

## var:

- Function scoped
- It can be redeclared
- It can be reassigned
- Older way of declaring variables

## let

- Block scoped
- It cannot be redeclared
- It can be reassigned

## const

- Block scoped
- It cannot be redeclared
- It cannot be reassigned

# 2️⃣ What is the Spread Operator (...)?

## Spread Operator : 
The spread operator (...) is used to expand elements of an array or object into individual elements.

### Example (Array)

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

### Example (Object)

const user = { name: "John", age: 25 };
const newUser = { ...user, city: "Dhaka" };

It is commonly used to copy, merge, or expand arrays and objects.

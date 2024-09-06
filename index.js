// This is TS code rewritten from sample JS code

// Function to add two numbers
function add(a : number, b : number) : number {
    return a + b;
}

// Function to subtract two numbers
function subtract(a : number, b : number) : number {
    return a - b;
}

// Function to multiply two numbers
function multiply(a : number, b : number) : number {
    return a * b;
}

// Function to divide two numbers
function divide(a: number, b: number) : number {
    if (b !== 0) {
        return a / b;
    } else {
        throw Error('Cannot divide by zero!');
    }
}

// Function to find the remainder of two numbers
function modulus(a: number, b : number) : number {
    return a % b;
}

// Function to check if a number is even
function isEven(num : number) : boolean {
    return num % 2 === 0;
}

// Function to check if a number is odd
function isOdd(num : number) : boolean {
    return num % 2 !== 0;
}

// Function to greet a user
function greet(name : string) : string {
    return "Hello, " + name + "!";
}

// Function to calculate the square of a number
function square(num : number) : number {
    return num * num;
}

// Function to calculate the cube of a number
function cube(num: number) : number {
    return num * num * num;
}

// Function to find the maximum of two numbers
function max(a : number, b : number) : number {
    return a > b ? a : b;
}

// Function to find the minimum of two numbers
function min(a : number, b : number) : number {
    return a < b ? a : b;
}

// Function to calculate the power of a number
function power(base : number, exponent : number) : number {
    return Math.pow(base, exponent);
}

// Function to check if a number is positive
function isPositive(num : number) : boolean {
    return num > 0;
}

// Function to check if a number is negative
function isNegative(num : number) : boolean {
    return num < 0;
}

// Function to calculate the absolute value of a number
function absolute(num : number) : number {
    return Math.abs(num);
}

// Function to reverse a string
function reverseString(str : string) : string {
    return str.split('').reverse().join('');
}

// Function to convert a string to uppercase
function toUpperCase(str : string) : string {
    return str.toUpperCase();
}

// Function to convert a string to lowercase
function toLowerCase(str : string) : string {
    return str.toLowerCase();
}

// Function to calculate the length of a string
function stringLength(str : string) : number {
    return str.length;
}

// Function to repeat a string a given number of times
function repeatString(str : string, times : number) : string {
    return str.repeat(times);
}

// Function to find the square root of a number
function squareRoot(num : number) : number {
    return Math.sqrt(num);
}

// Function to find the cube root of a number
function cubeRoot(num : number) :number {
    return Math.cbrt(num);
}

// Function to calculate the factorial of a number
function factorial(num : number) : number {
    if (num < 0) throw new Error('Factorial not defined for negative numbers');
    if (num === 0 || num === 1) return 1;
    return num * factorial(num - 1);
}

// Function to check if a number is prime
function isPrime(num : number) : boolean {
    if (num <= 1) return false;
    if (num === 2) return true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to capitalize the first letter of each word in a string
function capitalizeWords(str : string) : string {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Function to check if a string is a palindrome
function isPalindrome(str : string) : boolean {
    const cleanStr : string = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    return cleanStr === cleanStr.split('').reverse().join('');
}

// Function to generate a random alphanumeric string of given length
function randomString(length : number) : string {
    const chars : string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result : string = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

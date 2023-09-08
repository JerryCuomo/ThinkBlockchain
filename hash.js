/*
  Title: hash.js
  Author: Jerry Cuomo
  Description: A program to demonstrate hashing with different SHA algorithms.
  Focuses on hashing simple and complex objects.
  Usage: Change the HASH_ALGORITHM constant to either 'sha256' or 'sha512'
*/

// Required Libraries
const {createHash} = require('node:crypto');

// Define the hash algorithm to use
const HASH_ALGORITHM = 'sha256';  // Change this to 'sha512' for SHA-512

// Function to perform hash
function SHA_HASH(string) {
    return createHash(HASH_ALGORITHM).update(string).digest('hex');
}

// Hash simple object
let simpleObject = "hello";
let simpleHash = SHA_HASH(simpleObject);
console.log(`${HASH_ALGORITHM} of "hello": ${simpleHash}`);

// Hash slightly more complex array object
let arrayObject = ['a', 'b', 'c'];
let arrayHash = SHA_HASH(JSON.stringify(arrayObject));
console.log(`${HASH_ALGORITHM} of array: ${arrayHash}`);

// Show small variations cause big changes in resulting hash
let variantObject = "hellO";
let variantHash = SHA_HASH(variantObject);
console.log(`${ HASH_ALGORITHM} of "hellO": ${variantHash}`);

// Create a duck image o
// using 64x64 "duck image" as a mock data structure and hash it
let duckImage = new Array(64).fill(null).map(row => new Array(64).fill("yellow"));
let duckImageData = JSON.stringify({
    name: "ducky",
    color: "yellow",
    weight: "1kg",
    imageData: duckImage
});
let duckHash = SHA_HASH(JSON.stringify(duckImage));
console.log(`${HASH_ALGORITHM} of duck object: ${duckHash}`);

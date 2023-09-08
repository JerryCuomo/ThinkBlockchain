/*
  Title: HashTiming.js
  Author: Jerry Cuomo
  Description: A program to demonstrate and time hashing with different SHA algorithms.
  Focuses on hashing simple and complex objects.
  Usage: Change the HASH_ALGORITHM and ITERATIONS constants as needed.
*/

// Required Libraries
const {createHash} = require('node:crypto');

// Define the hash algorithm to use
const HASH_ALGORITHM = 'sha256';  // Change this to 'sha512' for SHA-512

// Number of iterations for timing
const ITERATIONS = 10000;

// Function to perform hash
function SHA_HASH(string) {
    return createHash(HASH_ALGORITHM).update(string).digest('hex');
}

// Timing function for hashing
function timeHashing(object, experimentName) {
    console.log(`Running experiment: ${experimentName}`);
    const startTime = Date.now();
    for (let i = 0; i < ITERATIONS; i++) {
        SHA_HASH(object + i);
    }
    const elapsedTime = Date.now() - startTime;
    const hashesPerSecond = ITERATIONS / (elapsedTime / 1000);
    console.log(`Time for ${ITERATIONS} ${HASH_ALGORITHM} hashes: ${elapsedTime} ms`);
    console.log(`Estimated hashes per second (${HASH_ALGORITHM}): ${hashesPerSecond}`);
    console.log('');
}

// Hash and time simple object
let simpleObject = "hello";
timeHashing(simpleObject, 'Simple Object');

// Hash and time slightly more complex array object
let arrayObject = JSON.stringify(['a', 'b', 'c']);
timeHashing(arrayObject, 'Array Object');

// Create a 64x64 "duck image" as a mock data structure and hash it
let duckImage = new Array(64).fill(null).map(row => new Array(64).fill("yellow"));
let duckImageData = JSON.stringify({
    name: "ducky",
    color: "yellow",
    weight: "1kg",
    imageData: duckImage
});
timeHashing(duckImageData, 'Duck Image Object');

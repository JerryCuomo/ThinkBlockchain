/*
  Title: block.js
  Author: Jerry Cuomo
  Description: A program to generate a simple block destined for a blockchain.
  The block consists of basic properties like index, data, and hashes.
  Usage: To use, instantiate the Block class and call relevant methods.
*/

const {createHash} = require('node:crypto');

// Function to perform SHA-256 hash
function SHA256(string) {
    return createHash('sha256').update(string).digest('hex');
}

// Block class defining properties and behaviors of a block
class Block {
    // Method to create a new Block
    constructor(index, data, previousHash) {   
        this.index = index;  // Position of block in the chain 
        this.data  = data;  // Data stored in the block
        this.previousHash = previousHash;  // Hash of the previous block
        this.hash  = this.calculateHash();  // Hash for this block
    }

    // Method to calculate the hash of the block
    calculateHash() {
        return SHA256(this.index + JSON.stringify(this.data) + this.previousHash).toString();
    }                  
}

// Example usage of Block class with duck theme
const newBlock = new Block(1, { transactions: ["Donald Duck bought bread.", "Daisy Duck sold flowers."] }, "previousHashString");
console.log('New Block:', newBlock);

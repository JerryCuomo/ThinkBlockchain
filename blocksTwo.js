/*
  Title: blocksTwo.js
  Author: Jerry Cuomo
  Description: A program to generate a simple blockchain consisting of blocks.
  Each block is linked to its predecessor by storing the hash of the previous block.
  Usage: To use, instantiate the Block class and use it to create a simple blockchain.
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

// Create first block (genesis block)
const genesisBlock = new Block(0, { transactions: ["Genesis block"] }, "0");
console.log('Genesis Block:', genesisBlock);

// Create second block and link to the genesis block
const secondBlock = new Block(1, { transactions: ["Donald Duck bought bread.", "Daisy Duck sold flowers."] }, genesisBlock.hash);
console.log('Second Block:', secondBlock);

// Here you can continue to add more blocks, each referring to the previous block's hash.

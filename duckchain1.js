/*
  Title: duckchain1.js
  Author: Jerry Cuomo
  Description: This program illustrates a simple blockchain in Node.js using Node's crypto library for SHA-256 hashing.
  It features a duck-themed blockchain with creative transactional data between various duck characters.
  Each block carries its own data, the hash of the previous block, and a block index, ensuring the integrity of the entire blockchain.
  Usage: Run the program to initialize a blockchain and add blocks containing creative duck-related data.
*/

const {createHash} = require('node:crypto');

// Function to perform SHA-256 hash
function SHA256(string) {
    return createHash('sha256').update(string).digest('hex');
}

// This class defines a Block object destined for a Blockchain
class Block {
    // Method to create a new Block
    constructor(index, data) {
        this.index = index;                 // Block index
        this.data  = data;                  // Data stored in the block
        this.previousHash = null;           // Hash of the previous block
        this.hash  = this.calculateHash();  // Calculate a hash for this block
    }

    // Method to calculate the hash of a block
    calculateHash() {
        return SHA256(this.index + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

// This class defines a blockchain object
class Blockchain {
    // Method to create a new blockchain
    constructor() {
        this.chain = [this.createGenesisBlock()];  // 'chain' is the blockchain, starting with the genesis block
    }

    // Method to create the genesis block
    createGenesisBlock() {
        return new Block(0, "Genesis Block Quack Quack!");  // Block index for genesis block is 0
    }

    // Fetch the last block added to the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Add a new block to the chain
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash; 
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);                          
    }
}

// Create and test the Duckchain
let duckchain = new Blockchain();  
duckchain.addBlock(new Block(1, {transaction: "Donald Duck sent 5 quackers to Daffy Duck"}));
duckchain.addBlock(new Block(2, {transaction: "Daffy Duck sent 3 quackers to Daisy Duck"}));
duckchain.addBlock(new Block(3, {transaction: "Daisy Duck sent 7 quackers to Scrooge McDuck"}));

// Print the entire duck-themed blockchain
console.log(JSON.stringify(duckchain, null, 4));

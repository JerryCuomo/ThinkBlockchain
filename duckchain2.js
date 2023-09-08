/*
  Title: duckchain2.js
  Author: Jerry Cuomo
  Description: This enhanced program illustrates a blockchain in Node.js using Node's built-in crypto library for SHA-256 hashing.
  It features a duck-themed blockchain with creative transactional data between various duck characters.
  Each block in the chain carries its own data, the hash of the previous block, a block index, and now includes integrity validation.
  Usage: Run the program to initialize a blockchain, add blocks with creative duck-related transactions, and validate the integrity of the blockchain.
*/

const { createHash } = require('node:crypto');

// Function to perform SHA-256 hash
function SHA256(string) {
    return createHash('sha256').update(string).digest('hex');
}

// Class defining a Block object destined for a Blockchain
class Block {
    constructor(index, data) {
        this.index = index;                 // Block index
        this.data = data;                   // Data stored in the block
        this.previousHash = null;           // Hash of the previous block
        this.hash = this.calculateHash();   // Calculate a hash for this block
    }

    // Method to calculate the hash of a block
    calculateHash() {
        return SHA256(this.index + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

// Class defining a blockchain object
class Blockchain {
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

    // Method to check if the chain is valid
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// Create and test the Duckchain
let duckchain = new Blockchain();
duckchain.addBlock(new Block(1, { transaction: "Donald Duck sent 5 quackers to Daffy Duck" }));
duckchain.addBlock(new Block(2, { transaction: "Daffy Duck sent 3 quackers to Daisy Duck" }));
duckchain.addBlock(new Block(3, { transaction: "Daisy Duck sent 7 quackers to Scrooge McDuck" }));

// Print the entire duck-themed blockchain
console.log("Initial Blockchain:");
console.log(JSON.stringify(duckchain, null, 4));
console.log("Is blockchain valid? " + duckchain.isChainValid());

// Tamper with the blockchain
duckchain.chain[1].data = { transaction: "Donald Duck sent 1000 quackers to Daffy Duck" };
duckchain.chain[1].hash = duckchain.chain[1].calculateHash();

// Check blockchain validity
console.log("After Tampering:");
console.log(JSON.stringify(duckchain, null, 4));
console.log("Is blockchain valid? " + duckchain.isChainValid());

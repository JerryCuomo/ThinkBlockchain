/*
  Title: duckchain4.js
  Author: Jerry Cuomo
  Description: This version features several enhancements over duckchain2.js to include a mining simulation
  - Updates Block class with new fields (nonce, timestamp)
  - Updates calculate hash to include these fields
  - Adds mining method to Block class to emulate mining
  - Update to Blockchain class that addes difficulty level (number of leading '0' to match
  Usage: Run the program to see a simulation of a duck-themed blockchain with a network of admins.
*/
const { createHash } = require('crypto');

// Function to perform SHA-256 hash
// This function takes a string input, applies the SHA-256 hashing algorithm,
// and returns the resulting hash in hexadecimal format.
function SHA256(string) {
    return createHash('sha256').update(string).digest('hex');
}

// This class defines a Block object for the Duckchain blockchain
class Block {

    // Constructor to create a new Block
    // Parameters:
    // - index: Position of the block in the blockchain
    // - data: Data to be stored in the block (e.g., transaction details)
    // - previousHash: Hash of the previous block in the chain
    constructor(index, data, previousHash) {
        this.index = index;                 // Position of block in the chain 
        this.data = data;                   // Data stored in the block
        this.nonce = 0;                     // A counter to vary the hash calculation
        this.previousHash = previousHash;   // Hash of the previous block
        this.hash = this.calculateHash();   // Hash of this block, calculated based on its contents
    }

    // Method to calculate the hash of the block
    // The hash is computed using the block's properties: index, data, nonce, and previousHash.
    calculateHash() {
        let newHash = SHA256(
            this.index +               // Include the index 
            JSON.stringify(this.data) +// Include the block data 
            this.nonce +               // Include the nonce
            this.previousHash          // Include the previous hash
        );
        return newHash.toString();     // Return the resulting 64-character hash
    }

    // Method to mine a new block by adjusting the nonce until the hash meets the difficulty criteria
    // The mining process involves repeatedly changing the nonce and recalculating the hash
    // until the hash starts with a certain number of zeros, specified by the difficulty level.
    mineBlock(difficulty) {
        console.log(`Mining block #${this.index} with difficulty level: ${difficulty}...`);
        const startTime = new Date(); // Start timing the mining process

        // Repeat the process until the hash starts with 'difficulty' number of zeros
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;  // Increment nonce to get a new hash
            this.hash = this.calculateHash(); // Recalculate the hash with the new nonce
        }

        const endTime = new Date(); // End timing the mining process
        const timeTaken = (endTime - startTime) / 1000; // Calculate the time taken in seconds
        console.log(`Block #${this.index} mined successfully! Hash: ${this.hash}`);
        console.log(`Time taken to mine block #${this.index}: ${timeTaken} seconds\n`);
    }
}

// This class defines a Blockchain object
class Blockchain {

    // Constructor to initialize the blockchain with a genesis block
    constructor() {
        this.chain = [this.createGenesisBlock()]; // Initialize the blockchain with the genesis block
        this.difficulty = 1; // Initial difficulty level for mining
    }

    // Method to create the genesis block (the first block in the chain)
    createGenesisBlock() {
        let genesisData = "Genesis Block Quack Quack!"; 
        let genesisBlock = new Block(
            0,                  // The index is zero because it's the first block
            genesisData,        // Data for the genesis block
            "0"                 // The previous hash is zero because there's no previous block
        );
        return genesisBlock;
    }

    // Method to get the latest block added to the blockchain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Method to add a new block to the blockchain
    // The new block's previousHash is set to the hash of the latest block in the chain.
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash; // Set the previous hash
        newBlock.mineBlock(this.difficulty); // Mine the new block with the set difficulty
        this.chain.push(newBlock); // Add the mined block to the chain
    }

    // Method to check the validity of the blockchain
    // The chain is valid if all blocks have valid hashes and all previousHash values match the previous block's hash.
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Recalculate the hash and compare it to the stored hash
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log(`Invalid hash detected at block #${currentBlock.index}`);
                return false;
            }

            // Check if the previousHash matches the hash of the previous block
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log(`Invalid previousHash detected at block #${currentBlock.index}`);
                return false;
            }
        }
        return true; // All blocks are valid
    }
}

// Create a new instance of the Duckchain blockchain
let duckchain = new Blockchain();
console.log("Duckchain is live!");

// Increase the difficulty level and add blocks to the Duckchain
duckchain.difficulty = 3;
console.log("Adding block #1...");
duckchain.addBlock(new Block(1, "Donald Duck")); // Add a block with data

duckchain.difficulty = 5;
console.log("Adding block #2...");
duckchain.addBlock(new Block(2, "Daffy Duck")); // Add another block with data

// Print out the full Duckchain with pretty formatting
console.log("Full Duckchain:");
console.log(JSON.stringify(duckchain, null, 4));

// Print out the validity of the Duckchain
console.log('Is the Duckchain valid? ' + duckchain.isChainValid());

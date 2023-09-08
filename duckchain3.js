/*
  Title: duckchain3.js
  Author: Jerry Cuomo
  Description: This version features several enhancements over duckchain2.js.
  - Adds an Admin class with admin names.
  - Uses the Admin class to simulate a network of blockchain admins (both ducks and humans).
  - Outputs which admins disagree with the consensus.
  - Improved comments for better understanding.
  Usage: Run the program to see a simulation of a duck-themed blockchain with a network of admins.
*/

const {createHash} = require('crypto');

// Function to perform SHA-256 hash
function SHA256(string) {
    return createHash('sha256').update(string).digest('hex');
}

// Block class
class Block {
    constructor(data) {
        this.data = data;
        this.previousHash = null;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(JSON.stringify(this.data) + this.previousHash).toString();
    }
}

// Blockchain class
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        let genesisBlock = new Block("Genesis Block Quack Quack!");
        genesisBlock.previousHash = null;
        return genesisBlock;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        // Validate Genesis Block
        if (this.chain[0].hash !== this.chain[0].calculateHash()) {
            return false;
        }

        // Validate Other Blocks
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash() ||
                currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

// Admin class with adminName
class Admin {
    constructor(blockchain, adminName) {
        this.blockchain = blockchain;
        this.adminName = adminName;
    }

    addBlock(block) {
        this.blockchain.addBlock(block);
    }

    consent(block) {
        return this.blockchain.isChainValid();
    }
}

// Network of Admins (ducks and humans)
let network = [
    new Admin(new Blockchain(), "Alice"),  // Human
    new Admin(new Blockchain(), "Bob"),    // Human
    new Admin(new Blockchain(), "Charlie"),// Human
    new Admin(new Blockchain(), "Donald"), // Duck
    new Admin(new Blockchain(), "Eve"),    // Human
    new Admin(new Blockchain(), "Fiona"),  // Human
    new Admin(new Blockchain(), "Gary"),   // Duck
    new Admin(new Blockchain(), "Huey"),   // Duck
    new Admin(new Blockchain(), "Igor")    // Duck
];

let goldenChain = new Blockchain();

// Taper simulation
for (let count = 0; count < 5; count++) {
    let block = new Block(`a new block ${count}`);
    let agree = 0;
    let disagreeingAdmins = [];

    for (const admin of network) {
        let valid = admin.consent(block);

        // Simulate hacking with 50% chance
        if (Math.random() > 0.5) {
            valid = !valid;
        }

        if (valid) {
            agree++;
        } else {
            disagreeingAdmins.push(admin.adminName);
        }
    }

    if (agree > (network.length / 2)) {
        console.log(`${count} Majority agrees on adding block to goldenChain. ${agree} out of ${network.length} Admins agree.`);
        goldenChain.addBlock(block);
        for (const admin of network) admin.addBlock(block);
    } else {
        console.log(`${count} Network does not agree. ${agree} out of ${network.length} Admins agree. Disagreeing Admins: ${disagreeingAdmins.join(", ")}`);
    }
}

// Display the goldenChain
console.log(JSON.stringify(goldenChain, null, 4));

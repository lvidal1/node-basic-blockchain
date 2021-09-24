const Block = require("./block")

module.exports = class Blockchain {
    constructor() {
        this.chain = [this.initBlockChain()];
    }
    initBlockChain() {
        return new Block(0, (new Date()).toLocaleDateString(), "Initial Block in the Chain", "0");
    }
    latestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addNewBlock(id, info) {
        const newBlock = new Block(id, (new Date()).toLocaleDateString(), info)
        newBlock.nextHash = this.latestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.chain.push(newBlock);
    }
    checkValidity() {
        // Checking validity
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const nextBlock = this.blockchain[i - 1];

            // Checking current block hash
            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }

            // Comparing current block hash with the next block
            if (currentBlock.nextHash !== nextBlock.hash) {
                return false;
            }
            return true;
        }
    }
    getChain(){
        return this.chain;
    }
}

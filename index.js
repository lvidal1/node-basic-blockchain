const Blockchain = require("./Blockchain");
const t = require("exectimer");
const Tick = t.Tick;

/**
 * Init Blockchain network
 */
let pugcoin = new Blockchain();

/**
 * Create a new transaction on the blockchain
 * 
 * @param {int} id 
 * @param {float} amount 
 */
const payCoins = function (id, amount){
    pugcoin.addNewBlock(id, 
        {   
            sender: "Josh Peck", 
            recipient:"Drake Bell", 
            quantity: amount 
        }
    );
}
 
/**
 * Run tests
 * 
 * Create 100000 "payCoins" transactions
 */
const promises = [];

for(let i = 1; i <= 100000; i++) {
    const functionExecution = Tick.wrap(function* myFunction() {
        payCoins(i, 10);
        yield Promise.resolve(true);
    });
 
    promises.push(functionExecution);
}

/**
 * Display the results
 */
Promise.all(promises).then(() => {
    const results = t.timers.myFunction;
 
    console.log("Total duration: ",results.parse(results.duration())); // total duration of all ticks

    console.log("#N transactions(blocks): ",JSON.stringify(pugcoin.getChain().length))
});



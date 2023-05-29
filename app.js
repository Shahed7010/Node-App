const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("please enter your name: ", (value) => {
    console.log(`you entered ${value}`);
    rl.close();
});

rl.on('close', () => {
    console.log('interface closed');
    process.exit();
});
const fs = require('fs');
const markov = require('./markov');

const createText = (text) => {
    console.log(text)
    const markovMachine = new markov(text)
    console.log(markovMachine.makeText())
}

const makeText = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log(`ERROR reading ${path}: \n`, err);
            process.exit(1)
        }
        else {
            createText(data);
        }
    })
}

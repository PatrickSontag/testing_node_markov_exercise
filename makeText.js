const fs = require('fs');
const axios = require('axios');
const markov = require('./markov');

const createText = (text) => {
    // console.log(text)
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

const makeUrlText = (url) => {
    axios.get(url)
    .then(function(response){
        createText(response.data);
    })
    .catch(function (error) {
        console.log(`ERROR fetching ${url}:`, error.message);
    })
}

if (process.argv[2] === "file") {
    makeText(process.argv[3]);
}
if (process.argv[2] === "url") {
    makeUrlText(process.argv[3]);
}

module.exports = { makeUrlText, makeText };
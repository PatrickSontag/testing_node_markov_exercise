/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {};
    this.makeChains(this.words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(words) {
    for (let [i, word] of words.entries()) {
      // handle existing key word (that are not last word)
      if(this.chains[word] && words[i + 1] !== undefined) {
        this.chains[word].push(words[i + 1]);
      }
      // handle last word (if word not already defined)
      if(words[i + 1] === undefined && !this.chains[word]) {
        this.chains[word] = [null];
      }
      // handle new key word
      if(!this.chains[word]) {
        this.chains[word] = [words[i + 1]];
      } 
    }
    console.log("this.chains:", this.chains);
    return this.chains
  }


  /** return random text from chains */

  makeText(numWords = 10) {
    console.log("MAKE TEXT");
    console.log(this.chains);
    console.log("Object Length:", Object.keys(this.chains).length);
    let word1 = Object.keys(this.chains)[0];
    let word2 = this.chains[word1][0];
    console.log("word1:", word1);
    console.log("word2:", word2);

    let previousWord = word1;
    let currentWord;
    let text = "";
    for (let i = 0; i < numWords; i++) {
      currentWord = this.chains[previousWord][0]; 
      text = text + " " + currentWord;
      previousWord = currentWord;
    }
    console.log("Full makeText: ", text);
    return text;
  }
}

let mm = new MarkovMachine("the cat in the hat");
// let hat = new MarkovMachine("the cat in the hat");
mm.makeText();
module.exports = MarkovMachine
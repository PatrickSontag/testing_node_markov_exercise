/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    for (let [i, word] of this.words.entries()) {
      // handle existing key word (that are not last word)
      if(this.chains[word] && this.words[i + 1] !== undefined) {
        this.chains[word].push(this.words[i + 1]);
      }
      // handle last word (if word not already defined)
      if(this.words[i + 1] === undefined && !this.chains[word]) {
        this.chains[word] = [null];
      }
      // handle new key word
      if(!this.chains[word]) {
        this.chains[word] = [this.words[i + 1]];
      } 
    }
    console.log("this.chains:", this.chains);
    return this.chains
  }

  /** Pick random choice from array */

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** return random text from chains */

  makeText(numWords = 20) {
    // pick a random key to begin
    let keys = Object.keys(this.chains);
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains[key]);
    }

    return out.join(" ");
  }
}

let mm = new MarkovMachine("the cat in the hat");
// let hat = new MarkovMachine("the cat in the hat");
mm.makeText();
module.exports = MarkovMachine
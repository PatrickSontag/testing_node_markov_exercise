/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {};
    this.makeChains(words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(words) {
    console.log(words);
    for (let [i, word] of words.entries()) {
      if(words[i + 1] === undefined) {
        this.chains[word] = [null];
      }
      console.log(i, word, words[i + 1])
      if(!this.chains[word]) {
        console.log(word);
        this.chains[word] = [words[i + 1]];
      }
    }
    console.log(this.chains);
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}

let mm = new MarkovMachine("the cat in the hat");
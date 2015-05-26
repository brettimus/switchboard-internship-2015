# generative grammar (L-systems)

run `node` in the project directory and type `.load ./test.js` into the interpreter. This will load the tests into the interpreter, exposing a global variable `G` which is an instance of `Grammar`. 

Typing `G` and hitting return will print out the (incomplete) grammar, which consists of `p`, a set of production rules, `N` a set of nonterminal symbols, and `T`, a set of terminal symbols.

A real grammar needs a starting symbol, right? So, to watch the grammar evolve, run `G.init("ag", 20)`, which derives the string "ag" 20 times.

By default, `G` performs a left-derivation of the initial string. You're welcome to make a PR and add the code for a right derivation.
var Set = require("./set");

/**
 * A generative grammar
 * @constructor
 * @param {Production} p - A map of symbols to words.
 * @param {Production} n - The initial state.
 * @prop {SymbolCollection} N - A set of nonterminal symbols
 * @prop {SymbolCollection} T - A set of terminal symbols
 */
function Grammar(p, n) {
    this.p = new ProductionSet(p);
    this.N = new SymbolCollection(this.p.getNonTerminalSymbols());
    this.T = new SymbolCollection(this.p.getTerminalSymbols());

    if (n !== undefined) this.init(n);
}

/**
 * @method
 * @param {string} n - A starting word
 *
 */
Grammar.prototype.init = function(n, times) {
    if (n === undefined && this.n === undefined) throw new Error("Grammar needs a starting word.");
    this.derivation(n, times);
};

/**
 * @method
 * @param {string} n - A starting word
 * @param {string} [times] - Number of times to derive from starting word. Default 100.
 */
Grammar.prototype.derivation = function(n, times) {
    if (times === 0) return;
    times = times || 100;
    this._leftDerivation(n, times);
};

/**
 * @method
 * @param {string} n - A starting word
 * @param {string} times - Number of times to derive from starting word 
 * @private
 */
Grammar.prototype._leftDerivation = function(n, times) {
    var o;
    while (times--) {
        console.log(n);
        o = this._leftDerive(n);
        // if (n === o) break;  // cuts out early
        n = o;
    }

};

/**
 * @method
 * @param {string} n - A starting word
 * @private
 */
Grammar.prototype._leftDerive = function(n) {
    var next;
    for (i = 0; i < n.length; i++) {
        next = this.p.produce(n.charAt(i));
        if (n !== next) return n.replace(n.charAt(i), next);
    }
    return n;
};

/**
 * A collection of symbols for a given grammar.
 * @constructor
 * @extends Set
 * @param {string[]} symbols - An array of strings.
 */
function SymbolCollection(members) {
    Set.call(this, members);
}
SymbolCollection.prototype = Object.create(Set.prototype);


/**
 * A set of production rules (mapping from strings to strings). (DOES NOT INHERIT FROM SET... JUST STEALS A METHOD)
 * @constructor
 * @param {object} rules - A collection (Object) of production rules for a given grammar.
 */
function ProductionSet(rules) {
    this.rules = rules;
}

/**
 * Checks if a given symbol is in the ProductionSet. (Does not evaluate along the prototype chain.)
 * @method
 * @param {*} member
 * @param {Boolean} [deep] - If true, look along the prototype chain for a property matching `symbol`.
 * @returns {Boolean}
 */
ProductionSet.prototype.isMember = function(member) {
    return this.rules.hasOwnProperty(member);
};

/**
 * Checks if a given symbol is in the ProductionSet. (Does not evaluate along the prototype chain by default.)
 * @method
 * @param {string} symbol
 * @returns {string}
 */
ProductionSet.prototype.produce = function(symbol) {
    return this.rules[symbol];
};

ProductionSet.prototype.getTerminalSymbols = function() {
    return Object.keys(this.rules).filter(function(key){
        if (key === this.rules[key]) return true;
    }, this);
};
ProductionSet.prototype.getNonTerminalSymbols = function() {
    return Object.keys(this.rules).filter(function(key){
        if (key !== this.rules[key]) return true;
    }, this);
};

module.exports = {
    Grammar: Grammar,
    SymbolCollection: SymbolCollection,
    ProductionSet: ProductionSet,
};
var Set = require("./set"),
    Grammar = require("./grammar").Grammar,
    ProductionSet = require("./grammar").ProductionSet,
    SymbolCollection = require("./grammar").SymbolCollection,
    range = require("./utilities").range,
    letters = range(0, 25).map(function(i) { return String.fromCharCode(i+"a".charCodeAt(0)); }),
    CONST = {
        p: {
            "a": "a|b",
            "b": "b",
            "c": "b|d|",
            "d": "e\\d",
            "e": "f",
            "f": "g",
            "g": "h(a)",
            "h": "h",
            "(": "(",
            ")": ")",
            "|": "|",
            "/": "\\",
            "\\": "/",
        },
    };

function assert(predicate, message) {
    if (!predicate) console.log("[FAIL] "+message);
}

(function testSet() {
    var test_Set = new Set(letters);

    assert(test_Set.add("A") && test_Set.size === 27, "Set.add");
    assert(test_Set.remove("A") && test_Set.size === 26, "Set.remove");
    assert(test_Set.union(new Set(["B"])).isMember("B"), "Set.union");
    assert(test_Set.intersect(new Set(["a"])).size === 1, "Set.intersect");
})();


(function testSymbolCollection() {
    var test_SC = new SymbolCollection(letters);

    assert(test_SC.add("A") && test_SC.size === 27, "SymbolCollection.add");
    assert(test_SC.remove("A") && test_SC.size === 26, "SymbolCollection.remove");
    assert(test_SC.union(new SymbolCollection(["B"])).isMember("B"), "SymbolCollection.union");
    assert(test_SC.intersect(new SymbolCollection(["a"])).size === 1, "SymbolCollection.intersect");
})();

(function testProductionSet() {
    var test_PS = new ProductionSet(CONST.p);

    assert(knowsAllTerminal(test_PS), "ProductionSet.getTerminalSymbols");
    assert(knowsAllNonTerminal(test_PS), "ProductionSet.getNonTerminalSymbols");
    assert(test_PS.isMember("a"), "ProductionSet.isMember");

    function knowsAllTerminal(ps) {
        var ts = ps.getTerminalSymbols();

        return ['b', 'h', '(', ')', '|'].every(function(c) {
            return ts.indexOf(c) !== -1;
        });
    }

    function knowsAllNonTerminal(ps) {
        var nts = ps.getNonTerminalSymbols();

        return ["a", "c", "d", "e", "f", "g", "/", "\\", ].every(function(c) {
            return nts.indexOf(c) !== -1;
        });
    }
})();


// (function() {
    var G = new Grammar(CONST.p);
// })();

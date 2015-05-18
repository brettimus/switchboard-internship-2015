// Eloquent JavaScript
// Chapter 3 Exercises
// boots (05/17/15)

// `assert` is a helper function for running tests.

var chapter03 = (function(){
    // Minimum
    function min(a, b) {
        return a < b ? a : b;
    }
    console.log("*** Min ***");
    assert(min(0,1) === 0, "0 is less than 1, eh?");
    assert(min(1,0) === 0, "0 is still less than 1, eh?");


    // Recursion
    function isEven_recursive(n) {
        if (n < 0) n *= -1;
        if (n === 0) return true;
        if (n === 1) return false;
        return isEven_recursive(n - 2);
    }
    assert(isEven_recursive(50), "50 is even.");
    assert(!isEven_recursive(75), "75 is not even.");


    // Bean Counting
    function countBs(str) {
        return countChars(str, "B");
    }
    function countChars(str, charToCount) {
        var result = 0;
        [].forEach.call(str, function(strChar) {
            if (strChar === charToCount) result += 1;
        });
        return result;
    }
    function countChars_alt(str, charToCount) {
        // extra work of convertin to an array
        return str.split("").reduce(function(p, c) { return c === charToCount ? p + 1 : p; });
    }
    assert(countBs("BB") === 2, "My initials consists of two Bs.");
    assert(countBs("Better Business Bureau") === 3, "Better Business Bureau has three Bs.");


    // Helpers
    function assert(predicate, message) {
        var toPrint = predicate ? "[PASSED] " : "☹ [FAILED] ";
        console.log(toPrint + message);
    }

    function printName(name) {
        var padding = "### ";
        console.log(padding + name + padding.reverse());
    }
})();
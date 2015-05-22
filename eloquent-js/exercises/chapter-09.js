// Eloquent JavaScript
// Chapter 9 Exercises
// regular expressions
// boots
var a;


// Regexp Golf

/* car and cat */
a = /car|t/;
assert(a.test("car") && a.test("cat"), "car and cat");

/* pop and prop */
a = /pr?op/;
assert(a.test("pop") && a.test("prop"), "pop and prop");

/* ferret, ferry, and ferrari */
a = /ferr(et$|y$|ari$)/;
assert(a.test("ferret") && a.test("ferry") && a.test("ferrari"), "ferret, ferry, and ferrari");

/* Any word ending in ious */
a = /[a-z]*ious$/i;
assert(a.test("pious") &&
        a.test("envious") &&
        !a.test("fabulous") &&
        !a.test("iousity"),
        "any word ending in ious");

/* A whitespace character followed by a dot, comma, colon, or semicolon */
a = /^\s[.,:;]/;
assert(a.test(" .") &&
        a.test("\r,") &&
        a.test("\n;") &&
        a.test("\t:") &&
        !a.test(".") &&
        !a.test(";"),
        "A whitespace character followed by a dot, comma, colon, or semicolon");

/* A word longer than six letters */
a = /[a-z]{6,}/i;
assert(a.test("hellotoday") &&
        a.test("mystery") &&
        !a.test("boat") &&
        !a.test("asdf;fsdf"),
        "A word longer than six letters");

/* A word without the letter e */
a = /^[a-df-zA-Z]*$/; // shorter, but felt like cheating: /^[^e]$/;
assert(a.test("brAnks") &&
        a.test("sin") &&
        !a.test("ebooks") &&
        !a.test("simple") &&
        !a.test("hello"),
        "A word without the letter e");

// Testers
function assert(predicate, message) {
    var toPrint = predicate ? "[PASSED] " : "☹ [FAILED] ";
    console.log(toPrint + message);
}
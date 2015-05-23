// Eloquent JavaScript
// Chapter 9 Exercises
// regular expressions
// boots
"use strict";
var a, b, c, d;


// Regexp Golf

/* car and cat */
a = /car|t/;
assert(a.test("car") &&
        a.test("cat"),
        "car and cat");

/* pop and prop */
a = /pr?op/;
assert(a.test("pop") &&
        a.test("prop"),
        "pop and prop");

/* ferret, ferry, and ferrari */
a = /ferr(et$|y$|ari$)/;
assert(a.test("ferret") &&
        a.test("ferry") &&
        a.test("ferrari"),
        "ferret, ferry, and ferrari");

/* Any word ending in ious */
a = /[a-z]*ious$/i;
assert(a.test("pious") &&
        a.test("envious") &&
        !a.test("fabulous") &&
        !a.test("iousity"),
        "any word ending in ious");

/* A whitespace character followed by a dot, comma, colon, or semicolon */
a = /\s[.,:;]/;
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


// Quoting Style
a = /\'.*\'([\s.,;:]|$)/;
function replacer(match, suffix) {
    suffix = suffix || "";
    var endIndex = suffix ? -2 : -1;
    return "\"" + match.slice(1, endIndex) + "\"" + suffix;
}
b = "'Hello there!'";
c = '"Hello there!"';
assert(b.replace(a, replacer) === c, "");
b = "'Hello there!'  Ain't it strange.";
c = '"Hello there!"  Ain\'t it strange.';
assert(b.replace(a, replacer) === c, "");
b = "'Hello there!', Ain't it strange.";
c = '"Hello there!", Ain\'t it strange.';
assert(b.replace(a, replacer) === c, "");


// Numbers Again
a = /^(\-|\+)?((\d*(\.)?\d+)|(\d+(\.)?\d*)|(\d+e(\-|\+)?\d+))$/;

assert(a.test("1"), "1 is a number");
assert(a.test("+1"), "+1 is a number");
assert(!a.test("++1"), "++1 is not a number");
assert(a.test("-1"), "-1 is a number");

assert(!a.test("."), ". is not a number");

assert(a.test(".1"), ".1 is a number");
assert(a.test("+.1"), "+.1 is a number");
assert(a.test("-.1"), "-.1 is a number");
assert(!a.test("--.1"), "--.1 is a number");

assert(a.test("1."), "1. is a number");
assert(a.test("+1."), "+1. is a number");
assert(a.test("-1."), "-1. is a number");

assert(!a.test("e"), "e is not a number (don't you dare say it is)");
assert(!a.test("1e"), "1e is not a number");
assert(!a.test("e1"), "e1 is not a number");

assert(a.test("1e10"), "1e10 is a number");
assert(a.test("1e-10"), "1e-10 is a number");



// Testers
function assert(predicate, message) {
    var toPrint = predicate ? "[PASSED] " : "☹ [FAILED] ";
    console.log(toPrint + message);
}
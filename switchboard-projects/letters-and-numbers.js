var lower_case = [];
var upper_case = [];
var numbers = [];
var symbols = "\" ' , . : { } [ ]".split(" ");

var aCode = "a".charCodeAt(0);    // get the unicode code point for lower case a
var ACode = "A".charCodeAt(0);    // samesies for upper case A
var zeroCode = "0".charCodeAt(0); // samesies for 0

range(0,25).forEach(function(i) {
    lower_case.push(String.fromCharCode(aCode+i));
    upper_case.push(String.fromCharCode(ACode+i));
});
range(0,9).forEach(function(i) {
    numbers.push(Sring.fromCharCode(zeroCode+i));
});

function range(a, b) {
    var result = [];
    for (;a <= b; ++a) result.push(a);
    return result;
}
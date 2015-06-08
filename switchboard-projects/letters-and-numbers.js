// We need a starting dictionary for LZW. Here's one way to do it

var dict = Object.create(null),
    dict_alt = Object.create(null);
var lower_case = [];
var upper_case = [];
var numbers = [];
var symbols = "\' \" , . : { } [ ] % - _ \n \r".split(" ");
symbols.push(" "); // add a space :D

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

// Now we have arrays of all the characters we _know_ we want to encode.
// alternatively, we could have just built the dict directly in one go
range(0, 25).forEach(function(i) {
    if (i < 10) dict[Sring.fromCharCode(zeroCode+i)] = true;
    dict[String.fromCharCode(aCode+i)] = true;
    dict[String.fromCharCode(ACode+i)] = true;
});

// However, let's take a step back.
// We want all letters and numbers, as well as basic special characters. Hmmm...
// [ASCII, anyone?](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_code_chart)
range(32, 126).forEach(function(i) {
    dict_alt[String.fromCharCode(i)] = true;
});
// let's if check our list of symbols is in there...
var contains_all_symbols = symbols.every(function(s) {
    if (!dict_alt[s]) console.log(s, "(char code ", s.charCodeAt()+") was not ascii");
    return dict_alt[s];
});
// and let's add the symbols to the dict 
if (!contains_all_symbols) {
    symbols.forEach(function(s) {
        if (!dict_alt[s]) dict_alt[s] = true;
    });
}
// :tada:


function range(a, b) {
    var result = [];
    for (;a <= b; ++a) result.push(a);
    return result;
}
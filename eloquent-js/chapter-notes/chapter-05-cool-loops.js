// Sorry for the loops' unexpressive function names.
// If you have an idea for better names, please tell me!

// This is a useful helper that is implmented in 
// I'll admit I conceptually borrowed it from Ruby...
function nTimes(n, fun) {
    var counter = n;
    if (n <= 0) return;
    while (counter--) fun(n - counter);
}

function nTimesReverse(n, fun) {
    if (n <= 0) return;
    while (n--) fun(n+1);
}

function countDown(b, a) {
    if (b <= a) return;
    while (b - a + 1) {
        console.log(b);
        b--;
    }
}

function countUp(a, b) {
    if (a >= b) return;
    while (b - a + 1) {
        console.log(a);
        a++;
    }
}

// CHALLENEGE
// Write a function that iterates over an array two elements at a time.
// It should take as its arguments an `array` and a `function`,
// and it should pass elements of `array` to `function` two at a time.
//
// Think of this like a sliding window.
// First, we call `function(array[0], array[1])`
// Next, we call `function(array[1], array[2])`
// Etc., Etc...
function byTwo(array, fun) {
    var len = array.length,
        i;
    for (i = 0; i + 1 < len; i++) {
        fun(array[i], array[i+1]);
    }
}

function byTwoAlt(array, fun) {
    var len = array.length;
    if (len < 2) return;
    nTimes(len - 1, function(i) {
        fun(array[i-1], array[i]);
    });
}

// CHALLENGE
// Write a function that takes as its arguments any number of numbers
// and counts up or down between them.
// 

function countAround() {
    var args = [].slice.call(arguments);
    byTwo(args, function(a, b) {
        if (a < b) countUp(a, b);
        else countDown(a, b);
        console.log("---");
    });
}


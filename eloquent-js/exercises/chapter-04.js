// Eloquent JavaScript
// Chapter 4 Exercises
// boots
var a, b, c, d, e, f;

// The Sum of a Range [+ Bonus]

function sum(array) {
    return array.reduce(sumHelper);
}

function sumHelper(prev, current) {
    return prev + current;
}

function range(start, end, step) {
    step = step || 1;
    var result = [];
    for (;start <= end; start += step) result.push(start);
    return result;
}

assert(sum(range(1, 10)) === 55, "Summing 1 to 10 yields 55.");
assert(arrayEqual(range(1, 10, 2), [1,3,5,7,9]), "range can 2 step");
assert(arrayEqual(range(5, 2, -1), [5, 4, 3, 2]), "range can -1 step");


// Reversing an Array
// more better
function reverseArray(array) {
    var result = [];
    for (var i = array.length; i > 0; i--) {
        result.push(array[i-1]);
    }
    return result;
}

// more efficient
function reverseArrayInPlace(array) {
    var len = array.length,
        pivot = Math.floor(len/2),
        temp;
    if (!isEven(len)) pivot += 1;
    for (var i = 0; i < pivot; i++) {
        temp = array[i];
        array[i] = array[len - i - 1];
        array[len - i - 1] = temp;
    }
}

assert(arrayEqual(reverseArray([1,2]), [2,1]), "reverse array length 2");
assert(arrayEqual(reverseArray([6,8,22]), [22,8,6]), "reverse array length 3");

a = [1,2]; reverseArrayInPlace(a);
assert(arrayEqual(a, [2,1]), "reverse array length 2 in place");
a = [1,2,3]; reverseArrayInPlace(a);
assert(arrayEqual(a, [3,2,1]), "reverse array length 3 in place");


// A List
function arrayToList(array, rest) {
    if (rest === undefined) rest = null;
    var arrayCopy = array.slice(),  // avoid side-effects
        value = arrayCopy.pop(),
        next = {
            value: value,
            rest: rest
        };
    if (arrayCopy.length === 0) return next;
    return arrayToList(arrayCopy, next);
}

function listToArray(list, result) {
    result = result || [];
    result.push(list.value);
    if (list.rest === null) {
        return result;
    }
    return listToArray(list.rest, result);
}

function prepend(value, list) {
    return {
        value: value,
        rest: list,
    };
}

function nth(list, n) { // uses 0-based indexing
    var result = list;
    if (n < 0) return;
    while (n--) {
        if (!result) return;
        result = result.rest;
    }
    return result.value;
}

function nth_recursive(list, n) {
    if (n < 0) throw new Error("Stop being dumb. Lists don't have negative indices.");
    if (n === 0) return list.value;
    if (isNull(list)) return;
    return nth_recursive(list.rest, n-1);
}

a = [1,2,3];
b = { value: 1, rest: { value: 2, rest: { value: 3, rest: null }}};
c = { value: 0, rest: { value: 1, rest: { value: 2, rest: { value: 3, rest: null }}}};
assert(listEqual(arrayToList(a), b), "array converted to list properly");
assert(arrayEqual(a, listToArray(b)), "list converted to array properly");
assert(listEqual(prepend(0, b), c), "prepended value to list");
assert(nth(b, 0) === 1, "nth works");
assert(nth(c, 0) === 0, "nth works");
assert(nth_recursive(b, 0) === 1, "nth recursive works");
assert(nth_recursive(c, 0) === 0, "nth recursive works");


// Deep Comparison
function deepEqual(object1, object2) {
    var prop,
        props1,
        props2;

    if (!isNull(object1) && typeof object1 === "object") {
        props1 = Object.keys(object1);
        props2 = Object.keys(object2);

        if (props1.length !== props2.length) return false;
        for (prop in object1) {
            if (prop in object2) {
                return deepEqual(object1[prop], object2[prop]);
            }
            return false;
        }
    }
    return object1 === object2;
}

a = [1,2,3];
b = { value: 1, rest: { value: 2, rest: { value: 3, rest: null }}};
d = { value: [1,2] };
e = { value: [1,2] };
f = {};
assert(deepEqual(3, 3), "deepEqual on equal numbers");
assert(!deepEqual(2, 3), "deepEqual on unequal numbers");
assert(deepEqual("3", "3"), "deepEqual on equal strings");
assert(!deepEqual("2", "3"), "deepEqual on unequal strings");
assert(deepEqual([1,2], [1,2]), "deepEqual on equal arrays");
assert(!deepEqual([1,2], [2,1]), "deepEqual on unequal arrays");
assert(deepEqual(d, e), "deepEqual on equal objects");
assert(!deepEqual(d, f), "deepEqual on unequal objects");
assert(deepEqual(arrayToList(a), b), "deepEqual on list");


// General Helpers
function isEven(n) {
    return !(n%2);
}

function isNull(n) {
    return n === null;
}


// Tester
function assert(predicate, message) {
    var toPrint = predicate ? "[PASSED] " : "☹ [FAILED] ";
    console.log(toPrint + message);
}

function arrayEqual(array1, array2) { // written before deepEqual exercise
    return array1.reduce(arrayEqualHelper, true);

    function arrayEqualHelper(prev, current, index) {
        return prev && (current === array2[index]);
    }
}

function listEqual(list1, list2) { // written before deepEqual exercise
    if (list1.value !== list2.value) return false;
    if (isNull(list1.rest) && isNull(list2.rest)) {
        return true;
    }
    return listEqual(list1.rest, list2.rest);
}
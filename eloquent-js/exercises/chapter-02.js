// Eloquent JavaScript
// Chapter 2 Exercises
// boots (05/17/15)


// Looping A Triangle
console.log("\n\n*** Looping a Triangle ***");
(function loopyTriangle() {
    range(1, 7).forEach(printHashes);
})();

// FizzBuzz
console.log("\n\n*** FizzBuzz ***");
(function fizzBuzz() {
    range(1, 100).forEach(printFizzOrBuzz);
})();

// Chess Board
console.log("\n\n*** Chess Board ***");
(function chessBoard(n) {
    var result = range(0, n*n-1).reduce(toBoard, "");
    console.log(result);
})(8);

// Helpers
function range(a, b) {
    var result = [];
    for (;a <= b; ++a) result.push(a);
    return result;
}

function printHashes(n) {
    var result = "";
    while (n--) result += "#";
    console.log(result);
}

function printFizzOrBuzz(n) {
    var result = n;
    if (n % 3 === 0) {
        result = "Fizz";
        if (n % 5 === 0) result += "Buzz";
    }
    else if (n % 5 === 0) result = "Buzz";
    console.log(result);
}

function toBoard(previous, current, index, array) {
    // uses zero-based indexing for rows and columns
    var dim    = Math.sqrt(array.length),
        row    = Math.floor(index / 8),
        col    = index % 8,
        result = toBoardSquare(row, col);

    if (col === 7) result += "\n";

    return previous + result;  // why is this bad?
}

function toBoardSquare(row, col) {
    // PRO-TIP: underscores are easier to debug than spaces
    if (isEven(row)) {
        if (isEven(col)) {
            result = "#";
        }
        else {
            result = "_";
        }
    }
    else {
        if (isEven(col)) {
            result = "_";
        }
        else {
            result = "#";
        }
    }
    return result;
}

function isEven(n) {
    return !(n%2);
}
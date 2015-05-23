// Eloquent JavaScript
// Chapter 8 Exercises
// Bugs and Error Handling
// boots
var a, b;

// Retry
function MultiplyUnitFailure(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}
MultiplyUnitFailure.prototype = Object.create(Error.prototype);
MultiplyUnitFailure.prototype.name = "MultiplyUnitFailure";

function primitiveMultiply(a, b) {
    var i = Math.floor(Math.random()*2);
    if (i) throw new MultiplyUnitFailure("Oopsies.");
    return a * b;
}

function primitiveMultiplyWrapper(a, b) {
    var result;
    try {
        result = primitiveMultiply(a, b);
    }
    catch (e) {
        if (e.name === "MultiplyUnitFailure") {
            result = primitiveMultiplyWrapper(a,b);
        }
    }
    finally {
        return result;
    }
}

a = b = 10;
while (a--) {
    assert(primitiveMultiplyWrapper(0, 0) === 0, "Attempt "+(b-a)+" of primitiveMultiplyWrapper");
}


// The Locked Box
var box = {
    locked: true,
    unlock: function() { this.locked = false; },
    lock: function() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(f) {
    box.unlock();
    try {
        f();
    }
    catch(e) {}
    finally {
        box.lock();
    }
}

assert(box.locked, "The box is locked.");
withBoxUnlocked(function() {
    assert(!box.locked, "The box is unlocked.");
    throw new Error("Hehehe!");
});
assert(box.locked, "The box is locked.");

withBoxUnlocked(function() {
    assert(!box.locked, "The box is unlocked.");
});
assert(box.locked, "The box is locked.");


// Testers
function assert(predicate, message) {
    var toPrint = predicate ? "[PASSED] " : "☹ [FAILED] ";
    console.log(toPrint + message);
}
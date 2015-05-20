// Eloquent JavaScript
// Chapter 6 Exercises
// boots
var a, b, c;

// A Vector Type

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function plus(w) {
    return new Vector(this.x + w.x, this.y + w.y);
};

Vector.prototype.minus = function minus(w) {
    return new Vector(this.x - w.x, this.y - w.y);
};

Vector.prototype.length = function length() {
    var x = this.x,
        y = this.y;
    return Math.sqrt(x*x + y*y);
};

a = new Vector(3, 4);
b = new Vector(1,-1);
c = a.plus(b);
d = a.minus(b);
assert(a.length() === 5,
    "new Vector(3,4) has proper length...");
assert(c.x === 4 && c.y === 3,
    "adding new Vectors works ");
assert(d.x === 2 && d.y === 5,
    "subtracting new Vectors works ");


// A Vector Type (redux)

var vectorProto = {
    x: null,
    y: null,
    plus: function plus(w) {
        return new Vector(this.x + w.x, this.y + w.y);
    },
    minus: function minus(w) {
        return new Vector(this.x - w.x, this.y - w.y);
    },
    length: function length() {
        var x = this.x,
            y = this.y;
        return Math.sqrt(x*x + y*y);
    },
};

function vectorFactory(config) {
    return extend(Object.create(vectorProto), config);
}

a = vectorFactory({ x: 3, y: 4 });
b = vectorFactory({ x: 1, y: -1 });
c = a.plus(b);
d = a.minus(b);
assert(a.length() === 5,
    "vectorFactory({ x: 3, y: 4 }) has proper length...");
assert(c.x === 4 && c.y === 3,
    "adding vectors works ");
assert(d.x === 2 && d.y === 5,
    "subtracting vectors works ");


// Testers
function assert(predicate, message) {
    var toPrint = predicate ? "[PASSED] " : "☹ [FAILED] ";
    console.log(toPrint + message);
}

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

function extend() {
    // extends an arbitrary number of objects
    var args   = [].slice.call(arguments, 0),
        result = args[0];

    for (var i=1; i < args.length; i++) {
        result = extendHelper(result, args[i]);
    }

    return result;
}

function extendHelper(destination, source) {
    // thanks be to angus kroll
    // https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
    for (var k in source) {
        if (source.hasOwnProperty(k)) {
          destination[k] = source[k];
        }
    }
    return destination;
}
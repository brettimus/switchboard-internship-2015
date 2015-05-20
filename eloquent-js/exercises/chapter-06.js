// Eloquent JavaScript
// Chapter 6 Exercises
// boots
var util = require("util");

var a, b, c, d;


// A Vector Type
function Vector(x, y) {
    this.x = x;
    this.y = y;
    Object.defineProperty(this, "length", {
        get: function length() {
            var x = this.x,
                y = this.y;
            return Math.sqrt(x*x + y*y);
        }
    });
}

Vector.prototype.plus = function plus(w) {
    return new Vector(this.x + w.x, this.y + w.y);
};

Vector.prototype.minus = function minus(w) {
    return new Vector(this.x - w.x, this.y - w.y);
};

a = new Vector(3, 4);
b = new Vector(1,-1);
c = a.plus(b);
d = a.minus(b);
assert(a.length === 5,
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
        return vectorFactory({
            x: this.x + w.x,
            y: this.y + w.y,
        });
    },
    minus: function minus(w) {
        return vectorFactory({
            x: this.x - w.x,
            y: this.y - w.y,
        });
    },
    get length() {
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
assert(a.length === 5,
    "vectorFactory({ x: 3, y: 4 }) has proper length...");
assert(c.x === 4 && c.y === 3,
    "adding vectors works ");
assert(d.x === 2 && d.y === 5,
    "subtracting vectors works ");


// Another Cell
function StretchCell(inner, width, height) {
    // TextCell.call(this, inner);
    extend(this, inner); // Does this work? I think this works...
    this.width = width;
    this.height = height;
}
StretchCell.prototype.minWidth = function() {
    return Math.max(inner.minWidth(), this.width);
};
StretchCell.prototype.minHeight = function() {
    return Math.max(inner.minHeight(), this.height);
};


// Sequence Interface
function log5(sequence) {
    iterateOverSequence(sequence, function(v, i) {
        if (i > 4) return;
        console.log(v);
    });
}
function iterateOverSequence(sequence, f) {  // TODO - more expressive name
    var count = 0;
    while (sequence) {
        f(sequence.value, count);
        sequence = sequence.next;
        count ++;
    }
}

function ArraySeq(array) {
    this.sequence = null;
    for (var i = array.length; i > 0; i--) {
        this.sequence = {
            value: array[i - 1],
            next: this.sequence,
        };
    }
}
ArraySeq.prototype.iterate = function(f) {
    iterateOverSequence(this.sequence, f);
};

function RangeSeq(from, to) {
    ArraySeq.call(this, range(from, to));
}
RangeSeq.prototype = Object.create(ArraySeq.prototype);

var sequenceExample = {
    value: 5,
    next: {
        value: 4,
        next: {
            value: 3,
            next: {
                value: 2,
                next: {
                    value: 1,
                    next: {
                        value: 0,
                        next: null,
                    },
                }
            }
        }
    }
};

log5(sequenceExample);
a = new ArraySeq([1,2,3]);
console.log("\n*** ArraySeq ***", util.inspect(a, {showHidden: false, depth: null}));
a.iterate(function(v, i) { console.log("Iterating over ArraySeq... value:", v, "@ index:", i); });
a = new RangeSeq(1, 3);
console.log("\n*** RangeSeq ***", util.inspect(a, {showHidden: false, depth: null}));
a.iterate(function(v, i) { console.log("Iterating over RangeSeq... value:", v, "@ index:", i); });

// Helpers
function range(a, b) {
    var result = [];
    for (;a <= b; ++a) result.push(a);
    return result;
}

function TextCell(text) {
  this.text = text.split("\n");
}
TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0);
};
TextCell.prototype.minHeight = function() {
  return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};

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


// Testers
function assert(predicate, message) {
    var toPrint = predicate ? "[PASSED] " : "☹ [FAILED] ";
    console.log(toPrint + message);
}


// Data
function getMountains() {
   return [
     {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
     {name: "Everest", height: 8848, country: "Nepal"},
     {name: "Mount Fuji", height: 3776, country: "Japan"},
     {name: "Mont Blanc", height: 4808, country: "Italy/France"},
     {name: "Vaalserberg", height: 323, country: "Netherlands"},
     {name: "Denali", height: 6168, country: "United States"},
     {name: "Popocatepetl", height: 5465, country: "Mexico"}
   ];
}
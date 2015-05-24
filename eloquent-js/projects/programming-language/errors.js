module.exports = {
    SyntaxError: SyntaxError,
    ReferenceError: ReferenceError,
    TypeError: TypeError,
};

function SyntaxError(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}
SyntaxError.prototype = Object.create(Error.prototype);
SyntaxError.prototype.name = "SyntaxError";

function ReferenceError(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}
ReferenceError.prototype = Object.create(Error.prototype);
ReferenceError.prototype.name = "ReferenceError";

function TypeError(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}
TypeError.prototype = Object.create(Error.prototype);
TypeError.prototype.name = "TypeError";
// makeError("SyntaxError");
// makeError("ReferenceError");
// makeError("TypeError");

// function makeError(name) {
//     // function MyNewError(message) {
//     //     this.message = message;
//     //     this.stack = (new Error()).stack;
//     // }
//     module.exports[name] = new Function("message", "this.message = message; this.stack = (new Error()).stack;");
//     module.exports[name].prototype = Object.create(Error);
//     module.exports[name].prototype.name = name;
// }
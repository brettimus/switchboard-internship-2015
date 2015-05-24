
module.exports = {
    Value: Value,
    Word: Word,
    Application: Application,
};

/**
 * @interface
 * @prop {string} type - Indicates the kind of expression.
 */
function Expression(type) {
    this.type = type;
}

/**
 * Literal strings or numbers.
 * @constructor
 * @implements Expression
 * @prop {string|number} value
 */
function Value(value) {
    Expression.call(this, "value");
    this.value = value;
}
Value.prototype = Object.create(Expression.prototype);

/**
 * An identifier
 * @constructor
 * @implements Expression
 * @prop {string} name
 */
function Word(name) {
    Expression.call(this, "word");
    this.name = name;
}
Word.prototype = Object.create(Expression.prototype);

/**
 * An application
 * @constructor
 * @implements Expression
 * @prop {Expression} operator - Refers to expressiong being applied
 * @prop {}
 */
function Application(operator, args) {
    Expression.call(this, "apply");
    this.operator = operator;
    this.args = args;
}
Application.prototype = Object.create(Expression.prototype);


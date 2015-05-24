var exprs = require("./expressions"),
    Value = exprs.Value,
    Word = exprs.Word,
    Application = exprs.Application,
    SyntaxError = require("./errors").SyntaxError;

module.exports = parse;

function parse(program) {
    var result = parseExpression(program);
    if (skipSpace(result.rest).length > 0) {
        throw new SyntaxError("Unexpected text after program");
    }
    return result.expr;
}

/**
 * Returns data structure with the (parsed)
 * expression at the start of the program plus 
 * the part of the program left after parsing the expression.
 * @function
 * @return {Object}
 */
function parseExpression(program) {
    program = skipSpace(program);
    var match,
        expr;
    if (match = /^"([^"]*)"/.exec(program)) {
        expr = new Value(match[1]);
    }
    else if (match = /^\d+\b/.exec(program)) {
        expr = new Value(+match[0]);
    }
    else if (match = /^[^\s(),"]+/.exec(program)) {
        expr = new Word(match[0]);
    }
    else {
        throw new SyntaxError("Unexpected syntax: " + program);
    }

    return parseApply(expr, program.slice(match[0].length));
}

function parseApply(expr, program) {
    var arg;

    program = skipSpace(program);
    if (program[0] !== "(") {
        return {
            expr: expr,
            rest: program,
        };
    }

    program = skipSpace(program.slice(1));
    expr = new Application(expr, []);
    while (program[0] !== ")") {
        arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] === ",") {
            program = skipSpace(program.slice(1));
        }
        else if (program[0] !== ")") {
            throw new SyntaxError("Expected ',' or ')'");
        }
    }
    return parseApply(expr, program.slice(1));
}

function skipSpace(string) {
    var first = string.search(/\S/),
        reComment = /#.*/g;

    if (first === -1) return "";

    return string.slice(first).replace(reComment, "");
}
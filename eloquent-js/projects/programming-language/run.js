var topEnv = require("./environment"),
    parse = require("./parser"),
    evaluate = require("./evaluator");

module.exports = run;

function run() {
    var env = Object.create(topEnv),
        program = [].slice.call(arguments, 0).join("\n");
    return evaluate(parse(program), env);
}
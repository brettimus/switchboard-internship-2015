var SyntaxError = require("./errors").SyntaxError,
    ReferenceError = require("./errors").ReferenceError,
    TypeError = require("./errors").TypeError;

function evaluate(expr, env) {
    var op;

    switch(expr.type) {
        case "value":
            return expr.value;
        case "word":
            if (expr.name in env) return env[expr.name];
            return new ReferenceError("Undefined variable: " + expr.name);
        case "apply":
            if (expr.operator.type == "word" && expr.operator.name in specialForms) {
                return specialForms[expr.operator.name](expr.args, env);
            }
            op = evaluate(expr.operator, env);
            if (typeof op !== "function") {
                throw new TypeError("Applying a non-function.");
            }
            return op.apply(null, expr.args.map(function(arg){
                return evaluate(arg, env);
            }));
    }
}

var specialForms = Object.create(null);

specialForms["if"] = function(args, env) {
    if (args.length !== 3) {
        throw new SyntaxError("Bad number of args to if");
    }

    if (evaluate(args[0], env) !== false) {
        return evaluate(args[1], env);
    }

    return evaluate(args[2], env);
 };

specialForms["while"] = function(args, env) {
    if (args.length !== 2) {
        throw new SyntaxError("Bad number of args to while");
    }

    while (evaluate(args[0], env) !== false) {
        evaluate(args[1], env);
    }

    return false; // we lack an `undefined` construct and thus return false
};

specialForms["do"] = function(args, env) {
    var value = false;
    args.forEach(function(arg) {
        value = evaluate(arg, env);
    });
    return value;
};

specialForms["define"] = function(args, env) {
    var value;
    if (args.length !== 2 || args[0].type !== "word") {
        throw new SyntaxError("Bad use of define");
    }
    value = evaluate(args[1], env);
    env[args[0].name] = value;
    return value;
};

specialForms["fun"] = function(args, env) {
    var argNames,
        body;
    if (!args.length) {
        throw new SyntaxError("Functions need a body");
    }

    function name(expr) {
        if (expr.type !== "word") {
            throw new SyntaxError("Arg names must be words");
        }
        return expr.name;
    }

    argNames = args.slice(0, args.length - 1).map(name);
    body = args[args.length - 1];

    return function() {
        var localEnv,
            i;
        if (arguments.length !== argNames.length) {
            throw new TypeError("Wrong number of arguments");
        }
        localEnv = Object.create(env); // sets up our function scope
        for (i = 0; i < arguments.length; i++) {
            localEnv[argNames[i]] = arguments[i];
        }
        return evaluate(body, localEnv);
    };
};

specialForms["array"] = function(args, env) {
    var i,
        value = [];
    for (i = 0; i < args.length; i++) {
        value.push(evaluate(args[i], env));
    }
    return value;
};

specialForms["length"] = function(args, env) {
    if (args.length !== 1) {
        throw new SyntaxError("Bad number of args to length");
    }
    return evaluate(args[0], env).length;
};

specialForms["element"] = function(args, env) {
    var array,
        n;
    if (args.length !== 2) {
        throw new SyntaxError("Bad number of args to element");
    }

    array = evaluate(args[0], env);
    n = evaluate(args[1], env);

    return array[n];
};

specialForms["set"] = function(args, env) {
    var parentEnv,
        value;

    if (args.length !== 2 || args[0].type !== "word") {
        throw new SyntaxError("Bad use of set");
    }

    value = evaluate(args[1], env);

    if (args[0].name in env) {
        env[args[0].name] = value;
        return value;
    }

    parentEnv = Object.getPrototypeOf(env);
    while (parentEnv) {
        if (Object.hasOwnProperty.call(parentEnv), args[0] ) {
            parentEnv[args[0].name] = value;
            return value;
        }
        parentEnv = Object.getPrototypeOf(parentEnv);
    }

    throw new ReferenceError(args[0].name + " is not defined");
};

module.exports = evaluate;
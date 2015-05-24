// Eloquent JavaScript
// Chapter 11 Exercises
// a programming language
// boots

// Arrays
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

// Closure
// This part of `fun` is what enables closure:
/*
    localEnv = Object.create(env); // sets up our function scope in the context of the parten environment
    for (i = 0; i < arguments.length; i++) {
        localEnv[argNames[i]] = arguments[i];
    }
    return evaluate(body, localEnv); // evaluating in the context of localEnv means we have access to the parent environment
*/


// Comments
// Modified skipSpace to also globally strip out single-line comments
function skipSpace(string) {
    var first = string.search(/\S/),
        reComment = /#.*/g;  // . means any character except for a newline

    if (first === -1) return "";
    
    return string.slice(first).replace(reComment, "");
}


// Fixing Scope
// My rendition of the `set` special form
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
var ops = "+ - * / == < >",
    topEnv = Object.create(null);

topEnv["true"] = true;
topEnv["false"] = false;
topEnv["print"] = function(value) {
    console.log(value);
};

ops.split(" ").forEach(function(op) {
    topEnv[op] = new Function("a, b", "return a " + op + " b;");
});

module.exports = topEnv;
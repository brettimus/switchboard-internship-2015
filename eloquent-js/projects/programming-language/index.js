var run = require("./run");

run("do(define(total, 0),",
    "    define(count, 1),",
    "    while(<(count, 11),",
    "        do(define(total, +(total, count)),",
    "           define(count, +(count, 1)))),",
    "    print(total))");


run("do(define(ary, array(0)), # comment",
    "    print(ary), # another comment",
    "    print(length(ary)),",
    "    print(element(ary,0)))");
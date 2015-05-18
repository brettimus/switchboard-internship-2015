# Overview
Snooze, amirite?! 

Lucky you, you now know how to do nothing cool in JavaScript. Congratulations!

# Remainder vs. Modulo
In JavaScript, `a % n` yields the remainder of `a` when divided by `n`. 

This is seemingly straightforward and conforms to our usual notion of `modulo` from number theory... erm, sort of.

[From Wikipedia](https://en.wikipedia.org/wiki/Modulo_operation):

> When either a or n is negative, the naive definition breaks down and programming languages differ in how these values are defined.

```javascript
// mod in javascript
console.log(5, 3)    // => 2
console.log(-5, 3)   // => -2
console.log(5, -3)   // => 2
console.log(-5, -3)  // => -2
```

See **:pizza: Food for Thought :pizza:** for a highly-optional exercise surrounding the remainder operator.


# shit's getting wIEEE754rdddd
There is only one `Number` type in javascript, and it is a 64-bit floating point value.
_There are no integers._ This makes things weird.

E.g., the classic newbie "omg javascript is broken" eureka moment: 
```javascript
console.log(.1 + .2 === .3)  // => false
console.log(.1 + .2)         // run this and see what you get.
```

**Side-project** If you want to have some fun, 
post the above code on Stack Overflow with the title "GUYS I FOUND A BURG IN JARVASCRIPT!!1!!!" 
and watch the hate pour in. 
[Then, listen to this song.](https://www.youtube.com/watch?v=nfWlot6h_JM)

JavaScript adheres to the [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point) standard for floating point arithmetic, 
which is why there's some numeric-related weirdness like `typeof NaN` returning "number" 
(_it's called not-a-number for fuck's sake!_) and
`NaN === NaN` returning false (_more understandable, but still_). 

Remember: These aren't bugs; they're features! (And they aren't JavaScript's fault.)


# other unary operators
`+` can be used to coerce a `String` into a `Number`, though it is substantially slower than the [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) method. 

I'm blanking at the moment, but I think there are some oddities revolving how `+` coerces numbers in older versions of js.
```javascript
var magicString = "3";
var magicNumber = +magicString;
console.log(typeof magicString); // => "string"
console.log(typeof magicNumber); // => "number"
```

JavaScript also supports a throwback to assembly code (in the form of unary operators `++` and `--`).
`++` prefix & postfix
```javascript
var i = 1,
    j = 1;
console.log(i++)  // => 1
console.log(i)    // => 2
console.log(++j)  // => 2
console.log(j)    // => 2
```
`--` prefix & postfix
```javascript
var k = 1,
    l = 1;
console.log(k--)  // => 1
console.log(k)    // => 0
console.log(--l)  // => 0
console.log(l)    // => 0
```

Don't sweat the details here. 
I merely wanted to give you a head's up that these exist 
(and let ya know that they _do_ mutate their respective operands).


# typeof null === "bug"
The expression `typeof null` returns `"object"`, 
but `typeof undefined` returns `"undefined"`.

This is where I note that JavaScript, as a language, was written in 10 days by Brendan Eich. The behavior of `typeof` applied to `null` is (in fact) a bug in the language. You've been warned. I'm so sorry.


# plz only use `===`
The `==` operator abides by convoluted rules for type coercion. It's best to avoid it, except for the ONE CASE the book cites, which is as a simple way to check if something is either `null` or `undefined`. 

Even in this case, though, I'd prefer if you abstracted the  a computation into a more readable predicate function, as follows.
(NB: A `predicate function` is simply a function that returns `true` or `false`. )


```javascript
  function isNully(value) {
    return null == value;
  }
```


# the blessed curse of truthiness

If you're ever in doubt, use a double-bang (`!!`) to evaluate the truthiness of an expression. E.g.,
```javascript
console.log(!!"foo")      // => true
console.log(!!"")         // => false
console.log(!!42)         // => true
console.log(!!0)          // => false
console.log(!!Object)     // => true
console.log(!!undefined)  // => false
console.log(!!null)       // => false
console.log(!!true)       // => srsly?
console.log(!!false)      // => okay. that's enough.
```


# Primitive Wrapper Types
I might be jumping the proverbial javascript-gunship here, but why not inundate you with implementation details?

The types `Number`, `Boolean`, `String`, `null`, and `undefined` are language primitives. All other values in JS are `Object`s, which means they store properties (which can in turn hold objects or primitives) and methods that we can manipulate and call with dot notation. E.g.,

```javascript
var boots = { isAwesome: true };  // create an object with the property "isAwesome" set to true.
console.log(boots.isAwesome)      // => true (duh)
```

Wait... but... but how come we can call methods on primitives?
```javascript
var boots = "McShoes";
console.log(boots.toLowerCase()) // "mcshoes"
```

A-ha! I know... Why don't we get clever?
```javascript
var boots = 42;
boots.isAwesome = true;
console.log(boots.isAwesome);  // => undefined
```

:disappointed:


I'm so distraught... I'M GOING TO DO SOMETHING RASH
```javascript
var boots = new Number(42);
boots.isAwesome = true;
console.log(boots.isAwesome); // => true
```

If you want to know what's going on here, google "Primitive Wrapper Types".


# :pizza: Food for Thought :pizza:

* What is an example of "continuous information"? (Re: "Any piece of discrete information can be reduced to a sequence of zeros and ones.")

* Compute all the signed permutations of `5 mod 3` (above) in another language. Make a pull request on this repo to add your findings, which *could* include a reverse-engineered version of said `mod` function.

* [Read this post on how numbers are encoded in JS.](http://www.2ality.com/2012/04/number-encoding.html)

* WHY TF does the `typeof null` bug exist? Do some research on your interent machine and add a blurb to the repo.

* Google "Primitive Wrapper Types", or ask me to borrow the `Nicholas Zakas` book on my desk... or just read the wonderful Angus Kroll's [post about them](https://javascriptweblog.wordpress.com/2010/09/27/the-secret-life-of-javascript-primitives/).

* ES6 stuff

* Totally random, but [this](https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags) is an example of what Stack Overflow _used_ to be like. Unfortunately, these types of answers aren't allowed any more.

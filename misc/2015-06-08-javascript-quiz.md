# A Quiz of Sorts
[This one is a doozy.](http://perfectionkills.com/javascript-quiz/)

## Note
The author assumes ES3, not ES5 (which is what node + your browser use).

## To Remember
* Hoisting of `var` vs `function` _expressions_
* `with` is evil. never use it.
* when you lose the context of `this` (usually by "borrowing" a method from an object), you can use `.bind` to make sure you keep the proper context
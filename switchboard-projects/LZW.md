# LZW Compression

I want to be able to store lots of data using the 
[`window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 
api that modern browsers offer.

One constraint we have is that `localStorage` can only hold up to 5 megabytes. 
In order to maximize the amount of data that we can store locally

We are temporarily suspending our rule of not optimizing early. Because YOOO (_you only optimize once_).

Please implement 
[the LZW compression algorithm](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Welch) 
in javascript. 

## V0
Your function should take a string and return the compressed version of that string.

## V0.5
Your function should take a single parameter of any type. 
(I am lazy don't want to have to worry about converting my data to a string before using it.)

It should return a compressed string that I can then shove into `localStorage`.

To that end, you should be able to convert the function's sole argument into a string 
(even if it's an object),
and then compress that string. You might find use for [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). 

(If you're unfamiliar with it, 
try running `JSON.stringify` on a few different values in the console 
and see what you get.)

## V1
Make sure not to pollute the global namespace.

Modularize your implementation, and provide a simple interface to perform LZW through _one_ global variable.
# Force-directed Graph Layout
From Chapter 22 of eloquentjs

## A wild build script appeared!
The first time I saw a hand-rolled javascript build script was [here](https://github.com/jbr/sugarcube/blob/master/compile.sh
). So, ya know, that's neat.

To build the `src` files to `dist`, 
give `compile.sh` proper permissions (`$ chmod +x compile.sh`),
then run `$ ./compile.js`. 

If [uglify](https://www.npmjs.com/package/uglify-js) (i.e., the command `uglifyjs`) is installed globally,
you will also see a minified version in the 

(To install uglify, run `$ npm install -g uglifyjs`.)

_If you add new files that need to be concatenated, be sure to leave the first line of the file blank._
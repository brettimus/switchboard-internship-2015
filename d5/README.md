# Week of June 29
So it begins! This week we’ll all (independently) set up d5 repositories as practice. You’re free to name the repo something other than `d5`, so long as it’s better than `d5` (which, for the record, stands for “don’t duplicate data driven documents”).

On Thursday, we’ll show off our work and talk about our feelings. From there, we’ll choose one of our repos to continue working off of.

Also, I’m going to name mine `omg-d3` so that name is now taken, sorry. YA SNOOZE YA LOSE.

## Structure
**Here’s what should be in your repo**:

* an `npm` manifest and `gruntfile.js`
* `src`, `src/charts`, `dist`, and `example` folders
* Hannah: Please make a reusable stacked-histogram charting function
* Will: A reusable multiline charting function
* At least one other chart of your choice. 
* An example page that shows off your two charting functions.
* A `README.md` with basic code examples.

Please follow the conventions set forth by Bostock in his [Towards Reusable Charts](http://bost.ocks.org/mike/chart/) paper.

If you’re unfamiliar with writing markdown (`.md`), check out the [GitHub-flavored markdown cheat sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) or more comprehensive guide to markdown on the [daring fireball blog maintained by John Gruber](https://daringfireball.net/projects/markdown/syntax).

## Da Tech
You should use [grunt](http://gruntjs.com/getting-started) as a build tool. Your `src` files should be wrapped up by [grunt-browserify](https://github.com/jmreidy/grunt-browserify) and the resulting file should subsequently be compressed by [uglify](https://github.com/jmreidy/grunt-contrib-uglify). I.e., after running `grunt` on the command line, your `dist` folder should populate with `d5.js` and `d5.min.js`.

For the example(s), you’re free to use plain html/css, or if you want, you can build them with a template language + css preprocessor of your choice. I like using [handlebars](http://handlebarsjs.com/) and [scss](http://sass-lang.com/). You can find appropriate grunt plugins for these with a little googlin’.

## Remember
You want to expose a global variable for our chartying. One way to do this is assign `GLOBAL.d5` in one of your `src` files. I think you can also assign directly to the `window` object, but `GLOBAL` has been my preferred method for no good reason except that maybe assigning to `window` doesn’t work out of the box… think you may have to do `if (window) window.d5 = d5;`.

ALTERNATIVELY, you could write all of this as a d3 plugin. (I.e., call your library on the `d3` global, and assign all functions to a namespace within `d3` or `d3` directly.) It’s up to you. Feel it out.

**GODSPEED**
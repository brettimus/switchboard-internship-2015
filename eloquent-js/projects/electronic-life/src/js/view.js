var directions = require("./directions").directions,
    charFromElement = require("./utilities").charFromElement,
    randomElement = require("./utilities").randomElement;

module.exports = View;


/**
 * @constructor
 * @param {World} world
 * @param {Vector} vector
 */
function View(world, vector) {
    this.world = world;
    this.vector = vector;
}

/**
 * @method
 * @param {string} direction
 *
 * @return {string}
 */
View.prototype.look = function(dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target)) {
        return charFromElement(this.world.grid.get(target));
    }
    else {
        return "#";
    }
};

/**
 * @method
 * @param {string} ch
 * @return {string[]}
 */
View.prototype.findAll = function(ch) {
    var found = [],
        dir;
    for (dir in directions) {
        if (this.look(dir) === ch) {
            found.push(dir);
        }
    }
    return found;
};

/**
 * @method
 * @param {string} ch
 * @return {string}
 */
View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    if (found.length === 0) return null;
    return randomElement(found);
};
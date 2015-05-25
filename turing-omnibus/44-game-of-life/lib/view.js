var directions = require("./directions").directions,
    charFromElement = require("./utilities").charFromElement,
    randomElement = require("./utilities").randomElement,
    isNully = require("./utilities").isNully;

module.exports = View;


/**
 * Inspects the surroundings (8 neighboring squares) of a square.
 * @constructor
 * @param {Grid} grid - The grid on which the view
 * @param {Vector} vector - The current square from which to inspect the View.grid.
 */
function View(game, vector) {
    this.game = game;
    this.vector = vector;
}

/**
 * Returns whether cell in given direction is alive. Out-of-bounds returns false.
 * @method
 * @param {string} direction - The direction in which to look.
 * @return {Bool}
 */
View.prototype.lookAlive = function(dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.game.grid.isInside(target)) {
        return this.game.grid.get(target).alive;
    }
    else {
        // TODO wrap around the board
        return false;
    }
};

/**
 * Returns a count of all living neighbor cells.
 * @method
 * @return {number}
 */
View.prototype.livingNeighborsCount = function() {
    var aliveCount = 0,
        dir;
    for (dir in directions) {
        if (this.lookAlive(dir)) {
            aliveCount ++;
        }
    }
    return aliveCount;
};

/**
 * Returns the directions corresponding to all neighboring instances of a character.
 * @method
 * @param {string} ch
 * @return {string[]} - Array of directions.
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
 * Returns a direction in which a given character can be found.
 * If more than one neighboring square has the given found, 
 * a random direction is returned.
 * @method
 * @param {string} ch
 * @return {string}
 */
View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    if (found.length === 0) return null;
    return randomElement(found);
};

/**
 * Looks within a one-square-radius for square with a particular value. 
 * @method
 * @param {string} ch
 * @return {string} direction
 */
View.prototype.findNearby = function(ch) {
    var found;
    // Find all spaces into which we could move
    found = this.findAll(" ").filter(function(dir) {
        // Calculate the position of the open space
        // Create a new view based off of said position
        var foundPosition = this.vector.plus(directions[dir]),
            foundView = new View(this.world, foundPosition);

        // If the new position is adjacent to a `ch`, return true
        return !isNully(foundView.find(ch));
    }.bind(this));
    
    if (found.length === 0) return null;
    return randomElement(found);
};

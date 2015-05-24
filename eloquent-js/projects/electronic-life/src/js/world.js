module.exports = World;

var Grid = require("./grid"),
    Vector = require("./vector"),
    View = require("./view"),
    directions = require("./directions").directions,
    elementFromChar = require("./utilities").elementFromChar,
    charFromElement = require("./utilities").charFromElement,
    isNully = require("./utilities").isNully;

/**
 * A basic World that is built to handle movement of its creatures.
 * @constructor
 * @param {string[]} map - An array of strings. Each string represent a row of squares in the world
 * @param {Object} legend - An object that tells us what each character in a map means. Contains a constructor for every charater, except for empty space (" "), which is assumed to be null.
 * @property {Grid} grid
 * @property {Object} legend
 */
function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function(line, y) {
        for (var x = 0; x < line.length; x++) {
            grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
        }
    });
}

/**
 * Creates a human-readable representation of the World.grid property.
 * @method
 * @return {string}
 */
World.prototype.toString = function() {
    var output = "",
        x,
        y;
    for (y = 0; y < this.grid.height; y++) {
        for (x = 0; x < this.grid.width; x++) {
            var element = this.grid.get(new Vector(x, y));
            output += charFromElement(element);
        }
        output += "\n";
    }
    return output;
};

/**
 * Gives all Critter objects a chance to Critter#act,
 * and updates the World.grid to reflect their actions.
 * @method
 */
World.prototype.turn = function() {
    // Keep track of who has acted.
    // If a Critter moves to a new square that we haven't inspected yet,
    // we could accidentally let them act again once we reach that square.
    var acted = [];
    this.grid.forEach(function(critter, vector) {
        if (critter.act && acted.indexOf(critter) === -1) {
            acted.push(critter);
            this.letAct(critter, vector);
        }
    }, this);
};

/**
 * Contains logic that allows critter to move. Ignores nonsensical input.
 * @method
 * @private
 * @param {Critter} critter
 * @param {Vector} vector
 */
World.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    if (action && action.type === "move") {
        var dest = this.checkDestination(action, vector);
        if (dest && isNully(this.grid.get(dest))) {
            this.grid.set(vector, null);
            this.grid.set(dest, critter);
        }
    }
};

/**
 * @method
 * @private
 * @param {Action} action
 * @param {Vector} vector
 */
World.prototype.checkDestination = function(action, vector) {
    var dest;
    if (directions.hasOwnProperty(action.direction)) {
        dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest)) return dest;
    }
};
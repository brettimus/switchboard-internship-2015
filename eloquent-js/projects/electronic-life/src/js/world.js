/** @module world */

module.exports = World;

var Grid = require("./grid"),
    Vector = require("./vector"),
    View = require("./view"),
    directions = require("./directions").directions,
    elementFromChar = require("./utilities").elementFromChar,
    charFromElement = require("./utilities").charFromElement;

/**
 * @function elementFromChar
 * @param {object} legend - Object containing constructors for a character
 * @param {string} ch - A character that can be placed on the world's grid
 * @property {Grid} grid
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

World.prototype.turn = function() {
    var acted = [];
    this.grid.forEach(function(critter, vector) {
        if (critter.act && acted.indexOf(critter) === -1) {
            acted.push(critter);
            this.letAct(critter, vector);
        }
    }, this);
};

World.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    if (action && action.type === "move") {
        var dest = this.checkDestination(action, vector);
        if (dest && this.grid.get(dest) == null) {
            this.grid.set(vector, null);
            this.grid.set(dest, critter);
        }
    }
};

World.prototype.checkDestination = function(action, vector) {
    var dest;
    if (directions.hasOwnProperty(action.direction)) {
        dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest)) return dest;
    }
};
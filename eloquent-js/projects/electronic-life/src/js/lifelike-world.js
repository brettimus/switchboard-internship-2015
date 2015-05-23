module.exports = LifelikeWorld;

var World = require("./world"),
    View = require("./view"),
    actionTypes = require("./action-types");


/**
 * Differentially Inherits from World.
 *
 * @constructor
 * @augments World
 * @param {string} map
 * @param {object} legend - Map of strings to constructors
 */
function LifelikeWorld(map, legend) {
    World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);

/**
 * @method
 * @param {Critter} critter
 * @param {Vector} vector
 */
LifelikeWorld.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector)),
        handled = action &&
                    action.type in actionTypes &&
                    actionTypes[action.type].call(this, critter, vector, action);
    if (handled) {
        critter.energy -= 0.2;
        if (critter.energy <= 0) {
            this.grid.set(vector, null);
        }
    }
};
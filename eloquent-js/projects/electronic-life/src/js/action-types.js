/** @module action-types */

var elementFromChar = require("./utilities").elementFromChar;

/** @namespace */
var actionTypes = Object.create(null);

actionTypes.grow = function(critter) {
    critter.energy += 0.5;
    return true;
};

/**
 * @method
 */
actionTypes.move = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector);

    if (dest == null ||
            critter.energy <= 1 ||
            this.grid.get(dest) != null) {
        return false;
    }
    critter.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
};

/**
 * @method
 * @param {Critter} critter
 * @param {Vector} vector
 * @param {actionType} action
 */
actionTypes.eat = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector),
        atDest = dest != null && this.grid.get(dest);

    if (!atDest || atDest.energy == null) {
        return false;
    }
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};

/**
 * @method
 */
actionTypes.reproduce = function(critter, vector, action) {
    var baby = elementFromChar(this.legend, critter.originChar),
        dest = this.checkDestination(action, vector);

    if (dest == null ||
            critter.energy <= 2 * baby.energy ||
            this.grid.get(dest) != null) {
        return false;
    }

    critter.energy -= (2 * baby.energy);
    this.grid.set(dest, baby);
    return true;
};

module.exports = actionTypes;
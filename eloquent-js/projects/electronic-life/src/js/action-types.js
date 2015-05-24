/** @module action-types */

var elementFromChar = require("./utilities").elementFromChar,
    isNully = require("./utilities").isNully;

/** @namespace */
var actionTypes = Object.create(null);

actionTypes.grow = function(critter) {
    critter.energy += 0.5;
    return true;
};

/**
 * @method
 * @param {Critter} critter
 * @param {Vector} vector
 * @param {Action} action
 */
actionTypes.move = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector);

    if (isNully(dest) ||
            critter.energy <= 1 ||
            !isNully(this.grid.get(dest))) {
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
 * @param {Action} action
 */
actionTypes.eat = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector),
        atDest = !isNully(dest) && this.grid.get(dest);

    if (!atDest || isNully(atDest.energy)) {
        return false;
    }
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};

/**
 * Asexually reproduces the given Critter and takes away half of the Critter.energy property.
 * If there is no space for the baby to be born or the parent does not have enough energy, the action fails.
 * @method
 * @param {Critter} critter
 * @param {Vector} vector
 * @param {Action} action
 */
actionTypes.reproduce = function(critter, vector, action) {
    var baby = elementFromChar(this.legend, critter.originChar),
        dest = this.checkDestination(action, vector);

    if (isNully(dest) ||
            critter.energy <= 2 * baby.energy ||
            !isNully(this.grid.get(dest))) {
        return false;
    }

    critter.energy -= (2 * baby.energy);
    this.grid.set(dest, baby);
    return true;
};

module.exports = actionTypes;
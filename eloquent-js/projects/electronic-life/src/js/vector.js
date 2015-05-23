/** @module vector */

module.exports = Vector;

/**
 * Creates a vector representing cartesian coordinates
 *
 * @constructor
 * @param {number} x - Cartesian x-coordinate
 * @param {number} y - Cartesian y-coordinate
 */
function Vector(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * @method plus
 * @instance
 * @this Vector
 * @ returns Vector
 */
Vector.prototype.plus = function plus(w) {
    return new Vector(this.x + w.x, this.y + w.y);
};
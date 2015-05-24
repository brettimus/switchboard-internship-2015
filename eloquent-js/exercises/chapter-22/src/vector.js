/**
 * A set of (x,y) coordinates in space.
 * @constructor
 * @param {number} x - x-coordinate
 * @param {number} y - y-coordinate
 */
function Vector(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * Vector addition.
 * @method
 * @param {Vector} w
 * @returns {Vector}
 */
Vector.prototype.plus = function plus(w) {
    return new Vector(this.x + w.x, this.y + w.y);
};

/**
 * Vector subtraction.
 * @method
 * @param {Vector} w
 * @returns {Vector}
 */
Vector.prototype.minus = function minus(w) {
    return new Vector(this.x - w.x, this.y - w.y);
};

/**
 * Vector scaling.
 * @method
 * @param {Number} k
 * @returns {Vector}
 */
Vector.prototype.times = function(k) {
    return new Vector(this.x * k, this.y * k);
};

/**
 * @prop {Number} length
 * @this Vector
 * @instance
 * @readonly
 */
Object.defineProperty(Vector.prototype, "length", {
    get: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
});
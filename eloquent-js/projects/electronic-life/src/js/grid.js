/** @module grid */

module.exports = Grid;

/**
 * Represents a grid on which life exists
 *
 * @constructor
 * @param {number} width - Width of grid instance in ...units.
 * @param {number} height - Height of grid instance in ...units.
 * @property {string[]} space - The contents of a grid instance. Units.
 *
 */
function Grid(width, height) {
    this.width = width;
    this.height = height;
    this.space = new Array(width*height);
}

/**
 * @method isInside
 * @instance
 * @this Grid
 * @param {Vector} 
 * @return boolean
 */
Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width &&
            vector.y >= 0 && vector.y < this.height;
};

/**
 * @method get
 * @instance
 * @this Grid
 * @param {Vector} vector - A coordinate
 * @return string
 */
Grid.prototype.get = function(vector) {
    return this.space[this._indexFromVector(vector)];
};


/**
 * @method set
 * @instance
 * @this Grid
 * @param {Vector} vector
 * @param {string} value - Contents of a Grid square
 */
 Grid.prototype.set = function(vector, value) {
     this.space[this._indexFromVector(vector)] = value;
 };

 /**
  * @method _indexFromVector
  * @instance
  * @this Grid
  * @access private
  * @param {Vector} vector
  * @return number
  */
  Grid.prototype._indexFromVector = function(vector) {
      return vector.x + this.width + vector.y;
  };
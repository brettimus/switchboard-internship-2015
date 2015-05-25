module.exports = Cell;


/**
 * A Cell takes an action on each Game#turn.
 * @constructor
 */
function Cell(id, alive) {
    this.id = id;
    this.alive = !!alive;
}

/**
 * Should I live or should I die nowwww? This is kind of hard to read right now sorry.
 * @method
 * @returns {Boolean}
 */
Cell.prototype.willChange = function(view) {
    // View must tell it how many neighbors are alive.
    var aliveCount = view.livingNeighborsCount();
    // if its state changed, return true...
    if (this.alive && aliveCount < 2) return true;
    if (this.alive && aliveCount > 3) return true;
    if (!this.alive && aliveCount === 3) return true;
    return false;
};

/**
 * Invert live-ness
 * @method
 * @returns {this}
 */
Cell.prototype.invert = function() {
    this.alive = !this.alive;
    return this;
};

/**
 * Draw self on svg
 * @method
 * @deprecated
 */
Cell.prototype.draw = function(svg, vector) {

};
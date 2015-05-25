module.exports = Cell;


/**
 * A Cell takes an action on each Game#turn.
 * @constructor
 */
function Cell(id, alive) {
    this.id = id;
    this.alive = !!alive;
    this.infected = false;
}

/**
 * Should I live or should I die nowwww?
 * @method
 * @deprecated
 * @returns {Boolean}
 */
Cell.prototype.willChange = function(view) {
    var neighbs = view.neighbors(),
        aliveCount = neighbs.alive;

    // this spreads too quickly because it assigns infection here...
    if (!this.infected)
        if(neighbs.infected)
            this.infect()

    if (this.alive && aliveCount < 2) return true;
    if (this.alive && aliveCount > 3) return true;
    if (!this.alive && aliveCount === 3) return true;
    return false;
};

/**
 * 
 * @method
 * @returns {Boolean}
 */
Cell.prototype.willChangeLife = function(view) {
    var aliveCount = view.livingNeighborsCount();
    if (this.alive && aliveCount < 2) return true;
    if (this.alive && aliveCount > 3) return true;
    if (!this.alive && aliveCount === 3) return true;
    return false;
};

/**
 * 
 * @method
 * @returns {Boolean}
 */
Cell.prototype.willChangeHealth = function(view) {
    
    if (this.infected) return false; // no cure!
    return view.hasInfectedNeighbor();
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
 * Infect with virus
 * @method
 * @returns {this}
 */
Cell.prototype.infect = function() {
    this.infected = true;
    return this;
};

/**
 * Reverse the infection
 * @method
 * @returns {this}
 */
Cell.prototype.invertInfection = function() {
    this.infected = !this.infected;
    return this;
};
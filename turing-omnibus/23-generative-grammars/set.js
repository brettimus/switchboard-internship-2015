/**
 * A set
 * @interface
 * @param {*} members
 */
function Set(members) {
    this.size = 0;
    if (members) members.forEach(this.add, this);
}
Set.prototype = Object.create(null);

/**
 * Adds a new member to the set.
 * @method
 * @param {*} member
 * @param {Boolean} [force] - Forces insertion if there is a name conflict along the prototype chain.
 * @returns {this}
 */
Set.prototype.add = function(member, force) {
    var that = this;
    if (this._conflicts(member)) {
        if (!force) {
            throw new Error("New symbol "+symbol+" conflicts with name on the Set prototype. Call `.addMember("+member+", true); to force insert" );
        }
    }

    if (!Object.prototype.hasOwnProperty.call(this, member)) {
        this[member] = true;
        this.size++;
    }

    return this;
};

/**
 * Removes a member from the set.
 * @method {*} symbol
 * @param {Boolean} [force] - Forces deletion. 
 * @returns {Boolean}
 */
 Set.prototype.remove = function(member, force) {
    if (this._conflicts(member)) {
        if (!force) {
            throw new Error("New symbol conflicts with name on the Set prototype. Call `.addMember("+member+", true); to force insert" );
        }
    }
    if (this.isMember(member)) {
        delete this[member]; // This ensures the member will not show up if we use the "in" operator.
                              // For Object.hasOwnProperty, it's sufficient to assign `null`.
        this.size--;
    }

    return this;
 };

/**
 * Checks if a given symbol is in the Set. (Does not evaluate along the prototype chain by default.)
 * @method
 * @param {*} symbol
 * @param {Boolean} [deep] - If true, look along the prototype chain for a property matching `symbol`.
 * @returns {Boolean}
 */
Set.prototype.isMember = function(symbol, deep) {
    var result = Object.prototype.hasOwnProperty.call(this, symbol);
    if (deep) result = result || this._conflicts(symbol);
    return result;
};

/**
 * Returns a new Set which is the union of `this` with with `other`.
 * @method
 * @param {Set} other
 */
Set.prototype.union = function(other) {
    var result = new Set();
    Object.keys(this).forEach(result.add, result);
    Object.keys(other).forEach(result.add, result);
    return result;
};

/**
 * Returns a new Set which is the intersection of `this` with with `other`.
 * @method
 * @param {Set} other
 */
Set.prototype.intersect = function(other) {
    var result = new Set(),
        larger = this.size > other.size ? this : other,
        smaller = larger === this ? other : this;

    Object.keys(smaller)
        .filter(larger.isMember, larger)
        .forEach(result.add, result);

    return result;
};

/**
 *
 */


/**
 * Evaluates whethere there is a name-conflict along the prototype chain
 * @method
 * @private
 */
Set.prototype._conflicts = function(symbol) {
    var that = this;

    if (!that.prototype) return false;
    while (true) {
        if (!that) break;
        if (Object.prototype.hasOwnProperty.call(that, symbol)) return true;
        that = that.prototype;
    }
    return false;
};

module.exports = Set;
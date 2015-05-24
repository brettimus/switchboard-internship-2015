/** @module utilities */
var simulateSlowly = require("./simulate-slowly");

/**
 * Uniformly samples a random element from an Array.
 * @function randomElement
 * @param {Array} array
 * @return {*}
 */
module.exports.randomElement = function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
};

/**
 * Checks whether a value is null or undefined.
 * @function isNully
 * @param {*} value
 * @return {Boolean}
 */
function isNully(value) {
    return value == null;
}
module.exports.isNully = isNully;


/**
 * Creates an instance of the correct type from a Legend.
 * @function elementFromChar
 * @param {object} legend - This needs a section in the docs
 * @param {string} ch
 * @returns {object}
 */
module.exports.elementFromChar = function elementFromChar(legend, ch) {
    if (ch === " ") return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
};

/**
 * 
 * @function charFromElement
 * @param {Object} element
 * @returns {string}
 */
module.exports.charFromElement = function charFromElement(element) {
    if (isNully(element)) return " ";
    return element.originChar;
};


/**
 * Runs a human-observable simulation of a given World.
 * @function
 * @param {World} world - World to simulate
 * @param {object} options - Configuration for simulation
 */
module.exports.simulateSlowly = simulateSlowly;



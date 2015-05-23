/** @module utilities */

/**
 * @function randomElement
 * @param {array} array - Array from which to sample a random element.
 */
module.exports.randomElement = function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
};

module.exports.elementFromChar = function elementFromChar(legend, ch) {
    if (ch === " ") return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
};

module.exports.charFromElement = function charFromElement(element) {
    if (element == null) return " ";
    return element.originChar;
};
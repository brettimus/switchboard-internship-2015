module.exports = Game;

var Grid = require("./grid"),
    Cell = require("./cell"),
    Vector = require("./vector"),
    View = require("./view"),
    isNully = require("./utilities").isNully;

/**
 * A basic Game that is built to handle evolution of its squares.
 * @constructor
 * @param {d3.selection} svg - Where we draw the game
 * @param {Boolean[][]} map - An array of arrays. Each value represents whether a cell on the board is alive or dead.
 * @property {Grid} grid
 * @property {Object} svg
 */
function Game(svg, map) {

    var grid = new Grid(map[0].length, map.length);

    this.svg = svg;
    this.grid = grid;

    this.attrs = {
        cx: function(d) { return d.vec.x*10 + 5; },
        cy: function(d) { return d.vec.y*10 + 5; },
        fill: function(d) { return d.cell.alive ? "#222" : "transparent"; },
        opacity: 0.86,
        r: 1,
    };

    this.cellData = [];

    map.forEach(function(line, y) {
        var vec,
            cell;
        for (var x = 0; x < line.length; x++) {
            vec = new Vector(x, y);
            cell = new Cell("#cell-"+vec.x+"-"+vec.y, line[x]);
            grid.set(vec, cell);
            this.cellData.push({vec: vec, cell: cell});
        }
    }, this);

    this.svg.selectAll(".cell")
        .data(this.cellData)
        .enter()
        .append("circle")
        .classed("cell", true)
        .attr(this.attrs);
}

/**
 * Creates a human-readable representation of the Game.grid property.
 * @method
 * @return {string}
 */
Game.prototype.toString = function() {
    var output = "",
        x,
        y;
    for (y = 0; y < this.grid.height; y++) {
        for (x = 0; x < this.grid.width; x++) {
            var cell = this.grid.get(new Vector(x, y));
            output += cell.alive ? "X" : "O";
        }
        output += "\n";
    }
    return output;
};

/**
 * Gives all Cell objects a chance to Cell.act,
 * and update the Game.grid to reflect their actions.
 * @method
 */
Game.prototype.tick = function() {
    var toChangeCount = 0;
    this.grid.filter(function(cell, vector) {
        return cell.willChange(new View(this, vector));
    }, this).forEach(function(cell, vector) {
        toChangeCount++;
        cell.invert();
    }, this);
    
    if (toChangeCount === 0) return; // stops the screen from vibrating

    this.svg
        .selectAll(".cell")
        .data(this.cellData)
        .transition()
        .delay(function(d, i) { return i % 300; })
        .attr(this.attrs);

};

/**
 * Contains logic that allows cell to live and die. Ignores nonsensical input.
 * @method
 * @private
 * @param {Cell} cell
 * @param {Vector} vector
 */
Game.prototype.letAct = function(cell, vector) {
    var change = cell.act(new View(this, vector));
    if (change) {
        cell.draw(this.svg, vector);
    }
};
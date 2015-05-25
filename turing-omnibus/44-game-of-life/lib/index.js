var d3 = require("d3"),
    Simulation = require("./simulation"),
    Game = require("./game"),
    Grid = require("./grid"),
    Vector = require("./vector");

global.svg = d3.select("body")
            .append("svg").attr({
                width: 800,
                height: 600,
            }).append("g").attr({
                transform: "translate(150, 50)"
            });

// global.grid = new Grid(20, 20);

// for (var i = 0; i < 20; i++) {
//     for (var j = 0; j < 20; j++) {
//         grid.set(new Vector(i, j), i === j);
//     }
// }


// grid.forEach(function(isAlive, v) {
//     var x = v.x,
//         y = v.y;
//     svg.append("circle")
//         .attr({
//             cx: x*6 + 2,
//             cy: y*6 + 2,
//             fill: isAlive ? "#222" : "red",
//             opacity: 0.7,
//             r: 2,
//             "stroke-width": 1,
//             "stroke": "#888",
//         });
// }, grid);

var gridWidth = 50,
    gridHeight = 50;

map = new Array(gridHeight);
for (var y = 0; y < gridHeight; y++) {
    map[y] = new Array(gridWidth);
    for (var x = 0; x < gridWidth; x++) {
        map[y][x] = !!Math.floor(Math.random()*2);
    }
}

global.sim = new Simulation(svg, map, 1000);

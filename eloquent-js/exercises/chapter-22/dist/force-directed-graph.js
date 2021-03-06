/**
 * A node on a Graph
 * @constructor
 * @prop {Vector} pos
 * @prop {GraphNode[]} edges
 */
function GraphNode() {
    this.pos = new Vector(Math.random() * 1000,
                            Math.random() * 1000);
    this.edges = [];
}

/**
 * Connect a GraphNode to another GraphNode
 * @method
 * @param {GraphNode} other
 */
GraphNode.prototype.connect = function(other) {
    this.edges.push(other);
    other.edges.push(this);
};

/**
 * Tests if GraphNode has edge to another GraphNode
 * @method
 * @param {GraphNode} other
 * @return {Boolean}
 */
GraphNode.prototype.hasEdge = function(other) {
    for (var i = 0; i < this.edges.length; i++) {
        if (this.edges[i] === other) {
            return true;
        }
    }
};/**
 * Profiling Helper
 * @function runLayout
 * @param {function} implementation - An implementation of a force-directed graph layout.
 * @param {GraphNode[]} graph - An array of GraphNodes that on which to run our force-directed graph layout implementation.
 * @param {Number} [times] - The number of times to test our implementation. Defaults to 4000.
 */
function runLayout(implementation, graph, times) {
    times = times || 4000;
    var totalSteps = 0,
        time = 0;

    step();

    function step() {
        var startTime = Date.now(),
            i = 100;
        while (i--) implementation(graph);
        totalSteps += 100;
        time += Date.now() - startTime;
        drawGraph(graph);
        if (totalSteps < 4000) {
            window.requestAnimationFrame(step);
        }
        else {
            console.log(time);
        }
    }
}/**
 * Creates a simple tree Graph
 * @function runLayout
 * @param {Number} depth
 * @param {Number} branches
 * @return {GraphNode[]}
 */
function treeGraph(depth, branches) {
    var graph = [];
    buildNode(depth);
    return graph;

    function buildNode(depth) {
        var node = new GraphNode(),
            i;
        graph.push(node);
        if (depth > 1) {
            for (i = 0; i < branches; i++) {
                node.connect(buildNode(depth - 1));
            }
        }
        return node;
    }
}/**
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
 * @return {Vector}
 */
Vector.prototype.plus = function plus(w) {
    return new Vector(this.x + w.x, this.y + w.y);
};

/**
 * Vector subtraction.
 * @method
 * @param {Vector} w
 * @return {Vector}
 */
Vector.prototype.minus = function minus(w) {
    return new Vector(this.x - w.x, this.y - w.y);
};

/**
 * Vector scaling.
 * @method
 * @param {Number} k
 * @return {Vector}
 */
Vector.prototype.times = function(k) {
    return new Vector(this.x * k, this.y * k);
};

/**
 * Normalizes the vector. (Creates a vector in the same direction with length of 1)
 * @method
 * @return {Vector}
 */
 Vector.prototype.normalize = function() {
    if (!this.length) throw new Error("Cannot normalize vector at (0,0)");
    return this.times(1/this.length);
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
});// Since we will want to inspect the layouts our code produces, let's
// first write code to draw a graph onto a canvas. Since we don't know
// in advance how big the graph is, the `Scale` object computes a
// scale and offset so that all nodes fit onto the given canvas.

var nodeSize = 8;

function drawGraph(graph) {
  var canvas = document.querySelector("canvas");
  if (!canvas) {
    canvas = document.body.appendChild(document.createElement("canvas"));
    canvas.width = canvas.height = 500;
  }
  var cx = canvas.getContext("2d");

  cx.clearRect(0, 0, canvas.width, canvas.height);
  var scale = new Scale(graph, canvas.width, canvas.height);

  // Draw the edges.
  cx.strokeStyle = "orange";
  cx.lineWidth = 3;
  graph.forEach(function(origin, i) {
    origin.edges.forEach(function(target) {
      if (graph.indexOf(target) <= i) return;
      cx.beginPath();
      cx.moveTo(scale.x(origin.pos.x), scale.y(origin.pos.y));
      cx.lineTo(scale.x(target.pos.x), scale.y(target.pos.y));
      cx.stroke();
    });
  });

  // Draw the nodes.
  cx.fillStyle = "purple";
  graph.forEach(function(node) {
    cx.beginPath();
    cx.arc(scale.x(node.pos.x), scale.y(node.pos.y), nodeSize, 0, 7);
    cx.fill();
  });
}

// The function starts by drawing the edges, so that they appear
// behind the nodes. Since the nodes on _both_ side of an edge refer
// to each other, and we don't want to draw every edge twice, edges
// are only drawn then the target comes _after_ the current node in
// the `graph` array.

// When the edges have been drawn, the nodes are drawn on top of them
// as purple discs. Remember that the last argument to `arc` gives the
// rotation, and we have to pass something bigger than 2π to get a
// full circle.

// Finding a scale at which to draw the graph is done by finding the
// top left and bottom right corners of the area taken up by the
// nodes. The offset at which nodes are drawn is based on the top left
// corner, and the scale is based on the size of the canvas divided by
// the distance between those corners. The function reserves space
// along the sides of the canvas based on the `nodeSize` variable, so
// that the circles drawn around nodes’ center points don't get cut off.

function Scale(graph, width, height) {
  var xs = graph.map(function(node) { return node.pos.x });
  var ys = graph.map(function(node) { return node.pos.y });
  var minX = Math.min.apply(null, xs);
  var minY = Math.min.apply(null, ys);
  var maxX = Math.max.apply(null, xs);
  var maxY = Math.max.apply(null, ys);

  this.offsetX = minX; this.offsetY = minY;
  this.scaleX = (width - 2 * nodeSize) / (maxX - minX);
  this.scaleY = (height - 2 * nodeSize) / (maxY - minY);
}

Scale.prototype.x = function(x) {
  return this.scaleX * (x - this.offsetX) + nodeSize;
};
Scale.prototype.y = function(y) {
  return this.scaleY * (y - this.offsetY) + nodeSize;
};

// The `x` and `y` methods of the `Scale` type convert from graph
// coordinates into canvas coordinates.    /** @const */
var springLength = 40,
    /** @const */
    springStrength = 0.1,
    /** @const */
    repulsionStrength = 1500;

/**
 * A simple (an fairly inefficient) force-directed graph layout generator.
 * @function runLayout
 * @param {GraphNode[]} graph
 */
function forceDirected_simple(graph) {
    graph.forEach(function(node){
        graph.forEach(function(other) {
            if (node == other) return;
            var apart = other.pos.minus(node.pos),
                distance = Math.max(1, apart.length),
                forceSize = -repulsionStrength / (distance * distance),
                normalized;
            if (node.hasEdge(other)) {
                forceSize += (distance - springLength) * springStrength;
            }
            normalized = apart.times(1 / distance);
            node.pos = node.pos.plus(normalized.times(forceSize));
        });
    });
}


// drawGraph(treeGraph(3,5));
runLayout(forceDirected_simple, treeGraph(4,4));
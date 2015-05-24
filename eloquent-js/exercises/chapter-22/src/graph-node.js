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
};
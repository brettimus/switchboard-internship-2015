    /** @const */
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
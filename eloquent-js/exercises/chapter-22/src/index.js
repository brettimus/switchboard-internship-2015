
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
}

drawGraph(treeGraph(3,5));
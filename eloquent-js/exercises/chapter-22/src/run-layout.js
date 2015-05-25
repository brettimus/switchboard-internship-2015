/**
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
}
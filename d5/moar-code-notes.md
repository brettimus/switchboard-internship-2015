# Moar Code Notes
* Pass a function directly if all you’re doing is handing over a `datum`.
```javascript
// Bad
d3.selectAll(“rect”)
    .attr(“height”, function(d) { return yScale(d); }
// Good
d3.selectAll(“rect”)
    .attr(“height”, yScale)
```
* Prefer closures with getters/setters instead of `this.blah`. Decreases our chances of weird bugs to do with context (`this`).
```javascript
// Meh
…
function myChart() {
    this.height = options.height;
}
…
return
// Better
…
var height = options.height;
…
function myChart() { /* Generate chart here */}
myChart.height = function(value) {
    if (!arguments.length) return height;
		height = value;
    return myChart;
}
…
return myChart
```
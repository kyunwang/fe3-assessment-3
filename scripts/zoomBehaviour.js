const zoomCallback = group =>
	() => group.attr('transform', d3.event.transform);

const zoomBehaviour = d3.zoom()
	.scaleExtent([.5, 10])
	// .on('zoom', zoomCallback(d3.select('.states')));
	.on('zoom', zoomCallback(states));

mapCon.call(zoomBehaviour);

var active = d3.select(null);

/*=================
=== source: https://bl.ocks.org/mbostock/4699541
=================*/
function clickZoom(d) {
	if (active.node() === this) return reset();
	active.classed("active", false);
	active = d3.select(this).classed("active", true);
 
	var bounds = path.bounds(d),
		 dx = bounds[1][0] - bounds[0][0],
		 dy = bounds[1][1] - bounds[0][1],
		 x = (bounds[0][0] + bounds[1][0]) / 2,
		 y = (bounds[0][1] + bounds[1][1]) / 2,
		 scale = .8 / Math.max(dx / width, dy / height),
		 translate = [width / 2 - scale * x, height / 2 - scale * y];

	states.transition()
		 .duration(1000)
		 .style("stroke-width", 1.5 / scale + "px")
		 .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
 }
 
 function reset() {
	active.classed("active", false);
	active = d3.select(null);
 
	states.transition()
		 .duration(1000)
		 .style("stroke-width", "1.5px")
		 .attr("transform", "");
 }

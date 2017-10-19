const zoomCallback = group =>
	() => group.attr('transform', d3.event.transform);

const zoomBehaviour = d3.zoom()
	.scaleExtent([.5, 10])
	.on('zoom', zoomCallback(states));

mapCon.call(zoomBehaviour);


/*=================
=== Source: https://bl.ocks.org/mbostock/4699541
=================*/
var active = d3.select(null);

function clickZoom(d) {
	if (active.node() === this) return reset();
	active.classed('active', false);
	active = d3.select(this).classed('active', true);
 
	var bounds = mapPath.bounds(d),
		 dx = bounds[1][0] - bounds[0][0],
		 dy = bounds[1][1] - bounds[0][1],
		 x = (bounds[0][0] + bounds[1][0]) / 2,
		 y = (bounds[0][1] + bounds[1][1]) / 2,
		 scale = 1.5 / Math.max(dx / mapWidth, dy / mapHeight),
		 translate = [mapWidth / 2 - scale * x, mapHeight / 2 - scale * y];

	states.transition()
		 .duration(transDur)
		 .style('stroke-width', 1.5 / scale + 'px')
		 .attr('transform', 'translate(' + translate + ')scale(' + scale + ')');

	// Added a transition for readability/lookability??
	states.selectAll('circle')
		.transition()
		.duration(transDur)
		.attr('r', .5)
		.attr('stroke-width', .1);
 }
 
 function reset() {
	active.classed('active', false);
	active = d3.select(null);
 
	// Added transitions back to the normal size
	states.transition()
		.duration(1000)
		.style('stroke-width', '1.5px')
		.attr('transform', '');

	states.selectAll('circle')
		.transition()
		.duration(transDur)
		.attr('r', 4)
		.attr('stroke-width', .3);
 }

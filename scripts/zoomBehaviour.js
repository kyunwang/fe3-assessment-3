const zoomCallback = group =>
	() => group.attr('transform', d3.event.transform);

const zoomBehaviour = d3.zoom()
	.scaleExtent([0, 10])
	// .on('zoom', zoomCallback(d3.select('.states')));
	.on('zoom', zoomCallback(states));

d3.select('svg')
	.call(zoomBehaviour);

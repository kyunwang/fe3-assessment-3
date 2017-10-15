/*=================
=== For mapping the outline of the us
=== source: http://duspviz.mit.edu/d3-workshop/examples/session4/example1.html
===
=== For labeling
=== source: https://bl.ocks.org/SuYoungHong/f4a4d387ead290850e58bf92a6c4dbb6
=================*/

// To enable plotting with coordinates
var projection = d3.geoMercator();

var path = d3.geoPath()
	.projection(projection)
	.pointRadius(1.5);

projection
	.scale(800)
	.center([-100, 40.5]);


d3.json('data/us.json', function (error, us) {
	if (error) throw error;
	

	// Creating the states
	states.selectAll('path')
		.data(topojson.feature(us, us.objects.states).features)
		.enter()
			.append('path')
			.attr('d', path);

	// Creating the state borders
	states.append("path")
		.attr('class', 'state-borders')
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("d", path);


	// 
	getinfo = x => cleanedData.filter(
		z => String(z.stateId) == x);
	
	var allStates = topojson.feature(us, us.objects.states).features;
	allStates.forEach(d => d.info = getinfo(d.id)[0]);

	var allStates = allStates.filter(d => d.info != undefined);
	allStates.forEach(d => d.state = d.info.state);
	

	// Creating the state labels
	states.selectAll("text")
		.data(allStates)
		.enter()
		.append("text")
			.text(d => d.info.state)
			.attr('class', 'state-label')
			.attr("x", d => path.centroid(d)[0])
			.attr("y", d => path.centroid(d)[1])
			.attr("text-anchor","middle")

	// Mapping the locations
	states.selectAll("circle")
		.data(cleanedData.map(d => d.longLat))
		.enter()
		.append("circle")
			.attr("cx", d => parseInt(projection(d)[0], 10))
			.attr("cy", d => parseInt(projection(d)[1], 10))
			.attr("r", 3)
			.attr("fill", "red")

});

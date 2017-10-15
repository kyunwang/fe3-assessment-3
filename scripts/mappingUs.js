/*=================
=== source: https://bl.ocks.org/mbostock/4090848
=================*/

var path = d3.geoPath();

d3.json('https://d3js.org/us-10m.v1.json', function (error, us) {
	if (error) throw error;

	svg.append('g')
		.attr('class', 'states')
		.selectAll('path')
		.data(topojson.feature(us, us.objects.states).features)
		.enter()
			.append('path')
			.attr('d', path)

	svg.append('path')
		.attr('class', 'state-borders')
		.attr('d', path(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; })))

	getinfo = x => cleanedData.filter(
		z => String(z.stateId) == x);

	
	var all_states = topojson.feature(us, us.objects.states).features;
	all_states.forEach(function (d) { d.info = getinfo(d.id)[0] });
	
	var all_states = all_states.filter(function (d) { return d.info != undefined });
	all_states.forEach(function (d) { d.state = d.info.state });
	


	// label the states
	svg.selectAll("text")
		.data(all_states)
		.enter()
		.append("text")
		 .text(d => d.info.state)
		// .text(function(d){console.log(d);return 'dsadasdsa'})
		.attr("x", d => path.centroid(d)[0])
		.attr("y", d => path.centroid(d)[1])
		.attr("text-anchor","middle")
		.attr('font-size','6pt');
});

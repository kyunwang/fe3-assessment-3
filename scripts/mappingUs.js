/*=================
=== For mapping the outline of the us
=== source: http://duspviz.mit.edu/d3-workshop/examples/session4/example1.html
===
=== For labeling
=== source: https://bl.ocks.org/SuYoungHong/f4a4d387ead290850e58bf92a6c4dbb6
=================*/


// To enable plotting with coordinates
var projection = d3.geoMercator();

var mapPath = d3.geoPath()
	.projection(projection)
	.pointRadius(1.5);

projection
	.scale(800)
	.center([-100, 40.5]);
// .translate([mapWidth / 2, mapHeight / 2]);

d3.json('data/us.json', function (error, us) {
	if (error) throw error;
	
	/*=================
	=== Creating the map
	=================*/
	// Creating the states
	
	states.selectAll('path')
		.data(topojson.feature(us, us.objects.states).features)
		.enter()
			.append('path')
			.attr('d', mapPath)
			.on('click', clickZoom)
			.on('mouseenter', d => showDeathState(d))

	// Creating the state borders
	states.append('path')
		.attr('class', 'state-borders')
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr('d', mapPath);

	/*=================
	=== State labeling
	=================*/

	getinfo = x => cleanedData.filter(
		z => String(z.stateId) == x);
	
	var allStates = topojson.feature(us, us.objects.states).features;
	allStates.forEach(d => d.info = getinfo(d.id)[0]);

	var allStates = allStates.filter(d => d.info != undefined);
	allStates.forEach(d => d.state = d.info.state);
	

	// Creating the state labels
	states.selectAll('text')
		.data(allStates)
		.enter()
		.append('text')
			.text(d => d.info.state)
			.attr('class', 'state-label')
			.attr('x', d => mapPath.centroid(d)[0])
			.attr('y', d => mapPath.centroid(d)[1])
			.attr('text-anchor','middle');

	// Mapping the locations
	states.selectAll('circle')
		.data(cleanedData)
		.enter()
		.append('circle')
			.attr('class', 'location')
			.attr('cx', d => parseInt(projection(d.longLat)[0], 10))
			.attr('cy', d => parseInt(projection(d.longLat)[1], 10))
			.attr('r', 3)
			.attr('fill', d => raceColor(d.race))
			.on('mouseenter', d => {
				showDetail(d);
				renderPie(d);
			});

	renderMapLegend();
});
			

/*=================
=== Legend made thanks to: https://bl.ocks.org/mbostock/3887051
=================*/
function renderMapLegend() {

		var keys = cleanedData.columns.slice(1);
		var legend = mapCon.append('g')
			.attr('class', 'legend')
			.selectAll('g')
			.data(raceKeys.reverse())
			.enter()
			.append('g')
				.attr('transform', (d, i) => `translate(-16, ${i * -22 + (mapHeight - 34)})`); // Positioning the legend
	
		legend.append('rect')
			.attr('x', mapWidth - 19)
			.attr('width', 19)
			.attr('height', 19)
			.attr('fill', raceColor)
			// .on('mouseenter', d => highlight(d))
	
		legend.append('text')
			.attr('class', 'mapLegend')
			.attr('x', mapWidth - 24)
			.attr('y', 9.5)
			.attr('dy', '0.32em')
			.text(d => d);
}

/*=================
=== Grace to Razpudding: https://github.com/Razpudding/fed3-d3events/blob/master/index.js
=================*/

function highlight(select) {
	d3.selectAll('.location')
		.classed('hide', d => {
			return d.race !== select;
		});
}



/*=================
=== Tooltip by grace of cmda-fe3: https://github.com/cmda-fe3/course-17-18/tree/master/site/class-4/tip
=================*/
var details = d3.select('.locationDetail');

function showDetail(d) {
	details.html(getHtml(d));
}

function getHtml(d) {
	return decodeURIComponent(`
		<p>Victim: <span>${d.name}</span></p>
		<p>Ethnicity: <span>${d.race}</span></p>
		<p>Date of death: <span>${d.month}/${d.day}/${d.year}</span></p>
		<p>Location: <span>${d.location}</span></p>
		<p>Death cause: <span>${d.cause}</span></p>
		<p>Was armed: <span>${d.armed}</span></p>
`	);
}
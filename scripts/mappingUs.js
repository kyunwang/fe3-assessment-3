/*=================
=== For mapping the outline of the us
=== source: http://duspviz.mit.edu/d3-workshop/examples/session4/example1.html
===
=== For labeling
=== source: https://bl.ocks.org/SuYoungHong/f4a4d387ead290850e58bf92a6c4dbb6
=================*/
var mapCon = d3.select('#map-con');
var mapWidth = parseInt(mapCon.style('width'), 10);
var mapHeight = parseInt(mapCon.style('height'), 10);

var states = mapCon.append('g')
	.attr('class', 'states');


// To enable plotting with coordinates
var projection = d3.geoMercator();

var mapPath = d3.geoPath()
	.projection(projection)
	.pointRadius(1.5);

projection
	.scale(800)
	.center([-100, 40.5]);
// .translate([mapWidth / 2, mapHeight / 2]);

/*=================
=== Creating the map
=================*/
d3.json('data/us.json', function (error, us) {
	if (error) throw error;

	// Creating the states	
	states.selectAll('path')
		.data(topojson.feature(us, us.objects.states).features)
		.enter()
			.append('path')
			.attr('d', mapPath)
			.on('click', clickZoom)

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
			.attr('r', 4)
			.attr('stroke-width', .3)
			.attr('stroke', '#000')
			.attr('fill', d => raceColor(d.race))
			.on('mouseenter', d => {
				showDetail(d);
				renderPie(d);
				highlightLoc(d);				
			});


		/*=================
		=== Updating out mappoint
		=================*/
		var filterButtons = d3.select('.container-filter')
			.selectAll('button')
			.on('click', updateMap);
		
		function updateMap(cause) {
				
			var fData = cleanedData.filter(d => this.value === 'all' ?
				true :
				this.value === d.cause);

			var newLocation = states.selectAll('.location')
				.data(fData);
				
			// This is what we will do to the new data we enter
			newLocation.enter()
				.append('circle')
					.attr('class', 'location')
					.attr('cx', d => parseInt(projection(d.longLat)[0], 10))
					.attr('cy', d => parseInt(projection(d.longLat)[1], 10))
					.attr('r', 0)
					.attr('fill', '#fff')
					// This has to put before the transition to take effect
					.on('mouseenter', d => {
						showDetail(d);
						renderPie(d);
						highlightLoc(d);
					})
					// Starting our transition
					.transition()
					.duration(transDur)
					.ease(d3.easeBounce)
					.attr('r', 4)
					.attr('stroke-width', .3)
					.attr('stroke', '#000')
					.attr('fill', d => raceColor(d.race))

			// This we will do to the data that stays
			newLocation.transition()
				.duration(transDur)
				.attr('r', 4)
			
			// The stuff we will do with the data that exits
			newLocation.exit()
				.transition()
				.duration(transDur)
				.ease(d3.easeBounce)
				.attr('r', 0)
				.transition() // Added to delay the .remove()
				.duration(transDur)
				.remove()

		}
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
	
		legend.append('text')
			.attr('class', 'mapLegend')
			.attr('x', mapWidth - 24)
			.attr('y', 9.5)
			.attr('dy', '0.32em')
			.text(d => d);
}


/*=================
=== Setting our details of the location
=================*/
var locDetail = d3.select('.location-detail');

function showDetail(d) {
	locDetail.html(getHtml(d));
}

function getHtml(d) {
	return decodeURIComponent(`
		<p>Victim: <span>${d.name}</span></p>
		<p>Ethnicity: <span>${d.race}</span></p>
		<p>Date of death: <span>${d.month}/${d.day}/${d.year}</span></p>
		${showCounty(d)}
		<p>Street: <span>${d.location}</span></p>
		<p>Death cause: <span>${d.cause}</span></p>
		<p>Was armed: <span>${d.armed}</span></p>
`	);
}

function showCounty(data) {
	if (data.fipData[0]) return `
	<p>County: <span>${data.fipData[0].countyName}</span></p>`

	return '';
}

/*=================
=== Highlighting our location
=================*/

function highlightLoc(d) {
	var radius = d3.event.target.attributes.r.value; // Getting the r value
	d3.selectAll('.location')
		.attr('r', data => {
			if (radius >= 4) return data === d ? '8' : '4'; // When not zoomed in
			return data === d ? '2' : '.5'; // For when we are zommed in
		});
}
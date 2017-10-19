
var pieGroup = pieCon.append('g')
	.attr('transform', `translate(${pieWidth / 2}, ${pieHeight / 2})`);

// piechart: https://bl.ocks.org/mbostock/3887235
function renderPie(newData) {
	// https://stackoverflow.com/questions/33852847/how-to-create-d3-pie-chart-with-percentage-from-non-number-values


		
	// Nest the data on basis of the given key race and return the amount of race as value
	if (newData) {
		console.log('mew');
		// var pieRaceData = newData;
		var pieRaceData = d3.nest()
			.key(d => {
				console.log(d);
				return d.shareWhite})
			.entries(newData);
			console.log(11, pieRaceData);

			// Being compicated
			return updatePie();
	} else {
		var pieRaceData = d3.nest()
			.key(d => d.race)
			.rollup(d => d.length)
			.entries(cleanedData);
			console.log(pieRaceData);
	}


	var pieRadius = Math.min(pieWidth, pieHeight) / 3;

	var pieScale = d3.pie()
		.value(d => d.value)
		.sort(null)
		
	var piePath = d3.arc()
		.outerRadius(pieRadius - 10)
		.innerRadius(0); // Needed this to start the piechart at the center


	var pieChart = pieGroup.selectAll('.pie')
		.data(pieScale(pieRaceData))
		.enter()
		.append('g')
			.attr('class', 'pie')
	
	pieChart.append('path')
		.attr('d', piePath)
		.attr('fill', d => raceColor(d.data.key))
		.on('mouseenter', d => highlight(d.data.key))
	


	// var label = d3.arc()
	// 	.outerRadius(pieRadius - 40)
	// 	.innerRadius(pieRadius - 40);

	// pieChart.append('text')
	// 	.attr('transform', function(d) { return 'translate(' + label.centroid(d) + ')'; })
	// 	.attr('dy', '0.35em')
	// 	.text(function(d) { return d.data.key; });

	// renderPieRaceLegend(pieRaceData);


	function updatePie(data) {
		console.log('hi');
		console.log(pieRadius);
		// pieChart.selectAll('pie')
		// 	.data(pieScale(data))
		// 	.enter()
		// 	.exit()
		// 	.remove()
	}
}

function renderPieRaceLegend(d) {
	var legend = pieCon.append('g')
		.attr('class', 'legend')
		.attr('font-family', 'sans-serif')
		.selectAll('g')
		.data(d)
		.enter()
		.append('g')
			.attr('transform', (d, i) => `translate(-10, ${i * 22 + 10})`); // Positioning the legend

	legend.append('rect')
		.attr('x', pieWidth - 19)
		.attr('width', 19)
		.attr('height', 19)
		.attr('fill', d => raceColor(d.key))

	legend.append('text')
		.attr('class', 'mapLegend')
		.attr('x', pieWidth - 24)
		.attr('y', 9.5)
		.attr('dy', '0.32em')
		.text(d => d.key);
}


var pieGroup = pieCon.append('g')
	.attr('transform', `translate(${pieWidth / 2}, ${pieHeight / 2})`);

// Base for the piechart from: https://bl.ocks.org/mbostock/3887235
function renderPie(newData) {
		
	if (newData) {
		return updatePie();
	} else {
		// Nest the data on basis of the given key race and return the amount of race as value
		// https://stackoverflow.com/questions/33852847/how-to-create-d3-pie-chart-with-percentage-from-non-number-values 
		var pieRaceData = d3.nest()
			.key(d => d.race)
			.rollup(d => d.length)
			.entries(cleanedData);
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
		// .on('mouseenter', d => highlight(d.data.key))
		.on('mouseenter', d => showPieTip(d))



	function updatePie() {
		var pieRaceData = [
			{percentage: true, key: 'White', value: newData.shareWhite},
			{percentage: true, key: 'Hispanic/Latino', value: newData.shareHispanic},
			{percentage: true, key: 'Black', value: newData.shareBlack}
		]

		var pieRadius = Math.min(pieWidth, pieHeight) / 3;
		
		var pieScale = d3.pie()
			.value(d => d.value)
			.sort(null)

		var piePath = d3.arc()
			.outerRadius(pieRadius - 10)
			.innerRadius(0); // Needed this to start the piechart at the center
		
		var pieChart = pieGroup.selectAll('pie')
			.data(pieScale(pieRaceData))
			.enter()
			.append('g')
				.attr('class', 'pie')

		pieChart.append('path')
			.attr('d', piePath)
			.attr('fill', d => raceColor(d.data.key))
			// .on('mouseenter', d => highlight(d.data.key))
			.on('mouseenter', d => showPieTip(d))
			.on('mouseout', d => hidePieTip(d))
		
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




function arcTween(a) {
	var i = d3.interpolate(this._current, a);
	this._current = i(0);
	return function(t) {
	  return arc(i(t));
	};
 }


// Assigning and binding the pieTip
var pieTip = d3.tip()
	.attr('class', 'locationDetail')
	.offset([-10, 0]);

pieCon.call(pieTip);

function showPieTip(d) {
	pieTip.html(getPieHtml(d)); // Set the content to be shown
	pieTip.show();
}

function hidePieTip(d) {
	pieTip.hide();
}


function getPieHtml(d) {
	if (d.data.percentage) return `
		<p>The population of the county:</p>
		<p>Ethnicity: ${d.data.key}</p>
		<p>Percentage: ${d.data.value}%</p>
	`

	return `
		<p>Total amount of deaths</p>
		<p>Ethnicity: ${d.data.key}</p>
		<p>Amount: ${d.data.value}</p>		
	`
}
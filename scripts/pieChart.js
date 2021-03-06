var pieCon = d3.select('#pie-con');
var pieWidth = parseInt(pieCon.style('width'), 10);
var pieHeight = parseInt(pieCon.style('height'), 10);
var pieRadius = Math.min(pieWidth, pieHeight) / 2;

var pieGroup = pieCon.append('g')
	.attr('transform', `translate(${pieWidth / 2}, ${pieHeight / 2})`);

var pieTitle = d3.select('.container-pie')
	.select('p');

var resetPie = d3.select('.container-pie')
	.select('button')
	.on('click', renderPie)

/*=================
=== Base for the piechart from: https://bl.ocks.org/mbostock/3887235
=== All interactions are added by myself if not said otherwise
=================*/
function renderPie(newData) {		
	if (newData) {
		pieGroup.selectAll('.pie').remove(); // Remove all pie's so that they do not stack with each other

		// Show the reset to ethnicity btn
		resetPie.classed('hide', false)
			.text('Reset chart')

		return updatePie();
	} else {
		// Nest the data on basis of the given key race and return the amount of race as value
		// https://stackoverflow.com/questions/33852847/how-to-create-d3-pie-chart-with-percentage-from-non-number-values 
		var pieRaceData = d3.nest()
			.key(d => d.race)
			.rollup(d => d.length)
			.entries(cleanedData);

		pieTitle.text('Total death per ethnicity');
		pieGroup.selectAll('.pie').remove(); // Remove all pie's so that they do not stack with each other	
		
		resetPie.classed('hide', true); // Hide the reset button
	}


	var pieScale = d3.pie()
		.value(d => d.value)
		.sort(null)
		
	var piePath = d3.arc()
		.outerRadius(pieRadius - 10)
		.innerRadius(0); // Needed this to start the piechart at the center


	var pieChart = pieGroup.selectAll('.pie')
		.data(pieScale(pieRaceData));
		
	// All  piechart transition code (the attrTween) from: http://bl.ocks.org/nadinesk/99393098950665c471e035ac517c2224
	pieChart.enter()
		.append('path')
			.attr('class', 'pie')
			.attr('d', piePath)
			.attr('fill', d => raceColor[d.data.key])
			.on('mouseenter', d => {
				showPieTip(d);
				pieMouseEnter(d);
			})
			.on('mouseout', d => {
				hidePieTip(d);
				pieMouseOut();
			})

			.transition()
			.duration(transDur)
			.attrTween('d', d => {
				var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
				return function (t) {
					d.endAngle = i(t);
					return piePath(d)
				}
			})

		pieChart.selectAll('path')
			.transition()
			.duration(transDur)
			.attrTween('d', d => {
				var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
				return function (t) {
					d.endAngle = i(t);
					return piePath(d)
				}
			})

		pieChart.selectAll('path')
			.exit()
			.transition()
			.duration(transDur)
			.remove()

		

	/*=================
	=== Updating our piechart
	=================*/
	function updatePie() {
		if (newData.fipData[0]) {
			pieTitle.text(newData.fipData[0].countyName);
		} else {
			pieTitle.text('County not found');
		}

		var pieRaceData = [
			{percentage: true, key: 'White', value: newData.shareWhite, countyPop: newData.countyPop},
			{percentage: true, key: 'Hispanic/Latino', value: newData.shareHispanic, countyPop: newData.countyPop},
			{percentage: true, key: 'Black', value: newData.shareBlack, countyPop: newData.countyPop}
		]

		var pieScale = d3.pie()
			.value(d => d.value)
			.sort(null)

		var piePath = d3.arc()
			.outerRadius(pieRadius - 10)
			.innerRadius(0); // Needed this to start the piechart at the center
		
		var pieChart = pieGroup.selectAll('.pie')
			.data(pieScale(pieRaceData));

		pieChart.enter()
			.append('path')
				.attr('class', 'pie')
				.attr('d', piePath)
				.attr('fill', d => raceColor[d.data.key])
				.on('mouseenter', d => {
					showPieTip(d);
					pieMouseEnter(d);
				})
				.on('mouseout', d => {
					hidePieTip(d);
					pieMouseOut();
				})

				.transition()
				.duration(transDur)
				.attrTween('d', d => {
					var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
					return function (t) {
						d.endAngle = i(t);
						return piePath(d);
					}
				})
		
		// When we update our data we do this
		pieChart.transition()
			.duration(transDur)
			.attrTween('d', d => {
				var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
				return function (t) {
					d.endAngle = i(t);
					return piePath(d);
				}
			});

	}
}

/*=================
=== Handle mouse events
=== Grace to Razpudding: https://github.com/Razpudding/fed3-d3events/blob/master/index.js
=================*/

function pieMouseEnter(d) {
	d3.selectAll('.location')
		.classed('hide', data => data.race !== d.data.key);
}

function pieMouseOut() {
	d3.selectAll('.location')
		.classed('hide', false);
}


/*=================
=== Render piecahrt legend
=================*/
// Not used anymore
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
		.attr('fill', d => raceColor[d.key])

	legend.append('text')
		.attr('class', 'mapLegend')
		.attr('x', pieWidth - 24)
		.attr('y', 9.5)
		.attr('dy', '0.32em')
		.text(d => d.key);
}


/*=================
=== Pie chart tooltip
=== Tooltip by grace of cmda-fe3: https://github.com/cmda-fe3/course-17-18/tree/master/site/class-4/tip
=================*/

var pieTip = d3.tip()
	.attr('class', 'location-detail')
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
		<p>Population: ${d.data.countyPop}</p>
	`

	return `
		<p>Total amount of deaths</p>
		<p>Ethnicity: ${d.data.key}</p>
		<p>Deaths: ${d.data.value}</p>		
	`
}
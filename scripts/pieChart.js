


// piechart: https://bl.ocks.org/mbostock/3887235
function renderPie() {
	var test = [
		{"key": "man", "value": 10},
		{"key": "female", "value": 23}
	]
	console.log(pieCon);
	// https://stackoverflow.com/questions/33852847/how-to-create-d3-pie-chart-with-percentage-from-non-number-values


	var g = pieCon.append("g").attr("transform", "translate(" + pieWidth / 2 + "," + pieHeight / 2 + ")");

	// Nest the data on basis of the given key race and return the amount of race as value
	// var pieRaceData = d3.nest()
	// 	.key(d => { return d.race; })
	// 	.rollup(d => { return d.length; })
	// 	.entries(cleanedData);


	var pieRadius = Math.min(pieWidth, pieHeight) / 2;



	var pieScale = d3.pie()
		// .sort(null)
		.value(d => { return d.value});
		
	var piePath = d3.arc()
		.outerRadius(pieRadius - 10)
		.innerRadius(0);


	var pieChart = g.selectAll('.pie')
		.data(pieScale(test))
		.enter()
		.append('g')
			.attr('class', 'pie')
	
	pieChart.append('path')
		.attr('path', piePath)
		.attr('fill', d => {
			// return raceColor(d.data.value);
			return 'red';
		})


	var label = d3.arc()
		.outerRadius(pieRadius - 40)
		.innerRadius(pieRadius - 40);

	pieChart.append("text")
		.attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
		.attr("dy", "0.35em")
		.text(function(d) { return d.data.key; });
	
}
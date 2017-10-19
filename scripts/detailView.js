/*=================
=== Tooltip by grace of cmda-fe3: https://github.com/cmda-fe3/course-17-18/tree/master/site/class-4/tip
=================*/

var details = d3.select('.locationDetail');

var detailHtml;

// Create a tooltip
var mapTip = d3.tip()
  .attr('class', 'locationDetail')
  .offset([-10, 0])

mapCon.call(mapTip); // Bind it to mapCon

function showMapTip(d) {
	details.html(getHtml(d));
	renderPie(d)

	mapTip.html(getHtml(d));
	mapTip.show();
}

function hideMapTip(d) {
	mapTip.hide();
}

function getHtml(d) {
	return decodeURI(`
		<p>Victim: <span>${d.name}</span></p>
		<p>Ethnicity: <span>${d.race}</span></p>
		<p>Date of death: <span>${d.month}/${d.day}/${d.year}</span></p>
		<p>Location: <span>${d.location}</span></p>
		<p>Death cause: <span>${d.cause}</span></p>
		<p>Was armed: <span>${d.armed}</span></p>
`)
}
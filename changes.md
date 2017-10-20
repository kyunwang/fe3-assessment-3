# TOC
- [Data adjustments](#data-adjustments)

- [Mapping](#mapping)
- [Piechart](#piechart)
- [Zooming the map](#map-zooming)

## Introduction
In this document you will see the highlighted changes and code written and changed by yours truly.

## Data adjustments
First I loaded in the data from `us_fips.txt` and `police_killings.csv` and adjusted them for my own usage.

The `police_killings.csv`
```
d3.csv('data/police_killings.csv', cleanData);
function cleanData(err, data) {
	for (let i = 0; i < data.length; i++) {
		cleanedData.push({
			age: data[i].age,
			armed: data[i].armed,
			cause: data[i].cause,
			city: data[i].city,
			day: data[i].day,
			month: data[i].month,
			year: data[i].year,
			longLat: [data[i].longitude, data[i].latitude],
			gender: data[i].gender,
			lawEnfAgency: data[i].lawenforcementagency,
			name: data[i].name,
			location: data[i].streetaddress,
			race: data[i].raceethnicity,
			stateId: data[i].state_fp,
			countyId: data[i].county_fp,
			state: data[i].state,
			shareBlack: data[i].share_black,
			shareHispanic: data[i].share_hispanic,
			shareWhite: data[i].share_white,
			fullFip: data[i].state_fp+data[i].county_fp,
			fipData: fipsCodes.filter(fips => fips.totalFip == (data[i].state_fp+data[i].county_fp)),
			countyPop: data[i]['pop']
		});
	}

	// Not the best way but it does it's job
	cleanedData.columns = ['age', 'armed', 'cause', 'city', 'day', 'month', 'year', 'longLat', 'gender', 'lawEnfAgency', 'name', 'location', 'race', 'stateId', 'countyId', 'state', 'shareBlack', 'shareHispanic', 'shareWhite', 'fullFip', 'fipData', 'countyPop'];

	// Getting all the race keys
	for(let i = 0; i < cleanedData.length; i++) {
		raceKeys.push(cleanedData[i].race);
	}

	// Filtering out all the duplicates
	raceKeys = raceKeys.filter((d, i, self) => i === self.indexOf(d));
}
```

And the `us_fips.txt`
```
d3.text('../data/us_fips.txt').get(getFips);
function getFips(err, doc) {
	fipsCodes = d3.csvParseRows(doc, mapFips);
	function mapFips(d) {
		return {
			state: d[0],
			stateId: d[1],
			countyId: parseInt(d[2], 10), // Removing the 0's on the start
			countyName: d[3],
			totalFip: d[1]+d[2] // Get the totalfip statefip + countyfip
		}
	}
}
```

## Mapping
Here we map the U.S. map.

Labeling from [SuYoungHong][labelSource] (no license)
Legend from [Mike Bostock][legendsource] (GLP 3.0)
Mapping from [phil-pedruco][mappingSource] (no license) with minor changes. E.G.
```
	svg.selectAll("path")
      .data(states).enter()
      .append("path")
      .attr("class", "feature")
      .style("fill", "steelblue")
      .attr("d", path);
```
To
```
	states.selectAll('path')
		.data(topojson.feature(us, us.objects.states).features)
		.enter()
			.append('path')
			.attr('d', mapPath)
			.on('click', clickZoom)
```

Showing details, highlighting the location and updating the date is coded by Kang Yun Wang (Kevin Wang). See `mappingUs.js` for the code.

## Piechart
The piechart is based on the static piechart from [Mike Bostock][pieSource] (GLP 3.0)

The update transition from the piechart is form this [source][tweenSource] by Nadine Fischoff.
```
.attrTween('d', d => {
	var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
	return function (t) {
		d.endAngle = i(t);
		return piePath(d)
	}
})
```

The tooltop is based on the example of [cmda-fe3][tooltipSource]

Adding logic to the html template shown
```
function showPieTip(d) {
	pieTip.html(getPieHtml(d)); // Set the content to be shown
	pieTip.show();
}

...

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
```

## Map zooming
The zoom animation is from [Mike Bostock][mapAniLink] (GLP 3.0)
Apart from the animations to `.location` E.G.
```
// When zooming in
states.selectAll('.location')
	.transition()
	.duration(transDur)
	.attr('r', .5)
	.attr('stroke-width', .1);
```




[mappingSource]: http://bl.ocks.org/phil-pedruco/7745589
[labelSource]: https://bl.ocks.org/SuYoungHong/f4a4d387ead290850e58bf92a6c4dbb6
[legendsource]: https://bl.ocks.org/mbostock/3887051
[pieSource]: https://bl.ocks.org/mbostock/3887235
[tweenSource]: https://bl.ocks.org/mbostock/3887235
[tooltipSource]: https://github.com/cmda-fe3/course-17-18/tree/master/site/class-4/tip
[mapAniLink]: https://bl.ocks.org/mbostock/4699541
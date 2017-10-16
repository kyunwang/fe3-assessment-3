
var cleanedData = [];
var mapCon = d3.select('#map-con');
var pieCon = d3.select('#pie-con');

var states = mapCon.append('g')
	.attr('class', 'states');
var mapWidth = parseInt(mapCon.style('width'), 10);
var mapHeight = parseInt(mapCon.style('height'), 10);
var pieWidth = parseInt(pieCon.style('width'), 10);
var pieHeight = parseInt(pieCon.style('height'), 10);


var raceKeys = []; 
var raceColor = d3.scaleOrdinal(d3.schemeCategory10)


// Below are the global vars
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
			victimAdress: data[i].streetaddress,
			race: data[i].raceethnicity,
			stateId: data[i].state_fp,
			countyId: data[i].county_fp,
			state: data[i].state
		});

	}
	cleanedData.columns = ['age', 'armed', 'cause', 'city', 'day', 'month', 'year', 'longLat', 'gender', 'lawEnfAgency', 'name', 'victimAddress', 'race', 'stateId', 'countyId', 'state'];

	for(let i = 0; i < cleanedData.length; i++) {
		raceKeys.push(cleanedData[i].race);
	}

	raceKeys = raceKeys.filter((d, i, self) => i === self.indexOf(d));

	renderPie();

}

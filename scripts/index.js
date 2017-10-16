
var cleanedData = [];
var svg = d3.select('svg');
var states = svg.append('g')
	.attr('class', 'states');
var width = parseInt(svg.style('width'), 10);
var height = parseInt(svg.style('height'), 10);


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

}

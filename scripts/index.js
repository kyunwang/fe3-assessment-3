/*=================
=== Global vars
=================*/

var cleanedData = []; // Our main array for all the data
var raceKeys = []; // Array to save the races in
var raceColor = d3.scaleOrdinal(d3.schemeCategory10); // Our color scale for the races
var fipsCodes; // To save our fips info in

var transDur = 500;
var transDelay = 50;


/*=================
=== Getting the FIP codes of US
=================*/
d3.text('data/us_fips.txt').get(getFips);
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


/*=================
=== Basic cleaning our maindata for use
=== Creating our global vars for use
=================*/
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

	// Not super to do it like this but time contrains mate
	cleanedData.columns = ['age', 'armed', 'cause', 'city', 'day', 'month', 'year', 'longLat', 'gender', 'lawEnfAgency', 'name', 'location', 'race', 'stateId', 'countyId', 'state', 'shareBlack', 'shareHispanic', 'shareWhite', 'fullFip', 'fipData', 'countyPop'];

	// Getting all the race keys
	for(let i = 0; i < cleanedData.length; i++) {
		raceKeys.push(cleanedData[i].race);
	}

	// Filtering out all the duplicates
	raceKeys = raceKeys.filter((d, i, self) => i === self.indexOf(d));

	// Execute thee functions when our cleaning is done
	renderPie(); // Initial render of the piechart (total deaths/killings)
	renderMapLegend(); // Render our legend for the map
}

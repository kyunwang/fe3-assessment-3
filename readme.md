# Police killings
[The trello board][trello]

See [changes](changes.md) to see code changes 

![preview image][previewUrl]

This is a visualization using D3.js plotting the amount of death by policemen in the United Stated in the period from the start of 2015 till June 2 of 2015.

## Description
This is a visualization showing the amounts deaths caused by the police in the United States. In this assignment I tried to implemment D3 features I had not used before. Like a interactive map and piechart.

**Used:**
- D3.js
- topojson
- d3-tip

## Data
- Main data
The [data][dataLink] is from [FiveThirthyEight][dataSource]. The dataset contains data about police killing in the U.S. in the year 2015 from the start of the year till the June 2.

- The outline of U.S.
The coordinates/outline paths from the U.S. came from [duspviz][mapSource]

- The FIPS
The [FIPS][fipsData] from U.S. came from [census][fipsSource]

Our main data contains:
Header | Description | Source
---|-----------|----
`name` | Name of deceased | Guardian
`age` | Age of deceased | Guardian
`gender` | Gender of deceased | Guardian
`raceethnicity` | Race/ethnicity of deceased | Guardian
`month` | Month of killing | Guardian
`day` | Day of incident | Guardian
`year` | Year of incident | Guardian
`streetaddress` | Address/intersection where incident occurred | Guardian
`city` | City where incident occurred | Guardian
`state` | State where incident occurred | Guardian
`latitude` | Latitude, geocoded from address | 
`longitude` | Longitude, geocoded from address | 
`state_fp` | State FIPS code | Census
`county_fp` | County FIPS code | Census
`tract_ce` | Tract ID code | Census
`geo_id` | Combined tract ID code | 
`county_id` | Combined county ID code | 
`namelsad` | Tract description | Census
`lawenforcementagency` | Agency involved in incident | Guardian
`cause` | Cause of death | Guardian
`armed` | How/whether deceased was armed | Guardian
`pop` | Tract population | Census
`share_white` | Share of pop that is non-Hispanic white | Census
`share_bloack` | Share of pop that is black (alone, not in combination) | Census
`share_hispanic` | Share of pop that is Hispanic/Latino (any race) | Census
`p_income` | Tract-level median personal income | Census
`h_income` | Tract-level median household income | Census
`county_income` | County-level median household income | Census
`comp_income` | `h_income` / `county_income` | Calculated from Census 
`county_bucket` | Household income, quintile within county | Calculated from Census
`nat_bucket` | Household income, quintile nationally | Calculated from Census
`pov` | Tract-level poverty rate (official) | Census
`urate` | Tract-level unemployment rate | Calculated from Census
`college` | Share of 25+ pop with BA or higher | Calculated from Census

## Features
- Filtering by cause of death.

- Viewing detail of the death by hovering a location/circle.

- A quick 'preview' filter by hovering over a *pie* of the piechart.

- Zooming on a state by clicking.

- Checking the overal deaths per ethnicity and per population.


## Problems encountered

### Using *broken* 'official' data
The 'official' data for the us map from D3 was faulty and I have wasted some hours trying to fix that and searching for a working dataset.

### Plotting the locations/circles on the map.
Having the same reason as the one above.

### Using exit()
I finally understand how to implement exit.
To implement `exit()` you will have to add the `enter()` on a different line than the `data()`.

Not like this
```
var newLocation = states.selectAll('.location')
	.data(fData)
	.enter();
```
But like this
```
var newLocation = states.selectAll('.location')
	.data(fData);
```

### Adding animations
Some animation clashed with each other and some didn't go well with the graph. There was a need to tweak with the code to go well with the animations, structure and order wise.

## Known bugs
- After zooming in by clicking a state. When you zoom out it will be jumpy.
- Some piechart do not render.
- Buggy behaviour when activating multiple filters.

## D3 features used
- [`d3-request`](requestLink)
- [`d3-selection`][selectionLink]
- [`d3-array`](arrayLink)
- [`d3-transition`](transitionLink)
- [`d3-scale`](scaleLink)
- [`d3-dsv`](dsvLink)
- [`d3-ease`](easeLink)
- [`d3-geo`](geoLink)
- [`d3-collections`](collLink)
- [`d3-shape`](shapeLink)
- [`d3-zoom`](zoomLink)

## License
GPL(3.0) - Kang Yun Wang (Kevin Wang)

[trello]: https://trello.com/b/NgRxgzdR

[dataLink]: https://github.com/fivethirtyeight/data/blob/master/police-killings/police_killings.csv
[dataSource]: https://github.com/fivethirtyeight

[mapSource]: http://duspviz.mit.edu/d3-workshop/examples/session4/example1.html
[fipsSource]: https://www.census.gov/geo/reference/codes/cou.html
[fipsData]: https://www2.census.gov/geo/docs/reference/codes/files/national_county.txt



[requestLink]: https://github.com/d3/d3-request
[selectionLink]: https://github.com/d3/d3-selection
[scaleLink]: https://github.com/d3/d3-scale
[transitionLink]: https://github.com/d3/d3-transition 
[arrayLink]: https://github.com/d3/d3-array
[dsvLink]: https://github.com/d3/d3-dsv
[easeLink]: https://github.com/d3/d3-ease
[geoLink]: https://github.com/d3/d3-geo
[collLink]: https://github.com/d3/d3-collection
[shapeLink]: https://github.com/d3/d3-shape
[zoomLink]: https://github.com/d3/d3-zoom

[previewUrl]: preview.gif
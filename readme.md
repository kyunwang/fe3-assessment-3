**Still a draft**

# Title

[The trello board][trello]

## Sources
Map plotting possible thanks to this [example][mapSource] by Mike Foster

Map labeling from https://bl.ocks.org/SuYoungHong/f4a4d387ead290850e58bf92a6c4dbb6
more to come .....

## Description

## Data
The [data][dataLink] is from [FiveThirthyEight][dataSource]. The dataset contains data about police killing in the U.S. in the year 2015 from the start of the year till the second of June.

## D3 features used

## Features
Filtering by cause of death.

Viewing detail by hovering a location/circle.

Filtering by ethnicity via the piechart (not ready)

## Tools used?

## Problems encountered
The 'official' data for the us map from D3 was faulty and I have wasted some hours trying to fix that and searching for a working dataset.

Plotting the locations/circles on the map.

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


## Known bugs
- After zooming in by clicking a state. When you zoom out it will be jumpy.

## License

[trello]: https://trello.com/b/NgRxgzdR

[dataLink]: https://github.com/fivethirtyeight/data/blob/master/police-killings/police_killings.csv
[dataSource]: 

[mapSource]: http://duspviz.mit.edu/d3-workshop/examples/session4/example1.html
<!-- [mapAuthor]:  -->
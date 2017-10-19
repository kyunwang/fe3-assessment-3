var filterButtons = d3.select('.container-filter')
	.selectAll('button')

filterButtons.on('click', filterCause);

function filterCause(d) {
	d3.selectAll('.location')
		.classed('hideC', d => this.value !== 'all' ?
				this.value !== d.cause :
				false)
}




function showDeathState(d) {
	// console.log(d);
	let me = fipsCodes.filter(fips => {
		return fips.totalFip == d.id;
	});
	// console.log(me);
	// console.log(fipsCodes);
}
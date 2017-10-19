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
	let me = cleanedData.filter(data => {
		return parseInt(data.stateId, 10) === d.id;
	});
	console.log(me);
}
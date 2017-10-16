var filterButtons = d3.select('.container-filter')
	.selectAll('button')

filterButtons.on('click', filterCause);

function filterCause(d) {
	d3.selectAll('.location')
		.classed('hide', d => this.value !== 'all' ?
				this.value !== d.cause :
				false)
}
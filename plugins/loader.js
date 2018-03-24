'use strict'

const  { EOL } = require('os')

function plugins() {
	const { plugins } = require('../config')
	return plugins.map(plugin => {
		require('../plugins/' + plugin + '/main.js')
		console.log(EOL + 'Loaded plugin ' + plugin + '...')
	})
}

module.exports = plugins

'use strict'

function plugins() {
	const { plugins } = require('../config')
	plugins.forEach(plugin => {
		require('../plugins/' + plugin + '/main.js')
		console.log(`Loaded plugin ${plugin}...`)
	})
}

module.exports = plugins

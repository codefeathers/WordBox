'use strict'

function plugins() {
	const { plugins } = require('../config')
	plugins.forEach(element => {
		require('../plugins/' + element + '/main.js')
	})
}

module.exports = plugins
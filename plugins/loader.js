'use strict'

const  { EOL } = require('os');

function plugins(app) {
	const { plugins } = require('../config')
	return plugins.map(plugin => {
		require('../plugins/' + plugin)(app);
		console.log(EOL + 'Loaded plugin ' + plugin + '...');
	});
};

module.exports = plugins;

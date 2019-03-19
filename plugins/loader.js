'use strict';

function plugins(app) {
	const { plugins = [] } = require('../config');
	return plugins.map(plugin => {
		require('../plugins/' + plugin)(app);
		console.log('Loaded plugin ' + plugin + '...');
	});
};

module.exports = plugins;

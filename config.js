'use strict'

const { normalize } = require('path')

module.exports = {
	port: 8080,
	plugins: [],
	php: {
		cgi: normalize(__dirname + '/php/php-cgi'),
		ini: normalize(__dirname + '/php.ini'),
		public: normalize(__dirname + '/public'),
	},
};

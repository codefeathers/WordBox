'use strict'

const { normalize } = require('path')

module.exports =
	{
		port: 8080,
		phpBin: normalize(__dirname + '/php/php-cgi'),
		publicPath: normalize(__dirname + '/public'),
		plugins: []
	}
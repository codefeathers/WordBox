'use strict'

const { normalize } = require('path')

module.exports =
	{
		port: 8080,
		phpBin: normalize(__dirname + '/php/php-cgi.exe'),
		wpPath: normalize(__dirname + '/wp'),
		sqlite: '',
		plugins: []
	}
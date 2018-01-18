const { normalize } = require('path')

module.exports =
	{
		port: 8080,
		php: {
			bin: normalize(__dirname + '/php/php-cgi.exe')
		},
		wp: {
			path: normalize(__dirname + '/wp'),
			root: normalize(__dirname + '/wp/index.php')
		}
	}
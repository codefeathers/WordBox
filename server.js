var express = require('express')
var php = require("./php")
const config = require('./config')

var app = express()

app
	.use("/", php.cgi(config.wp.path, config.php.bin))
	.listen(config.port)

console.log(`Server listening at ${config.port}!`)
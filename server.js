'use strict'

const express = require('express')
const php = require("./php")
const config = require('./config')
const plugins = require('./plugins/main')

const app = express()

app
	.use("/", php.cgi(config.wpPath, config.phpBin))
	.listen(config.port)

console.log(`⚡ Server listening at ${config.port}!`)

plugins() // Run any plugins you need to while server runs

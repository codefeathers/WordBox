'use strict'

const path = require('path')
const fs = require('fs')
const { EOL } = require('os')

const express = require('express')
const chalk = require('chalk')

const php = require('./php')
const config = require('./config')
const plugins = require('./plugins/loader')

const htaccess = require('express-htaccess-middleware')
const RewriteOptions = {
	file: path.resolve(config.publicPath, '.htaccess'),
	verbose: (process.env.ENV_NODE == 'development'),
	watch: (process.env.ENV_NODE == 'development'),
}

const app = express()

app
	.use("/", php.cgi(config.publicPath, config.phpBin))
	.use(htaccess(RewriteOptions))

plugins() // Load any plugins declared in config

app.listen(config.port)

const fancy = fs.readFileSync('./fancy.txt')
const listeningMsg = (
	chalk.yellow(fancy) + EOL +
	chalk.green(`   Server listening on port ${config.port}` + EOL +
	'+---------------------------------+')
)

console.log(listeningMsg)

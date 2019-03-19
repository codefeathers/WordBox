'use strict';

const fs = require('fs');
const { EOL } = require('os');

const express = require('express');
const chalk = require('chalk');

const php = require('./php');
const config = require('./config');
const plugins = require('./plugins/loader');

const app = express();

app.use("/", php.cgi(config));

plugins(app); // Load any plugins declared in config

const fancy = fs.readFileSync('./fancy.txt');
const listeningMsg = (
	chalk.yellow(fancy) + EOL +
	chalk.green(`   Server listening on port ${config.port}` + EOL +
	'+---------------------------------+')
);

app.listen(config.port, () => console.log(listeningMsg));

'use strict'

const express = require('express')
const php = require('./php')
const chalk = require('chalk')

const config = require('./config')
const plugins = require('./plugins/main')

const fancyIntro =
chalk.yellow(`

----------------------------------
|                  .---.           |
|                 /. ./|           |
|             .--'.  ' ;           |
|            /__./ \\ : |           |
|        .--'.  '   \\' .           |
|       /___/ \\ |    ' '           |
|       ;   \\  \\;      :           |
|        \\   ;         |           |
|         .   \\    .\\  ;           |
|          \\   \\   ' \\ |           |
|           :   '  |--"            |
|            \\   \\ ;               |
|             '---"                |
----------------------------------
            WordBoxed
 The modern WordPress environment
----------------------------------`) + chalk.green(`
   Server running at port ${config.port}
----------------------------------
`)

const app = express()

app
	.use("/", php.cgi(config.wpPath, config.phpBin))
	.listen(config.port)

console.log(fancyIntro)

plugins() // Run any plugins you need to while server runs

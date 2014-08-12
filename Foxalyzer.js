#!/usr/bin/env node
/*jshint node:true*/

var reporter = require('./reporters/cmdline.js');
console.log(reporter.report("manifest.webapp")[0].message);

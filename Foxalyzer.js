#!/usr/bin/env node
/*jshint node:true*/

zip_file_name = process.argv[2];

if (zip_file_name) {
    var reporter = require('./reporters/cmdline.js');
    console.log("REPORT OUTPUT:\n\n" + reporter.report(zip_file_name));
} else {
    console.log("argument required (path to zip file)");
}
#!/usr/bin/env node
/*jshint node:true*/

zip_file_name = process.argv[2];

if (!zip_file_name) {
    console.error('argument required: path to zip file');
    process.exit(10);
}

var reporter = require('./reporters/cmdline.js');
var report = reporter.report(zip_file_name);
if (report !== "") {
    console.log('%s: OK', zip_file_name);
} else {
    console.log('REPORT OUTPUT:');
    console.log('%s', report);
}

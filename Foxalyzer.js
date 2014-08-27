#!/usr/bin/env node
/*jshint node:true*/

zip_file_name = process.argv[2];

if (!zip_file_name) {
    console.error('argument required: path to zip file');
    process.exit(10);
}

var reporter = require('./reporters/cmdline.js');
var report = reporter.report(zip_file_name);
// chomp trailing newline
if (report[report.length-1] === "\n") report = report.substr(0, report.length-1);
console.log('%s', report);

if (report.substr(report.length-3, report.length-1) === '\tOK') {
    process.exit(0);
} else {
    process.exit(20);
}
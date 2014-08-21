(function (mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS (node et al.)
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD (requirejs et al)
}) (function (exports) {

    var getters = {};
    getters.zip = require('../getters/zip.js');

    var parsers = {};
    parsers.manifest = require('../parsers/manifest.js');

    var matchers = {};
    matchers.manifest_validator = require('../matchers/manifest_validator.js');

    var ruleset = require('../rules/rules.json');

    console.log("DEBUG: " + JSON.stringify(ruleset));

    function report(zipfile) {
        var textreport = "";
        var fileset = getters.zip.get({filename:zipfile});
        var propset = parsers.manifest.parse(fileset);
        var reportitems = matchers.manifest_validator.match(propset, ruleset);
        if (reportitems && reportitems.length>0) {
            for (var item in reportitems) {
                textreport += zipfile + "/" + item.file_ref.name + ": " + item.message + "\n";
            }
        } else {
            textreport += zipfile + ": no errors detected\n";
        }
        return textreport;
    }

    exports.report = report;
});
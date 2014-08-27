(function (mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS (node et al.)
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD (requirejs et al)
}) (function (exports) {

    var getters = {};
    getters.zip = require('../getters/zip.js');

    var parsers = {};
    parsers.manifest = require('../parsers/manifest.js');

    function report(zipfile) {
        var textreport = "";
        var fileset = getters.zip.get({filename:zipfile});
        var propset = parsers.manifest.parse(fileset);

        var RuleSet = require('../rules/ruleset.js');
        var ruleset = new RuleSet.RuleSet();
        ruleset.add({filename:'../rules/rules.json'});

        var reportitems = ruleset.resolve(propset);

        if (reportitems.length>0) {
            for (var i=0 ; i<reportitems.length ; i++) {
                var item = reportitems[i];
                var file_name;
                try { file_name = item.file_ref.name } catch (e) { file_name = '' };
                textreport += zipfile + '/' + file_name + '\t'+';'+';'+'\t' + item.message + "\n";
                //TODO: also add offset,line number,snippet info
            }
        } else {
            textreport += zipfile + "\tOK\n";
        }
        return textreport;
    }

    exports.report = report;
});
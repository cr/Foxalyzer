(function (mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS (node et al.)
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD (require.js et al.)
}) (function (exports) {

    var fs = require('fs');
    var zip = require('../lib/jszip.min.js');

    function get(ref) {
        var zip = new JSZip();

    }

    exports.get = get;
});
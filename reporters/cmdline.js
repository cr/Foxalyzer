(function (mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS (node et al.)
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD (requirejs et al)
}) (function (exports) {

    var getters = {};
    getters.zip = require('../getters/zip.js');

    function init(parent) {
        return parent;
    }

    function report(foo) {
        return [ { 'message': foo + ", line 1: foobar test error" } ];
    }

    exports.init = init;
    exports.report = report;
});
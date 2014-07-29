(function (mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD
    mod(this.Foxalyzer || (this.Foxalyzer = {})); // Plain browser env
}) (function (exports) {

    var Getters = {};
    var Parsers = {};
    var Matchers = {};
    var Reporters = {};

    exports.Getters = Getters;
    exports.Parsers = Parsers;
    exports.Matchers = Matchers;
    exports.Reporters = Reporters;
});

(function (mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS (node et al.)
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD (require.js et al.)
}) (function (exports) {

    var manifest = require('./manifest.js');
    var image_features = require('./image_features.js');

    function parse( file_collection ) {
        icons = manifest(file_collection);
        // extract all icons referenced in manifest
        return this.icon_features(icons);
    }

    exports.parse = parse;

});
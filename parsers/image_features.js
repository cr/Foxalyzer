(function (mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS (node et al.)
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD (require.js et al.)
}) (function (exports) {

    function parse( file_collection ) {
        var icon_features = [
            {
                "fileref": "/img/foo.png",
                "mimetype": "image/png",
                "x_size": "128",
                "y_size": "128",
                "dpi": "90",
                "color_depth": "24"
            },
            {
                "fileref": "/img/bar.png",
                "mimetype": "image/png",
                "x_size": "128",
                "y_size": "164",
                "dpi": "90",
                "color_depth": "24"
            }
        ];
        return icon_features;
    }

    exports.parse = parse;

});
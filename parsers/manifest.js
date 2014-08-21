(function (mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS (node et al.)
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD (require.js et al.)
}) (function (exports) {

    function parse( jszip ) {
        var property_set = {};

        //console.log("DEBUG: got jszip " + JSON.stringify(jszip) );

        // does the zip contain a manifest?
        if (!jszip.files['manifest.webapp']) {
            return null;
        }

        // prepare PropertySet return object
        var ref = jszip.files['manifest.webapp'];
        property_set[ref.name] = {};
        property_set[ref.name].file_ref = ref;

        // get manifest content as string
        // FIXME: test unicode string validity for lots of manifests
        var manifest_string = ref.asText(); // should return unicode string

        // try to parse as JSON
        try {
            property_set[ref.name].json = JSON.parse(manifest_string);
            property_set[ref.name].validJSON = true;
        } catch (err) {
            property_set[ref.name].json = {};
            property_set[ref.name].validJSON = false;
        }

        return property_set;
    }

    exports.parse = parse;

});
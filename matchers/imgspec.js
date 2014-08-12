(function (mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS (node et al.)
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD (require.js et al.)
}) (function (exports) {

    function match( file_collection ) {
        return [
            {
                'error_message': file_collection[0].fileref + ": something wrong there"
            }]
    }

    exports.match = match;

});
(function (mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS (node et al.)
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD (require.js et al.)
}) (function (exports) {

    var JSzip = require('../lib/jszip.min.js');

    function get(args) {

        // FIXME: major memory consumption through object conversions
        var zip_data;

        // check whether we're given a filename or raw data to unpack
        if (typeof args.filename == 'string') {  // file name
            console.error('reading from ' + args.filename);
            var fs = require('fs'); // FIXME: assuming node
            fs.stat(args.filename, function (err, stats) {
                if (err) throw err;
                //console.log('stats: ' + JSON.stringify(stats));
            });
            zip_data = new Uint8Array(fs.readFileSync(args.filename));

        } else if (typeof args.data == 'object') { // raw data buffer
            zip_data = new Uint8Array(args.data);

        } else { // FIXME: add reading from URI
            throw 'zip.js: get(): unsupported argument type';
        }

        console.error('got ' + zip_data.byteLength + ' bytes');

        // FIXME: zip format error handling
        return new JSzip(zip_data);
    }

    exports.get = get;
});

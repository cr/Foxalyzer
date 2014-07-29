(function (mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD
    mod(this.Zip || (this.Zip = {})); // Plain browser env
}) (function (exports) {

    function unpack(foo) {
        return foo;
    }

    exports.unpack = unpack;
});
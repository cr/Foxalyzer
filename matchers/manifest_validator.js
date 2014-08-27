(function (mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS (node et al.)
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD (require.js et al.)
}) (function (exports) {


    function match(property_set, rule_set) {
        var report_item_set = [];

        // iterate the rule set
        for (var i=0 ; i<rule_set.length ; i++) {
            var rule = rule_set[i];

            // is this rule for me?
            if (rule.matcher.indexOf('manifest_validator') != 0) continue;

            // FIXME: dangerous dynamic calling; for now we're assuming that the rule set has been validated
            handler = '__handler__' + rule.specs.handler;
            if (typeof handlers[handler] == 'function') {
                var report_items = handlers[handler](property_set, rule);
                report_item_set = report_item_set.concat(report_items); // FIXME: concat most readable, but memory-hungry
            } else {
                console.error('manifest_validator: invalid rule: ' + JSON.stringify(rule));
            }

        }
        return report_item_set;
    }


    var handlers = {
        "__handler__file_is_valid_json": function (ps, rule) {
            var msg = [];
            // iterate all specified files
            for (var i = 0; i < rule.specs.files.length; i++) {
                f = rule.specs.files[i];
                if (!(f in ps)) {
                    msg.push({
                        rule_ref: rule,
                        message: "'" + f + "' must be a valid JSON file, but the file is missing.",
                        file_ref: null,
                        offset: null,
                        line: null,
                        snippet: null
                    });
                } else if (ps[f].validJSON !== true) {
                    msg.push({
                        rule_ref: rule,
                        message: "'" + f + "' is not a valid JSON file.",
                        file_ref: ps[f].file_ref,
                        offset: null,
                        line: null,
                        snippet: null
                    });
                }
            }
            return msg;
        },

        "__handler__has_valid_schema": function (ps, rule) {
            msg = [];
            for (var i = 0; i < rule.specs.files.length; i++) {
                f = rule.specs.files[i];
                if (!ps[f] || !ps[f].validJSON) {
                    msg.push({
                        rule_ref: rule,
                        message: "'" + f + "' does not comply to the manifest schema",
                        file_ref: ps[f],
                        offset: null,
                        line: null,
                        snippet: null
                    });
                }
            }
            return msg;
        }
    }

        exports.match = match;

});
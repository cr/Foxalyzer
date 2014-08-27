(function (mod) {
    if (typeof exports == "object" && typeof module == "object") return mod(exports); // CommonJS (node et al.)
    if (typeof define == "function" && define.amd) return define(["exports"], mod); // AMD (require.js et al.)
})(function (exports) {

    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
    String.prototype.startsWith = function (prefix) {
        return this.indexOf(prefix) == 0;
    };

    // TODO: RuleSet should become a tree of dependencies


    function RuleSet() {
        this.results = [];
        this.rules = [];
        this.index = {};
        this.matchers = {};
    }

    RuleSet.prototype.add = function (args) {
        var new_rules = [];
        var new_rules_source;

        if (typeof args.filename == 'string') {
            // FIXME: assuming node
            new_rules = require(args.filename);
            new_rules_source = args.filename;
        } else if (typeof args.uri == 'string') {
            // TODO: load via XMLHttpRequest
            throw ('fetching remote rule sets not supported yet');
        } else if (typeof args.json == 'string') {
            new_rules = JSON.parse(args.json);
            new_rules_source = 'JSON string'
        } else if (typeof args.json == 'object') {
            new_rules = args.json;
            new_rules_source = 'JSON object'
        } else {
            throw ('json parameter has invalid format');
        }

        // quick sanity checks
        if (Object.prototype.toString.call(new_rules) != '[object Array]') {
            new_rules = [new_rules]; // expecting array of rule objects
        }
        try {
            new_rules[0].name;
            new_rules[0].matcher;
        } catch (e) {
            throw (new_rules_source + ': invalid rule format, ' + e);
        }

        console.error("adding %d rule(s) from '%s'", new_rules.length, new_rules_source);

        // add rules to set, overwriting old rules of same name as per index
        for (var i = 0; i < new_rules.length; i++) {
            var r = new_rules[i];
            if (this.index[r.name]) {
                console.warn("WARNING: overwriting duplicate rule '%s'", r.name)
                this.rules[this.index[r.name]] == r;
            } else {
                this.rules.push(r);
                this.index[r.name] = this.rules.length - 1;
            }
        }

    };

    RuleSet.prototype.cleanup = function () {
        console.error('cleaning up rule set')
        this.rules.sort(function (a, b) {
            aa = a.priority || 50;
            bb = b.priority || 50;
            return bb - aa
        });
        // rebuild index
        this.index = {};
        for (var i = 0; i < this.rules.length; i++) {
            this.index[this.rules[i].name] = i;
        }
    };

    RuleSet.prototype.resolve = function (property_set) {
        this.cleanup();
        var report_items = [];

        console.error('running on rule set %s', JSON.stringify(this.rules, undefined, 2));

        // run every rule, load matchers on the fly
        for (var i = 0; i < this.rules.length; i++) {
            var r = this.rules[i];
            if (!this.matchers[r.matcher]) {
                // CAVE: This is dangerous code. Sanitize the hell out of r.matcher!
                var sanitized_matcher = r.matcher.replace(/[^A-Za-z-_0-9]/g, '').substring(0, 40);
                var matcher_path = '../matchers/' + sanitized_matcher + '.js';
                if (sanitized_matcher !== r.matcher) {
                    console.warn('WARNING: RuleSet.resolve(): invalid matcher name sanitized for path "%s"', matcher_path);
                }
                console.error('using matcher "%s"', matcher_path);
                this.matchers[r.matcher] = require(matcher_path);
            }
            var match_res = this.matchers[r.matcher].match(property_set, [r]);
            report_items = report_items.concat(match_res); // FIXME: concat most readable, but memory-hungry
            if (r.terminal) break;
        }

        return report_items;

    };

    exports.RuleSet = RuleSet;

});
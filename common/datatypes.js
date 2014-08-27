// FIXME: turn this reference into proper protoypes

function FileProperties() {
    this.file_ref = {};     // reference to jszip file object
    this.prop1 = "foobar";  // parser-specific properties...
    this.prop2 = {whatever: "is important"};
}

function Rule() {
    this.name = "";         // unique rule name, short and sweet
    this.description = "";  // verbose rule description
    this.info = "http://";  // link to more information
    this.category = "";     // rule category
    this.target = "";       // something to determine applicability to use case (eg. os+version)
    this.priority = 50;     // rules will run sorted by priority in [0,100]
    this.depends = [
        [],
        []
    ]; //
    this.matcher = "";      // intended matcher and its version
    this.rating = "";       // severity rating
    this.specs = {};        // matcher-specific rule definition
    this.messages = [];
}

function ReportItem() {
    this.rule_ref = {};     // reference to matching rule object
    this.message = "";      // specific error message to display to user
    this.file_ref = {};     // reference to jszip file object that matches
    this.offset = 0;        // offset in file
    this.line = 0;          // line number in case of text file
    this.snippet = "";      // context snippet in text file
}

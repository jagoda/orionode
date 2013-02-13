var shell = require("./shell");

var TEST_COMMAND = "./node_modules/.bin/_mocha --reporter spec";

namespace("test", function () {

    desc("Run the test suite with coverage reporting.");
    task("coverage", [ "coverage-html" ]);
    
    desc("Collect coverage data for the test cases.");
    shell.task("coverage-data", "./node_modules/.bin/cover run ./node_modules/.bin/_mocha -- --reporter spec");
    
    desc("Create an HTML coverage report.");
    shell.task("coverage-html", [ "coverage-data" ], "./node_modules/.bin/cover report html");

    desc("Perform static analysis on the code.");
    shell.task("lint", "./node_modules/.bin/jshint ./");

    desc("Run the full suite of unit tests.");
    shell.task("unit", "./node_modules/.bin/mocha");

});

var node = require("./node"),
    path = require("path");

namespace("test", function () {

    desc("Run the test suite with coverage reporting.");
    task("coverage", [ "coverage-html" ]);
    
    desc("Collect coverage data for the test cases.");
    node.task(
        "coverage-data",
        // ./node_modules/.bin/cover run ./node_modules/.bin/_mocha -- --reporter spec
        [
            path.normalize("./node_modules/.bin/cover"),
            "run",
            path.normalize("./node_modules/.bin/_mocha"),
            "-- --reporter spec"
        ].join(" ")
    );
    
    desc("Create an HTML coverage report.");
    node.task(
        "coverage-html",
        [ "coverage-data" ],
        // ./node_modules/.bin/cover report html
        [
            path.normalize("./node_modules/.bin/cover"),
            "report html"
        ].join(" ")
    );

    desc("Perform static analysis on the code.");
    node.task(
        "lint", 
        // ./node_modules/.bin/jshint ./
        [
            path.normalize("./node_modules/.bin/jshint"),
            "./"
        ].join(" ")
    );

    desc("Run the full suite of unit tests.");
    node.task(
        "unit",
        // ./node_modules/.bin/mocha --reporter spec
        [
            path.normalize("./node_modules/.bin/mocha"),
            "--reporter spec"
        ].join(" ")
    );

});

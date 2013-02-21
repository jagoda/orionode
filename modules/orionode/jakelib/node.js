var shell = require("./shell");

var NODE = process.execPath;

module.exports = {

    task: function (name, prerequisites, command) {
        // FIXME: this could probably be cleaned up.
        if (
            (
                typeof prerequisites === "string" ||
                prerequisites instanceof String
            ) &&
            typeof command === "undefined"
        ) {
            command = prerequisites;
            prerequisites = [];
        }
        
        return shell.task(name, prerequisites, NODE + " " + command);
    }

};

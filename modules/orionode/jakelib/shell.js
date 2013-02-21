var child_process = require("child_process");

var ARGUMENT_SEPARATOR = " ";

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
    
        var args = command.split(ARGUMENT_SEPARATOR),
            command = args.shift(),
            taskName = jake.currentNamespace.parentNamespace !== null ?
                jake.currentNamespace.name  + ":" + name :
                name;
            
        return global.task(
            name,
            prerequisites,
            function () {
                jake.logger.log("Starting external task '" + taskName + "'...");
                
                // Using 'spawn' here to get good stdio inheritance.
                var child = child_process.spawn(
                    command,
                    args,
                    {
                        env: process.env,
                        stdio: "inherit"
                    }
                );
                
                child.on("exit", function (code) {
                    if (code === 0) {
                        jake.logger.log(
                            "Task '" + name + "' completed successfully."
                        );
                        complete();
                    }
                    else {
                        fail(
                            "Task '" + name + "' failed with code " + code + "."
                        );
                    }
                });
            },
            { async: true }
        );
    }

};

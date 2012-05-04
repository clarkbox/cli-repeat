# cli-repeat
Poor mans cron. Use this command line utility to repeat a command at a set interval, and optionally for a set duration.

## Howto use CLI:
This command will repeat "hello world" every 10 seconds for a duration of 60 seconds.
<pre>
cli-repeat.js --command "echo hello world" --interval 10 --timeout 60
</pre>

Output of `cli-repeat.js --help`
<pre>
    Usage: cli-repeat.js [options]

    Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -c --command [command]    command to run
    -i --interval [interval]  execute command every x seconds (can be fraction). defaults to 60 seconds
    -t --timeout [timeout]    stop after x seconds. default [0] will run forever
    -d --delay [timeout]      number of seconds before executing the command for first time. default [0] will run command immediately
    -v --verbose              output debug info and not just command output
</pre>

###`--command`
Only required parameter. This is the actual command to repeat.

###`--interval` optional
The time in seconds between executing the command.

###`--timeout` optional
How many seconds from now do you want to stop repeating the command.

###`--delay` optional
By default the `--command` will be executed immediately. Set this option and the initial run will be delayed

## Dependencies:
Install via `npm install`
1. [commander.js](https://github.com/visionmedia/commander.js)



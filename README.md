# cli-repeat
Poor mans cron. Use this command line utility to repeat a command at a set interval and optionally for a set duration.

## Dependencies:
The only dependency is [commander.js](https://github.com/visionmedia/commander.js). Install via `npm`.

## Howto use CLI:
This command will repeat "hello world" every 10 seconds.
<pre>
cli-repeat.js --command "echo hello world" --interval 10
</pre>

This command will repeat "hello world" every 10 seconds for 60 seconds.
<pre>
cli-repeat.js --command "echo hello world" --interval 10 --timeout 60
</pre>

This command will repeat "hello world" once in 10 seconds. This is beacause the timeout will happen before a second iteration happens.
<pre>
cli-repeat.js --command "echo hello world" --delay 10 --interval 10 --timeout 15
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
By default the `--command` will be executed immediately. Set this option and the initial run will be delayed. Note that when using `--delay` and `--timeout` together, that timeout is from the time you press enter. So if you have a delay of 10 and a timeout of 1, your command will never run.



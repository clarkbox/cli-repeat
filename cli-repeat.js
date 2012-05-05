#!/opt/local/bin/node
var program = require('commander'),
    proc = require('child_process');
program
    .version('0.0.1')
    .option('-c --command [command]', 'command to run')
    .option('-i --interval [interval]', 'execute command every x seconds (can be fraction). defaults to 60 seconds', Number, 60)
    .option('-t --timeout [timeout]', 'stop after x seconds. default [0] will run forever', Number, 0)
    .option('-d --delay [timeout]', 'number of seconds before executing the command for first time. default [0] will run command immediately', Number, 0)
    .option('-v --verbose', 'output debug info and not just command output')
    .parse(process.argv);

if(!process.argv[2]){
    console.log(program.helpInformation());
}else{
    start();
}

function start(){
    var self = this;
    var interval = program.interval * 1000,
        delay = program.delay * 1000,
        timeout = new Date((new Date()).getTime() + program.timeout*1000 );
    if(program.delay > program.timeout){
        log('--timeout must be greater than --delay, otherwise your command will never run');
        return;
    }
    if(delay && program.verbose){
        log('Delaying start for '+ program.delay + ' seconds');
    }
    this._setTimeout = setTimeout(function(){
        self._setInterval = setInterval(function(){
            if(program.verbose){
                log('----REPEATING----');
            }
            proc.exec(program.command, function(error, stdout, stderr){
                log(stdout);
                if(error || stderr){
                    log('----ERROR REPEATING----');
                    log(error);
                    log(stderr);
                }

                if((new Date()) > timeout){
                    clearInterval(self._setTimeout);
                    clearTimeout(self._setInterval);
                    return false;
                }
            });
        }, interval);
    }, delay);
}

function log(message){
    console.log((new Date()) + ' ' + message);
}
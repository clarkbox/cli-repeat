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
    if(program.interval <= 0){
        log('--internval must be greater than 0');
        return;
    }
    if(program.delay > program.timeout){
        log('--timeout must be greater than --delay, otherwise your command will never run');
        return;
    }

    var self = this;
    var interval = program.interval * 1000,
        delay = program.delay * 1000;
    this.i = 1;
    this.timeout = new Date((new Date()).getTime() + program.timeout*1000);

    if(program.delay && program.verbose){
        log('Delaying start for '+ program.delay + ' seconds');
    }

    this._setTimeout = setTimeout(function(){
        exec(checkTimeout);
        self._setInterval = setInterval(function(){
            if(program.verbose){
                log('---- REPEATING '+ self.i++ +'----');
            }
            exec(checkTimeout);
        }, interval);
    }, delay);
}

function checkTimeout(){
    if(program.timeout>0 && (new Date((new Date()).getTime() + program.interval*1000)) > timeout){
        clearInterval(this._setTimeout);
        clearTimeout(this._setInterval);
        return;
    }
}

function exec(callback){
    proc.exec(program.command, function(error, stdout, stderr){
        log(stdout);
        if(error || stderr){
            log('----ERROR REPEATING----');
            log(error);
            log(stderr);
        }
        callback();
    });
}

function log(message){
    console.log((new Date()) + ' ' + message);
}
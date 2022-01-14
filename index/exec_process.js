var exec = require('child_process').exec;
const core = require("@actions/core");
var result = function(command, cb){
    var child = exec(command, function(err, stdout, stderr){
        if(err != null){
            return cb(new Error(err), null);
            core.setFailed(err.message);
        }else if(typeof(stderr) != "string"){
            return cb(new Error(stderr), null);
            core.setFailed(err.message);
        }else{
            return cb(null, stdout);
        }
    });
}

exports.result = result;

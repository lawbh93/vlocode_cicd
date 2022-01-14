const core = require("@actions/core");
const github = require("@actions/github");
var fs = require('fs');
var fse = require('fs-extra');
const processo = require("process");
var action='oAuthInfo';
var OrgId='';
process.argv.forEach((val, index) => {
    OrgId=val;
});

fs.readFile('./accessInfo.json', 'utf8', (err2, jsonString) => {
    try {
        const oAuthInfo = JSON.parse(jsonString);
        oAuthInfo.instance_url;
          var execProcess = require("./exec_process.js");
          execProcess.result(`access_token=${oAuthInfo.access_token} instance_url=${oAuthInfo.instance_url} action=${action} OrgId=${OrgId}  bash .sh/oAuth.sh`, function(err, response) {
              if(!err){
                  console.log(response);
              }else {
                  console.log(err);
              }
          });
    } catch(err2) {
        console.log('\x1b[31m%s\x1b[0m', err2);
        processo.exit(1);
    }
})

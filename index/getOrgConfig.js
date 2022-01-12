const core = require("@actions/core");
const github = require("@actions/github");
var fs = require('fs');
var fse = require('fs-extra');
var OrgId;
var defURL;
var newList= [];

var action='getOrgInfo';
process.argv.forEach((val, index) => {
  newList.push(val);
});
OrgName= newList[2];
var username= newList[3];
var client_secret= newList[4];
var passToken= newList[5];
var client_id= newList[6]

fs.readFile('./index/config.json', 'utf8', (err2, jsonString) => {
    try {
        const configParse = JSON.parse(jsonString);
        for (let i = 0; i < configParse.length; i++) {
            if(configParse[i].Org_Name==OrgName) {
              OrgId=configParse[i].Org_Id;
              defURL=configParse[i].default_Url;

            }
          }

          var execProcess = require("./exec_process.js");
          execProcess.result(`username=${username} client_secret=${client_secret} client_id=${client_id} passToken=${passToken} OrgId=${OrgId} defURL=${defURL} action=${action} bash .sh/oAuth.sh`, function(err, response) {
              if(!err){
                  console.log(response);
              }else {
                  console.log(err);
              }
          });
    
          
} catch(err2) {
        console.log('Error parsing JSON string 2:', err2)
    }
})


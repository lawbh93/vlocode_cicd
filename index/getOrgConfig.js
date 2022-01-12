const core = require("@actions/core");
const github = require("@actions/github");
var fs = require('fs');
var fse = require('fs-extra');
var OrgName;
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
  OrgName=val;
});

fs.readFile('./index/config.json', 'utf8', (err2, jsonString) => {
    try {
        const configParse = JSON.parse(jsonString);
        for (let i = 0; i < configParse.length; i++) {
            if(configParse[i].Org_Name==OrgName) {
              console.log('Read file');
            }
        }

} catch(err2) {
        console.log('Error parsing JSON string 2:', err2)
    }
})


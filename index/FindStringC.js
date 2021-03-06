const core = require("@actions/core");
const github = require("@actions/github");

var fs = require('fs');
var fse = require('fs-extra');

var differences = [];
var NewListDiffs =[];
var datapackFilePath;
// Intitializing the readFileLines with filename
process.argv.forEach((val, index) => {
  if (val.includes("tmpDatapacks")) {
    differences.push(val);
  } else if(val.includes('.yaml')) {
    datapackFilePath=val;
  }
});
try {
  for (let i = 0; i < differences.length; i++) {
    var str = differences[i];
    if(str.includes('_DataPack.json')) {
      NewListDiffs.push(str);
    }
  }
  for(let j=0;j<NewListDiffs.length;j++) {
    var fileToOpen='./'+NewListDiffs[j];
    //#region 
    fs.readFile(fileToOpen, 'utf8', (err, jsonString) => {
      if (err) {
          return
      }
      try {
          const DataPack = JSON.parse(jsonString)
          fs.readFile('./index/DatapackMetadata.json', 'utf8', (err2, jsonString2) => {
              if (err) {
                  console.log("Error reading file from disk 2 :", err2)
                  return
              }
              try {
                  const DatapackMetadata = JSON.parse(jsonString2)
                  for (let i = 0; i < DatapackMetadata.length; i++) {
                      if(DatapackMetadata[i].vlocity_sobject__c==DataPack.VlocityRecordSObjectType) {
                          fs.appendFile(datapackFilePath,'\n'+'   '+'- VlocityDataPackType: ' + DatapackMetadata[i].DeveloperName +'\n'+'      ' +'query: '+DatapackMetadata[i].queryFields__c+' '+ DatapackMetadata[i].vlocity_sobject__c + ' '+DatapackMetadata[i].Condition__c +' '+DatapackMetadata[i].X2ndCondition__c+'= '+'\''+DataPack.Name+'\'' , function (err2) {
                              if (err2) throw err2;
                              console.log('Updated!');
                                });
                      }
                  }        
          } catch(err2) {
                  console.log('Error parsing JSON string 2:', err2)
              }
          })
  } catch(err) {
          console.log('Error parsing JSON string 1:', err)
      }
  })
    //#endregion
  }
} catch (err) {
  console.log("Error parsing JSON string:", err);
}
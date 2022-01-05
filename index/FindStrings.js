const core = require("@actions/core");
const github = require("@actions/github");

var fs = require('fs');
var fse = require('fs-extra');

var differences = [];

// Intitializing the readFileLines with filename
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
  if (val.includes("DataPackMetadata")) {
    differences.push(val);
  }
  console.log("differences: " + differences);
});

fs.readFile("./index/FilePaths.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    const DataPackInfo = JSON.parse(jsonString);
    for (let i = 0; i < differences.length; i++) {
      var str = differences[i];
      for (let j = 0; j < DataPackInfo.length; j++) {
        if (str.includes(DataPackInfo[j].FilePath)) {
          var newString = DataPackInfo[j].FilePath;
          var tokens = str.split(newString);

          var drive = tokens[0];
          var fileName = tokens[tokens.length - 1];
          var len = drive.length + fileName.length;
          console.log(fileName);
          var FileShort=fileName.split('/');
          FileshortName= FileShort[0];
          var NPath=  DataPackInfo[j].FilePath+FileshortName;
          console.log(NPath);
          var sourceDir = './'+NPath;
          var destDir = './tmpDatapacks/'+DataPackInfo[j].Sobject+'/'+FileshortName;
          console.log(sourceDir);
          console.log(destDir);
          
          if (!fs.existsSync(destDir)){
            fs.mkdirSync(destDir, { recursive: true });
        }
        
        //copy directory content including subfolders
        fse.copy(sourceDir, destDir, function (err) {
          if (err) {
            console.error(err);
          } else {
            console.log("success!");
          }
        }); 
        
        }
      }
    }
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});

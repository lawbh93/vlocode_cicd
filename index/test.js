const fs = require('fs')
fs.readFile('./AccountSearch_DataPack.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const DataPack = JSON.parse(jsonString)
        console.log("DataPack Name is:", DataPack.Name)
        console.log("DataPack VlocityRecordSObjectType is:", DataPack.VlocityRecordSObjectType)

        fs.appendFile('datapack.yaml','- VlocityDataPackType: ' + 'DataRaptor'+'\n' +'query: SELECT id from ' +DataPack.VlocityRecordSObjectType + 'where Name ' +DataPack.Name , function (err) {
        if (err) throw err;
        console.log('Updated!');
          });
          
} catch(err) {
        console.log('Error parsing JSON string:', err)
    }
})

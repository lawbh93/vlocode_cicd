const fs = require('fs')
fs.readFile('./AccountSearch_DataPack.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const DataPack = JSON.parse(jsonString)
        fs.readFile('./DataPackMetadata.json', 'utf8', (err2, jsonString2) => {
            if (err) {
                console.log("Error reading file from disk:", err2)
                return
            }
            try {
                const DatapackMetadata = JSON.parse(jsonString2)
                for (let i = 0; i < DatapackMetadata.length; i++) {
                    if(DatapackMetadata[i].vlocity_sobject__c==DataPack.VlocityRecordSObjectType) {
                        fs.appendFile('datapack.yaml','\n'+'   '+'- VlocityDataPackType: ' + DatapackMetadata[i].DeveloperName +'\n'+'      ' +'query: '+DatapackMetadata[i].queryFields__c+' '+ DatapackMetadata[i].vlocity_sobject__c + ' '+DatapackMetadata[i].Condition__c +' '+DatapackMetadata[i].X2ndCondition__c+'= '+'\''+DataPack.Name+'\'' , function (err2) {
                            if (err2) throw err2;
                            console.log('Updated!');
                              });
                    }
                }
                  
        } catch(err2) {
                console.log('Error parsing JSON string:', err2)
            }
        })

} catch(err) {
        console.log('Error parsing JSON string:', err)
    }
})

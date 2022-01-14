#!/bin/bash
echo 'Here'
Destino=${Destino:default}
Origen=${Origen:default}
protectedBranches=${protectedBranches:default}

username=${username:default}
client_secret=${client_secret:default}
passToken=${passToken:default}
client_id=${client_id:default}
url=${url:default}
datapackFilePath=${datapackFilePath:default}
vlocityMetadata=${vlocityMetadata:default}
eventAction=${eventAction:default}
FilePathsJson=${FilePathsJson:default}

echo "the datapack.yaml path is" $datapackFilePath
echo "the Vlocity Objects are in the next folder" $vlocityMetadata

FilesPath='{"ObjectToJson":"'$vlocityMetadata'"}'
if [[ " ${eventAction} " =~  'checkOnly' ]]; then
    for ((i = 0; i < ${#protectedBranches[@]}; ++i)); do
        if [[ " ${protectedBranches[i]} " =~  ${Destino} ]]; then
            VAR=$(git diff remotes/origin/$Destino...$Origen --name-only $vlocityMetadata)
        fi
    done

    echo 'Differences start'
    echo $VAR
    echo 'Differences end'

    git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'
    git fetch --all
    git branch --show-current

    node index/FindStrings.js $VAR $FilesPath $FilePathsJson

    git add tmpDatapacks/
    #
    for ((i = 0; i < ${#protectedBranches[@]}; ++i)); do

    if [[ " ${protectedBranches[i]} " =~  ${Destino} ]]; then
        VAR2=$(git diff --cached --name-only $Origen tmpDatapacks)
    fi
    done

    echo 'Differences start2'
    echo $VAR2 
    echo 'Differences end2'
    node index/FindStringC.js $VAR2 $datapackFilePath
    git add index/
    git restore --staged tmpDatapacks
    git status
    git diff --cached $BRANCH index

    Org_Name='sandbox'

    node index/getOrgConfig.js $Org_Name $username $client_secret $passToken $client_id       
elif [[ " ${eventAction} " =~  'deploy' ]]; then
    echo 'showing datapackFILE '
    echo -e "\e[31m showing datapackFILE \e[0m"
    cat $datapackFilePath

fi

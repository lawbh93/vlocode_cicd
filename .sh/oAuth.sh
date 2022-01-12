#!/bin/bash
echo 'Here'
action=${action:default}
defURL=${defURL:default}
getOrgInfoVar='getOrgInfo'
username=${username:default}
client_secret=${client_secret:default}
passToken=${passToken:default}
client_id=${client_id:default}

if [[ " ${action} " =~  ${getOrgInfoVar} ]]; then
  curl -d "username=$username&client_secret=$client_secret&password=$passToken&grant_type=password&client_id=$client_id" -H "Accept: application/json" $defURL -o accessInfo.json
  cat ./accessInfo.json
fi

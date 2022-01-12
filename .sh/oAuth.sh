#!/bin/bash
echo 'Here'
action=${action:default}
defURL=${defURL:default}
getOrgInfoVar='getOrgInfo'
oAuthInfoVar='oAuthInfo';
username=${username:default}
client_secret=${client_secret:default}
passToken=${passToken:default}
client_id=${client_id:default}
access_token=${access_token:default}
instance_url=${instance_url:default}
OrgId=${OrgId:default}


if [[ " ${action} " =~  ${getOrgInfoVar} ]]; then
  curl -d "username=$username&client_secret=$client_secret&password=$passToken&grant_type=password&client_id=$client_id" -H "Accept: application/json" $defURL -o accessInfo.json

elif  [[ " ${action} " =~  ${getOrgInfoVar} ]]; then
vlocity -sf.accessToken $access_token -sf.instanceUrl $instance_url -sf.sessionId $OrgId -vlocity.namespace vlocity_cmt -job ./index/datapack.yaml cleanOrgData
fi

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
echo "the username is: " $username
echo "the client_secret is: " $client_secret
echo "the password is: " $passToken
echo "the client_id is: " $client_id
echo "the url is: " $url

for ((i = 0; i < ${#protectedBranches[@]}; ++i)); do

if [[ " ${protectedBranches[i]} " =~  ${Destino} ]]; then
       VAR=$(git diff remotes/origin/$Destino...$Origen --name-only)
fi
done

echo 'Differences start'
echo $VAR
echo 'Differences end'

git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'
git fetch --all
git branch --show-current

node index/FindStrings.js $VAR

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
node index/FindStringC.js $VAR2
git add index/
git restore --staged tmpDatapacks
git status
git diff --cached $BRANCH index

curl -d "username=$username&client_secret=$client_secret&password=$passToken&grant_type=password&client_id=$client_id" -H "Accept: application/json" https://test.salesforce.com/services/oauth2/token -o accessInfo.json
cat ./accessInfo.json
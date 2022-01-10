#!/bin/bash
echo 'Here'
Destino=${Destino:default}
Origen=${Origen:default}
protectedBranches=${protectedBranches:default}

allInOne=${allInOne:default}
temp = allInOne.split(",");


username=${temp[0]}
client_secret=${temp[1]}
client_id=${temp[2]}
url=${temp[3]}
passToken=${temp[4]}

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
#!/bin/bash
echo 'Here'
Destino=${Destino:default}
Origen=${Origen:default}
protectedBranches=${protectedBranches:default}
url=${url:default}
echo $url
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
#!/bin/bash
echo 'Here'
Destino=${Destino:default}
Origen=${Origen:default}
protectedBranches=${protectedBranches:default}
for ((i = 0; i < ${#protectedBranches[@]}; ++i)); do

if [[ " ${protectedBranches[i]} " =~  ${Destino} ]]; then
       VAR=$(git diff remotes/origin/$Destino...$Origen --name-only)
       echo $VAR
fi
done
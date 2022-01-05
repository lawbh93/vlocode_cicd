#!/bin/bash
echo "Get Diffs"
git config --global user.email "vlocode_cicd@noreply.github.com"
git config --global user.name "lawbh93/vlocode_cicd"
BRANCH=${BRANCH:default}
echo 'current'
echo $BRANCH
X=${TARGET:default}
echo $X
if [[ " $X " =~  'develop' ]]; then
    VAR= git diff remotes/origin/develop...$BRANCH --name-only
elif [[ " $X " =~  'release' ]]; then
    VAR= git diff remotes/origin/release...$BRANCH --name-only
elif [[ " $X " =~  'master' ]]; then
    VAR= git diff remotes/origin/master...$BRANCH --name-only
# Siguiente condicion solo para fines de pruebas
elif [[ " $X " =~  'updateMetadata' ]]; then
    VAR= git diff remotes/origin/master...$BRANCH --name-only
fi
echo 'Differences start'
echo $VAR
echo 'Differences end'
node index/FindStrings.js $VAR

git add tmpDatapacks/
#
if [[ " $X " =~  'develop' ]]; then
    VAR2=$(git diff --cached --name-only $BRANCH tmpDatapacks)
elif [[ " $X " =~  'release' ]]; then
    VAR2=$(git diff --cached --name-only $BRANCH tmpDatapacks)
elif [[ " $X " =~  'master' ]]; then
    VAR2=$(git diff --cached --name-only $BRANCH tmpDatapacks)
# Siguiente condicion solo para fines de pruebas
elif [[ " $X " =~  'updateMetadata' ]]; then
    VAR2=$(git diff --cached --name-only $BRANCH tmpDatapacks)
fi
echo 'Differences start2'
echo $VAR2 
echo 'Differences end2'
node index/FindStringC.js $VAR2
git add index/
git restore --staged tmpDatapacks
git status
git diff --cached $BRANCH index
# vlocode_cicd
## Implementación de vlocity desde Github
________
## Realizar estos pasos en repo local solo si se va a copiar el repositorio a otro:
### VsCode or Editor 
- [] Control + shift + H
- [] Search: lawbh93/vlocode_cicd
- [] Replace: Author/RepoName

- [] Search: vlocode_cicd
- [] Replace: RepoName
### Terminal
- [] git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'
- [] git fetch --all
- [] git branch --show-current
- [] git push origin --all


git branch -m main master
git fetch origin
git branch -u origin/master master
git remote set-head origin -a

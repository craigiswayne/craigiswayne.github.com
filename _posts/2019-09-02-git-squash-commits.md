## Steps:
1. Choose starting commit / the number of commits you want to combine
2. `git rebase --interative $valueFromAbove`

## Examples
Squash the last 3 commits
```
git rebase --interative HEAD~[3]
```

Squash all commits **AFTER** `$commitHash` till now
```
git rebase --interactive $commitHash
```

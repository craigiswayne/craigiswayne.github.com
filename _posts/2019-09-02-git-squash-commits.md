## Steps:
1. Choose starting commit / the number of commits you want to combine
2. `git rebase --interative $valueFromAbove`
3. Change the word **pick** to **s** so that those commits can get squashed
4. Next will show the editor message, enter in your new message
5. Push your git changes

## Examples
Squash the last 3 commits
```
git rebase --interactive HEAD~3
```

Squash all commits **AFTER** `$commitHash` till now
```
git rebase --interactive $commitHash
```

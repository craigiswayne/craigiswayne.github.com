---
layout: post
title:  "Git Squash Commits"
date:   2019-09-02
categories: git
---

## Steps:
1. Choose starting commit / the number of commits you want to combine
   * You can run `git log --oneline` to see all commits in a short version
   * This list is shown in the order Newest first
2. `git rebase --interative $valueFromAbove`
3. Commits will be shown in the order: Oldest -> Newest
4. Change the word **pick** to **s** so that those commits can get squashed
5. Next will show the editor message, enter in your new message
6. Push your git changes

## Examples
Squash the last 3 commits
```
git rebase --interactive HEAD~3
git push --force-with-lease
```

Squash all commits **AFTER** `$commitHash` till now
```
git rebase --interactive $commitHash
```

----

#### To squash everything just do...
```
git reset $(git commit-tree HEAD^{tree} -m "Resetting commits...")
git push -f
```

### References:
1. https://www.internalpointers.com/post/squash-commits-into-one-git

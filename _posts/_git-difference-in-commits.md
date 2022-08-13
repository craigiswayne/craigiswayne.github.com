# TAGS: git, deployment, tips, log
# Check the difference in commits
# I use this to check difference in deployments
# What is the code change between this new deployment and the last one
```
# cd to your repo root
sh craigiswayne.github.com/dotfiles/git/scripts/difference-in-commits.sh
```


To find the filenames that are different between to commits
OLD_COMMIT_REF=origin/master;
NEW_COMMIT_REF=origin/develop;
git fetch --all && git diff --name-only $OLD_COMMIT_REF $NEW_COMMIT_REF;


git log --pretty=format:"%ad - %an: %s" $OLD_COMMIT_REF..$NEW_COMMIT_REF
git log --after=$start

#### This excludes merges from upstream updates
```
git log --first-parent --no-merges --pretty=format:"%ad - %an: %s" $OLD_COMMIT_REF..$NEW_COMMIT_REF
git log --first-parent --no-merges --pretty="format:%C(auto)%h (%s, %ad)" $OLD_COMMIT_REF..$NEW_COMMIT_REF
```

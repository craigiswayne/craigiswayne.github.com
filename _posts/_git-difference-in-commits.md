# TAGS: git, deployment, tips, log
# Check the difference in commits
# I use this to check difference in deployments
# What is the code change between this new deployment and the last one
echo 'Enter the OLD_COMMIT_REF'
read OLD_COMMIT_REF
echo 'Enter in NEW_COMMIT_REF';
read NEW_COMMIT_REF;
git fetch --all;
git log --pretty=format:"%C(yellow)%h%x09%Creset%C(cyan)%C(bold)%ad%Creset %C(green)%Creset%s" --date=short --no-merges $OLD_COMMIT_REF..$NEW_COMMIT_REF


To find the filenames that are different between to commits
git diff --name-only SHA1 SHA2

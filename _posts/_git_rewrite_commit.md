# see: https://www.atlassian.com/git/tutorials/rewriting-history  
newMessage="CSI-1024: Withdraw hasAllocations race condition";
branch="origin/bugfix/CSI-1024-withdraw-allocations-race-condition";
git commit --amend -m $newMessage
git push --force $branch

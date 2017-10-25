#!/bin/bash
#Script to get all repositories under a user from bitbucket
#Usage: bitbucket.sh [username]
#Ref: https://haroldsoh.com/2011/10/07/clone-all-repos-from-a-bitbucket-source/

curl -u ${1}  https://api.bitbucket.org/1.0/users/${1} > repoinfo
for repo_name in `grep \"name\" repoinfo | cut -f4 -d\"`
do
  mkdir -p /usr/local/var/www/$repo_name;
  git init;
  git remote add origin ssh://hg@bitbucket.org/${1}/$repo_name;
  git pull origin master;
  git submodule update --init --recursive;
done

#TODO loop through github and bitbucket json curls and clone to machine
#TODO add vhosts dynamically maybe?
#TODO modify hosts file dynamically maybe?


#https://api.github.com/users/craigiswayne/repos

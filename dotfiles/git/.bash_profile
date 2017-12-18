# Git Overrides
function git () {

  if [[ "$1" == "status" ]]
  then

    if [ -f composer.json ]
    then
      composer status -v;
    fi;
    command git "$@"
  elif [[ "$1" == "commit" ]]
  then
    echo "Have you done repo maintenance?";
    command git "$@"
  elif [[ "$1" == "log" ]]
  then
    command git "$@"  --decorate --oneline;
  else
    command git "$@"
  fi
}

function git_repo_name (){
  node ~/www/craigiswayne.github.com/dotfiles/git/git_repo_name.js
}

# function git_calc_root () {
#   [[ ! -z $1 ]] && start="$1" || start=".";
#   git_config_dir=$(find $start -mindepth 1 -maxdepth 2 -type d -iname ".git" | head -n 1);
#   git_config_root=$( dirname $git_config_dir )
#   echo $git_config_root;
# }

# function git_get_all_branches () {
#   git fetch --all;
#   git branch -v;
# }

function git_clean_branches() {
  git branch -r | awk '{print $1}' | egrep -v -f /dev/fd/0 <(git branch -vv | grep origin) | awk '{print $1}' | xargs git branch -d
  git fetch -p && for branch in `git branch -vv | grep ': gone]' | awk '{print $1}'`; do git branch -D $branch; done
}


function git_show_all_branches () {
  git branch -r;
  # for b in `git branch -r | grep -v -- '->'`; do git branch --track ${b##origin/} $b; done
}

function git_delete_tag (){
  git fetch --all;
  tag_name=$(get_user_input "Enter Tag Name");
  git tag -d $tag_name;
  git push origin :refs/tags/$tag_name;
}

function git_remove_submodule () {
  node ~/www/craigiswayne.github.com/dotfiles/git/git_remove_submodule.js
}

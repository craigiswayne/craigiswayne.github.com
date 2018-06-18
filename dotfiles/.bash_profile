function parse_git_branch () {
     git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

export PS1="\[\033[36m\]\u\[\033[m\]@\[\033[32m\]\$(parse_git_branch):\[\033[33;1m\]\w\[\033[m\]\$ ";
export CLICOLOR=1;
export LSCOLORS=ExFxBxDxCxegedabagacad;
# export LC_ALL=$LANG;

export PATH="/usr/local/sbin:$HOME/.composer/vendor/bin:$PATH";
export NODE_PATH=/usr/local/lib/node_modules;

alias whats_my_ip="ifconfig | grep \"inet \" | grep -v 127.0.0.1 | awk '{print $2}'";

alias tree="find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'";

color_red=$'\e[31m';
color_none=$'\e[0m';
color_orange=$'\e[33m';
color_blue_light=$'\e[94m';
color_green_light=$'\e[92m';
#http://misc.flogisoft.com/bash/tip_colors_and_formatting

touch ~/.24.com;
source ~/.24.com;

source '/usr/local/var/www/craigiswayne.github.com/dotfiles/wp/.bash_profile';
source '/usr/local/var/www/craigiswayne.github.com/dotfiles/git/.bash_profile';
source '/usr/local/var/www/craigiswayne.github.com/dotfiles/filebot/.bash_profile';

function update_apps () {
  apm update --no-confirm;
  npm cache verify;
  npm i -g npm;
  npm update;
  npm update -g;
  brew update;
  brew upgrade;
  composer self-update;
}
function dev_cleanup () {
  brew prune;
  brew services cleanup;
  brew doctor;
  brew cleanup;
  brew cask cleanup;
  brew cask doctor;
  yo doctor;
  apm clean;
  npm prune;
}

##
# Update your media library
# using filebot's cli
#
# @link http://www.filebot.net/cli.html
# @link http://www.lifehacker.co.uk/2015/01/04/rename-media-files-quickly-filebot
# @link http://www.filebot.net/naming.html
# @see http://kodi.wiki/view/Naming_video_files/Movies
##
function kodi_library_update {

  # working_directory="/Volumes/MEDIA/Movies";
  #
  # console.info "Updating media library...";
  #
  # # mv $folder/*/*.avi $folder #TODO with mkv, mp4
  # # rm -r $folder/*/*.torrent
  # # rm -r $folder/*/*.jpeg
  # # rm -r $folder/*/*.jpg
  # # rm -r $folder/*/*.srt
  # # rm -r $folder/*/*.tbn
  # # rm -r $folder/*/*.nfo
  # # rm $folder/*sample*;
  #
  # # Look for files within the root folder and try to parse them
  # find $working_directory/* -maxdepth 0 -type f  -print0 | while IFS= read -r -d '' file; do
  #   console.info "Attempting to parse folder... $file";
  #   filebot -rename --db TheMovieDB --format "$working_directory/{n} ({y})/{n}" "$file"
  #   echo "";
  #   echo "==========="
  #   echo "";
  # done
  #
  #
  # # Iterate through all folders in the Movies directory and attempt to rename
  # find $working_directory/* -maxdepth 1 -type d  -print0 | while IFS= read -r -d '' folder; do
  #   console.info "Attempting to parse folder... $folder";
  #   filebot -r -rename --db TheMovieDB --format "$working_directory/{n} ({y})/{n}" "$folder"
  #   echo "";
  #   echo "==========="
  #   echo "";
  # done
  #
  #
  # # Remove all empty folders from the hard drive
  # find $working_directory/ -type d -empty -delete
  # filebot -check $working_directory;
  #
  # working_directory="/Volumes/MEDIA/TV Shows";
  #
  # console.info "Updating media library...";
  #
  # # Look for files within the root folder and try to parse them
  # find $working_directory/* -maxdepth 0 -type f  -print0 | while IFS= read -r -d '' file; do
  #   console.info "Attempting to parse folder... $file";
  #   filebot -r -rename --db TheTVDB --format "$working_directory/{n}/Season {s}/{sxe} - {t}" "$file";
  #   echo "";
  #   echo "==========="
  #   echo "";
  # done
  #
  #
  # # Iterate through all folders in the Movies directory and attempt to rename
  # find $working_directory/* -maxdepth 1 -type d  -print0 | while IFS= read -r -d '' folder; do
  #   console.info "Attempting to parse folder... $folder";
  #   filebot -r -rename --db TheTVDB --format "$working_directory/{n}/Season {s}/{sxe} - {t}" "$folder";
  #   echo "";
  #   echo "==========="
  #   echo "";
  # done
  #
  #
  # # Remove all empty folders from the hard drive
  # find $working_directory/ -type d -empty -delete
  # filebot -check $working_directory;

  ###### ANIME #######

  working_directory="/Volumes/MEDIA/Anime";
  console.info "Updating media library with Anime..."

  # Look for files within the root folder and try to parse them
  find $working_directory/* -maxdepth 0 -type f  -print0 | while IFS= read -r -d '' file; do
    console.info "Attempting to parse folder... $file";
    filebot -r -rename --db anidb -non-strict --format "$working_directory/{n}/Season {s}/{sxe} - {t}" "$folder";
    echo "";
    echo "==========="
    echo "";
  done


  # Iterate through all folders in the Movies directory and attempt to rename
  find $working_directory/* -maxdepth 1 -type d  -print0 | while IFS= read -r -d '' folder; do
    console.info "Attempting to parse folder... $folder";
    filebot -r -rename --db anidb -non-strict --format "$working_directory/{n}/Season {s}/{sxe} - {t}" "$folder";
    echo "";
    echo "==========="
    echo "";
  done


  # Remove all empty folders from the hard drive
  find $working_directory/ -type d -empty -delete
  filebot -check $working_directory;


  # TODO find the failures and then ask the user which

}


function show_databases_dev () {
  mysql -u$DEV_MYSQL_USERNAME -p$DEV_MYSQL_PASSWORD -h$DEV_MYSQL_HOST -e "SHOW DATABASES";
}


function show_databases {
  mysql -u$LOCAL_MYSQL_USERNAME -e "SHOW DATABASES";
}

function mysql_database_sizess (){
  mysql -uroot -e 'SELECT table_schema "DB Name",
   Round(Sum(data_length + index_length) / 1024 / 1024, 1) "DB Size in MB"
FROM   information_schema.tables
GROUP  BY table_schema;';
}


function get_dev_db () {
  db_name=$(get_user_input "Enter Database Name");

  user="$DEV_MYSQL_USERNAME";
  password="$DEV_MYSQL_PASSWORD";
  date=$(date +"%d_%b_%Y");
  host=$DEV_MYSQL_HOST;
  backup_path=~/Downloads;
  output_file=$backup_path/$db_name"_db_"$date.sql;
  echo $output_file;
  umask 177;
  echo "Backing up to... "$output_file;

  mysqldump --user=$user --password=$password --host=$host $db_name --add-drop-trigger --add-drop-database > $output_file;

  echo "Backup finished :)";

  #TODO show file size after backup
  # Delete files older than 30 days
  # find $backup_path/* -mtime +30 -exec rm {} \;
  # --databases $DB_NAME
  # TODO allow for multiple backups to separate files
}


function unlock_items () {
  chflags -R nouchg ./
}


function watch_file_size () {
  stat -f%z $1;
}


function show_users () {
  SELECT mysql.user.User FROM mysql.user;
}


function maybe_increment_version () {
  echo "Things to check...";
  echo "style.css version number on the theme";
  echo "package.json version number... then run grunt";
  echo "if a changed file doesnt have a @since, put it in...";
  echo "if a changed file has a @version, increment it"
}


function update_changelog (){
  target_file=CHANGELOG.md;

  if [ ! -f $target_file ]
  then
    return 1;
  fi;

  version=$(get_user_input "Version Number" --default=$1 --quiet);
  version_message=$(get_user_input "Enter your version message" --default=$2 --quiet);

  echo ""|cat - $target_file > /tmp/out && mv /tmp/out $target_file;
  echo "- $version_message"|cat - $target_file > /tmp/out && mv /tmp/out $target_file;
  echo "## $version"|cat - $target_file > /tmp/out && mv /tmp/out $target_file;
}


function tag_and_release () {
  release_number=$(get_user_input "New Version Number (previous $(git describe))" --default=$1);
  release_message=$(get_user_input "Enter your version message");
  git checkout -b release/$release_number;
  # update_changelog $release_number $release_message;
  git add .;
  git commit -m "$release_message";
  git tag -a $release_number -m "$release_message";
  git push;
  git push --tags;

  git status;
}


function scaffold_new_project () {
  project_root=$(get_user_input "Project Root" --default=$(pwd));
  cd $project_root;
  mkdir -p bin;

  mkdir -p assets/images;
  mkdir -p assets/fonts;
  mkdir -p assets/js;
  mkdir -p assets/js/src/;
  touch assets/js/src/project.js;
  touch assets/js/src/project.min.js;

  mkdir -p assets/css;
  touch assets/css/editor-style.css;
  touch assets/css/project.css;
  touch assets/css/project.min.css;
  touch assets/css/project-admin.css;
  touch assets/css/project-admin.min.css;

  mkdir -p assets/css/scss;
  mkdir -p assets/css/scss/global;
  mkdir -p assets/css/scss/base;
  touch assets/css/scss/base/_reset.scss;
  touch assets/css/scss/base/_typography.scss;
  touch assets/css/scss/base/_icons.scss;
  touch assets/css/scss/base/_icons.scss;
  touch assets/css/scss/base/_wordpress.scss;

  mkdir -p assets/css/scss/components;
  touch assets/css/scss/components/_buttons.scss;
  touch assets/css/scss/components/_callouts.scss;
  touch assets/css/scss/components/_toggles.scss;

  mkdir -p assets/css/scss/layout;
  touch assets/css/scss/layout/_header.scss;
  touch assets/css/scss/layout/_footer.scss;
  touch assets/css/scss/layout/_sidebar.scss;

  mkdir -p assets/css/scss/templates;
  touch assets/css/scss/templates/_archives.scss;
  touch assets/css/scss/templates/_blog.scss;
  touch assets/css/scss/templates/_all.scss;

  mkdir -p assets/css/scss/editor;

  touch assets/css/scss/admin.scss
  touch assets/css/scss/project.scss
  touch assets/css/scss/editor-styles.scss


  mkdir -p includes;
  mkdir -p templates;
  mkdir -p partials;
  mkdir -p languages;
  mkdir -p tests;
  mkdir -p tests/php;
  mkdir -p tests/js;

  touch .editorconfig;

  echo "Done :)";

  #grunt;

  #tree;
}


function symlink (){
  source=$(get_user_input "Enter in the path of the file you want to symlink" --validate=dir);
  destination=$(get_user_input "Enter in the destination path of the file you want to symlink" --default=$(pwd) --validate=dir);
  ln -s $source $destination;
}


function is_dir () {
  if [[ -d $1 ]]
  then
    echo "true";
  else
    echo "false";
  fi;
}


function sync_versions () {
  # if its a plugin, check the plugin file
  # check the composer.json
  # check the package.json
  # check the bower.json
  # maybe integrate the grunt synchronize version matcher
  # check the readme version
  # check the git describe
  plugin_version=$(wp plugin list --fields=name,version | grep 'tf-core');
  git_tag_version=$(git describe);
  # get the bigger number
  # increment the bigger number by 1 fix point
  new_version="";
  plugin_version="";
}


function patch_file (){
  echo "there are todos here...";
  #patch -p0 -b --dry-run --verbose $file_to_patch < $patch_file;
  #patch -p0 -b --dry-run --verbose wp-includes/class-wp-image-editor-imagick.php < wp-content/patches/14459.imagick.2.patch
}


function is_multiline {
  VAR="$1";
  if (( $(grep -c . <<<"$VAR") > 1 )); then
    echo "yes";
  else
    echo "no";
  fi
}


function count_lines {
  echo "$1" | wc -l;
}


function get_user_input {

    full_input=$@;
    prompt="Enter in a value";
    validate="";
    required=true;
    default="";
    user_input="";
    error_message="";
    allow_null=false;

    for input in $full_input
    do
      if [[ $input == *"="* ]]
      then
        flag=$(echo $input| cut -d'=' -f-1);
        flag=${flag:2};
        flag_value=$(echo "$input"| cut -d'=' -f2);
        declare $flag=$flag_value;
      fi;
    done;

    # functions
    function validate {
      case "$validate" in
          git)
            git ls-remote --exit-code $user_input &>/dev/null;
            if [[ $? == "0" ]]
            then
              echo "true";
            else
              echo "false";
            fi;
          ;;

          dir)
            if [[ -d $user_input ]]
            then
              echo "true";
            else
              echo "false";
            fi;
          ;;

          *)
            echo "true"
          ;;
      esac
    }

    if [[ ! -z $1 ]]
    then
      prompt=$1;
    fi;

    if [[ ! -z $default ]]
    then
      prompt="$prompt ["$color_orange"$default"$color_none"]";
    fi;

    while [[ -z $user_input || $(validate) != "true" ]]
    do
      read -p $color_red"$error_message"$color_none"
  $prompt:
  " user_input;

      if [[ -z $user_input && ! -z $default ]]
      then
        user_input=$default;
      fi;

      if [[ $(validate) != "true" ]]
      then
        error_message="Validation failed...";
      fi;

      if [[ -z $user_input && $allow_null == "false" ]]
      then
        error_message="No input provided...";
      fi;

      if [[ ! -z $user_input && $(validate) == "true" ]]
      then
        break;
      fi;

    done;

    echo "$user_input";
}


function console.info () {
  message=$1;
  echo $color_blue_light"$message"$color_none;
}


function console.success () {
  message=$1;
  echo $color_green_light"$message"$color_none;
}


function console.danger {
  message=$1;
  echo $color_red"$message"$color_none;
}


function console.warn {
  message=$1;
  echo $color_orange"$message"$color_none;
}

function console.error {
  message=$1;
  console.danger "$1";
}


function get_latest_code_develop {

  git_refs_develop_folder=.git/refs/heads/origin/develop;
  if [ -f $git_refs_develop_folder ]
  then
    rm .git/refs/heads/origin/develop
  fi;

  git pruner;

  branch_name=develop;
  git fetch --all && git checkout origin/$branch_name -B $branch_name && git pull;
  git log -n 3;
}

function get_latest_code {

  # notify that all merged in branches are getting deleted

  # if there are any changes
  # inform the user that they have uncommitted changes
  # and ask if you would like to reset or you would you like to commit

  # then check if the current branch you're on is either develop or master
  # if not, prompt the user to choose from a list of existing remote branches

  # user chooses branch then pulls that branch down and creates a new local branch set to track the remote branch

  # deletes all merged in branches

  git clean -fd;
  git fetch --all --prune;
  git branch --merged master | grep -v '^ *master$' | xargs git branch -d

  git reset --hard;
  if [ -z $1 ]
  then
    branch=$(git symbolic-ref --short -q HEAD);
  else
    branch=$1;
  fi;

  # SAFELY FALLBACK
  if [ -z $branch ]
  then
      branch=master;
  fi;

  git pruner;
  git checkout -B $branch origin/$branch;
  git pull;
  git submodule update --init --recursive;
  maybe_install_bower;
  maybe_install_composer;
  maybe_install_npm;
}


function go_to_dev_server () {
  # site_url=$(wp_site_url);

  # if [[ -z $site_url ]]
  # then
    ssh $DEV_WWW_USERNAME@$DEV_WWW_HOST
  # else
    # ssh $DEV_WWW_USERNAME@$DEV_WWW_HOST:/var/www/$site_url;
  # fi;
}


function go_to_dev_mysql_server () {
  mysql -u$DEV_MYSQL_USERNAME -p$DEV_MYSQL_PASSWORD -h$DEV_MYSQL_HOST;
}


function mysql {

  if [[ "$1" == "show_users" ]]
  then
    SELECT mysql.user.User FROM mysql.user;
  else
    command mysql "$@"
  fi
}


function switch_php_versions () {
  brew services stop php55;
  brew unlink php55;

  brew link php56;
  brew services start php56;
}


function parse_boolean () {

  input="$1";

    case $input in
        yes|YES|Y|y|true|TRUE|True)
          echo "true";
        ;;

        *)
          echo "false";
        ;;
    esac
}



function nginx_conf () {


  NGINX_CONF=$((nginx -V) 2>&1);

  FOUND=0;
  for CONF in $NGINX_CONF
  do
    if [[ $CONF == *"="* && $CONF == *"$1"* || $1 == "-i" ]]
    then
      FOUND=1;
      if [[ $1 == "-i" && $CONF == *"="* ]]
      then
        KEY=$(echo $CONF| cut -d'=' -f-1);
        KEY=${KEY:2};
        echo "CONF: $CONF";
        console.info "KEY:  "$KEY;
      fi;
      CONF_VALUE=$(echo $CONF| cut -d'=' -f2);
      if [[ $1 == "-i"  && $CONF == *"="* ]]
      then
        console.success "VAL:  "$CONF_VALUE;
        echo "";
      fi;
      if [[ $1 != "-i" ]]
      then
        echo $CONF_VALUE;
      fi;
    fi;
  done;
  if [[ $FOUND == 0 && $1 != "-i" ]]
  then
    echo "No matching configuration for the given input..."
  fi;
}


function man() {
    env \
    LESS_TERMCAP_mb=$(printf "\e[1;31m") \
    LESS_TERMCAP_md=$(printf "\e[1;31m") \
    LESS_TERMCAP_me=$(printf "\e[0m") \
    LESS_TERMCAP_se=$(printf "\e[0m") \
    LESS_TERMCAP_so=$(printf "\e[1;44;33m") \
    LESS_TERMCAP_ue=$(printf "\e[0m") \
    LESS_TERMCAP_us=$(printf "\e[1;32m") \
    man "$@"
}

function cat() {
    local out colored
    out=$(/bin/cat $@)
    colored=$(echo $out | pygmentize -f console -g 2>/dev/null)
    [[ -n $colored ]] && echo "$colored" || echo "$out"
}


function disk_usage (){
  echo "see here: http://osxdaily.com/2007/03/20/command-line-disk-usage-utilities-df-and-du/";
  cd /;
  sudo du | sort -n > /Users/craigiswayne/Downloads/du.txt;
}

#disables line wrapping
tput rmam;

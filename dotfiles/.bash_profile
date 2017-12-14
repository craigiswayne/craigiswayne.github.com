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

function maybe_install_composer () {
  if [ -f composer.json ]
  then
    composer update;
    composer install;
  fi;
}


function maybe_install_npm () {
  if [ -f package.json ]
  then
    npm install;
  fi;
}


function maybe_install_bower () {
  if [ -f bower.json ]
  then
    bower install --allow-root;
  fi;
}


function maybe_run_grunt () {
  if [[ -f Gruntfile.js || -f gruntfile.js ]]
  then
    grunt;
  fi;
}


function sync_web_root () {
  local_web_root=/usr/local/var/www 
  web_root=/Volumes/TimeMachine/www/
  if [ -d $backup_web_root ]
  then
      rsync -av $local_web_root $;
  fi;
}


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


function open_startup_apps () {
  open -a mail;
}

function delete_dev_logs () {
  for i in `find /usr/local/var/www -name 'debug.log'` ; do sudo rm $i ;  done
  for i in `find /usr/local/var/log -name '*.log'` ; do sudo rm $i;  done
  for i in `find ~/.npm/_logs -name '*.log'` ; do sudo rm $i ;  done

  brew services restart --all;
  sudo nginx -s reload;
  delete_xdebug_logs;
}


function restart_dev_services (){
  sudo nginx -s reload;
  brew services restart --all
}


function dev_cleanup () {
  brew prune;
  brew services cleanup;
  brew doctor;
  brew cleanup;
  brew cask cleanup;
  brew cask doctor;
  yo doctor;
  delete_dev_logs;
  apm clean;
  npm prune;

}


function delete_xdebug_logs () {
  console.info "Deleting xdebug logs...";
  xdebug_logs_size=$(find /private/var/tmp -name "cachegrind*" -exec du -ch {} + | grep total);
  console.info "Freeing up $xdebug_logs_size";
  find /private/var/tmp -name "cachegrind*" -exec rm -rf {} \;
}


function delete_users_system_mail () {
  mail=/var/mail/craigwayne;
  if [ -f $mail ]
  then
    sudo rm $mail;
  fi;
}


function startup {
  delete_users_system_mail;
  dev_cleanup;
  locate_missing_assets_nginx;
  restart_dev_services;
  sync_web_root;
  update_apps;
  open_startup_apps;
}


function view_missing_assets_nginx () {
  SYS_LOGS_DIR=/usr/local/var/log;
  NGINX_LOG_DIR=$SYS_LOGS_DIR/nginx;
  NOT_FOUND_ASSETS_LOG_FILE=$NGINX_LOG_DIR/assets_not_found.log;
  cat $NOT_FOUND_ASSETS_LOG_FILE;
}


function remove_tracked_ignored_files () {
  # git clean -id;
  console.info "Removing files as per gitignore...";
  ##
  # Usage: sh -c "$(curl -fsSL https://gist.githubusercontent.com/craigiswayne/f803997987656fe7b83a116ee08128b9/raw/remove_tracked_ignored_files.sh)"
  # @link https://gist.github.com/craigiswayne/f803997987656fe7b83a116ee08128b9
  ##

  INPUT_FILE=".gitignore";
  ENTRIES="";
  while read LINE;
  do
    if [[ $LINE != \#* ]] && [[ ! -z "$LINE" ]] && [[ $LINE != !* ]]
    then
      # extract entries that are not comments, not empty and do not start with a !
      ENTRIES="$ENTRIES $LINE";
    fi;
  done < $INPUT_FILE;

  # echo "This will remove the following files:";
  for entry in $ENTRIES;
  do
    git rm -r --dry-run --cached --ignore-unmatch $entry;
  done

  #TODO allow for removing each file (bulk or interactive)s
  #TODO only search in the wp-content folder
  echo "";
}


function update_gitignore () {
  echo "";
  echo "Make sure your .gitignore is up to date...";

  echo "Git Ignore for WP Content Installation";
  echo "https://bitbucket.org/snippets/24dotcom/kkK8z/git-ignore-for-wp-content-installation"

  echo "Git Ignore for WP Full Installation"
  echo "https://bitbucket.org/snippets/24dotcom/A588y/git-ignore-for-wp-full-installation";

  echo "";
}


function repo_maintenance () {

  console.info "Running Repo Maintenance...";

  checklist=(
  "Git Pruning"
  "Git Submodule status"
  "Git Remote Prunining"
  "Check for README"
  "Check for CHANGELOG"
  "WP Content Only Repo?"
  "Create Jenkins Build Tasks fo dev, staging"
  "Create Jenkins Build Badges"
  "Check standard branches exist (master, develop, bugs, features)"
  "Does the repo have the necessary branch permissions"
  "Does the repo have the correct code language set"
  "Is the repo assigned to the correct team"
  "Is the repo's Website field set correctly"
  staging
  www );

  commands=(

  );

  git pruner;
  echo "";


  # get all remote branches, check that master is the one thats most ahead
  # there should only be 3
  # check all _e() and __() for the twentyfourdotcom textdomain
  #

  # turn on wp debug

  console.info "Deactivating & Deleting Hello Dolly Plugin..."
  # check all files that are being commited don't have TODO's or FIXME's
  wp plugin deactivate hello-dolly;
  wp plugin delete hello-dolly;

  console.info "Removing w3-total-cache files...";
  wp plugin deactivate w3-total-cache;
  wp plugin delete w3-total-cache;

  echo "";

  remove_tracked_ignored_files;
  #update_gitignore;
  wp_install_dev_tools;

  console.warn "";
  console.warn "#############################################################";
  console.warn "# TODO";
  console.warn "#############################################################";
  console.warn "";
  console.warn "Delete repositories remotely that are older than 6 months...";
  console.warn "Check that the repo has an icon...";

  console.warn "";
  console.warn "run wp";
  console.warn "remove any errors that appear...";
  console.warn "";

  console.warn "";
  console.warn "Remove any 'MobileDetect' occurences...";
  console.warn "Remove any 'mobileGrade' occurences...";
  console.warn "";

  console.warn "";
  console.warn "Remove branches older than 6 months";
  console.warn "e.g. git branch -dr origin/feature/login";
  console.warn "https://www.git-tower.com/learn/git/faq/delete-remote-branch";
  console.warn "";

  console.warn "";
  console.warn "Look for all classes that extend the WP_Widget...";
  console.warn "and check if the construct class is used properly";
  console.warn "or at least check if there is a construct method";
  console.warn "something like:";
  console.warn 'find ./ -name \*.php | xargs grep "extends WP_Widget"';
  console.warn 'find ./ -name \*.php | xargs grep "parent::WP_Widget"';
  console.warn "";

  console.info "Running WP CLI...";
  wp;
  console.warn "Check if there are any errors...";


  console.info "Check that no submodules are tracking any branches...";
  cat .gitmodules | grep 'branch';

  console.info "Synchronizing Plugin Version..."
}



function safe_db_name () {
  [[ ! -z $1 ]] && input="$1" || input="";
  db_name=$(strip_tld $input);
  db_name=${db_name//./_};
  echo $db_name;
}


function strip_tld () {
  [[ ! -z $1 ]] && input="$1" || input="";
  result=${input%.co.za*};
  result=${input%.com*};
  echo $result;
}


function strip_email_domain () {
  [[ ! -z $1 ]] && email="$1" || email=$(git config user.email);
  result=${email%@*};
  echo $result;
}


function strip_protocol_from_string(){
  input=$1;
  result=${input##*/};
  echo $result;
}


function strip_local_subdomain_from_string(){
  input=$1;
  result=${input##*local.};
  echo $result;
}


function strip_dev_subdomain_from_string(){
  input=$1;
  result=${input##*dev.};
  echo $result;
}

function dev_db_exists(){
  exists='false';
  db=$1;
  result=$(mysql -u$DEV_MYSQL_USERNAME -p$DEV_MYSQL_PASSWORD -h$DEV_MYSQL_HOST -e"SELECT schema_name from INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = \"$db\"");

  if [[ ! -z $result ]]
  then
    exists='true';
  fi;

  echo $exists;
}


function add_submodule () {
  git_url=$(get_user_input "Enter Submodule git URL");

  #TODO auto get the formatted submodule name
  plugin_path=$(get_user_input "Enter Submodule Destination" --default="wp-content/plugins/");
  git submodule add $git_url $plugin_path;
}



function flush_dns_cache () {
  echo "todo";
  echo "Check Google Chrome cache";
  open -a 'Google Chrom' chrome://net-internals/#dns;
}


function create_and_link_nginx_entry () {
  site_name=$(wp_site_name $1);

  web_root=$2;
  if [[ -z $web_root ]]
  then
    web_root=$(get_user_input "Web Root?" --default="/var/www/");
  fi;

  nginx_sites_available_dir=$3;
  if [[ -z $nginx_sites_available_dir ]]
  then
    nginx_sites_available_dir=$(get_user_input "Sites Available Directory?" --default="/etc/nginx/sites-available");
  fi;


  conf_prefix="";

  nginx_sites_enabled_dir=$4;
  if [[ -z $nginx_sites_enabled_dir ]]
  then
    nginx_sites_enabled_dir=$(get_user_input "Nginx Sites Enabled?" --default="dev");
  fi;

  proposed_file=$nginx_sites_available_dir/$conf_prefix"."$site_name.conf;
  proposed_file_link=$nginx_sites_enabled_dir/$conf_prefix"."$site_name.conf;

  rm $proposed_file;
  rm $proposed_file_link;

  touch $proposed_file;

  echo "server {
         root /var/www/$site_name;

         # Make site accessible from http://localhost/
         server_name $conf_prefix.$site_name;

         include global/server.conf;
         include global/default_locations.conf;
  }" >> $proposed_file;

  ln -s $proposed_file /etc/nginx/sites-enabled;
  sudo nginx -s reload;
}


function build_project () {
  maybe_install_composer;
  maybe_install_npm;
  maybe_install_bower;
  maybe_run_grunt;
  console.success "Project Build finished Successfully...";
}


function find_todos_and_fixmes {

  if [ -z "$1" ];
  then
    files_changed="$(find *)";
  else
    files_changed="$(git diff --name-only)";
  fi;

  #egrep -lir --include=*.{php,html,js} "(TODO|FIXME)" .
  results="";
  count=0;
  for i in $files_changed ;
  do
    result=$(egrep -inr --colour=always "(TODO|FIXME)" $i);
    if [[ $result != "" ]]
    then
      results="$results\n$result";
      count=$((count+1));
    fi;
  done

  if [ $count -gt 0 ]
  then
    console_group_start "TODO's and FIXME's";
  	console.warn "$count file(s) need attention";
  	printf "$results";
    echo "";
    echo "";
    count_lines "$results";
    console_group_end;
  fi;

}


function php_lint {
  #TODO search for class="
  if [ -z "$1" ]; then return 0; fi;

  files_changed="$1";

  #TODO only check php errors
  count=0;
  results="";
  for i in $files_changed ;
  do
    result="$(php -l $i)";
    if [[ $(is_multiline "$result") == "yes" ]]
    then
      count=$((count+1));
      results="$results\nlinting $i ...\n$result\n";
    fi;
  done

  if [ $count -gt 0 ]
  then
    console_group_start "PHP Linting...";
  	console.warn "$count files need attention";
  	printf "$results";
    console_group_end;
  fi;

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


function maybe_add_host_entry {
  if [[ -z $1 ]]
  then
    new_host_entry=$(get_user_input "Enter in your new host entry");
  else
    new_host_entry=$1;
  fi;

  if [[ -z $2 ]]
  then
    hosts_file=$(get_user_input "Hosts file location?" --default="$(locate */hosts)");
  else
    hosts_file=$2;
  fi;

  host_entry=$(cat $hosts_file | grep $new_host_entry);

  if [[ -z $host_entry ]]
  then
    console.danger "No host entry exists for $new_host_entry";
    # sudo -s;
    # echo "127.0.0.1 $new_host_entry" >> $hosts_file;
    # echo "";
    # console.success "Host entry created successfully...";
    # echo "";
  fi;
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


function get_temp_dir () {
  if [ ! -z $1 ]
  then
     base="$1"
   else
     base="$(grealpath ~/Downloads)";
  fi

  prefix=temp-dir;
  target=$base/$prefix;
  count=0;
  while [[ -d $target ]]
  do
    target="$base/$prefix-$count";
    count=$((count+1))
  done;
  mkdir -p $target;
  echo $target;
}


function my_alarm_clock () {
  count=1
  max=5
  while [ $count -le $max ]
  do
    echo "Wake Up Wayne..."
    say -r 210 "Wake Up Wayne!"
  	(( count++ ))
  done
}

function set_terminal_title () {
  PROMPT_COMMAND='echo -en "\033]0;New terminal title\a"'
}

function node_fix () {
  cd ~/;
  rm -rf /usr/local/lib/node_modules
  brew uninstall node
  brew install node --without-npm
  echo prefix=~/.npm-packages >> ~/.npmrc
  curl -L https://www.npmjs.com/install.sh | sudo sh
  #export NODE_PATH=/usr/local/lib/node_modules;
}


function update_locate_db () {
  sudo /usr/libexec/locate.updatedb
}


function wpackagist_plugin_lookup () {
  # https://wpackagist.org/search?q=advanced-cron-manager&type=plugin
  echo "todo";
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


function locate_missing_assets_nginx (){
  echo "";
}

function mysql_create_user (){
  username=wordpress
  mysql -uroot -e "CREATE USER IF NOT EXISTS '$username'@'localhost' IDENTIFIED BY '$username'";
  mysql -uroot -e "GRANT ALL PRIVILEGES ON * . * TO '$username'@'localhost'";
  mysql -uroot -e "FLUSH PRIVILEGES";
}


function project_init (){
  # DO YEOMAN HERE
  composer init;
  npm init;
  grunt init;
  yarn init;
}

# See: https://coolestguidesontheplanet.com/how-to-compress-and-uncompress-files-and-folders-in-os-x-lion-10-7-using-terminal/
function compress (){
  tar -zcvf archive_name.tar.gz $1
}

function cwd () {
  result=${PWD##*/};
  echo $result;
}

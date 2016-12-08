export PS1="\[\033[36m\]\u\[\033[m\]@\[\033[32m\]\h:\[\033[33;1m\]\w\[\033[m\]\$ ";
export CLICOLOR=1;
export LSCOLORS=ExFxBxDxCxegedabagacad;
export LC_ALL=$LANG;
alias lscw="ls -laGFH";
export PATH=~/.composer/vendor/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
export PATH="/usr/local/sbin:$PATH"


alias whats_my_ip="ifconfig | grep \"inet \" | grep -v 127.0.0.1 | awk '{print $2}'";

alias get_latest_from_dev="git fetch && git checkout dev && git pull origin dev && git submodule update --init --recursive";
alias get_latest_from_master="git fetch && git checkout master && git pull origin master && git submodule update --init --recursive";
alias get_latest_from_craig="git fetch && git checkout craig && git pull origin craig && git submodule update --init --recursive";
alias get_latest_from_thulani="git fetch && git checkout thulani && git pull origin thulani && git submodule update --init --recursive";

sync_web_root () {
  local_web_root=/usr/local/var/www/;
  backup_web_root=/Volumes/TimeMachine/www/
  rsync -av $local_web_root $backup_web_root;
}

update_apps () {
  apm update --confirm false;

  brew update;
  brew upgrade;
}

open_startup_apps () {
  open -a slack;
  open -a mail;
}

delete_dev_logs () {
  for i in `find /usr/local/var/www -name 'debug.log'` ; do rm $i ;  done
  for i in `find /usr/local/var/log -name '*.log'` ; do rm $i ; touch $i;  done
}

restart_dev_services (){
  sudo nginx -s reload;
  brew services restart --all
}

dev_cleanup () {
  brew services cleanup;
  delete_dev_logs;
  apm cleanup;
}

startup () {
  dev_cleanup;
  locate_missing_assets_nginx;
  restart_dev_services;
  sync_web_root;
  update_apps;
  open_startup_apps;
}

view_missing_assets_nginx () {
  SYS_LOGS_DIR=/usr/local/var/log;
  NGINX_LOG_DIR=$SYS_LOGS_DIR/nginx;
  NOT_FOUND_ASSETS_LOG_FILE=$NGINX_LOG_DIR/assets_not_found.log;
  cat $NOT_FOUND_ASSETS_LOG_FILE;
}

locate_missing_assets_nginx () {
  username=craigiwayne;
  SYS_LOGS_DIR=/usr/local/var/log;
  NGINX_LOG_DIR=$SYS_LOGS_DIR/nginx;
  NOT_FOUND_ASSETS_LOG_FILE=$NGINX_LOG_DIR/assets_not_found.log;
  number_of_missing_assets=$(wc -l < $NOT_FOUND_ASSETS_LOG_FILE);
  number_of_missing_assets=$(echo "$number_of_missing_assets" | xargs);

  if [ $number_of_missing_assets == 0 ]
  then
    echo "No missing assets logged...";
    return;
  fi;

  LIVE_PROTOCOL="http://";
  LOCAL_SUBDOMAIN="local";

  COUNT=0;
  while read line;
  do
    local_host=$(expr "$line" : '.*host: "\(.*\)",');
    asset_local_url=$(expr "$line" : '.*GET \(.*\) HTTP');
    asset_local_path=$(expr "$line" : '.*open() "\(.*\)" failed')
    asset_local_directory=$(dirname $asset_local_path);

    #TODO fix this reference here to a a variable reference
    #TODO when checking for http://maenkind.huisgenoot.com/ it puts a www in the front
    remote_host="www."$(expr "$local_host" : 'local.\(.*\)');
    remote_host_dev="dev."$(expr "$local_host" : 'local.\(.*\)');
    remote_host_subdomain=""$(expr "$local_host" : 'local.\(.*\)');
    asset_remote_url=$LIVE_PROTOCOL$remote_host$asset_local_url;
    asset_remote_url_subdomain=$LIVE_PROTOCOL$remote_host_subdomain$asset_local_url;
    asset_remote_url_dev_subdomain=$LIVE_PROTOCOL$remote_host_dev$asset_local_url;

    echo "LIVE_PROTOCOL:         "$LIVE_PROTOCOL;
    echo "LOCAL SUBDOMAIN:       "$LOCAL_SUBDOMAIN;
    echo "LOCAL HOST:            "$local_host;
    echo "ASSET LOCAL URL:       "$asset_local_url;
    echo "ASSET LOCAL DIRECTORY: "$asset_local_directory;
    echo "ASSET LOCAL PATH:      "$asset_local_path;
    echo "ASSET REMOTE URL:      "$asset_remote_url;
    echo "REMOTE HOST:           "$remote_host;

    if [ -f $asset_local_path ]
    then
      echo "$asset_local_url already exists";
    else
      response=$(curl -L --silent --connect-timeout 10 --head --write-out '%{http_code}\n' $asset_remote_url -o /dev/null);

      if [ $response != 200 ]
      then
        response=$(curl -L --silent --connect-timeout 10 --head --write-out '%{http_code}\n' $asset_remote_url_subdomain -o /dev/null);
        asset_remote_url=$asset_remote_url_subdomain;
      fi;

      if [ $response != 200 ]
      then
        response=$(curl -L --silent --connect-timeout 10 --head --write-out '%{http_code}\n' $asset_remote_url_dev_subdomain -o /dev/null);
        asset_remote_url=$asset_remote_url_dev_subdomain;
      fi;

      echo "Looking for:           "$asset_remote_url;
      echo "RESPONSE:              "$response;

      if [ $response == 200 ]
      then
        COUNT=$[$COUNT+1];
        mkdir -p $asset_local_directory;
        sudo chown -Rv $username $asset_local_directory; #TODO this breaks
        curl -L $asset_remote_url -o $asset_local_path;
        echo "Found $asset_local_path ($response)"...;
      else
        echo "Asset is missing... but couldn't be found...";
      fi;
    fi;
    echo "";
  done < $NOT_FOUND_ASSETS_LOG_FILE;
  echo "Found $COUNT/$number_of_missing_assets missing asset(s)...";

  rm $NOT_FOUND_ASSETS_LOG_FILE;
  sudo nginx -s reload;
}


remove_tracked_ignored_files () {
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
}


update_gitignore () {
  echo "";
  echo "Make sure your .gitignore is up to date...";

  echo "Git Ignore for WP Content Installation";
  echo "https://bitbucket.org/snippets/24dotcom/kkK8z/git-ignore-for-wp-content-installation"

  echo "Git Ignore for WP Full Installation"
  echo "https://bitbucket.org/snippets/24dotcom/A588y/git-ignore-for-wp-full-installation";

  echo "";
}


repo_maintenance () {
  # get all remote branches, check that master is the one thats most ahead
  # there should only be 3
  # check all _e() and __() for the twentyfourdotcom textdomain
  #

  # turn on wp debug

  # check all files that are being commited don't have TODO's or FIXME's
  wp plugin deactivate hello-dolly;
  wp plugin delete hello-dolly;

  remove_tracked_ignored_files;
  update_gitignore;
  wp_install_dev_tools;

  echo "Delete repositories remotely that are older than 6 months...";
  echo "Check that the repo has an icon...";

  echo "";
  echo "run wp";
  echo "remove any errors that appear...";
  echo "";

  echo "";
  echo "Remove any 'MobileDetect' occurences...";
  echo "Remove any 'mobileGrade' occurences...";
  echo "";

  # TODO remove branches older than 6 months
  # git branch -dr origin/feature/login
  # https://www.git-tower.com/learn/git/faq/delete-remote-branch
}


wp_install_dev_tools () {
  wp plugin install debug-bar --activate;
  wp plugin install wordpress-importer --activate;
}


wp_replace_urls () {

  sub_domains=( dev staging www local );
  desired_sub_domain=local;

  protocols=( http https );
  site_url=$(wp option get siteurl);
  site="";
  site_temp="$site_url";

  for sub_domain in "${sub_domains[@]}"
  do
    for protocol in "${protocols[@]}"
    do
      search="$protocol://$sub_domain";
      site=${site_temp##$search.};
      site_temp=$site;
    done
  done


  for sub_domain in "${sub_domains[@]}"
  do
    for protocol in "${protocols[@]}"
    do

      if [ $sub_domain != $desired_sub_domain ]
      then
        echo "";
        echo "Replacing $protocol://$sub_domain.$site -> http://$desired_sub_domain.$site";
        wp search-replace "$protocol://$sub_domain.$site" "http://$desired_sub_domain.$site";
      fi;

    done
  done

  # Replace instances in the db where no subdomain is specified
  for protocol in "${protocols[@]}"
  do
    echo "";
    echo "Replacing $protocol://$site -> http://$desired_sub_domain.$site";
    wp search-replace "$protocol://$sub_domain.$site" "http://$desired_sub_domain.$site";
  done
}


backup_database () {
  db_name="graadeen";

  user="wordpress";
  password="wordpress";
  date=$(date +"%d_%b_%Y");
  host="localhost";
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

remove_submodule () {
  submodule_name=tf-core;
  submodule_path=plugins/$submodule_name;
  git submodule deinit $submodule_path;
  git rm $submodule_path;

  git rm -r --cached $submodule_path;
  # overkill

  git submodule status;

  #overkill again (pedantic)
  rm -rf $submodule_path;
  git submodule init;
  git submodule status;
}

add_submodule () {

  git submodule add -b master $git_url $plugin_path;
}

wp_new_site () {
  wp core download;
  rm -rf wp-content/*;
  cd wp-content;
}

wp_import_dev_db () {
  db_name=media24_u
  local_db_name=media24;
  backup_path=~/Downloads;
  backup_db_name=$db_name.bak.sql;
  backup_file=$backup_path/$backup_db_name;
  host=

  mysqldump --user=$dev_mysql_username --password=$dev_mysql_password --host=$host $db_name --add-drop-database > $backup_file;

  mysql -uroot -e "DROP DATABASE $local_db_name";
  mysql -uroot -e "CREATE DATABASE $local_db_name";
  mysql -uroot -D$local_db_name < $backup_file;
}

# git config --global alias.update '!git pull && git submodule update --init --recursive'

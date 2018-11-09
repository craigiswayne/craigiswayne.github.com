# Independent
function wp_db_dump_dev (){
  command node ~/www/craigiswayne.github.com/dotfiles/wp/wp_db_dump_dev.js "$@";
}

function wp_install_dev_tools () {
  echo "Installing WP Dev Tools...";
  wp plugin install debug-bar --activate;
  wp plugin install wordpress-importer --activate;
  wp plugin install theme-check --activate;
  wp plugin install log-deprecated-notices --activate
  wp plugin install debug-bar-cron --activate
  wp plugin install p3-profiler --activate
  wp plugin install wpperformancetester --activate
  wp plugin install simply-show-hooks --activate
  wp plugin install post-duplicator --activate
  wp plugin install query-monitor --activate
  echo "";
  echo "";
}


# Independent
function wp_db_name () {
  db_name=$(wp config get --constant=DB_NAME --skip-plugins --skip-themes);
  echo $db_name;
}

function wp_remove_core_keep_contents {

  rm -rf wp-admin 
  rm -rf wp-includes 
  rm wp-*.php;
  rm xmlrpc.php;
  rm index.php;
  rm license.txt;
  rm readme.html;
  rm google*.html;
  rm test.php;
  rm .gitignore;
  touch .gitignore;
  rm legacy-feed.xml;
  echo "Replace the .gitignore file with the one from here: https://bitbucket.org/snippets/24dotcom/kkK8z";

  git add wp-admin 
  git add wp-includes 
  git add wp-*.php
  git add .gitignore;
  git add index.php;
  git add xmlrpc.php;
  git add license.txt;
  git add readme.html;
  git add google*.html;
  git add test.php;
  git add legacy-feed.xml;
  git commit -m "Removed WP Core files from the repo";

  mv wp-content/* .;
  rm -r wp-content;
  git add wp-content 
  git add themes/;
  git add plugins/;
  git add index.php;
  git add languages/;

  git commit -m "Moved contents of wp-content to repo root";

  echo "Don't forget to push!!!";

  remove_tracked_ignored_files;

}



function wp_uploads_to_dev (){
  site_name=$(wp_site_name);
  local_uploads_path=$(wp eval "echo trailingslashit(wp_upload_dir()['basedir']);");
  remote_wp_content_path=/var/www/$site_name/wp-content/;
  scp -r $local_uploads_path $DEV_WWW_USERNAME@$DEV_WWW_HOST:$remote_wp_content_path
}

function wp_uploads_from_dev () {
  site_name=$(wp_site_name);
  local_uploads_path=$(wp eval "echo trailingslashit(wp_upload_dir()['basedir']);");
  remote_wp_content_path=/var/www/$site_name/wp-content/;
  scp -r $DEV_WWW_USERNAME@$DEV_WWW_HOST:$remote_wp_content_path/uploads/ $local_uploads_path
}


function wp_db_export_to_dev (){

  echo  "This will REPLACE the database on DEV!!!";
  get_user_input "is that ok?" --default="yes";

  if [ -z $1 ]
  then
    db_name=$(wp_db_name);
  else
    db_name=$1;
  fi;

  db_name=$(get_user_input "Enter Local Database Name" --default=$db_name);
  dev_db_name=$(get_user_input "Enter Dev Database Name" --default=$db_name);

  site_name=$(get_user_input "Enter Site Name with no environment prefixes" --default=$(wp_site_name));

  export_file=$(wp eval "echo ABSPATH;" --skip-plugins --skip-themes --skip-packages;)export-$db_name.sql;
  echo "Export File is: $export_file";

  echo "Beginning search and replace for dev.$site_name";
  wp search-replace local.$site_name dev.$site_name --export=$export_file --verbose --skip-packages --skip-plugins --skip-themes;

  local_db_file_path=$export_file;
  echo "Search and replace finished...";
  echo "Local DB File is: $local_db_file_path";

  replace TYPE=MyISAM ENGINE=MyISAM -- $local_db_file_path;

  echo "Beginning exporting the local db file to dev...";
  mysql -u$DEV_MYSQL_USERNAME -p$DEV_MYSQL_PASSWORD -h$DEV_MYSQL_HOST -D$dev_db_name --default-character-set=utf8 < $local_db_file_path;

  # if you get the following error:
  # @see https://dev.mysql.com/doc/refman/5.7/en/charset-database.html
  # @see https://wordpress.stackexchange.com/questions/250260/unknown-collation-when-i-import-a-dump-from-an-existing-site-into-a-development
  #
  # Try the following:
  # USE db_name;
  # SELECT @@character_set_database, @@collation_database;
  # mysql -uroot -D$db_name -e "ALTER DATABASE $db_name CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci';;"

  #ERRORS:
  #mysql: [Warning] Using a password on the command line interface can be insecure.
  #ERROR 1064 (42000) at line 275: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'TYPE=MyISAM AUTO_INCREMENT=14' at line 7
  # run the following on the sql dump file
  # replace TYPE=MyISAM ENGINE=MyISAM -- /Users/craigiswayne/Downloads/rodale_db_2017_Jun_27.sql
  # replace local.mh.co.za dev.mh.co.za -- /Users/craigiswayne/Downloads/rodale_db_2017_Jun_27.sql
}


# https://apple.stackexchange.com/questions/57412/how-can-i-trigger-a-notification-center-notification-from-an-applescript-or-shel
# http://osxdaily.com/2016/09/06/trigger-alert-dialog-mac-via-command-line/
function wp_watch_debug_log(){
  clear;
  debug_log_path=$(wp eval "echo WP_CONTENT_DIR;" --skip-plugins --skip-themes)/debug.log;
  touch $debug_log_path;
  rm $debug_log_path;
  touch $debug_log_path;
  echo "Watching your debug.log ...";
  #105686695tail -f $debug_log_path;

  #fswatch -o ~/path/to/watch | xargs -n1 ~/script/to/run/when/files/change.sh
  fswatch -o $(wp eval "echo WP_CONTENT_DIR;" --skip-plugins --skip-themes) | xargs -n1 ~/www/craigiswayne.github.com/dotfiles/wp_watch_debug_log_callback.sh
  fswatch -o $debug_log_path | xargs -n1 ~/www/craigiswayne.github.com/dotfiles/wp_watch_debug_log_callback.sh

  #osascript -e 'display notification "Slide Out from Right Notification" with title "Hi!"'
  #osascript -e 'display alert "Hello world" with title "Hi!"'

  # Always on Top with Ok and Cancel Buttons
  #osascript -e 'display dialog "Im Always on Top!\n\nWith Cancel and Ok Buttons"'

  ## Side Notification
  #osascript -e 'display notification "All graphics have been converted." with title "My Graphic Processing Script" subtitle "Processing is complete." sound name "Frog"';
  #tail -f $debug_log_path | awk '/(.*)/ {system("osascript -e 'display dialog \"Error Found!\" ' ")}'

  #osascript -e 'display dialog "Im Always on Top!\n\nWith Cancel and Ok Buttons"'
}


function wp_db_import_dev () {
  command node ~/www/craigiswayne.github.com/dotfiles/wp/wp_db_import_dev.js "$@";
}

function wp_install () {
  db_name=$(git_repo_name);
  wp core config --dbname=$db_name
}

function wp_config (){
  command node ~/www/craigiswayne.github.com/dotfiles/wp/wp.js "config";
}

# #!/bin/bash
###############################################################################
# Work Environment Initialization
###############################################################################

if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

echo "Updating Atom...";
apm update;
apm upgrade;
apm clean;

#TODO fix this sheeyit
echo "Updating Homebrew...";
sudo -u $SUDO_USER brew cask update;
sudo -u $SUDO_USER brew update;
sudo -u $SUDO_USER brew upgrade;
sudo -u $SUDO_USER brew cleanup -s;

#brew doctor;

echo "Initializing Workspace Clean Ups...";
HORIZONTAL_LINE="----------------------------------------------------------";

NOW=$(date +"%Y_%m_%d");
NOW_SECONDS=$(date +%s);
WORKSPACE_BAK_DIR=/usr/local/var/www/backups;
SYS_LOGS_DIR=/usr/local/var/log;
NGINX_LOG_DIR=$SYS_LOGS_DIR/nginx;
SYS_LOG_FILES=$(find $SYS_LOGS_DIR -name '*.log' -type f);
PROJ_LOG_FILES=$(find /usr/local/var/www -name '*.log' -type f);
NGINX_LOG_FILES=$(find $NGINX_LOG_DIR -name '*.log' -type f);
BACKUPS_ARCHIVE_EXTENSION=bak.tar.gz;
NOT_FOUND_ASSETS_LOG_FILE=$NGINX_LOG_DIR/assets_not_found.log;
mkdir -p $WORKSPACE_BAK_DIR;
echo $HORIZONTAL_LINE;

echo "Stopping Web Server...";
sudo nginx -s stop;
echo $HORIZONTAL_LINE;

echo "Fetching 404 assets...";
PROTOCOL="http://";
LOCAL_SUBDOMAIN="local";
COUNT=0;
while read line;
do
  echo $HORIZONTAL_LINE;
  local_host=$(expr "$line" : '.*host: "\(.*\)",');
  asset_local_url=$(expr "$line" : '.*GET \(.*\) HTTP');
  asset_local_path=$(expr "$line" : '.*open() "\(.*\)" failed')
  asset_local_directory=$(dirname $asset_local_path);
  remote_host="www."$(expr "$local_host" : 'local.\(.*\)');
  asset_remote_url=$PROTOCOL$remote_host$asset_local_url;
  #echo "";
  #echo "LOCAL HOST:         "$local_host;
  #echo "ASSET LOCAL URL:    "$asset_local_url;
  #echo "ASSET LOCAL DIRECTORY: $asset_local_directory";
  #echo "ASSET LOCAL PATH:   "$asset_local_path;
  #echo "ASSET REMOTE URL:   "$asset_remote_url;
  response=$(curl -L --silent --head --write-out '%{http_code}\n' $asset_remote_url -o /dev/null);
  echo "Looking for: $asset_remote_url...";
  #echo "Curl Response: $response";
  if [[ $response == 200 && ! -f $asset_local_path ]]
  then
      COUNT=$[$COUNT+1];
      mkdir -p $asset_local_directory;
      curl -L $asset_remote_url -o $asset_local_path;
      echo "Found $asset_local_path ($response)"...;
  else
      echo "$asset_local_url already exists";
  fi;
done < $NOT_FOUND_ASSETS_LOG_FILE;
echo "Found $COUNT missing asset(s)...";
echo $HORIZONTAL_LINE;

echo "Archive NGINX, PHP-FPM, XDEBUG, Projects Folder Logs...";
tar -zcf $WORKSPACE_BAK_DIR/"$NOW"_logs.$BACKUPS_ARCHIVE_EXTENSION $SYS_LOGS_DIR $PROJ_LOG_FILES;
echo $HORIZONTAL_LINE;

echo "Emptying out the existing logs...";
for log in $SYS_LOG_FILES
do
  echo "Emptying $log";
  sudo echo "" > $log;
done;
echo $HORIZONTAL_LINE;

for log in $PROJ_LOG_FILES
do
  echo "Deleting $log";
  sudo rm -f $log;
done;
echo $HORIZONTAL_LINE;

echo "Deleting nginx logs....";
for log in $NGINX_LOG_FILES
do
  echo "Deleting $log";
  sudo rm -f $log;
done;
echo $HORIZONTAL_LINE;

BACKUP_ARCHIVES=$(find $WORKSPACE_BAK_DIR -name '*.'$BACKUPS_ARCHIVE_EXTENSION -type f);
DAYS_TO_KEEP_BACKUPS=7;
for file in $BACKUP_ARCHIVES
do
  FILE_DATE_SECONDS=$(stat -f "%m" $file);
  let "DATE_DIFF_SECONDS=$NOW_SECONDS - $FILE_DATE_SECONDS";
  let "DATE_DIFF_DAYS=$DATE_DIFF_SECONDS / 86400"; #86400 seconds = 1 day
  if (( $DATE_DIFF_DAYS > $DAYS_TO_KEEP_BACKUPS ))
  then
    echo "Deleting old archive: "$file;
    sudo rm -f $file;
  fi
done;
echo $HORIZONTAL_LINE;

echo "Starting Web Server...";
sudo nginx;
echo $HORIZONTAL_LINE;

echo "Opening Apps that you will need to be using...";
open -g -a Skype;
echo $HORIZONTAL_LINE;

echo "Finished :)...";
echo "Clear any pending TODO's";
echo $HORIZONTAL_LINE;

#TODO find a way to restore the magento code to its original repo state
#TODO mysqldump --user=root --host=localhost --protocol=tcp --port=3306 --default-character-set=utf8 --single-transaction=TRUE --routines --events "redsquare";
#TODO compress shit WITHOUT full structure
#TODO if errors occur add to you have new mail
#FIXME tar: Removing leading '/' from member names

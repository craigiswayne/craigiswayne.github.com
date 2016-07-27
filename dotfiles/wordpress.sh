PROJECT_NAME=wptest;

WORKING_DIRECTORY=~/Downloads/wordpress-setup;

SYS_HOSTS_FILE=/etc/hosts

WEB_ROOT=/usr/local/var/www;
PROJECT_ROOT=$WEB_ROOT/$PROJECT_NAME;

DB_NAME=$PROJECT_NAME;
DB_USER=root;
DB_PASSWORD=;

PROJECT_WEB_PROTOCOL=http;
PROJECT_WEB_SUBDOMAIN=local;
PROJECT_WEB_DOMAIN=$PROJECT_NAME;
PROJECT_WEB_TLD=com;
PROJECT_WEB_HOSTNAME=$PROJECT_WEB_SUBDOMAIN.$PROJECT_WEB_DOMAIN.$PROJECT_WEB_TLD;

AUTH_KEY=$(openssl rand -hex 32);
AUTH_KEY=$(openssl rand -hex 32);
SECURE_AUTH_KEY=$(openssl rand -hex 32);
LOGGED_IN_KEY=$(openssl rand -hex 32);
NONCE_KEY=$(openssl rand -hex 32);
AUTH_SALT=$(openssl rand -hex 32);
SECURE_AUTH_SALT=$(openssl rand -hex 32);
LOGGED_IN_SALT=$(openssl rand -hex 32);
NONCE_SALT=$(openssl rand -hex 32);

get_nginx_conf(){
  NGINX_CONF=$((nginx -V) 2>&1);

  if [[ $1 == "" ]]
  then
    exit;
  fi

  for conf in $NGINX_CONF
  do
    if [[ $conf == *"="* && $conf == *"$1"* ]]
    then
      CONF_VALUE=$(echo $conf| cut -d'=' -f2);
      echo $CONF_VALUE;
    fi;
  done;
}

NGINX_CONF_FOLDER=$(dirname $(get_nginx_conf conf-path));
NGINX_VHOSTS_DIR=$NGINX_CONF_FOLDER/servers;

echo "Initializing Setup...";
mkdir -p $WORKING_DIRECTORY;

echo "Removing Existing Wordpress Setup...";
rm -rf $PROJECT_ROOT;
mysql -u$DB_USER -e "CREATE DATABASE IF NOT EXISTS $DB_NAME";
mysql -u$DB_USER -e "DROP DATABASE $DB_NAME";

cd $WEB_ROOT;
echo "Fetching Latest Wordpress Engine...";
curl -OL http://wordpress.org/latest.tar.gz;

echo "Extracting Wordpress Archive...";
tar xzf $WEB_ROOT/latest.tar.gz;
rsync -abiuzqP wordpress/ $PROJECT_ROOT/;

echo "Modifying Wordpress Config File...";
scp $PROJECT_ROOT/wp-config-sample.php $PROJECT_ROOT/wp-config.php
sed -i.bak -e "s/database_name_here/${DB_NAME}/g" $PROJECT_ROOT/wp-config.php;
sed -i.bak -e "s/username_here/${DB_USER}/g" $PROJECT_ROOT/wp-config.php;
sed -i.bak -e "s/password_here/${DB_PASSWORD}/g" $PROJECT_ROOT/wp-config.php;
#TODO while there is the string "put your unique phrase here" replace it with a sed of openssl

mkdir -p $PROJECT_ROOT/wp-content/uploads;

echo "Creating Wordpress Database...";
mysql -u$DB_USER -e "CREATE DATABASE $DB_NAME";

echo "Creating MySQL User...";
mysql -u$DB_USER -e "GRANT ALL ON $DB_NAME.* TO '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD'";
mysql -u$DB_USER -e "FLUSH PRIVILEGES";

echo "Adding in Hosts Entry...";
sudo scp $SYS_HOSTS_FILE $SYS_HOSTS_FILE.bak;
scp $SYS_HOSTS_FILE $WORKING_DIRECTORY/hosts;
echo "" >> $WORKING_DIRECTORY/hosts;
echo "127.0.0.1 $PROJECT_WEB_HOSTNAME" >> $WORKING_DIRECTORY/hosts;
sudo scp $WORKING_DIRECTORY/hosts $SYS_HOSTS_FILE;
rm -f $WORKING_DIRECTORY/hosts;

echo "Creating vHost Entry...";
curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/nginx/wordpress.vhost -o $WORKING_DIRECTORY/$PROJECT_WEB_HOSTNAME.vhost;
VARIABLES_FOUND=$(sed -n -e "s/^.*{{\([a-zA-Z_]*\)}}.*$/\1/p" $WORKING_DIRECTORY/$PROJECT_WEB_HOSTNAME.vhost);
while [[ "$VARIABLES_FOUND" != "" ]]
do
  for VARIABLE in $VARIABLES_FOUND
  do
    VALUE=$(eval echo \$$VARIABLE);
    sed -i.bak -e "s|{{$VARIABLE}}|${VALUE}|g" $WORKING_DIRECTORY/$PROJECT_WEB_HOSTNAME.vhost;
  done;
 VARIABLES_FOUND=$(sed -n -e "s/^.*{{\([a-zA-Z_]*\)}}.*$/\1/p" $WORKING_DIRECTORY/$PROJECT_WEB_HOSTNAME.vhost);
done;
scp $WORKING_DIRECTORY/$PROJECT_WEB_HOSTNAME.vhost $NGINX_VHOSTS_DIR;

echo "Cleaning Up Setup Files...";
rm -f $WEB_ROOT/latest.tar.gz;
rm -f $PROJECT_ROOT/wp-config.php.bak;
rm -rf $WEB_ROOT/wordpress/
rm -rf $WORKING_DIRECTORY;

echo "Restarting services...";
sudo nginx -s reload;

open $PROJECT_WEB_PROTOCOL://$PROJECT_WEB_HOSTNAME/;
#TODO missing variables should be replaced with !{VARIABLE_NAME}!

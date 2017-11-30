
function mysql_database_sizes (){
  mysql -uroot -e 'SELECT table_schema "DB Name",
   Round(Sum(data_length + index_length) / 1024 / 1024, 1) "DB Size in MB"
FROM   information_schema.tables
GROUP  BY table_schema;';
}


function show_databases {
  mysql -u$LOCAL_MYSQL_USERNAME -e "SHOW DATABASES";
}

function show_databases_dev () {
  mysql -u$DEV_MYSQL_USERNAME -p$DEV_MYSQL_PASSWORD -h$DEV_MYSQL_HOST -e "SHOW DATABASES";
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


function mysql_show_users () {
  SELECT mysql.user.User FROM mysql.user;
}

function mysql_create_user (){
  username=wordpress
  mysql -uroot -e "CREATE USER IF NOT EXISTS '$username'@'localhost' IDENTIFIED BY '$username'";
  mysql -uroot -e "GRANT ALL PRIVILEGES ON * . * TO '$username'@'localhost'";
  mysql -uroot -e "FLUSH PRIVILEGES";
}

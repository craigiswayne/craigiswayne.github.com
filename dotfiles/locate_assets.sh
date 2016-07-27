SYS_LOGS_DIR=/usr/local/var/log;
NGINX_LOG_DIR=$SYS_LOGS_DIR/nginx;
NOT_FOUND_ASSETS_LOG_FILE=$NGINX_LOG_DIR/assets_not_found.log;

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

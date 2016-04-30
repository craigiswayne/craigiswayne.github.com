#==============================================================================
# DEVELOPMENT ENVIRONMENT THINGS
# phpstorm license server http://idea.qinxi1992.cn
#==============================================================================

echo "Setting up Development environment...";

echo "Installing Homebrew taps...";
my_taps=$(curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/homebrew.developer.list);
for tap in "$my_taps"
do
	brew install "$tap";
done

echo "NPM Installations...";
npm install -g node-sass;

echo "APM Installations...";
apm stars --install;

echo "Post Install Nginx...";
brew services start nginx;
ulimit -n 1024;
nginx_install_dir=$(dirname $(dirname $(realpath $(which nginx))));
#TODO variablize this
ln -s /usr/local/var/log/nginx/ "$nginx_install_dir/logs";
#TODO variablize this
curl -o /usr/local/etc/nginx/nginx.conf https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/nginx.conf;
sudo nginx -s reload;
open "http://localhost/";

echo "PHP Post Install...";
php_ini_loaded_file=$(php -r 'print php_ini_loaded_file();');
replace ";date.timezone =" "date.timezone = Africa/Johannesburg" -- $php_ini_loaded_file;
brew services start php56;
lsof -Pni4 | grep LISTEN | grep php;
echo "Ensure there are no php errors...";
php -v;

echo "Enabling Nginx for PHP...";
#TODO variablize this
touch /usr/local/var/www/index.php;
echo "<?php phpinfo(); ?>" >> index.php;
brew services restart nginx;
sudo nginx -s reload;
open "http://localhost/";

echo "MySQL Post Install...";
brew services restart mysql;

#TODO add nginx, www, and log folder to Development Group on Finder Sidebar
#TODO break up this script
#TODO enable phpmyadmin
#TODO fetch all my repos

#TODO install phpmyadmin
echo "Setting Terminal Theme…";
#TODO

# #this depends on which php version you're using
# brew install -v xdebug;
#TODO list this
#defaults write com.apple.dock persistent-apps -array-add '<dict><key>tile-data</key><dict><key>file-data</key><dict><key>_CFURLString</key><string>/Applications/Google Drive.app</string><key>_CFURLStringType</key><integer>0</integer></dict></dict></dict>'
#killall Dock

# Enabling XDebug
# or maybe try installing via homebrew?
# Go to your php ini file, e.g:
# /usr/local/etc/php/5.6/php.ini
# find a section called Dynamic Extensions
# add this to that section:
# zend_extension=/usr/lib/php/extensions/no-debug-non-zts-20121212/xdebug.so

# then at the bottom of the ini file add this:
# zend_extension=locationOfYourxDebugfile
# xdebug.remote_port=9000
# xdebug.remote_enable=On
# xdebug.remote_connect_back=On
# xdebug.remote_log=/var/log/xdebug.log
# restart your server

# associate web.whatsapp.com to your browser
# Changing the port of xdebug
# find the php.ini file where xdebug is initialized
# sudo grep -r 'xdebug.so' /

#TODO find a way to easily switch php versions
#http://serverfault.com/questions/671400/multiple-versions-of-php-through-nginx

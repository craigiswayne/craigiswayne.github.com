#==============================================================================
# DEVELOPMENT ENVIRONMENT THINGS
#==============================================================================

ln -sfv /usr/local/var/www ~/www;

#TODO clone all starred git repos onto my machine


echo "IMPORTANT!! Install xcode from the app store before continuing...";
sudo xcodebuild -license accept;

echo "Setting up Development environment...";

echo "Git customizations...";
git config --global user.name "Craig Wayne"
git config --global user.email "craigiswayne@gmail.com"
git config --global core.editor "atom -w"
# git config --global core.editor "nano"
git config --global color.ui true;
git config --global core.autocrlf input
git config --global core.safecrlf true
git config --global github.user craigiswayne;
git config --global fetch.prune true;
ln -sfv /usr/local/var/www/craigiswayne.github.com/dotfiles/.gitignore_global ~/;
ln -sfv ~/www/craigiswayne.github.com/dotfiles/.gitconfig ~/.gitconfig
ln -sfv /usr/local/var/www/craigiswayne.github.com/dotfiles/.jscsrc ~/www
ln -sfv /usr/local/var/www/craigiswayne.github.com/dotfiles/.eslintrc.json ~/www
ln -sfv /usr/local/var/www/craigiswayne.github.com/dotfiles/atom/config.cson ~/.atom/config.cson
ln -sfv /usr/local/var/www/craigiswayne.github.com/dotfiles/nginx/markdown.php ~/www/

echo "Setting up NPM Defaults...";
# http://iamsim.me/set-your-npm-init-defaults/
npm config set init.author.name $(git config --global --get user.name);
npm config set init.author.email $(git config --global --get user.email);
npm config set init.author.url http://craigiswayne.github.io
npm config set init.license MIT;
npm config set prefix /usr/local;
npm adduser;
npm install -g $(npm stars);

echo "Installing Atom add-ons...";
apm stars --install;

echo "Tweaking the NGINX configurations...";
NGINX_INSTALL_DIR=$(dirname $(dirname $(realpath $(which nginx))));
NGINX_HTML_ROOT=realpath $(readlink "$NGINX_INSTALL_DIR/html");
# NGINX_CONF_DIR=$(dirname $(sh -c "$(curl -fsSL https://gist.github.com/craigiswayne/c1fe7863165d7f54bb170db96d90231e/raw/nginx_conf.sh)" conf-path));
NGINX_CONF_DIR=/usr/local/etc

#TODO add a link to the /usr/loca/etc/nginx in the finder


echo "Symlinking NGINX configuration files...";
#TODO copy all nginx files from the dotfiles/nginx location to /usr/local/etc/nginx

mkdir -p ~/www/logs/;
ln -sfv /usr/local/var/log/nginx ~/www/logs/nginx
ln -sfv ~/www/craigiswayne.github.com/dotfiles/nginx/errors/ ~/www/errors
ln -sfv ~/www/craigiswayne.github.com/dotfiles/nginx/servers /usr/local/etc/nginx/servers

# TODO dynamically fetch this
#ln -sfv $(find /usr/local/Cellar/nginx -iname "homebrew.mxcl.nginx.plist") ~/Library/LaunchAgents/;
# TODO autostart nginx

sudo nginx;
open "http://localhost/";


echo "PHP Post Install...";
replace ";date.timezone =" "date.timezone = Africa/Johannesburg" -- $(php -r 'print php_ini_loaded_file();');
mkdir -p ~/www/logs/php;
ln -sfv /usr/local/var/log/php-fpm.log ~/www/logs/php;
replace ";error_log = syslog" "error_log = /usr/local/var/www/logs/php/error.log" -- $(php -r 'print php_ini_loaded_file();');
lsof -Pni4 | grep LISTEN | grep php;
echo "Ensure there are no php errors...";
php -v;

#ln -sfv /usr/local/opt/nginx/*.plist ~/Library/LaunchAgents/;
#sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.nginx.plist

echo "Enabling Nginx for PHP...";
touch ~/www/index.php;
echo "<?php phpinfo(); ?>" >> ~/www/index.php;
open "http://127.0.0.1/";

echo "MySQL Post Install...";


echo "Create WordPress User...";
# https://dev.mysql.com/doc/refman/5.6/en/sha256-pluggable-authentication.html
mysql -uroot -e "CREATE USER 'wordpress'@'%' IDENTIFIED BY PASSWORD 'wordpress';"
mysql -uroot -e "CREATE USER 'wordpress'@'%' IDENTIFIED WITH sha256_password;"
mysql -uroot -e "SET old_passwords = 2;";
mysql -uroot -e "SET PASSWORD FOR 'wordpress'@'%' = PASSWORD('wordpress');";
mysql -uroot -e "GRANT ALL PRIVILEGES ON *.* TO 'wordpress'@'%' WITH GRANT OPTION;";

echo "Customizing PHPStorm...";
# TODO link nginx server file
# activation license server = http://idea.pjoc.pub/

#TODO add nginx, www, and log folder to Development Group on Finder Sidebar
#TODO fetch all my repos
#TODO install this
# http://dl.google.com/closure-compiler/compiler-latest.zip

echo "Terminal Customization...";
ln -sfv /usr/local/var/www/craigiswayne.github.com/dotfiles/.bash_profile ~/.bash_profile
mkdir -p ~/.wp-cli/;
ln -sfv /usr/local/var/www/craigiswayne.github.com/dotfiles/config.yml ~/.wp-cli/config.yml

echo "Applying Terminal Theme...";
open $(curl -fsSL https://raw.githubusercontent.com/lysyi3m/osx-terminal-themes/master/schemes/Tomorrow%20Night.terminal);
defaults write com.apple.Terminal 'Default Window Settings' 'tomorrow-night';
defaults write com.apple.Terminal 'Startup Window Settings' 'tomorrow-night';

xdebug_config_file=$(php --ini | grep xdebug | cut -d ":" -f 2 | tr -d '[:space:]');
touch $xdebug_config_file;

echo "xdebug.force_display_errors=1" >> $xdebug_config_file;
echo "xdebug.remote_enable=true" >> $xdebug_config_file;
echo "xdebug.remote_port=9001" >> $xdebug_config_file;
echo "xdebug.profiler_enable=0" >> $xdebug_config_file;
echo "xdebug.scream=1" >> $xdebug_config_file;
echo "xdebug.cli_color=1" >> $xdebug_config_file;
brew services restart php56;

#echo "Custom Paths...";
#echo "export PATH=~/.composer/vendor/bin:$PATH" >> ~/.bash_profile;

#TODO list this
#http://krypted.com/mac-os-x/adding-objects-to-the-dock/
#PERSISTENT_DOCK_APPS=$(curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/persistent_dock_apps.list);
#for APP in "$PERSISTENT_DOCK_APPS"
#do
#		defaults write com.apple.dock persistent-apps -array-add '<dict><key>tile-data</key><dict><key>file-data</key><dict><key>_CFURLString</key><string>file://~/Applications/Google Drive.app</string><key>_CFURLStringType</key><integer>0</integer></dict></dict></dict>'
#done;

#ln -s /usr/local/var/www/ ~/www

#TODO find a way to easily switch php versions
#http://serverfault.com/questions/671400/multiple-versions-of-php-through-nginx

#git clone https://github.com/craigiswayne/cw-grunt-init-gruntfile.git ~/.grunt-init/cw-gruntfile


sudo cp /usr/local/opt/nginx/*.plist /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.nginx.plist

# install sqlformat for atom beautifier
sudo easy_install pip
sudo pip install --upgrade sqlparse

ssh-keygen
# then cat ~/.ssh/id_rsa.pub | pbcopy
# and add it to your github and bitbucket accounts

###
# Set up SSL
###
mkdir -p ~/ssl
cd ssl
openssl genrsa -des3 -out myssl.key 1024
openssl req -new -key myssl.key -out myssl.csr
cp myssl.key myssl.key.org
openssl rsa -in myssl.key.org -out myssl.key
openssl x509 -req -days 365 -in myssl.csr -signkey myssl.key -out myssl.crt
sudo cp myssl.crt /etc/ssl/certs/
sudo mkdir -p /etc/ssl/private
sudo cp myssl.key /etc/ssl/private/

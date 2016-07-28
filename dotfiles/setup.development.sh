#==============================================================================
# DEVELOPMENT ENVIRONMENT THINGS
# phpstorm license server http://idea.qinxi1992.cn
#==============================================================================

echo "Setting up Development environment...";

echo "Installing Node plugins...";
node_plugins=$(curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/npm.list);
for plugin in "$node_plugins"
do
	npm install $plugin -g
done;

echo "Installing Atom add-ons...";
apm stars --install;

echo "Post Install Nginx...";
# Link configured servers
# FIX ME, variablize this
ln -s /usr/local/var/www/craigiswayne.github.com/dotfiles/nginx/servers/ /usr/local/etc/nginx/
ln -s /usr/local/var/www/craigiswayne.github.com/dotfiles/nginx/global/ /usr/local/etc/nginx/
sudo nginx;
#TODO change nginx port
#TODO maybe replace the whole nginx conf with my one
ulimit -n 1024;
NGINX_INSTALL_DIR=$(dirname $(dirname $(realpath $(which nginx))));
#TODO variablize this
ln -s /usr/local/var/log/nginx/ "$NGINX_INSTALL_DIR/logs";
#TODO variablize this
#TODO fetch the craigiswayne.github.com repo then symlink the nginx default_locations.conf to the nginx folder
curl -o /usr/local/etc/nginx/nginx.conf https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/nginx.conf;
sudo nginx -s reload;
open "http://localhost/";


echo "PHP Post Install...";
ln -sfv /usr/local/opt/php56/homebrew.mxcl.php56.plist ~/Library/LaunchAgents/;
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.php56.plist;
PHP_INI_LOADED_FILE=$(php -r 'print php_ini_loaded_file();');
replace ";date.timezone =" "date.timezone = Africa/Johannesburg" -- $PHP_INI_LOADED_FILE;
brew services start php56;
lsof -Pni4 | grep LISTEN | grep php;
echo "Ensure there are no php errors...";
php -v;

echo "Nginx Post Install...";
NGINX_CONF_FOLDER="/usr/local/etc/nginx";
NGINX_CONF=$NGINX_CONF_FOLDER"/nginx.conf";
echo -e "user $(whoami) staff;\n" "$(cat $NGINX_CONF)" > $NGINX_CONF;
#scp $(find /usr/local/Cellar/nginx -iname "homebrew.mxcl.nginx.plist") ~/Library/LaunchAgents/;

ln -sfv /usr/local/opt/nginx/*.plist ~/Library/LaunchAgents/;
sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.nginx.plist

echo "Enabling Nginx for PHP...";
#TODO variablize this
touch /usr/local/var/www/index.php;
echo "<?php phpinfo(); ?>" >> index.php;
brew services restart nginx;
sudo nginx -s reload;
open "http://127.0.0.1/";
echo "fastcgi_param MAGE_IS_DEVELOPER_MODE TRUE;" >> $NGINX_CONF_FOLDER"/fastcgi_params";

echo "MySQL Post Install...";
brew services restart mysql;

echo "Customizing PHPStorm...";
# TODO link nginx server file
# activation license server = http://idea.pjoc.pub/
#TODO proper link for phpstorm editor.xml
PHPSTORM_PREFERENCES_FOLDER=$(find ~/Library/Preferences -type d -iname "phpstorm*");
scp craigiswayne.github.com/dotfiles/phpstorm/editor.xml $PHPSTORM_PREFERENCES_FOLDER/options;
scp craigiswayne.github.com/dotfiles/phpstorm/options.xml $PHPSTORM_PREFERENCES_FOLDER/options;
scp craigiswayne.github.com/dotfiles/phpstorm/ui.lnf.xml $PHPSTORM_PREFERENCES_FOLDER/options;

#TODO dynamically setup the markdown parser module
#https://github.com/magnetikonline/ghmarkdownrender

#TODO add nginx, www, and log folder to Development Group on Finder Sidebar
#TODO break up this script
#TODO enable phpmyadmin
#TODO fetch all my repos

#TODO install phpmyadmin


echo "Terminal Customization...";
echo "Modifying Bash Profile...";
BASH_PROFILE_FILE=~/.bash_profile;
touch $BASH_PROFILE_FILE;
echo 'export PS1="\[\033[36m\]\u\[\033[m\]@\[\033[32m\]\h:\[\033[33;1m\]\w\[\033[m\]\$ ";' >> $BASH_PROFILE_FILE;
echo 'export CLICOLOR=1;' >> $BASH_PROFILE_FILE;
echo 'export LSCOLORS=ExFxBxDxCxegedabagacad;' >> $BASH_PROFILE_FILE;
echo 'export LC_ALL=$LANG;' >> $BASH_PROFILE_FILE;
echo 'alias lscw="ls -laGFh";' >> $BASH_PROFILE_FILE;

echo "Applying Terminal Theme...";
#FIXME MUST BE A BETTER WAY TO DO THIS
curl https://raw.githubusercontent.com/lysyi3m/osx-terminal-themes/master/schemes/Tomorrow%20Night.terminal -o tomorrow-night.terminal
rm tomorrow-night.terminal;
open tomorrow-night.terminal;
sleep 1;
defaults write com.apple.Terminal 'Default Window Settings' 'tomorrow-night';
defaults write com.apple.Terminal 'Startup Window Settings' 'tomorrow-night';
killall Terminal;

#TODO autoinclude the custom php file to disable caches
#TODO maybe set the timeout on php for debugging purposes (php.ini max_execution_time = x) (request_terminate_timeout = x)
#TODO x = 300? 5mins

#TODO phpstorm setting show line numbers by default
#TODO automatically update the xdebug settings keep in mind there maybe be multiple versions of xdebug
#xdebug.force_display_errors=1
#xdebug.remote_enable=true
#xdebug.remote_port=9001
#xdebug.profiler_enable=1

echo "Custom Paths...";
echo "export PATH=~/.composer/vendor/bin:$PATH" >> ~/.bash_profile;

#TODO list this
http://krypted.com/mac-os-x/adding-objects-to-the-dock/
PERSISTENT_DOCK_APPS=$(curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/persistent_dock_apps.list);
for APP in "$PERSISTENT_DOCK_APPS"
do
		defaults write com.apple.dock persistent-apps -array-add '<dict><key>tile-data</key><dict><key>file-data</key><dict><key>_CFURLString</key><string>file://~/Applications/Google Drive.app</string><key>_CFURLStringType</key><integer>0</integer></dict></dict></dict>'
done;
#killall Dock

#TODO find a way to easily switch php versions
#http://serverfault.com/questions/671400/multiple-versions-of-php-through-nginx

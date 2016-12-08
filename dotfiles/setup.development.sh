#==============================================================================
# DEVELOPMENT ENVIRONMENT THINGS
# phpstorm license server http://idea.qinxi1992.cn
#==============================================================================

#TODO clone all starred git repos onto my machine

echo "Setting up Development environment...";

echo "Git customizations...";
#TODO add the .DS_Store to the global ignore config
git config --global core.editor "atom -w"
git config --global color.ui true;
git config --global core.autocrlf input
git config --global core.safecrlf true

echo "Installing Node plugins...";
node_plugins=$(curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/npm.list);
for plugin in "$node_plugins"
do
	npm install -g $plugin
done

echo "Installing Atom add-ons...";
apm stars --install;

echo "Tweaking the NGINX configurations...";
NGINX_INSTALL_DIR=$(dirname $(dirname $(realpath $(which nginx))));
NGINX_HTML_ROOT=$(realpath "$NGINX_INSTALL_DIR/html");
NGINX_CONF_DIR=$(dirname $(sh -c "$(curl -fsSL https://gist.github.com/craigiswayne/c1fe7863165d7f54bb170db96d90231e/raw/nginx_conf.sh)" conf-path));

#TODO clone all existing gists onto my pc


echo "Installing my Personal GitHub Repo...";
mkdir -p $NGINX_HTML_ROOT/craigiswayne.github.com;
cd $NGINX_HTML_ROOT/craigiswayne.github.com;
git init;
git pull origin master;

echo "Symlinking NGINX configuration files...";
CUSTOM_NGINX_CONFIGS=$(find $NGINX_HTML_ROOT/craigiswayne.github.com/dotfiles/nginx -d 1);
for custom_config in "$CUSTOM_NGINX_CONFIGS"
do
	ln -sfv $custom_config $NGINX_CONF_DIR;
done;
# ln -sfv $NGINX_HTML_ROOT/craigiswayne.github.com/dotfiles/nginx/servers/ $NGINX_CONF_DIR
# ln -sfv $NGINX_HTML_ROOT/craigiswayne.github.com/dotfiles/nginx/global/ $NGINX_CONF_DIR
# ln -sfv $NGINX_HTML_ROOT/craigiswayne.github.com/dotfiles/nginx/markdown.php $NGINX_CONF_DIR
# ln -sfv $NGINX_HTML_ROOT/craigiswayne.github.com/dotfiles/nginx/nginx.conf $NGINX_CONF_DIR
# ln -sfv $NGINX_HTML_ROOT/craigiswayne.github.com/dotfiles/nginx/mime.types.conf $NGINX_CONF_DIR
# ln -sfv $NGINX_HTML_ROOT/craigiswayne.github.com/dotfiles/nginx/errors/ $NGINX_HTML_ROOT
ln -sfv /usr/local/var/log/nginx $NGINX_HTML_ROOT/logs

# TODO dynamically fetch this
ln -sfv $(find /usr/local/Cellar/nginx -iname "homebrew.mxcl.nginx.plist") ~/Library/LaunchAgents/;
# TODO autostart nginx

sudo nginx;
#ulimit -n 1024;
open "http://localhost/";


echo "PHP Post Install...";
PHP_INI_LOADED_FILE=$(php -r 'print php_ini_loaded_file();');
ln -sfv /usr/local/opt/php56/homebrew.mxcl.php56.plist ~/Library/LaunchAgents/;
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.php56.plist;
replace ";date.timezone =" "date.timezone = Africa/Johannesburg" -- $PHP_INI_LOADED_FILE;
mkdir -p /usr/local/var/log/php;
touch /usr/local/var/log/php/error.log;
#TODO fix this;
chmod 777 /usr/local/var/log/php/error.log;
replace ";error_log = syslog" "error_log = /usr/local/var/log/php/error.log" -- $PHP_INI_LOADED_FILE;
brew services start php56;
lsof -Pni4 | grep LISTEN | grep php;
echo "Ensure there are no php errors...";
php -v;

ln -sfv /usr/local/opt/nginx/*.plist ~/Library/LaunchAgents/;
sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.nginx.plist

echo "Enabling Nginx for PHP...";
touch $NGINX_HTML_ROOT/index.php;
echo "<?php phpinfo(); ?>" >> index.php;
brew services restart nginx;
sudo nginx -s reload;
open "http://127.0.0.1/";

echo "MySQL Post Install...";
brew services restart mysql;

echo "Customizing PHPStorm...";
# TODO link nginx server file
# activation license server = http://idea.pjoc.pub/

#TODO add nginx, www, and log folder to Development Group on Finder Sidebar
#TODO fetch all my repos
#TODO install this
# http://dl.google.com/closure-compiler/compiler-latest.zip

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
open tomorrow-night.terminal;
rm tomorrow-night.terminal;
sleep 1;
defaults write com.apple.Terminal 'Default Window Settings' 'tomorrow-night';
defaults write com.apple.Terminal 'Startup Window Settings' 'tomorrow-night';

#TODO phpstorm setting show line numbers by default
#TODO automatically update the xdebug settings keep in mind there maybe be multiple versions of xdebug
#TODO xdebug configs
#xdebug.force_display_errors=1
#xdebug.remote_enable=true
#xdebug.remote_port=9001
#xdebug.profiler_enable=1
#php --ini | grep xdebug | head -n 1

echo "Custom Paths...";
echo "export PATH=~/.composer/vendor/bin:$PATH" >> ~/.bash_profile;

#TODO list this
#http://krypted.com/mac-os-x/adding-objects-to-the-dock/
PERSISTENT_DOCK_APPS=$(curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/persistent_dock_apps.list);
for APP in "$PERSISTENT_DOCK_APPS"
do
		defaults write com.apple.dock persistent-apps -array-add '<dict><key>tile-data</key><dict><key>file-data</key><dict><key>_CFURLString</key><string>file://~/Applications/Google Drive.app</string><key>_CFURLStringType</key><integer>0</integer></dict></dict></dict>'
done;

#TODO find a way to easily switch php versions
#http://serverfault.com/questions/671400/multiple-versions-of-php-through-nginx

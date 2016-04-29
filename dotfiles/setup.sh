#TODO test that php works WITHOUT a vhost entry
echo "Installing XCode Command Line tools...";
sudo xcrun cc;
xcode-select --install;

#==============================================================================
# HOMEBREW
#==============================================================================
echo "Installing Homebrew..."
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
brew doctor;
brew update;
brew upgrade;

brew install node;
npm install -g node-sass;
brew cask install atom;
apm stars --install;

echo "Installing Homebrew Cask...";
brew install brew-cask;
echo "Installing Cask Applications..."
brew cask install android-file-transfer appcleaner firefox genymotion github-desktop google-chrome googleappengine google-drive google-photos-backup filezilla linein paintbrush remote-play skype sony-ericsson-bridge sourcetree teamviewer universal-media-server virtualbox vlc phpstorm;
#details for phpstorm
#license server http://idea.qinxi1992.cn

brew doctor;
echo "Cleaning up Homebrew...";
brew cleanup;

#==============================================================================
# OS TWEAKS
#==============================================================================
echo "Various OS Tweaks";
echo "Setting Automatic Updates...";
sudo softwareupdate --schedule on;

echo "Updating Mac System Software...";
softwareupdate -iva;

echo "Daily Software Updates";
defaults write com.apple.SoftwareUpdate ScheduleFrequency -int 1;

echo "Enabling Bluetooth Status in Menu Bar...";
open '/System/Library/CoreServices/Menu Extras/Bluetooth.menu';

echo "Enabling Volume Control in Menu Bar...";
open '/System/Library/CoreServices/Menu Extras/Volume.menu';

echo "Showing only active items in Dock...";
defaults write com.apple.dock static-only -bool TRUE;
killall Dock;

echo "Set default Finder location to home folder (~/)";
defaults write com.apple.Finder NewWindowTarget -string "PfLo";
defaults write com.apple.finder NewWindowTargetPath -string "file://${HOME}";

echo "Show Path bar in Finder";
defaults write com.apple.finder ShowPathbar -bool true;

echo "Show Status bar in Finder";
defaults write com.apple.finder ShowStatusBar -bool true;

echo "Show icons for hard drives, servers, and removable media on the desktop";
defaults write com.apple.finder ShowExternalHardDrivesOnDesktop -bool true;
defaults write com.apple.finder ShowHardDrivesOnDesktop -bool true;
defaults write com.apple.finder ShowMountedServersOnDesktop -bool true;
defaults write com.apple.finder ShowRemovableMediaOnDesktop -bool true;

echo "Enabling the `locate` function in terminal…";
sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.locate.plist;
sudo /usr/libexec/locate.updatedb;

echo "Plain text mode for TextEdit…";
defaults write com.apple.TextEdit RichText -int 0;

echo "Enable the Develop menu and the Web Inspector in Safari";
defaults write com.apple.Safari IncludeInternalDebugMenu -bool true;
defaults write com.apple.Safari IncludeDevelopMenu -bool true;
defaults write com.apple.Safari WebKitDeveloperExtrasEnabledPreferenceKey -bool true;
defaults write com.apple.Safari com.apple.Safari.ContentPageGroupIdentifier.WebKit2DeveloperExtrasEnabled -bool true;
defaults write NSGlobalDomain WebKitDeveloperExtras -bool true;


#==============================================================================
# DEVELOPMENT ENVIRONMENT THINGS
#==============================================================================
echo "Setting up Development environment...";
brew install coreutils;

echo "Installing nginx...";
brew install nginx;
brew services start nginx;
ulimit -n 1024;

#TODO fix this
#TODO use dotfiles folder as base for modifications
#nginx_cellar_dir=$($(dirname $(dirname $(realpath $(which nginx))))/logs);
#ln -s /usr/local/var/log/nginx $nginx_cellar_dir;
ln -s /usr/local/var/log/nginx/ /usr/local/Cellar/nginx/1.10.0/logs

atom /usr/local/etc/nginx/;
#modify
#user yourusername staff
#listen 80;

sudo nginx -s reload;
# you can browse to localhost or 127.0.0.1 and it should work
#TODO get the html root from nginx configs

echo "Installing PHP";
brew tap homebrew/php;
brew install php56 --with-fpm --without-apache --with-debug;
brew services start php56;
lsof -Pni4 | grep LISTEN | grep php;

echo "Enabling Nginx for PHP...";
#index index.php
atom /usr/local/etc/nginx/nginx.conf;
brew services restart nginx;

echo "Installing MySQL...";
brew install mysql;
brew services restart mysql;

#TODO enable phpmyadmin

#https://craigiswayne@bitbucket.org/craigiswayne/nexus_forms.git


#TODO install phpmyadmin
echo "Setting Terminal Theme…";
#TODO

echo "Inverting Mouse Scroll…";
#TODO

echo "Removing ‘All My Files’ from Finder sidebar...";
#TODO

echo "Adding your home folder to the Finder sidebar…";
#TODO

echo "Adding your pictures folder to the Finder sidebar…";
#TODO


#brew install nginx-full --with-geoip --with-upload-progress-module
#brew cask install nginx;
#autostart nginx
#http://derickbailey.com/2014/12/27/how-to-start-nginx-on-port-80-at-mac-osx-boot-up-log-in/
#if that doesnt work #https://gist.github.com/mralexho/6cd3cf8b2ebbd4f33165
#sudo cp /usr/local/opt/nginx/*.plist /Library/LaunchDaemons;
#sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.nginx.plist;
#nginx uses this as the web path /usr/local/var

#Installing PHP 5.6
#https://blog.frd.mn/install-nginx-php-fpm-mysql-and-phpmyadmin-on-os-x-mavericks-using-homebrew/
#brew tap homebrew/dupes;
#brew tap homebrew/versions;
#brew tap homebrew/homebrew-php;
#brew install --without-apache --with-fpm --with-debug --with-cgi --with-mysql php56;
#brew install php56-memcache php56-memcached php56-mcrypt php56-xdebug php56-imagick;
#echo 'export PATH="/usr/local/sbin:$PATH"' >> ~/.bash_profile && . ~/.bash_profile
#source ~/.bash_profile;
# mkdir -p ~/Library/LaunchAgents;
# ln -sfv /usr/local/opt/php56/homebrew.mxcl.php56.plist ~/Library/LaunchAgents/;
# launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.php56.plist;
# #TODO set this via terminal
# date.timezone = Africa/Johannesburg
#Test php-fpm is running
#lsof -Pni4 | grep LISTEN | grep php

# #ref: http://blog.joefallon.net/2013/10/install-mysql-on-mac-osx-using-homebrew/
# brew install mysql;
# mysql.server restart

#TODO get list of previously installed applications and then loop through them and install... look in bookmarks
#TODO and maybe sort this list alphabetically?!


# https://gist.github.com/jimothyGator/5436538
echo "Fetching Nexus forms repo…";
#TODO dynamically get the web root and use it in the line below
mkdir -p /usr/local/var/www/nexus_forms;
git init;
git remote add origin https://craigiswayne@bitbucket.org/craigiswayne/nexus_forms.git;
git pull origin master;
git submodule update --init --recursive;


#Actually don’t need this just yet
#echo "Adding in host entry…";
#sudo echo "127.0.0.1 forms.nexus.org" >> /etc/hosts

#http://learnaholic.me/2012/10/10/installing-nginx-in-mac-os-x-mountain-lion/
#TODO do the nginx configs stuff here

#get the nexus repo


#echo "Get All Git Projects...";
#todo
#see reference at the top

#set the following applications to show on the Dock
#Finder
#Google Chrome
#Atom
#SourceTree
#Google Apps Engine

# #get git sheeyit
# mkdir -p /usr/local/var/www/nexus_forms/;
# cd /usr/local/var/www/nexus_forms/;
# git init;
# git remote add origin https://craigiswayne@bitbucket.org/craigiswayne/nexus_forms.git;
# git pull origin master -v;
# git submodule update --init --recursive;


# #! /usr/bin/env
# HOMEBREW_APPLICATIONS_DIR='/Applications';
# ICLOUD_FOLDER='~/Library/Mobile\ Documents/com~apple~CloudDocs';
# echo "Linking applications backed up to the iCloud";
# #ln -sf ~/Library/Mobile\ Documents/com~apple~CloudDocs/Applications/*.app /Applications/
#
# # # disable line wrapping
# # tput rmam;
# # # enable line wrapping
# # #tput smam;
#
# #REF:https://echo.co/blog/os-x-109-local-development-environment-apache-php-and-mysql-homebrew
# #Ensure brew install php is used before any other php
# # echo "export PATH=\$(echo \$PATH | sed 's|/usr/local/bin||; s|/usr/local/sbin||; s|::|:|; s|^:||; s|\(.*\)|/usr/local/bin:/usr/local/sbin:\1|')" >> ~/.bash_profile && source ~/.bash_profile
# #
# # #MySQL stuffs;
# # brew install -v mysql
# # cp -v $(brew --prefix mysql)/support-files/my-default.cnf $(brew --prefix mysql)/my.cnf
# # cat >> $(brew --prefix mysql)/my.cnf <<'EOF'
# # # Echo & Co. changes
# # max_allowed_packet = 2G
# # innodb_file_per_table = 1
# # EOF
# # sed -i '' 's/^# \(innodb_buffer_pool_size\)/\1/' $(brew --prefix mysql)/my.cnf
# # [ ! -d ~/Library/LaunchAgents ] && mkdir -v ~/Library/LaunchAgents
# # [ -f $(brew --prefix mysql)/homebrew.mxcl.mysql.plist ] && ln -sfv $(brew --prefix mysql)/homebrew.mxcl.mysql.plist ~/Library/LaunchAgents/
# # [ -e ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist ] && launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
# # $(brew --prefix mysql)/bin/mysql_secure_installation
#
# #this depends on which php version you're using
# brew install -v xdebug;
#
#
# #brew cask install --appdir=$HOMEBREW_APPLICATIONS_DIR google-music-manager;
# #brew cask install --appdir=$HOMEBREW_APPLICATIONS_DIR all2mp3
#
# brew cleanup --force;
#
# #defaults write com.apple.dock persistent-apps -array-add '<dict><key>tile-data</key><dict><key>file-data</key><dict><key>_CFURLString</key><string>/Applications/Google Drive.app</string><key>_CFURLStringType</key><integer>0</integer></dict></dict></dict>'
# #killall Dock
#
# # probably wanna install everything on a user level... to be safe
# # so for the sites folder you'd wanna do this:
# # ~/sites/
# # Enabling XDebug
# # when adding more sites have a look at dynamically just adding in jizz using regex to match urls
#
#
# # Go to your php ini file, e.g:
# # /usr/local/etc/php/5.6/php.ini
# # find a section called Dynamic Extensions
# # add this to that section:
# # zend_extension=/usr/lib/php/extensions/no-debug-non-zts-20121212/xdebug.so
#
# # then at the bottom of the ini file add this:
# # zend_extension=locationOfYourxDebugfile
# # xdebug.remote_port=9000
# # xdebug.remote_enable=On
# # xdebug.remote_connect_back=On
# # xdebug.remote_log=/var/log/xdebug.log
# # restart your server
#
# # associaye web.whatsapp.com to your browser
#
#
# # Changing the port of xdebug
# # find the php.ini file where xdebug is initialized
# # sudo grep -r 'xdebug.so' /
#
# #http://serverfault.com/questions/671400/multiple-versions-of-php-through-nginx
# #https://gist.github.com/t-io/8255711
#
# #backup applications list
# # find /Applications/ -iname *.app > ~/Library/Mobile\ Documents/com~apple~CloudDocs/Documents/applications.bak -maxdepth 1

#TODO setup Time Machine from terminal?
#TODO set 24hour clock in menu bar
#TODO recent documents in dock

#==============================================================================
# REFERENCES
#==============================================================================
#http://www.thexlab.com/faqs/maintscripts.html < MAINTENANCE SCRIPTS
#https://haroldsoh.com/2011/10/07/clone-all-repos-from-a-bitbucket-source/ < GIT REPOS
#https://gist.github.com/saetia/1623487 < SYSTEM TWEAKS
#https://jamfnation.jamfsoftware.com/discussion.html?id=10576 < SYSTEM TWEAKS
#http://www.makeuseof.com/tag/customise-mac-os-x-dock-hidden-terminal-commands/ < DOCK CUSTOMIZATION
echo "A special thanks to all those who have helped compile this script...";
read -p "Press any key to reboot...";
sudo reboot now;
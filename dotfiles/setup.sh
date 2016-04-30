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
#nginx_cellar_dir=$($(dirname $(dirname $(realpath $(which nginx))))/logs);
ln -s /usr/local/var/log/nginx/ /usr/local/Cellar/nginx/1.10.0/logs
curl -o /usr/local/etc/nginx/nginx.conf https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/nginx.conf;
sudo nginx -s reload;
open "http://localhost/";

echo "Installing PHP";
brew tap homebrew/php;
brew install php56 --with-fpm --without-apache --with-debug;
brew services start php56;
lsof -Pni4 | grep LISTEN | grep php;

echo "Enabling Nginx for PHP...";
touch /usr/local/var/www/index.php;
echo "<?php phpinfo(); ?>" >> index.php;
brew services restart nginx;
sudo nginx -s reload;
open "http://localhost/";

echo "Installing MySQL...";
brew install mysql;
brew services restart mysql;

#TODO enable phpmyadmin
#TODO fetch all my repos

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



#TODO set this via terminal
#date.timezone = Africa/Johannesburg

# https://gist.github.com/jimothyGator/5436538

# #this depends on which php version you're using
# brew install -v xdebug;
#defaults write com.apple.dock persistent-apps -array-add '<dict><key>tile-data</key><dict><key>file-data</key><dict><key>_CFURLString</key><string>/Applications/Google Drive.app</string><key>_CFURLStringType</key><integer>0</integer></dict></dict></dict>'
#killall Dock

# Enabling XDebug
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

# # associaye web.whatsapp.com to your browser
# # Changing the port of xdebug
# # find the php.ini file where xdebug is initialized
# # sudo grep -r 'xdebug.so' /
#
# #http://serverfault.com/questions/671400/multiple-versions-of-php-through-nginx
# #https://gist.github.com/t-io/8255711
# #backup applications list

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

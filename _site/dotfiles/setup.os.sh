#==============================================================================
# OS TWEAKS
#==============================================================================
echo "Customizing OS to your liking...";

echo "Disabling the guest account...";
#TODO disable the guest account

echo "Setting Automatic Updates...";
sudo softwareupdate --schedule on;

echo "Updating Mac System Software...";
softwareupdate -ia --verbose;

echo "Daily Software Updates";
defaults write com.apple.SoftwareUpdate ScheduleFrequency -int 1;

echo "Enabling Bluetooth Status in Menu Bar...";
open '/System/Library/CoreServices/Menu Extras/Bluetooth.menu';

echo "Enabling Volume Control in Menu Bar...";
open '/System/Library/CoreServices/Menu Extras/Volume.menu';

echo "Showing only active items in Dock...";
defaults write com.apple.dock static-only -bool TRUE;
killall Dock;

#==============================================================================
# Finder Settings
#==============================================================================
echo "Modifying Finder settings...";

echo "Set default Finder location to home folder (~/)";
defaults write com.apple.Finder NewWindowTarget -string "PfLo";
defaults write com.apple.finder NewWindowTargetPath -string "file://${HOME}";

echo "Show Path bar in Finder";
defaults write com.apple.finder ShowPathbar -bool true;

echo "Show Status bar in Finder";
defaults write com.apple.finder ShowStatusBar -bool true;

echo "Show icons for hard drives, servers, and removable media on the desktop";
defaults write com.apple.finder ShowExternalHardDrivesOnDesktop -bool true;
defaults write com.apple.finder ShowHardDrivesOnDesktop -bool false;
defaults write com.apple.finder ShowMountedServersOnDesktop -bool true;
defaults write com.apple.finder ShowRemovableMediaOnDesktop -bool true;

echo "Setting Finder default view as List View...";
find ~/ -name ".DS_Store" -o -type f -name ".DS_Store" -delete;
sudo find /usr -name ".DS_Store" -o -type f -name ".DS_Store" -delete;
defaults write com.apple.Finder FXPreferredViewStyle Nlsv;
killall Finder;

echo "Setting Clock to 24 Hour Format...";
defaults write com.apple.menuextra.clock DateFormat -string 'EEE MMM d  HH:mm';

echo "Enabling the `locate` function in terminal…";
sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.locate.plist;
# sudo /usr/libexec/locate.updatedb; -- permission denied

echo "Plain text mode for TextEdit…";
defaults write com.apple.TextEdit RichText -int 0;

echo "Enable the Develop menu and the Web Inspector in Safari";
defaults write com.apple.Safari IncludeInternalDebugMenu -bool true;
defaults write com.apple.Safari IncludeDevelopMenu -bool true;
defaults write com.apple.Safari WebKitDeveloperExtrasEnabledPreferenceKey -bool true;
defaults write com.apple.Safari com.apple.Safari.ContentPageGroupIdentifier.WebKit2DeveloperExtrasEnabled -bool true;
defaults write NSGlobalDomain WebKitDeveloperExtras -bool true;

echo "Inverting Mouse Scroll…";
#TODO set the mouse scroll

echo "Removing ‘All My Files’ from Finder sidebar...";
#TODO remove all files

echo "Adding your home folder to the Finder sidebar…";
#TODO add home folder

echo "Adding your pictures folder to the Finder sidebar…";
#TODO add pictures folder

#TODO recent documents in dock

#TODO auto assign: Control + CMD + M to zoom windows
#Keyboard Application Shortcuts, Text = "Zoom"

echo "Disabling local Time Machine backups...";
sudo tmutil disablelocal;

echo "Installing your Application preferences...";
echo "Setting VLC to autoupdate...";
defaults write org.videolan.vlc SUAutomaticallyUpdate true;

#############
# REFERENCES:
#############
#http://www.defaults-write.com/change-default-view-style-in-os-x-finder/

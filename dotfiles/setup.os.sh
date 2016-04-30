#==============================================================================
# OS TWEAKS
#==============================================================================
echo "Customizing OS to your liking...";

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

echo "Inverting Mouse Scroll…";
#TODO

echo "Removing ‘All My Files’ from Finder sidebar...";
#TODO

echo "Adding your home folder to the Finder sidebar…";
#TODO

echo "Adding your pictures folder to the Finder sidebar…";
#TODO

#TODO set 24hour clock in menu bar
#TODO recent documents in dock

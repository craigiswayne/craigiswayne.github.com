defaults write com.apple.finder AppleShowAllFiles -boolean true;
killall Finder;

echo "Installing XCode Command Line tools...";
xcode-select --install;

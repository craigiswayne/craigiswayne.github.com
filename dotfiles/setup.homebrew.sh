#==============================================================================
# HOMEBREW
#==============================================================================
echo "Installing Homebrew...";

echo "Installing XCode Command Line tools...";
# sudo xcrun cc; # doesnt work anymore =/
xcode-select --install;

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";

echo "Installing Homebrew taps...";
brew_taps=$(cat brew_taps.list);
for tap in $brew_taps
do
   brew tap install "$tap";
done;

brew update;


echo "Installing Cask Applications...";
brew_casks=$(cat cask.list);
for cask in $brew_casks
do
   brew cask install "$cask";
done;


brew services restart --all;

# PATH inclusions
echo 'export PATH="/usr/local/sbin:$PATH"' >> ~/.bash_profile;

echo "Cleaning up Homebrew...";
brew doctor;
brew cleanup;
brew prune;

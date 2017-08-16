#==============================================================================
# HOMEBREW
#==============================================================================
echo "Installing Homebrew...";

echo "Installing XCode Command Line tools...";
# sudo xcrun cc; # doesnt work anymore =/
xcode-select --install;

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";

echo "Installing Homebrew taps...";
brew_taps=$(curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/brew_taps.list);
for tap in "$brew_taps"
do
	brew tap "$tap";
done

brew update;

brew_apps=$(curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/brew.list);
for app in "$brew_apps"
do
	brew install "$app";
done

brew services restart --all;

echo "Installing Cask Applications...";
brew_casks=$(curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/cask.list);
for cask in "$brew_casks"
do
	brew cask install "$cask";
done

# PATH inclusions
echo 'export PATH="/usr/local/sbin:$PATH"' >> ~/.bash_profile;

echo "Cleaning up Homebrew...";
brew doctor;
brew cleanup;
brew prune;

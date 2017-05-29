#==============================================================================
# HOMEBREW
#==============================================================================
echo "Installing Homebrew...";

echo "Installing XCode Command Line tools...";
sudo xcrun cc;
xcode-select --install;

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
chown -Rv $(whomai) /usr/local/;
brew prune;
brew doctor;
brew update;
brew upgrade;



echo "Installing Homebrew taps...";
brew_taps=$(curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/brew_taps.list);
for tap in "$brew_taps"
do
	brew tap "$tap";
done

brew_apps=$(curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/brew.list);
for app in "$brew_apps"
do
	brew install "$app";
done


echo "Installing Cask Applications...";
brew_casks=$(curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/cask.list);
for cask in "$brew_casks"
do
	brew cask install "$cask";
done

brew doctor;
echo "Cleaning up Homebrew...";
brew cleanup;

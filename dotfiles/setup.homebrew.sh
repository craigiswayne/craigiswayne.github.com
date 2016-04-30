#==============================================================================
# HOMEBREW
#==============================================================================
echo "Installing Homebrew...";

echo "Installing XCode Command Line tools...";
sudo xcrun cc;
xcode-select --install;

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
brew doctor;
brew update;
brew upgrade;

echo "Installing Homebrew Cask...";
brew install brew-cask;
echo "Installing Cask Applications...";
my_casks=$(curl https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/dotfiles/cask.list);
for cask in "$my_casks"
do
	brew cask install "$cask";
done

brew doctor;
echo "Cleaning up Homebrew...";
brew cleanup;

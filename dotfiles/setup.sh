#===================================================================================================================
# My Workstation Setup
# Usage: sh "$(curl -fsSL https://raw.githubusercontent.com/craigiswayne/craigiswayne.github.com/master/setup.sh)"
#===================================================================================================================

# Setup 3rd Party Apps via homebrew
sh setup.homebrew.sh;
sh setup.gems.sh;
sh setup.development.sh;

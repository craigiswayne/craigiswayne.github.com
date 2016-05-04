#==============================================================================
# My Workstation Setup
#==============================================================================
sh setup.os.sh;
sh setup.homebrew.sh;
sh setup.development.sh;

#==============================================================================
# REFERENCES
#http://derickbailey.com/2014/12/27/how-to-start-nginx-on-port-80-at-mac-osx-boot-up-log-in/ < AUTOSTART NGINX with sudo
#http://www.robertmulley.com/tutorial/nginx-install-and-setup-mac-os-x-yosemite/ < NGINX,PHP,HOMEBREW,MAC OSX
#https://gist.github.com/jimothyGator/5436538 < NGINX DEFAULTS
#http://www.thexlab.com/faqs/maintscripts.html < MAINTENANCE SCRIPTS
#https://haroldsoh.com/2011/10/07/clone-all-repos-from-a-bitbucket-source/ < GIT REPOS
#https://gist.github.com/saetia/1623487 < SYSTEM TWEAKS
#https://jamfnation.jamfsoftware.com/discussion.html?id=10576 < SYSTEM TWEAKS
#http://www.makeuseof.com/tag/customise-mac-os-x-dock-hidden-terminal-commands/ < DOCK CUSTOMIZATION
#http://stackoverflow.com/questions/525592/find-and-replace-inside-a-text-file-from-a-bash-command < FIND and REPLACE

#==============================================================================

echo "A special thanks to all those who have helped compile this script...";
read -p "Press any key to reboot...";
sudo reboot now;

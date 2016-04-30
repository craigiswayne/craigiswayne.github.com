touch ~/Downloads/hosts.bak &&
echo "127.0.0.1 {{url}}" > ~/Downloads/hosts.bak &&
echo "$(cat /private/etc/hosts)" >> ~/Downloads/hosts.bak &&
sudo cp ~/Downloads/hosts.bak /private/etc/hosts;
sudo nginx -s reload;

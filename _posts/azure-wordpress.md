# WordPress on Azure

Every Azure WordPress site has a FileManager accessible via the UI (FTP)

https://your-sitename-here.scm.azurewebsites.net/newui/fileManager#

https://github.com/Azure/wordpress-linux-appservice/blob/main/WordPress/wordpress_migration_linux_appservices.md

* phpMyAdmin is available at https://site-name.azurewebsites.net/phpmyadmin

Your best method of uploading/deploying files is:
* azure-pipeline
* via the all in one wp migration plugin
* ftp

---

### Nginx
to use custom nginx options you'll want to do this

first copy the existing nginx default config to your home folder

```sh
cp /etc/nginx/conf.d /home/default.conf
```

make your changes to YOUR copy of the `default.conf` file located at `/home/default.conf`

then create a startup script in your home/dev folder (kudu will automatically look here for the script)
```
touch /home/dev/startup.sh
```

Edit the startup script to replace the existing `default.conf` file with your version from your home folder

```sh
cp /home/default.conf /etc/nginx/conf.d/default.conf
/usr/sbin/nginx -s reload;
```

---

### Application Insights on Azure

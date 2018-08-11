docker run --name docker-mysql --env MYSQL_ROOT_PASSWORD=root --publish 3306:3306 --detach mysql:5.6
docker exec -it docker-mysql mysql -uroot -proot
brew install mysql-client


### Moving from HomeBrew to Docker
```shell
brew services stop php
sudo nginx -s stop;
```


## NGINX via Docker
### First Run
```
docker run --detach --name docker-nginx -p 80:80 -v "/Users/craigiswayne/www:/usr/share/nginx/html" -v "/Users/craigiswayne/www/craigiswayne.github.com/dotfiles/nginx/servers/wordpress_generic.vhost.conf:/etc/nginx/conf.d/wordpress_generic.conf" -v "/Users/craigiswayne/www/craigiswayne.github.com/dotfiles/nginx/ssl:/etc/nginx/ssl" nginx
```

### Starting the Service
docker start docker-nginx


## MySQL
```
mysql -h 127.0.0.1 -uroot -pfoobar
```

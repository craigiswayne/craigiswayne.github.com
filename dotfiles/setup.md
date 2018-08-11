docker run --name docker-mysql --env MYSQL_ROOT_PASSWORD=root --publish 3306:3306 --detach mysql:5.6
docker exec -it docker-mysql mysql -uroot -proot
brew install mysql-client

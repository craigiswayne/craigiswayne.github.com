CREATE DATABASE IF NOT EXISTS #db_name# ;
DROP DATABASE IF EXISTS #db_name# ;
CREATE DATABASE #db_name# ;
\! echo "Created DB Successfully!";

\! echo "Applying fixes for trigger related issues...";
CREATE USER IF NOT EXISTS 'root'@'%';
GRANT ALL ON *.* TO 'root'@'%';

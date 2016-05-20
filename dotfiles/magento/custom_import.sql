CREATE DATABASE IF NOT EXISTS {{db_name}} ;
DROP DATABASE IF EXISTS {{db_name}} ;
CREATE DATABASE {{db_name}} ;
\! echo "Created DB Successfully!";

\! echo "Applying fixes for trigger related issues...";
CREATE USER IF NOT EXISTS 'root'@'%';
GRANT ALL ON *.* TO 'root'@'%';


USE {{db_name}} ;

\! echo "Some modifications to the SQL statement..."
\! echo "Changing the DEFINER to the specified mysql user..."
\! sed -i.bak -e 's/\(DEFINER=\`\)\([a-zA-Z0-9]*\)\(\`@\`\)/\1{{mysql_username}}\3/g' {{backup_sql_path}};

\! echo "Importing DB from backup...!";
source {{backup_sql_path}};
\! echo "Imported Successfully!";

\! echo "Cleaning up {{db_name}} database!";
DELETE FROM `{{db_name}}`.adminnotification_inbox;

\! echo "Creating admin user for {{db_name}}...";
UPDATE `{{db_name}}`.core_cache_option SET value = 1;
UPDATE `{{db_name}}`.core_config_data SET value = '{{full_url}}' WHERE path = 'web/unsecure/base_url';
UPDATE `{{db_name}}`.core_config_data SET value = '{{full_url}}' WHERE path = 'web/secure/base_url';
UPDATE `{{db_name}}`.core_config_data SET value = '{{cookie_url}}' WHERE path = 'web/cookie/cookie_domain';
UPDATE `{{db_name}}`.core_config_data SET value = '{{google_tag_id}}' WHERE path = 'googletagmanager/general_settings/tag_id';
UPDATE `{{db_name}}`.core_config_data SET VALUE = 1 WHERE path = "payment/banktransfer/active";
DELETE FROM `{{db_name}}`.`admin_role` WHERE user_id IN (SELECT user_id FROM `{{db_name}}`.`admin_user` WHERE username  = "admin");
DELETE FROM `{{db_name}}`.`admin_user` WHERE username = "admin";

LOCK TABLES `{{db_name}}`.`admin_role` WRITE , `{{db_name}}`.`admin_user` WRITE;

SET @SALT = "rp";
SET @PASS = CONCAT(MD5(CONCAT( @SALT , "admin123") ), CONCAT(":", @SALT ));
SELECT @EXTRA := MAX(extra) FROM admin_user WHERE extra IS NOT NULL;

INSERT INTO `{{db_name}}`.`admin_user` (firstname,lastname,email,username,password,created,lognum,reload_acl_flag,is_active,extra,rp_token_created_at)
VALUES ('{{first_name}}','{{last_name}}','{{email}}','admin',@PASS,NOW(),0,0,1,@EXTRA,NOW());

INSERT INTO `{{db_name}}`.`admin_role` (parent_id,tree_level,sort_order,role_type,user_id,role_name)
VALUES (1,2,0,'U',(SELECT user_id FROM admin_user WHERE username = 'admin'),'{{first_name}}');

UNLOCK TABLES;

-- REFERENCE: http://magento.stackexchange.com/questions/3701/clearing-magento-after-testing
\! echo "Removing Customers...";
SET FOREIGN_KEY_CHECKS=0;
-- reset customers
TRUNCATE customer_address_entity;
TRUNCATE customer_address_entity_datetime;
TRUNCATE customer_address_entity_decimal;
TRUNCATE customer_address_entity_int;
TRUNCATE customer_address_entity_text;
TRUNCATE customer_address_entity_varchar;
TRUNCATE customer_entity;
TRUNCATE customer_entity_datetime;
TRUNCATE customer_entity_decimal;
TRUNCATE customer_entity_int;
TRUNCATE customer_entity_text;
TRUNCATE customer_entity_varchar;
TRUNCATE log_customer;
TRUNCATE log_visitor;
TRUNCATE log_visitor_info;

-- TODO fix the commented out lines
-- ALTER TABLE customer_address_entity AUTO_INCREMENT=1;
-- ALTER TABLE customer_address_entity_datetime AUTO_INCREMENT=1;
ALTER TABLE customer_address_entity_decimal AUTO_INCREMENT=1;
ALTER TABLE customer_address_entity_int AUTO_INCREMENT=1;
ALTER TABLE customer_address_entity_text AUTO_INCREMENT=1;
ALTER TABLE customer_address_entity_varchar AUTO_INCREMENT=1;
-- ALTER TABLE customer_entity AUTO_INCREMENT=1;
-- ALTER TABLE customer_entity_datetime AUTO_INCREMENT=1;
ALTER TABLE customer_entity_decimal AUTO_INCREMENT=1;
ALTER TABLE customer_entity_int AUTO_INCREMENT=1;
ALTER TABLE customer_entity_text AUTO_INCREMENT=1;
ALTER TABLE customer_entity_varchar AUTO_INCREMENT=1;
ALTER TABLE log_customer AUTO_INCREMENT=1;
-- ALTER TABLE log_visitor AUTO_INCREMENT=1;
ALTER TABLE log_visitor_info AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;
-- TODO truncate tables and not drop them, try do the same for the database in this initial statement
\! echo "Removing Sales and Orders...";
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `sales_flat_creditmemo`;
TRUNCATE `sales_flat_creditmemo_comment`;
TRUNCATE `sales_flat_creditmemo_grid`;
TRUNCATE `sales_flat_creditmemo_item`;
TRUNCATE `sales_flat_invoice`;
TRUNCATE `sales_flat_invoice_comment`;
TRUNCATE `sales_flat_invoice_grid`;
TRUNCATE `sales_flat_invoice_item`;
TRUNCATE `sales_flat_order`;
TRUNCATE `sales_flat_order_address`;
TRUNCATE `sales_flat_order_grid`;
TRUNCATE `sales_flat_order_item`;
TRUNCATE `sales_flat_order_payment`;
TRUNCATE `sales_flat_order_status_history`;
TRUNCATE `sales_flat_quote`;
TRUNCATE `sales_flat_quote_address`;
TRUNCATE `sales_flat_quote_address_item`;
TRUNCATE `sales_flat_quote_item`;
TRUNCATE `sales_flat_quote_item_option`;
TRUNCATE `sales_flat_quote_payment`;
TRUNCATE `sales_flat_quote_shipping_rate`;
TRUNCATE `sales_flat_shipment`;
TRUNCATE `sales_flat_shipment_comment`;
TRUNCATE `sales_flat_shipment_grid`;
TRUNCATE `sales_flat_shipment_item`;
TRUNCATE `sales_flat_shipment_track`;
TRUNCATE `sales_invoiced_aggregated`;
TRUNCATE `sales_invoiced_aggregated_order`;
TRUNCATE `sales_payment_transaction`;
TRUNCATE `sales_order_aggregated_created`;
TRUNCATE `sales_order_tax`;
TRUNCATE `sales_order_tax_item`;
TRUNCATE `sendfriend_log`;
TRUNCATE `tag`;
TRUNCATE `tag_relation`;
TRUNCATE `tag_summary`;
TRUNCATE `wishlist`;
TRUNCATE `log_quote`;
TRUNCATE `report_event`;
ALTER TABLE `sales_flat_creditmemo` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_creditmemo_comment` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_creditmemo_grid` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_creditmemo_item` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_invoice` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_invoice_comment` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_invoice_grid` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_invoice_item` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_order` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_order_address` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_order_grid` AUTO_INCREMENT=1;
-- ALTER TABLE `sales_flat_order_item` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_order_payment` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_order_status_history` AUTO_INCREMENT=1;
-- ALTER TABLE `sales_flat_quote` AUTO_INCREMENT=1;
-- ALTER TABLE `sales_flat_quote_address` AUTO_INCREMENT=1;
-- ALTER TABLE `sales_flat_quote_address_item` AUTO_INCREMENT=1;
-- ALTER TABLE `sales_flat_quote_item` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_quote_item_option` AUTO_INCREMENT=1;
-- ALTER TABLE `sales_flat_quote_payment` AUTO_INCREMENT=1;
-- ALTER TABLE `sales_flat_quote_shipping_rate` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_shipment` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_shipment_comment` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_shipment_grid` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_shipment_item` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_shipment_track` AUTO_INCREMENT=1;
ALTER TABLE `sales_invoiced_aggregated` AUTO_INCREMENT=1;
ALTER TABLE `sales_invoiced_aggregated_order` AUTO_INCREMENT=1;
ALTER TABLE `sales_payment_transaction` AUTO_INCREMENT=1;
ALTER TABLE `sales_order_aggregated_created` AUTO_INCREMENT=1;
ALTER TABLE `sales_order_tax` AUTO_INCREMENT=1;
ALTER TABLE `sales_order_tax_item` AUTO_INCREMENT=1;
ALTER TABLE `sendfriend_log` AUTO_INCREMENT=1;
ALTER TABLE `tag` AUTO_INCREMENT=1;
ALTER TABLE `tag_relation` AUTO_INCREMENT=1;
ALTER TABLE `tag_summary` AUTO_INCREMENT=1;
ALTER TABLE `wishlist` AUTO_INCREMENT=1;
ALTER TABLE `log_quote` AUTO_INCREMENT=1;
ALTER TABLE `report_event` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;


SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `core_email_queue`;
ALTER TABLE `core_email_queue` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

\! echo "Deleting ALL Catalog Rules...";
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `catalogrule`;
TRUNCATE `catalogrule_affected_product`;
TRUNCATE `catalogrule_customer_group`;
TRUNCATE `catalogrule_group_website`;
TRUNCATE `catalogrule_product`;
TRUNCATE `catalogrule_product_price`;
TRUNCATE `catalogrule_website`;
TRUNCATE `enterprise_banner_catalogrule`;
ALTER TABLE `catalogrule` AUTO_INCREMENT=1;
ALTER TABLE `catalogrule_affected_product` AUTO_INCREMENT=1;
ALTER TABLE `catalogrule_customer_group` AUTO_INCREMENT=1;
ALTER TABLE `catalogrule_group_website` AUTO_INCREMENT=1;
ALTER TABLE `catalogrule_product` AUTO_INCREMENT=1;
ALTER TABLE `catalogrule_product_price` AUTO_INCREMENT=1;
ALTER TABLE `catalogrule_website` AUTO_INCREMENT=1;
ALTER TABLE `enterprise_banner_catalogrule` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

\! echo "Deleting ALL Banners...";
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `enterprise_banner`;
TRUNCATE `enterprise_banner_catalogrule`;
TRUNCATE `enterprise_banner_content`;
TRUNCATE `enterprise_banner_customersegment`;
TRUNCATE `enterprise_banner_salesrule`;
ALTER TABLE `enterprise_banner` AUTO_INCREMENT=1;
ALTER TABLE `enterprise_banner_catalogrule` AUTO_INCREMENT=1;
ALTER TABLE `enterprise_banner_content` AUTO_INCREMENT=1;
ALTER TABLE `enterprise_banner_customersegment` AUTO_INCREMENT=1;
ALTER TABLE `enterprise_banner_salesrule` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

\! echo "Clean Up completed Successfully!";

\! echo "Backing up the {{db_name}} database...";
\! echo "You will need to enter in your system password.";
\! mkdir -p '{{backup_dir}}';
\! sudo sudo mysqldump --add-drop-database --add-drop-trigger --log-error={{backup_dir}}/sql_error.log --databases '{{db_name}}' > '{{backup_dir}}/{{db_name}}.bak.sql';
\! echo "Backup completed succesfully...";

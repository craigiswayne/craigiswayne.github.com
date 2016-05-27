DELETE FROM `#db_name#`.adminnotification_inbox;
\! echo "Creating admin user for #db_name#...";
UPDATE `#db_name#`.core_cache_option SET value = 1;
UPDATE `#db_name#`.core_config_data SET value = '#full_url#' WHERE path = 'web/unsecure/base_url';
UPDATE `#db_name#`.core_config_data SET value = '#full_url#' WHERE path = 'web/secure/base_url';
UPDATE `#db_name#`.core_config_data SET value = '#hostname#' WHERE path = 'web/cookie/cookie_domain';
UPDATE `#db_name#`.core_config_data SET value = '#google_tag_id#' WHERE path = 'googletagmanager/general_settings/tag_id';
UPDATE `#db_name#`.core_config_data SET VALUE = 1 WHERE path = "payment/banktransfer/active";
update `#db_name#`.core_config_data SET value = 0 WHERE path = "admin/security/use_form_key";
DELETE FROM `#db_name#`.`admin_role` WHERE user_id IN (SELECT user_id FROM `#db_name#`.`admin_user` WHERE username  = "admin");
DELETE FROM `#db_name#`.`admin_user` WHERE username = "admin";

LOCK TABLES `#db_name#`.`admin_role` WRITE , `#db_name#`.`admin_user` WRITE;

SET @SALT = "rp";
SET @PASS = CONCAT(MD5(CONCAT( @SALT , "admin123") ), CONCAT(":", @SALT ));
SELECT @EXTRA := MAX(extra) FROM `#db_name#`.admin_user WHERE extra IS NOT NULL;

INSERT INTO `#db_name#`.`admin_user` (firstname,lastname,email,username,password,created,lognum,reload_acl_flag,is_active,extra,rp_token_created_at)
VALUES ('#first_name#','#last_name#','#email#','admin',@PASS,NOW(),0,0,1,@EXTRA,NOW());

INSERT INTO `#db_name#`.`admin_role` (parent_id,tree_level,sort_order,role_type,user_id,role_name)
VALUES (1,2,0,'U',(SELECT user_id FROM `#db_name#`.admin_user WHERE username = 'admin'),'#first_name#');

UNLOCK TABLES;

-- TODO disable the secret key from backend urls

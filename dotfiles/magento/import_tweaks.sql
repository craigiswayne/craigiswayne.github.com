DELETE FROM `adminnotification_inbox`;

UPDATE `core_cache_option` SET value = 1;
UPDATE `core_config_data` SET value = '#full_url#' WHERE path = 'web/unsecure/base_url' AND scope_id = 0;
UPDATE `core_config_data` SET value = '#full_url#' WHERE path = 'web/secure/base_url' AND scope_id = 0;
UPDATE `core_config_data` SET value = '#hostname#' WHERE path = 'web/cookie/cookie_domain' AND scope_id = 0;
UPDATE `core_config_data` SET value = '#google_tag_id#' WHERE path = 'googletagmanager/general_settings/tag_id' and scope_id = 0;
UPDATE `core_config_data` SET value = 'http://#hostname#' WHERE path = 'magebridge/redirect/magebridge_root' and scope_id = 0;
UPDATE `core_config_data` SET VALUE = 1 WHERE path = "payment/banktransfer/active" and scope_id = 0;
UPDATE `core_config_data` SET value = 0 WHERE path = "admin/security/use_form_key" and scope_id = 0;
DELETE FROM `admin_role` WHERE user_id IN (SELECT user_id FROM `admin_user` WHERE username  = "admin");
DELETE FROM `admin_user` WHERE username = "admin";

LOCK TABLES `admin_role` WRITE , `admin_user` WRITE;

SET @SALT = "rp";
SET @PASS = CONCAT(MD5(CONCAT( @SALT , "admin123") ), CONCAT(":", @SALT ));
SELECT @EXTRA := MAX(extra) FROM `admin_user` WHERE extra IS NOT NULL;

INSERT INTO `admin_user` (firstname,lastname,email,username,password,created,lognum,reload_acl_flag,is_active,extra,rp_token_created_at)
VALUES ('#first_name#','#last_name#','#email#','admin',@PASS,NOW(),0,0,1,@EXTRA,NOW());

INSERT INTO `admin_role` (parent_id,tree_level,sort_order,role_type,user_id,role_name)
VALUES (1,2,0,'U',(SELECT user_id FROM `admin_user` WHERE username = 'admin'),'#first_name#');

UNLOCK TABLES;
-- TODO disable the secret key from backend urls

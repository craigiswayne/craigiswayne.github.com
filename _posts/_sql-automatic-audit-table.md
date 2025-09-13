# SQL Audit Table

create a sql trigger to listen for the following changes to a table
* UPDATE
* INSERT
* DELETE



```mysql
delimiter //
DROP PROCEDURE IF EXISTS audit_logger;
DROP TRIGGER IF EXISTS AUDITOR_WATCH_UPDATE;
DROP TRIGGER IF EXISTS AUDITOR_WATCH_INSERT;
DROP TRIGGER IF EXISTS AUDITOR_WATCH_DELETE;

CREATE TABLE IF NOT EXISTS audit_table
(
    id             int auto_increment
    primary key,
    action         varchar(16)                        not null,
    affected_table varchar(16)                        not null,
    user           varchar(16)                        not null,
    timestamp      datetime default CURRENT_TIMESTAMP not null,
    old_value      varchar(256)                       null,
    new_value      varchar(256)                       null
    );

CREATE PROCEDURE audit_logger(
    IN trigger_action VARCHAR(6),
    IN old_values_string VARCHAR(255),
    IN new_values_string VARCHAR(255)
)
BEGIN
    DECLARE user                VARCHAR(256);
    DECLARE affected_table      VARCHAR(256);

    SET user = USER();
    SET affected_table = 'wp_posts';

INSERT INTO audit_table (`action`, `affected_table`, `user`, `old_value`, `new_value`)
VALUES (trigger_action, affected_table, user, old_values_string, new_values_string);
END;

CREATE TRIGGER AUDITOR_WATCH_INSERT AFTER INSERT
    ON wp_posts
    FOR EACH ROW
BEGIN
    SET @new_values_string = CONCAT('{"id": ', NEW.ID, ',"post_title": "', NEW.post_title, '","post_status": "', NEW.post_status,'" }');
    CALL audit_logger('insert', NULL, @new_values_string);
END;

CREATE TRIGGER AUDITOR_WATCH_UPDATE AFTER UPDATE
    ON wp_posts
    FOR EACH ROW
BEGIN
    SET @old_values_string = CONCAT('{"id": ', OLD.ID, ',"post_title": "', OLD.post_title, '","post_status": "', OLD.post_status,'" }');
    SET @new_values_string = CONCAT('{"id": ', NEW.ID, ',"post_title": "', NEW.post_title, '","post_status": "', NEW.post_status,'" }');
    CALL audit_logger('update', @old_values_string, @new_values_string);
END;

CREATE TRIGGER AUDITOR_WATCH_DELETE AFTER DELETE
    ON wp_posts
    FOR EACH ROW
BEGIN
    SET @old_values_string = CONCAT('{"id": ', OLD.ID, ',"post_title": "', OLD.post_title, '","post_status": "', OLD.post_status,'" }');
    CALL audit_logger('delete', @old_values_string, NULL);
END;
//
delimiter ;
```
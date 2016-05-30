-- Adaptation of https://gist.github.com/therouv/7706282

-- Customers
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `customer_entity`;
TRUNCATE `customer_entity_datetime`;
TRUNCATE `customer_entity_decimal`;
TRUNCATE `customer_entity_int`;
TRUNCATE `customer_entity_text`;
TRUNCATE `customer_entity_varchar`;
ALTER TABLE `customer_entity` AUTO_INCREMENT=1;
ALTER TABLE `customer_entity_datetime` AUTO_INCREMENT=1;
ALTER TABLE `customer_entity_decimal` AUTO_INCREMENT=1;
ALTER TABLE `customer_entity_int` AUTO_INCREMENT=1;
ALTER TABLE `customer_entity_text` AUTO_INCREMENT=1;
ALTER TABLE `customer_entity_varchar` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

-- Customer Addresses
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `customer_address_entity`;
TRUNCATE `customer_address_entity_datetime`;
TRUNCATE `customer_address_entity_decimal`;
TRUNCATE `customer_address_entity_int`;
TRUNCATE `customer_address_entity_text`;
TRUNCATE `customer_address_entity_varchar`;
ALTER TABLE `customer_address_entity` AUTO_INCREMENT=1;
ALTER TABLE `customer_address_entity_datetime` AUTO_INCREMENT=1;
ALTER TABLE `customer_address_entity_decimal` AUTO_INCREMENT=1;
ALTER TABLE `customer_address_entity_int` AUTO_INCREMENT=1;
ALTER TABLE `customer_address_entity_text` AUTO_INCREMENT=1;
ALTER TABLE `customer_address_entity_varchar` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

-- Quotes
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `sales_flat_quote`;
TRUNCATE `sales_flat_quote_address`;
TRUNCATE `sales_flat_quote_address_item`;
TRUNCATE `sales_flat_quote_item`;
TRUNCATE `sales_flat_quote_item_option`;
TRUNCATE `sales_flat_quote_payment`;
TRUNCATE `sales_flat_quote_shipping_rate`;
ALTER TABLE `sales_flat_quote` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_quote_address` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_quote_address_item` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_quote_item` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_quote_item_option` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_quote_payment` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_quote_shipping_rate` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

-- Orders
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `sales_flat_order`;
TRUNCATE `sales_flat_order_address`;
TRUNCATE `sales_flat_order_grid`;
TRUNCATE `sales_flat_order_item`;
TRUNCATE `sales_flat_order_payment`;
TRUNCATE `sales_flat_order_status_history`;
ALTER TABLE `sales_flat_order` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_order_address` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_order_grid` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_order_item` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_order_payment` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_order_status_history` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

-- Invoices
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `sales_flat_invoice`;
TRUNCATE `sales_flat_invoice_comment`;
TRUNCATE `sales_flat_invoice_grid`;
TRUNCATE `sales_flat_invoice_item`;
ALTER TABLE `sales_flat_invoice` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_invoice_comment` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_invoice_grid` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_invoice_item` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

-- Shipments
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `sales_flat_shipment`;
TRUNCATE `sales_flat_shipment_comment`;
TRUNCATE `sales_flat_shipment_grid`;
TRUNCATE `sales_flat_shipment_item`;
TRUNCATE `sales_flat_shipment_track`;
ALTER TABLE `sales_flat_shipment` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_shipment_comment` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_shipment_grid` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_shipment_item` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_shipment_track` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

-- Sales Order Tax
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `sales_order_tax`;
TRUNCATE `sales_order_tax_item`;
ALTER TABLE `sales_order_tax` AUTO_INCREMENT=1;
ALTER TABLE `sales_order_tax_item` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

-- Creditmemos
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `sales_flat_creditmemo`;
TRUNCATE `sales_flat_creditmemo_comment`;
TRUNCATE `sales_flat_creditmemo_grid`;
TRUNCATE `sales_flat_creditmemo_item`;
ALTER TABLE `sales_flat_creditmemo` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_creditmemo_comment` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_creditmemo_grid` AUTO_INCREMENT=1;
ALTER TABLE `sales_flat_creditmemo_item` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

-- Aggregated report tables
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `coupon_aggregated`;
TRUNCATE `coupon_aggregated_order`;
TRUNCATE `coupon_aggregated_updated`;
TRUNCATE `report_viewed_product_aggregated_daily`;
TRUNCATE `report_viewed_product_aggregated_monthly`;
TRUNCATE `report_viewed_product_aggregated_yearly`;
TRUNCATE `sales_bestsellers_aggregated_daily`;
TRUNCATE `sales_bestsellers_aggregated_monthly`;
TRUNCATE `sales_bestsellers_aggregated_yearly`;
TRUNCATE `sales_invoiced_aggregated`;
TRUNCATE `sales_invoiced_aggregated_order`;
TRUNCATE `sales_order_aggregated_created`;
TRUNCATE `sales_order_aggregated_updated`;
TRUNCATE `sales_refunded_aggregated`;
TRUNCATE `sales_refunded_aggregated_order`;
TRUNCATE `sales_shipping_aggregated`;
TRUNCATE `sales_shipping_aggregated_order`;
TRUNCATE `tax_order_aggregated_created`;
TRUNCATE `tax_order_aggregated_updated`;
ALTER TABLE `coupon_aggregated` AUTO_INCREMENT=1;
ALTER TABLE `coupon_aggregated_order` AUTO_INCREMENT=1;
ALTER TABLE `coupon_aggregated_updated` AUTO_INCREMENT=1;
ALTER TABLE `report_viewed_product_aggregated_daily` AUTO_INCREMENT=1;
ALTER TABLE `report_viewed_product_aggregated_monthly` AUTO_INCREMENT=1;
ALTER TABLE `report_viewed_product_aggregated_yearly` AUTO_INCREMENT=1;
ALTER TABLE `sales_bestsellers_aggregated_daily` AUTO_INCREMENT=1;
ALTER TABLE `sales_bestsellers_aggregated_monthly` AUTO_INCREMENT=1;
ALTER TABLE `sales_bestsellers_aggregated_yearly` AUTO_INCREMENT=1;
ALTER TABLE `sales_invoiced_aggregated` AUTO_INCREMENT=1;
ALTER TABLE `sales_invoiced_aggregated_order` AUTO_INCREMENT=1;
ALTER TABLE `sales_order_aggregated_created` AUTO_INCREMENT=1;
ALTER TABLE `sales_order_aggregated_updated` AUTO_INCREMENT=1;
ALTER TABLE `sales_refunded_aggregated` AUTO_INCREMENT=1;
ALTER TABLE `sales_refunded_aggregated_order` AUTO_INCREMENT=1;
ALTER TABLE `sales_shipping_aggregated` AUTO_INCREMENT=1;
ALTER TABLE `sales_shipping_aggregated_order` AUTO_INCREMENT=1;
ALTER TABLE `tax_order_aggregated_created` AUTO_INCREMENT=1;
ALTER TABLE `tax_order_aggregated_updated` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

-- Log tables
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `log_customer`;
TRUNCATE `log_quote`;
TRUNCATE `log_summary`;
TRUNCATE `log_summary_type`;
TRUNCATE `log_url`;
TRUNCATE `log_url_info`;
TRUNCATE `log_visitor`;
TRUNCATE `log_visitor_info`;
TRUNCATE `log_visitor_online`;
ALTER TABLE `log_customer` AUTO_INCREMENT=1;
ALTER TABLE `log_quote` AUTO_INCREMENT=1;
ALTER TABLE `log_summary` AUTO_INCREMENT=1;
ALTER TABLE `log_summary_type` AUTO_INCREMENT=1;
ALTER TABLE `log_url` AUTO_INCREMENT=1;
ALTER TABLE `log_url_info` AUTO_INCREMENT=1;
ALTER TABLE `log_visitor` AUTO_INCREMENT=1;
ALTER TABLE `log_visitor_info` AUTO_INCREMENT=1;
ALTER TABLE `log_visitor_online` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

-- Admin Logs
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `enterprise_logging_event_changes`;
TRUNCATE `enterprise_logging_event`;
ALTER TABLE `enterprise_logging_event_changes` AUTO_INCREMENT=1;
ALTER TABLE `enterprise_logging_event` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

-- Search Terms
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `catalogsearch_query`;
TRUNCATE `catalogsearch_fulltext`;
TRUNCATE `catalogsearch_result`;
ALTER TABLE catalogsearch_query AUTO_INCREMENT=1;
ALTER TABLE catalogsearch_fulltext AUTO_INCREMENT=1;
ALTER TABLE catalogsearch_result AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;


-- Miscellaneous
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE `index_event`;
TRUNCATE `index_process_event`;
TRUNCATE `report_event`;
TRUNCATE `report_viewed_product_index`;
TRUNCATE `sendfriend_log`;
TRUNCATE `tag`;
TRUNCATE `tag_relation`;
TRUNCATE `tag_summary`;
TRUNCATE `wishlist`;
ALTER TABLE `index_event` AUTO_INCREMENT=1;
ALTER TABLE `index_process_event` AUTO_INCREMENT=1;
ALTER TABLE `report_event` AUTO_INCREMENT=1;
ALTER TABLE `report_viewed_product_index` AUTO_INCREMENT=1;
ALTER TABLE `sendfriend_log` AUTO_INCREMENT=1;
ALTER TABLE `tag` AUTO_INCREMENT=1;
ALTER TABLE `tag_relation` AUTO_INCREMENT=1;
ALTER TABLE `tag_summary` AUTO_INCREMENT=1;
ALTER TABLE `wishlist` AUTO_INCREMENT=1;
SET FOREIGN_KEY_CHECKS=1;

message="Errors Found!";
debug_log_file=$(wp eval "echo WP_CONTENT_DIR;" --skip-plugins --skip-themes)/debug.log;
errors_found=$(tail -10 $debug_log_file);
if [ ! -z "$errors_found" ];
then
  say $message;
  osascript -e 'display dialog "Errors Found!\n\nWith Cancel and Ok Buttons"';
  echo $errors_found;
fi;
echo $errors_found;

message="Errors Found!";
say $message;
osascript -e 'display dialog "Errors Found!\n\nWith Cancel and Ok Buttons"';
tail -10 $debug_log_file;

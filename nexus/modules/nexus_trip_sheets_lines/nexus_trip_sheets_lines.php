<?php

//find a way to check against sky track
//allow for the signed form to get uploaded

class nexus_trip_sheets_lines extends nexus_db{

  var $columns = [
    'nexus_trip_sheet_id',
    'customer',
    'area',
    'description',
    'time_in',
    'time_out',
    'signature'
  ];

}

?>

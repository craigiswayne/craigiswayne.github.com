<?php

  //find a way to check against sky track
  //allow for the signed form to get uploaded

  class nexus_trip_sheets extends nexus_db{

    var $columns = [
      'team',

      'driver' =>[
          'foreign_table' => true,
          'datasource'    => 'drivers'
      ],

      'vehicle' => [
          'foreign_table' => 'nexus_vehicles'
      ],

      'manager' => [
          'foreign_table' => 'managers'
      ],

    ];

  }

?>

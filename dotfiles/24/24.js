'use strict';

//sudo mkdir -p /Volumes/DEV_OLD
//sudo sshfs -o allow_other,defer_permissions root@152.111.240.157:/var/www/ /Volumes/DEV_OLD
//sudo sshfs -o allow_other,defer_permissions root@152.111.240.159:/var/www/ /Volumes/DEV_NEW

module.exports = {

  local: {
    mysql: {
      username: 'wordpress',
      password: 'wordpress'
    }
  },

  dev: {

    mysql: {
      username: 'root',
      password: 'mysqlr00t',
      ip: '152.111.240.158',

      dump: function( db_name ){

        if( !db_name ){
          console.error( 'A DB Name is required for this to work...');
          return false;
        }



        const wp = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/wp/wp.js' );
        let destination = db_name + '.sql';
        destination = wp.is_installed() ? wp.abspath() + destination : destination;

        const sh = require( 'shelljs' );
        sh.exec( 'mysqldump -u'+module.exports.dev.mysql.username+' -p'+module.exports.dev.mysql.password+' -h'+module.exports.dev.mysql.ip+' '+db_name+' --verbose > ' + destination  );
        return destination;
      }
    },

    www: {
      username: 'root',
      host: '152.111.240.159',
      web_root: '/var/www'
    }
    
  },

  dev_databases: function(){

    /**
     * Used for colors
     */
    require( 'manakin' ).global;

    /**
     * Used for shell execution in node
     */
    const sh = require( 'shelljs' );

    console.info( 'Fetching DEV Databases...');
    let dev_databases = sh.exec( 'mysql -u'+this.dev.mysql.username+' -p'+this.dev.mysql.password+' -h'+this.dev.mysql.ip+' -e "SHOW DATABASES"',{
      silent: true
    });

    return dev_databases.stdout.trim().replace( /\s/g, ' ' ).split( ' ' );
  },

  wp: {
    db:{
      local_to_dev: function(){
        //first wp db export the local db using...
        //wp search-replace "https://local/" "https://dev." > dev_ready.sql
        //
        //sed -i 's/utf8mb4_unicode_520_ci/utf8mb4_unicode_ci/g' yourdb.sql
        //rsync ~/Downloads/fitnessstar.womenshealthsa.co.za-2018-03-06.sql root@152.111.240.159:/var/www/fitnessstar.womenshealthsa.co.za/


      }
    }
  }

};

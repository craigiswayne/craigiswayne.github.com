'use strict';

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

    // sh.exec( mysql -u$DEV_MYSQL_USERNAME -p$DEV_MYSQL_PASSWORD -h$DEV_MYSQL_HOST -e "SHOW DATABASES" );
    let dev_databases = sh.exec( 'mysql -u'+this.dev.mysql.username+' -p'+this.dev.mysql.password+' -h'+this.dev.mysql.ip+' -e "SHOW DATABASES"',{
      silent: true
    });

    return dev_databases.stdout.trim().replace(/\s/g, ' ' ).split( ' ' );
  }

};

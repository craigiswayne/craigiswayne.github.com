'use strict';

module.exports = {

  db: {
    import: function( dump_file ){

      if( !dump_file ){
        return;
      }

      const sh = require( 'shelljs' );

      sh.exec( 'wp db import ' + dump_file );
    },

    name: function(){
      const sh = require( 'shelljs' );
      let db_name = sh.exec( "wp config get --constant=DB_NAME --skip-plugins --skip-themes", {
        silent: true
      } );
      return db_name.stdout.trim();
    }
  },

  is_configured: function(){
    const sh = require( 'shelljs' );
     let result = sh.exec( 'wp config', {
      silent: true
    });

    return 0 === result.code;
  },

  is_installed: function( verbose ){

    const sh = require( 'shelljs' );
    const result = sh.exec( 'wp core is-installed', {
      silent: true
    } );


    verbose = true === verbose;

    if( 0 !== result.code && verbose ){
      console.error( 'You can only run this within a WordPress installation.' );
    }

    return 0 === result.code;
  },


  abspath: function(){
    // $(wp eval "echo ABSPATH;")' + db_name
    return './';
  },

  _replace_urls: function( site_name, desired_site_url, desired_protocol, desired_subdomain ){

  },

  replace_urls: function(){

    console.info( 'Replacing WordPress URLs' );

    const sh = require( 'shelljs' );

    if( !this.is_installed(true) ){
      return;
    }



    const quiet_mode = -1 === process.argv.indexOf( '-q' ) ? false : true;
    const available_subdomains = [ 'local', 'dev', 'staging', 'www' ];
    const available_protocols = [ 'https', 'http' ];

    let desired_subdomain = available_subdomains[0]
    let desired_protocol = available_protocols[0];

    const git = require("/usr/local/var/www/craigiswayne.github.com/dotfiles/git/git.js");

    var site_name = git.repo_name();

    function _do_replace(){

      var desired_site_url = desired_protocol + '://' + desired_subdomain + '.' + site_name

      for( var i=0; i < available_subdomains.length; i++ ){


        for( var j=0; j < available_protocols.length; j++ ){

          /**
           * Don't do anything for the chosen subdomain
           */
          if( desired_subdomain === available_subdomains[i] ){
            continue;
          }

          var protocol = available_protocols[j];
          var sub_domain = available_subdomains[i];
          var from = protocol + '://' + sub_domain + '.' + site_name;

          console.log( 'Replacing ' + from + ' -> ' + desired_site_url );
          sh.exec( 'wp search-replace ' + from + ' ' + desired_site_url + '' );
          console.log( '' );
        }
      }

      /**
      * Make sure that dynamic protocols are used system wide if https is selected
      */
      if( 'https'  === desired_protocol ){
        console.log( 'Replacing all non-secure protocols with dynamic protocols...' );
        sh.exec( 'wp search-replace http:// //' );
      }


      sh.exec( "wp option update 'siteurl' '" + desired_site_url + "' --skip-packages --skip-plugins --skip-themes" );
      console.log( "SITE URL is now: " + desired_site_url );
      sh.exec( 'open ' + desired_site_url );

    }

    if( quiet_mode ){
      console.warn( 'Working in quiet mode...' );
      _do_replace();
      return;
    }

    var questions = [
      {
        type: 'input',
        name: 'site_name',
        message: 'Site Name?',
        default: site_name
      },
      {
        type: 'list',
        name: 'desired_subdomain',
        message: 'Desired Subdomain',
        choices: available_subdomains,
        default: available_subdomains[0]
      },
      {
        type: 'list',
        name: 'desired_protocol',
        message: 'Desired Protocol?',
        choices: available_protocols,
        default: available_protocols[0]
      },

    ];


    var inquirer = require('inquirer');
    inquirer.prompt( questions ).then(answers => {
      site_name = answers.site_name;
      desired_subdomain = answers.desired_subdomain;
      _do_replace();
    });
  },


  repo_name: function () {
    /**
     * Used for colors
     */
    require( 'manakin' ).global;

    /**
     * Used for shell execution in node
     */
    const sh = require( 'shelljs' );

    if ( !sh.which( 'git' ) ) {
      console.error( 'Sorry, this script requires git' );
      sh.exit(1);
    }

    var git_root = sh.test( '-d', '.git' );

    if( !git_root ){
      console.error( 'You need to be in the git root to run this command' );
      sh.exit( git_root.code );
    }

    var repo_name = sh.exec( 'pwd', {
      silent: true
    });

    repo_name = repo_name.stdout.split( '/' ).slice(-1)[0].replace('\n', '');

    return repo_name;
  },

  reset_admin_user: function(){

  }
};

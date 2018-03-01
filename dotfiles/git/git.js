'use strict';

module.exports = {

  branches: {
    list: function(){
      const sh = require( 'shelljs' );

      console.log( 'Fetching all... ');

      sh.exec( 'git fetch --all', {
        silent: true
      });

      console.log( 'Fetching all Branches...');

      let branches = sh.exec( 'git branch --all', {
        silent: true
      });

      let result = branches.stdout.trim();
      result = result.replace(/(remotes\/)/g, '');
      result = result.replace(/([\n|*|])/g, '');
      result = result.replace('->', '');
      result = result.replace(/\s/g, ' ' );
      result = result.split(' ');
      result = result.filter(n => n)

      return result;
    },

    checkout: function( branch ){
      if( !branch ){
        console.warn( "No Branch provided..." );
        return;
      }

      const sh = require( 'shelljs' );

      let nice_name = branch.replace(/(origin\/)/g,'');

      sh.exec( 'git checkout -B ' + branch + ' ' + nice_name );
      sh.exec( 'git pull');

    },
  },

  prerequisites: function(){

  },

  tag: {

    list: function(){
      const sh = require( 'shelljs' );

      sh.exec( 'git fetch --all', {
        silent: true
      });

      let tags = sh.exec( 'git tag -l', {
        silent: true
      });

      return tags.stdout.trim().replace(/\s/g, ' ' ).split( ' ' );
    },

    delete: function( tag ){

        if( !tag ){
          console.warn( "No Tag Provided to delete..." );
          return;
        }

        const sh = require( 'shelljs' );

        sh.exec( 'git tag -d ' + tag );
        sh.exec( 'git push origin :refs/tags/' + tag );
    }

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
  }
};

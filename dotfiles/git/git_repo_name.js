'use strict';

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

console.log(repo_name);
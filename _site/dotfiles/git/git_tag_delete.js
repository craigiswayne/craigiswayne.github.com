

/**
 * Used for colors
 */
require( 'manakin' ).global;

const sh = require( 'shelljs' );
let questions;
let git;
let inquirer;

if ( ! sh.which( 'git' ) ) {
  console.error( 'Sorry, this script requires git' );
  sh.exit( 1 );
}

git = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/git/git.js' );

questions = [
  {
    type: 'list',
    name: 'tag',
    message: 'Choose Git Tag to Delete...',
    choices: git.tag.list(),
    required: true,
  },
];


inquirer = require( 'inquirer' );
inquirer.prompt( questions ).then( function( answers ) {
  git.tag.delete( answers.tag );
});

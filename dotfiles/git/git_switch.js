/**
 * Used for colors
 */
require( 'manakin' ).global;

const sh = require( 'shelljs' );
const git = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/git/git.js' );

const target_branch = 2 < process.argv.length ? process.argv[2] : null;

let target_switch_result = null;

if( target_branch ){
  target_switch_result = git.branches.checkout( target_branch );
}

if( target_switch_result ){
    console.error('Could not find this branch...')
    return;
}


var questions = [
  {
    type: 'list',
    name: 'branch',
    message: 'Choose a Branch to switch to...',
    choices: git.branches.list(),
    required: true
  }
];


var inquirer = require('inquirer');
inquirer.prompt( questions ).then(answers => {
  git.branches.checkout( answers.branch );
});

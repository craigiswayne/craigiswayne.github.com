/**
 * Used for colors
 */
require( 'manakin' ).global;

const sh = require( 'shelljs' );
const git = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/git/git.js' );

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

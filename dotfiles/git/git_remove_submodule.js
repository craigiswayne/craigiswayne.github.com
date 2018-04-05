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

var status = sh.exec( 'git submodule status', {
  silent: true
} );

if( 0 !== status.code ){
  console.error( 'You need to be within your git project for this to work...' );
  sh.exit( status.code );
}

var submodule_list = [];
var status_arr = status.split('\n');
for( var i=0; i< status_arr.length; i++){
  var name = status_arr[i].split(' ')[1];
  if( undefined === name ){
    continue;
  }
  submodule_list.push( name );
}

if( submodule_list.length < 1 ){
  console.success( 'No submodules exist for this repository...' );
  sh.exit(1);
}


var questions = [
  {
    type: 'list',
    name: 'submodule',
    message: 'Select which submodule you would like to remove',
    choices: submodule_list
  },
  {
    type: 'confirm',
    name: 'auto_commit',
    message: 'Would you like to automatically commit?',
    default: false
  }
];

var inquirer = require('inquirer');
inquirer.prompt(questions).then(answers => {
    console.info( 'Removing submodule ' + answers.submodule );
    sh.exec( 'git submodule deinit -f ' + answers.submodule );
    sh.exec( 'git rm --cached ' + answers.submodule );
    sh.rm( '-rf', '.git/modules/'+ answers.submodule );

    if( answers.auto_commit ){
      console.info('Committing the changes...');
      sh.exec( 'git add .gitmodules' );
      sh.exec( 'git commit -m "Removed submodule '+ answers.submodule +'"' );
    }

    console.success( 'Finished removing submodule ' + answers.submodule );
    console.log( 'Hello %s', 'World' );
});

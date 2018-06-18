'use strict';

/**
 * Used for colors
 */
require( 'manakin' ).global;

/**
 * Used for shell execution in node
 */
const sh = require( 'shelljs' );

if ( ! sh.which( 'git' ) ) {
  console.error( 'Sorry, this script requires git' );
  sh.exit( 1 );
}

let gitRoot = sh.test( '-d', '.git' );

if ( ! gitRoot ) {
  console.error( 'You need to be in the git root to run this command' );
  sh.exit( gitRoot.code );
}

let status = sh.exec( 'git submodule status', {
  silent: true,
});

if ( 0 !== status.code ) {
  console.error( 'You need to be within your git project for this to work...' );
  sh.exit( status.code );
}

let submoduleList = [];
let statusArr = status.split( '\n' );
for ( let i = 0; i < statusArr.length; i++ ) {
  let name = statusArr[i].split( ' ' )[1];
  if ( undefined === name ) {
    continue;
  }
  submoduleList.push( name );
}

if ( 1 > submoduleList.length ) {
  console.success( 'No submodules exist for this repository...' );
  sh.exit( 1 );
}


let questions = [
  {
    type: 'list',
    name: 'submodule',
    message: 'Select which submodule you would like to remove',
    choices: submoduleList,
  },
  {
    type: 'confirm',
    name: 'auto_commit',
    message: 'Would you like to automatically commit?',
    default: false,
  },
];

let inquirer = require( 'inquirer' );
inquirer.prompt( questions ).then( ( answers ) => {
    console.info( 'Removing submodule ' + answers.submodule );
    sh.exec( 'git submodule deinit -f ' + answers.submodule );
    sh.exec( 'git rm --cached ' + answers.submodule );
    sh.rm( '-rf', '.git/modules/' + answers.submodule );

    if ( answers.auto_commit ) {
      console.info( 'Committing the changes...' );
      sh.exec( 'git add .gitmodules' );
      sh.exec( 'git commit -m "Removed submodule ' + answers.submodule + '"' );
    }

    console.success( 'Finished removing submodule ' + answers.submodule );
    console.log( 'Hello %s', 'World' );
});

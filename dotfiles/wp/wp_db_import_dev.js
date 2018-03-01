'use strict';

require( 'manakin' ).global;

const sh = require( 'shelljs' );
const work = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/24.js' );
const wp = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/wp/wp.js' );


let default_db_name = wp.is_configured() ? wp.db.name() : '';

var questions = [
  {
    type: 'list',
    name: 'db_name',
    message: 'Database Name?',
    choices: work.dev_databases(),
    default: default_db_name,
    required: true
  }
];


var inquirer = require('inquirer');
inquirer.prompt( questions ).then(answers => {
  let dump_file = work.dev.mysql.dump( answers.db_name );

  if( !wp.is_configured() ){
    sh.exec( 'wp core config --dbuser=' + work.local.mysql.username + ' --dbpass=' + work.local.mysql.password + ' --dbname=' + answers.db_name );
    sh.exec( 'wp db create' );
  }

  wp.db.import();

  wp.replace_urls();

  console.log( 'RESET ADMIN USER' );
});

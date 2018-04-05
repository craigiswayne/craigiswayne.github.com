'use strict';

const sh = require( 'shelljs' );
if ( !sh.which( 'git' ) ) {
  console.error( 'Sorry, this script requires git' );
  sh.exit(1);
}

let SmashGit = {
  isRepo: function(){
      let gitStatus = sh.exec( 'git status', { silent: true });

      if( 0 !== gitStatus.code ){
          console.warn( 'Does not seem to be a valid git repository...' );
      }

      return 0 === gitStatus.code;
  },

  merge: {
    develop: function(){
      if( !SmashGit.isRepo() ){
        return;
      }

      sh.exec( 'git fetch --all && git merge origin/develop' );
    }
  },

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

          /**
           * If no branches are found, add the default master branch
           */
          if( 0 === result.length ){
              result.push( 'master' );
          }

          return result;
      },

      checkout: function( branch ){

          if( !branch ){
              console.warn( "No Branch provided..." );
              return;
          }

          const sh = require( 'shelljs' );

          let nice_name = branch.replace(/(origin\/)/g,'');

          let checkout_result = sh.exec( 'git checkout ' + branch + ' -B ' + nice_name );

          if( 0 !== checkout_result.code && -1 !== checkout_result.stderr.indexOf('commit your changes or stash') ){

              var questions = [
                  {
                      type: 'confirm',
                      name: 'discard',
                      message: 'Would you like to discard your changes?',
                      default: true,
                      required: true
                  }
              ];


              var inquirer = require('inquirer');
              inquirer.prompt( questions ).then(answers => {
                  if( answers.discard ){
                  sh.exec( 'git reset --hard' );
              }
          });

          }

          if( 0 !== checkout_result.code ){
              return false;
          }

          console.info( 'Pulling changes from remote...');
          sh.exec( 'git pull');
          return true;
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

  switch: function(){

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

  },

  remote: {
    url: function(){
        const sh = require( 'shelljs' );
        return sh.exec( 'git remote get-url --push origin', { silent: true } ).trim();
    }
  }

};

module.exports = SmashGit;
//
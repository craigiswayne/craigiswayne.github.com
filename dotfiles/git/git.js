'use strict';

let SmashGit = {
    sh: require( 'shelljs' ),
  isRepo: function(){
      let gitStatus = SmashGit.sh.exec( 'git status', { silent: true });

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

      SmashGit.sh.exec( 'git fetch --all && git merge origin/develop' );
    }
  },

  branches: {
      list: function(){
          console.log( 'Fetching all branches... ');

          SmashGit.sh.exec( 'git fetch --all', {
              silent: true
          });

          console.log( 'Fetching all Branches...');

          let branches = SmashGit.sh.exec( 'git branch --all', {
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

          let nice_name = branch.replace(/(origin\/)/g,'');

          let checkout_result = SmashGit.sh.exec( 'git checkout ' + branch + ' -B ' + nice_name );

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
                  SmashGit.sh.exec( 'git reset --hard' );
              }
          });

          }

          if( 0 !== checkout_result.code ){
              return false;
          }

          console.info( 'Pulling changes from remote...');
          SmashGit.sh.exec( 'git pull');
          return true;
      },
  },

  prerequisites: function(){

  },

  tag: {

      list: function(){

          SmashGit.sh.exec( 'git fetch --all', {
              silent: true
          });

          let tags = SmashGit.sh.exec( 'git tag -l', {
              silent: true
          });

          return tags.stdout.trim().replace(/\s/g, ' ' ).split( ' ' );
      },

      delete: function( tag ){

          if( !tag ){
              console.warn( "No Tag Provided to delete..." );
              return;
          }

          SmashGit.sh.exec( 'git tag -d ' + tag );
          SmashGit.sh.exec( 'git push origin :refs/tags/' + tag );
      }

  },

  repo_name: function () {

      /**
       * Used for colors
       */
      require( 'manakin' ).global;

      var git_root = SmashGit.sh.test( '-d', '.git' );

      if( !git_root ){
          console.error( 'You need to be in the git root to run this command' );
          SmashGit.sh.exit( git_root.code );
      }

      var repo_name = SmashGit.sh.exec( 'pwd', {
          silent: true
      });

      repo_name = repo_name.stdout.split( '/' ).slice(-1)[0].replace('\n', '');

      return repo_name;
  },

  switch: function( targetBranch ){

      var questions = [
          {
              type: 'list',
              name: 'branch',
              message: 'Choose a Branch to switch to...',
              choices: SmashGit.branches.list(),
              required: true
          }
      ];


      var inquirer = require('inquirer');
          inquirer.prompt( questions ).then(answers => {
              SmashGit.branches.checkout( answers.branch );
      });

  },

  remote: {
    url: function(){
        return SmashGit.sh.exec( 'git remote get-url --push origin', { silent: true } ).trim();
    }
  }

};

module.exports = SmashGit;

if ( ! SmashGit.sh.which( 'git' ) ) {
  console.error( 'Sorry, this script requires git' );
  SmashGit.sh.exit(1);
}

if ( 3 >= process.argv.length ){
  let functionRequest = process.argv[2];
  SmashGit[functionRequest]();
}

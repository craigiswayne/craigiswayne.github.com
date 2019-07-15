'use strict';

let SmashGit = {
    sh: require( 'shelljs' ),
  isRepo: function() {
      let gitStatus = SmashGit.sh.exec( 'git status', {silent: true});

      if ( 0 !== gitStatus.code ) {
          console.warn( 'Does not seem to be a valid git repository...' );
      }

      return 0 === gitStatus.code;
  },

  merge: {
    develop: function() {
      if ( ! SmashGit.isRepo() ) {
        return;
      }

      SmashGit.sh.exec( 'git fetch --all && git merge origin/develop' );
    },
  },

  branches: {
      list: function() {
          console.log( 'Fetching all branches... ' );

          SmashGit.sh.exec( 'git fetch --all', {
              silent: true,
          });

          console.log( 'Fetching all Branches...' );

          let branches = SmashGit.sh.exec( 'git branch --all', {
              silent: true,
          });

          let result = branches.stdout.trim();
          result = result.replace( /(remotes\/)/g, '' );
          result = result.replace( /([\n|*|])/g, '' );
          result = result.replace( '->', '' );
          result = result.replace( /\s/g, ' ' );
          result = result.split( ' ' );
          result = result.filter( ( n ) => n );

          /**
           * If no branches are found, add the default master branch
           */
          if ( 0 === result.length ) {
              result.push( 'master' );
          }

          return result;
      },

      checkout: function( branch ) {
          if ( ! branch ) {
              console.warn( 'No Branch provided...' );
              return;
          }

          let niceName = branch.replace( /(origin\/)/g, '' );

          let checkoutResult = SmashGit.sh.exec( 'git checkout ' + branch + ' -B ' + niceName );

          if ( 0 !== checkoutResult.code &&
              -1 !== checkoutResult.stderr.indexOf( 'commit your changes or stash' )
          ) {
              let questions = [
                  {
                      type: 'confirm',
                      name: 'discard',
                      message: 'Would you like to discard your changes?',
                      default: true,
                      required: true,
                  },
              ];


              let inquirer = require( 'inquirer' );
              inquirer.prompt( questions ).then( function( answers ) {
                  if ( answers.discard ) {
                  SmashGit.sh.exec( 'git reset --hard' );
              }
          });
          }

          if ( 0 !== checkoutResult.code ) {
              return false;
          }

          console.info( 'Pulling changes from remote...' );
          SmashGit.sh.exec( 'git pull' );
          return true;
      },
  },

  prerequisites: function() {

  },

  tag: {

      list: function() {
          SmashGit.sh.exec( 'git fetch --all', {
              silent: true,
          });

          let tags = SmashGit.sh.exec( 'git tag -l', {
              silent: true,
          });

          return tags.stdout.trim().replace( /\s/g, ' ' ).split( ' ' );
      },

      delete: function( tag ) {
          if ( ! tag ) {
              console.warn( 'No Tag Provided to delete...' );
              return;
          }

          SmashGit.sh.exec( 'git tag -d ' + tag );
          SmashGit.sh.exec( 'git push origin :refs/tags/' + tag );
      },

  },

  repoName: function() {
      require( 'manakin' ).global;

      let gitRoot = SmashGit.sh.test( '-d', '.git' );

      if ( ! gitRoot ) {
          console.error( 'You need to be in the git root to run this command' );
          SmashGit.sh.exit( gitRoot.code );
      }

      let repoName = SmashGit.sh.exec( 'pwd', {
          silent: true,
      });

      repoName = repoName.stdout.split( '/' ).slice( -1 )[0].replace( '\n', '' );

      return repoName;
  },

  switch: function(targetBranch) {
    let questions = [
      {
        type: 'list',
        name: 'branch',
        message: 'Choose a Branch to switch to...',
        choices: SmashGit.branches.list(),
        required: true,
      },
    ];

    let inquirer = require('inquirer');
    inquirer.prompt(questions).then(function(answers) {
      SmashGit.branches.checkout(answers.branch);
    });
  },

  remote: {
    url: function() {
        return SmashGit.sh.exec( 'git remote get-url --push origin', {silent: true}).trim();
    },
  },

};

module.exports = SmashGit;

if (!SmashGit.sh.which('git')) {
  console.error('Sorry, this script requires git');
  SmashGit.sh.exit(1);
}

if (3 >= process.argv.length) {
  let functionRequest = process.argv[2];
  if (SmashGit.hasOwnProperty(functionRequest)) {
    SmashGit[functionRequest]();
  }
}

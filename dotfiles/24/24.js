'use strict';

// sudo mkdir -p /Volumes/DEV_OLD
// sudo sshfs -o allow_other,defer_permissions root@152.111.240.157:/var/www/ /Volumes/DEV_OLD
// sudo sshfs -o allow_other,defer_permissions root@152.111.240.159:/var/www/ /Volumes/DEV_NEW

let SmashWork = {

  local: {
    mysql: {
      username: 'wordpress',
      password: 'wordpress',
    },
  },

  dev: {

    mysql: {
      username: 'root',
      password: 'mysqlr00t',
      ip: '152.111.240.158',

      dump: function( dbName ) {
          if ( ! dbName ) {
              console.error( 'A DB Name is required for this to work...' );
              return false;
          }

          const wp = require( '../wp/wp.js' );
          let destination = dbName + '.sql';
          destination = wp.isInstalled() ? wp.abspath() + destination : destination;

          const sh = require( 'shelljs' );
          sh.exec( 'mysqldump -u' + module.exports.dev.mysql.username + ' -p' +
              module.exports.dev.mysql.password + ' -h' + module.exports.dev.mysql.ip +
              ' ' + dbName + ' --verbose > ' + destination );
          return destination;
      },
    },

    www: {
      username: 'root',
      host: '152.111.240.159',
      webRoot: '/var/www',
    },

      updateSite: function() {
          // check if relevant folder exists on dev
          // if not, throw error message
          // if it does
          // get site name
          const wp = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/wp/wp.js' );
          const sh = require( 'shelljs' );
          let siteName = wp.siteName();
          if ( ! siteName ) {
              console.warn( 'Doesn\'t seem to be a valid wordpress installation...' );
              console.warn( 'Site Name [' + siteName + '] invalid.' );
              return;
          }

          console.info( 'Site Name is: ' + siteName );
          console.info( 'Checking if ' + siteName + ' exists on the dev server (' + SmashWork.dev.www.host + ')' );
          let siteCheck = sh.exec( 'ssh -o ConnectTimeout=10 ' + SmashWork.dev.www.username + '@' + SmashWork.dev.www.host + ' ls -1 ' + SmashWork.dev.www.webRoot + '/' + siteName, {silent: true});

          if ( 0 !== siteCheck.code ) {
              console.warn( 'The site: ' + siteName + ' cannot be found on the dev server. You will have to do this manually... sadsies' );
              return siteCheck.code;
          }

          console.info( 'Updating ' + SmashWork.dev.www.webRoot + '/' + siteName );
          console.log();
          sh.exec( 'ssh -o ConnectTimeout=10 ' + SmashWork.dev.www.username + '@' + SmashWork.dev.www.host + ' "cd ' + SmashWork.dev.www.webRoot + '/' + siteName + ' && git reset --hard && git fetch --all && git checkout origin/develop -B develop && git pull && composer update --no-interaction && composer install --no-interaction --no-dev && composer info && composer status -v" ' );
          console.success( 'Updated dev.' + siteName + ' with latest changes in the develop branch' );
          SmashWork.dev.restartVarnish();
          return true;
      },

      restartVarnish: function() {
          const sh = require( 'shelljs' );
          console.log( 'Running service varnish restart && service php7.0-fpm restart' );
          sh.exec( 'ssh -o ConnectTimeout=10 ' + SmashWork.dev.www.username + '@' + SmashWork.dev.www.host + ' "service varnish restart && service php7.0-fpm restart" ' );
          console.success( 'Varnish Service restarted.' );
      },

  },

  devDatabases: function() {
    /**
     * Used for colors
     */
    require( 'manakin' ).global;

    /**
     * Used for shell execution in node
     */
    const sh = require( 'shelljs' );

    console.info( 'Fetching DEV Databases...' );
    let devDatabases = sh.exec( 'mysql -u' + this.dev.mysql.username + ' -p' + this.dev.mysql.password + ' -h' + this.dev.mysql.ip + ' -e "SHOW DATABASES"', {
      silent: true,
    });

    return devDatabases.stdout.trim().replace( /\s/g, ' ' ).split( ' ' );
  },

  deploymentTicket: function() {
      const git = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/git/git.js' );
      const wp = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/wp/wp.js' );
      const inquirer = require( 'inquirer' );
      const sh = require( 'shelljs' );

      let siteName = wp.siteName();
      let fullSiteURL = 'https://www.' + siteName;
      let repoOverview = 'https://bitbucket.org/24dotcom/' + siteName + '/overview';
      let gitURL = git.remote.url();
      let releaseBranch = 'release/v1.0.0';
      let releaseBranchURL = 'https://bitbucket.org/24dotcom/' + siteName + '/branch/' + releaseBranch;

      let questionsP1 = [
          {
              type: 'text',
              name: 'siteName',
              message: 'Site Name?',
              default: siteName,
              required: true,
          }];

      inquirer.prompt( questionsP1 ).then( function( answers ) {
        siteName = answers.siteName;

        fullSiteURL = 'https://www.' + siteName;
        repoOverview = 'https://bitbucket.org/24dotcom/' + siteName + '/overview';

        let questionsP2 = [
            {
                type: 'text',
                name: 'fullSiteURL',
                message: 'Full Site URL?',
                default: fullSiteURL,
                required: true,
            },
            {
                type: 'text',
                name: 'gitURL',
                message: 'Git URL?',
                default: gitURL,
                required: true,
            },
            {
                type: 'text',
                name: 'repoOverview',
                message: 'Repo Overview URL?',
                default: repoOverview,
                required: true,
            },
            {
                  type: 'list',
                  choices: git.branches.list(),
                  name: 'releaseBranch',
                  message: 'Choose your release branch?',
                  required: true,
            },
        ];

        inquirer.prompt( questionsP2 ).then( function( answers ) {
          fullSiteURL = answers.fullSiteURL;
          gitURL = answers.gitURL;
          repoOverview = answers.repoOverview;
          releaseBranch = answers.releaseBranch;

          releaseBranchURL = 'https://bitbucket.org/24dotcom/' + siteName + '/branch/' + releaseBranch;

          let questionsP3 = [
              {
                  type: 'text',
                  name: 'releaseBranchURL',
                  message: 'Release Branch URL?',
                  default: releaseBranchURL,
                  required: true,
              },
          ];


          inquirer.prompt( questionsP3 ).then( function( answers ) {
            releaseBranchURL = answers.releaseBranchURL;

            let ticket = 'Hello :)\n' +
                '\n' +
                'could you please deploy [' + fullSiteURL + '|' + fullSiteURL + ']\n' +
                '\n' +
                'with the latest changes in the release branch *' + releaseBranch + '*\n' +
                '\n' +
                '\n' +
                '\n' +
                '| *Repository URL*               | ' + repoOverview + '|\n' +
                '| *Git URL*                      | ' + gitURL + '|\n' +
                '| *Release Branch*               | [' + releaseBranch + '|' + releaseBranchURL + '] |\n' +
                '| *Requires Composer?*           | YES                                              |\n' +
                '| *Submodules?*                  | NO                                               |\n' +
                '| *DB Changes?*                  | UNCHANGED                                        |\n' +
                '| *WP Core Version*              | SET IN COMPOSER                                  |\n' +
                '| *Run Bower?*                   | NO                                               |\n' +
                '| *Run NPM?*                     | NO                                               |\n' +
                '| *Run Grunt?*                   | NO                                               |\n' +
                '| *Skip Varnish for these URLs*  | IMPORT FROM STAGING                              |\n' +
                '| *PHP Version*                  | SET IN COMPOSER                                  |\n' +
                '| *SSL*                          | YES                                              |\n' +
                '\n' +
                '\n' +
                'h3. Post Deploy Checks for Developers\n' +
                '# Remove Customizer Styles\n' +
                '# Remove Text Widget Styles\n' +
                '# Tag and Release\n' +
                '# Merge Branches\n' +
                '# Prune Branches\n' +
                '\n' +
                'Thanks :)';
            sh.exec( 'echo "' + ticket + '" | pbcopy' );
            console.log( ticket );
            console.info( 'The Ticket has been copied to your clipboard :) ' );
          });
        });
      });
  },

};

module.exports = SmashWork;

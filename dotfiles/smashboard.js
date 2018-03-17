'use strict';

require( 'manakin' ).global;

const sh = require( 'shelljs' );

// const git = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/git/git.js' );
const inquirer = require( 'inquirer' );

// const work = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/24/24.js' );
const wp = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/wp/wp.js' );
const work = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/24/24.js' );

let Smashboard = {

    tasks: {
      sites: {
        new: 'Setup a new site',
        delete: 'Delete an existing site',
        update_dev: 'Update this respective dev site',
      },
      system_mail: 'System Mail'
    },

    web_root: '/usr/local/var/www',

    welcome: function() {

        console.info( "" +
            " _ _ _  _  _|_    \n" +
            "_\\| | |(_|_\\| |..." );
        var questions = [
            {
                type: 'list',
                choices: [Smashboard.tasks.sites.new, Smashboard.tasks.sites.delete, Smashboard.tasks.system_mail, Smashboard.tasks.sites.update_dev ],
                name: 'task',
                message: 'What would you like to do today?'
            }
        ];

        inquirer.prompt( questions ).then(answers => {

            if( Smashboard.tasks.sites.new === answers.task ){
                Smashboard.setup_wp_site();
                return;
            }

            if( Smashboard.tasks.sites.update_dev === answers.task ){
              //check if relevant folder exists on dev
              //if not, throw error message
              //if it does
              //get site name

              let siteName = wp.siteName();
              console.info( 'Site Name is: ' + siteName );
              console.info( 'Checking if ' + siteName + ' exists on the dev server ('+ work.dev.www.host+')' );
              let siteCheck = sh.exec( 'ssh -o ConnectTimeout=10 '+work.dev.www.username + '@' + work.dev.www.host + ' ls -1 ' + work.dev.www.web_root + '/' + siteName, { silent: true }  );

              if( 0 !== siteCheck.code ){
                console.warn( 'The site: ' + siteName + ' cannot be found on the dev server. You will have to do this manually... sadsies' );
              }else{
                console.info( 'Updating ' + work.dev.www.web_root + '/' + siteName );
                console.log();
                sh.exec( 'ssh -o ConnectTimeout=10 '+work.dev.www.username + '@' + work.dev.www.host + ' "cd ' + work.dev.www.web_root + '/' + siteName + ' && git reset --hard && git fetch --all && git checkout origin/develop -B develop && git pull && composer update && composer install" ' );
                console.success( 'Updated dev.' + siteName + 'with latest changes in the develop branch' );
              }



              return;

            }



            if( Smashboard.tasks.system_mail === answers.task ){
              sh.exec( 'cat /private/var/mail/$(whoami)' );
              return;
            }
        });
    },

    setup_wp_site: function() {

        var questions = [
            {
                type: 'text',
                name: 'gitURL',
                message: 'Enter in git repo url',
                validate: function( value ){
                    var pass = value.match( /^git@(\S*).git$/gm );
                    if( pass ) {
                        return true;
                    }

                    return 'Please enter a valid git url...';
                }
            }
        ];

        inquirer.prompt( questions ).then( answers_p1 => {

            let autoSiteName = answers_p1.gitURL.replace( /(?:.*)\/(.*).git$/g, '$1' );

            inquirer.prompt( [
                {
                    type: 'text',
                    name: 'siteName',
                    message: 'Enter in the Site Name',
                    default: autoSiteName
                }
            ]).then( answers_p2 => {
                let destination = Smashboard.web_root + '/' + answers_p2.siteName;


                console.log( 'Git URL: ' + answers_p1.gitURL );
                console.log( 'Site Name: ' + answers_p2.siteName );
                console.log( 'Destination: ' + destination );

                //clone the site
                sh.exec( 'git clone ' + answers_p1.gitURL + ' -b develop ' + destination );

                // if( sh.test( '-d', destination ) ){
                //   inquirer.prompt( [
                //     {
                //         type: 'confirm',
                //         name: 'empty_existing',
                //         message: 'Site exists... would you like to empty?',
                //         default: true
                //     }
                //   ]).then( answers_p3 => {
                //
                //   });
                // }

                sh.cd( destination );
                Smashboard.maybe_do_composer();
                wp.db.import_dev();
                //reset admin user

                console.log( 'done' );


            });

        });
    },

    maybe_do_composer: function( path ){

        path = path || './';
        console.log( path );

        let composerFileExists = sh.test( '-f', path + 'composer.json' );

        if( ! composerFileExists ){
            console.debug( 'Could not find composer.json' );
            return;
        }

        sh.exec( 'composer update && composer install' );
    }

};

if( 2 === process.argv.length ){
    Smashboard.welcome();
}

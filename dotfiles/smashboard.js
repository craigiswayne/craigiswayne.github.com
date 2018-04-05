'use strict';

require( 'manakin' ).global;

const sh = require( 'shelljs' );

const git = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/git/git.js' );
const inquirer = require( 'inquirer' );

const wp = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/wp/wp.js' );
const work = require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/24/24.js' );

let Smashboard = {

    wp: require( '/usr/local/var/www/craigiswayne.github.com/dotfiles/wp/wp.js' ),

    tasks: {
        importDemo: 'Import Demo Data',
        new: 'Setup a new site',
        delete: 'Delete an existing site',
        updateDev: 'Update this respective dev site',
        importDev: 'Import this respective dev DB',
        goToDev: 'Go to the Dev Server',
        flushDevCache: 'Flush Dev Cache',
        mergeDevelop: 'Merge in latest changes from the develop branch',
        deploymentTicket: 'Log a Deployment Ticket for this site',
        system_mail: 'System Mail'
    },

    _verbose: null,

    web_root: '/usr/local/var/www',

    welcome: function() {

        var i = 0;

        console.info( "" +
            " _ _ _  _  _|_    \n" +
            "_\\| | |(_|_\\| |..." );

        let choices = [];
        for( i; i < Object.keys( Smashboard.tasks ).length; i++ ){
            choices.push( Smashboard.tasks[ Object.keys( Smashboard.tasks )[i]] );
        }

        let questions = [
            {
                type: 'list',
                choices: choices,
                name: 'task',
                message: 'What would you like to do today?'
            }
        ];

        inquirer.prompt( questions ).then(answers => {

            if( answers.task === Smashboard.tasks.importDemo ){
                Smashboard.wp.import.demo();
                return;
            }

            if( answers.task === Smashboard.tasks.deploymentTicket ){
                work.deploymentTicket();
                return;
            }

            if( answers.task === Smashboard.tasks.flushDevCache ){
                work.dev.restartVarnish();
                return;
            }

            if( Smashboard.tasks.mergeDevelop === answers.task ){

                git.merge.develop();

                return;
            }

            if( Smashboard.tasks.new === answers.task ){
                Smashboard.setup_wp_site();
                return;
            }

            if( Smashboard.tasks.importDev === answers.task ){
                wp.db.import_dev();
                return;
            }

            if( Smashboard.tasks.updateDev === answers.task ){
                work.dev.updateSite();
                return;
            }

            if( Smashboard.tasks.system_mail === answers.task ){
              sh.exec( 'cat /private/var/mail/$(whoami)' );
              return;
            }

            console.log( 'Coming soon...' );
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

            let autoSiteName = answersP1.gitURL.replace( /(?:.*)\/(.*).git$/g, '$1' );

            inquirer.prompt( [
                {
                    type: 'text',
                    name: 'siteName',
                    message: 'Enter in the Site Name',
                    default: autoSiteName
                }
            ]).then( answersP2 => {
                let destination = Smashboard.web_root + '/' + answersP2.siteName;


                console.log( 'Git URL: ' + answersP1.gitURL );
                console.log( 'Site Name: ' + answersP2.siteName );
                console.log( 'Destination: ' + destination );

                //clone the site
                sh.exec( 'git clone ' + answersP1.gitURL + ' -b develop ' + destination );

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
    },

    isVerbose: function(){
        return Smashboard._verbose || ( -1 !== process.argv.indexOf( '-v' ) );
    },

    verbose: {

        log: function( message ){

            if( ! Smashboard.isVerbose() ){
                return;
            }

            console.info( message );
        }
    }
};

if( 2 <= process.argv.length ){
    Smashboard.welcome();
}

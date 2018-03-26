'use strict';

require('manakin').global;
const sh = require('shelljs');
const git = require('/usr/local/var/www/craigiswayne.github.com/dotfiles/git/git.js');
const inquirer = require('inquirer');
const work = require('/usr/local/var/www/craigiswayne.github.com/dotfiles/24/24.js');

let SmashWP = {

    install: function () {
        //wp core install --url --title --admin_user --admin_email
    },

    is_installed: function (verbose) {

        let result = sh.exec('wp core is-installed', {
            silent: true
        });


        verbose = true === verbose;

        if (0 !== result.code && verbose) {
            console.error('You can only run this within a WordPress installation.');
        }

        return 0 === result.code;
    },

    is_configured: function () {
        let result = sh.exec('wp config', {
            silent: true
        });

        if (0 !== result.code) {
            console.warn('WordPress is not configured...');
        }

        return 0 === result.code;
    },

    replace_urls: function () {

        console.info('Replacing WordPress URLs');

        if (!this.is_installed(true)) {
            return;
        }

        const quiet_mode = -1 === process.argv.indexOf('-q') ? false : true;
        const available_subdomains = ['local', 'dev', 'staging', 'www'];
        const available_protocols = ['https', 'http'];

        let desired_subdomain = available_subdomains[0]
        let desired_protocol = available_protocols[0];

        var site_name = git.repo_name();

        function _do_replace() {

            var desired_site_url = desired_protocol + '://' + desired_subdomain + '.' + site_name

            for (var i = 0; i < available_subdomains.length; i++) {


                for (var j = 0; j < available_protocols.length; j++) {

                    /**
                     * Don't do anything for the chosen subdomain
                     */
                    if (desired_subdomain === available_subdomains[i]) {
                        continue;
                    }

                    var protocol = available_protocols[j];
                    var sub_domain = available_subdomains[i];
                    var from = protocol + '://' + sub_domain + '.' + site_name;

                    console.log('Replacing ' + from + ' -> ' + desired_site_url);
                    sh.exec('wp search-replace ' + from + ' ' + desired_site_url + '');
                    console.log('');
                }
            }

            /**
             * Make sure that dynamic protocols are used system wide if https is selected
             */
            if ('https' === desired_protocol) {
                console.log('Replacing all non-secure protocols with dynamic protocols...');
                sh.exec('wp search-replace http:// //');
            }


            sh.exec("wp option update 'siteurl' '" + desired_site_url + "' --skip-packages --skip-plugins --skip-themes");
            console.log();
            console.success("SITE URL is now: " + desired_site_url);
            sh.exec('open ' + desired_site_url);

        }

        if (quiet_mode) {
            console.warn('Working in quiet mode...');
            _do_replace();
            return;
        }

        var questions = [
            {
                type: 'input',
                name: 'site_name',
                message: 'Site Name?',
                default: site_name
            },
            {
                type: 'list',
                name: 'desired_subdomain',
                message: 'Desired Subdomain',
                choices: available_subdomains,
                default: available_subdomains[0]
            },
            {
                type: 'list',
                name: 'desired_protocol',
                message: 'Desired Protocol?',
                choices: available_protocols,
                default: available_protocols[0]
            },

        ];


        var inquirer = require('inquirer');
        inquirer.prompt(questions).then(answers => {
            site_name = answers.site_name;
        desired_subdomain = answers.desired_subdomain;
        _do_replace();
    })
        ;
    },

    option: {
      //wp option get siteurl
      siteurl: function(){
        let command =  sh.exec( 'wp option get siteurl', {
          silent: true
        });

        if( 0 !== command.code ){
          return false;
        }

        return command.stdout.trim();
      }
    },

    siteName: function(){
      let siteURL = SmashWP.option.siteurl();
        console.log( 'siteURL is ' + siteURL );
      if( !siteURL ){
        return false;
      }

      const extractDomain = /^https?:\/\/(?:\w*).(.*)/g;
      let siteName = !siteURL ? null : siteURL.replace(extractDomain, `$1`).trim();
      return siteName;
    },

    db: {

        name: function () {
            let db_name = sh.exec("wp config get --constant=DB_NAME --skip-plugins --skip-themes", {
                silent: true
            });
            return db_name.stdout.trim();
        },

        _import: function (dump_file) {

            if (!dump_file) {
                sh.echo('Failed, no dump file given...');
                return;
            }

            sh.exec('wp db import ' + dump_file);
        },

        import_dev: function () {

            let defaultDBName = SmashWP.is_configured() ? SmashWP.db.name() : '';

            var questions = [
                {
                    type: 'list',
                    name: 'db_name',
                    message: 'Database Name?',
                    choices: work.dev_databases(),
                    default: defaultDBName,
                    required: true
                },
                {
                    type: 'confirm',
                    name: 'db_reset',
                    message: 'Reset the DB?',
                    default: true,
                    required: true
                }
            ];

            inquirer.prompt(questions).then(answers => {

                if (!SmashWP.is_configured()) {
                    console.info('Attempting to configure WordPress...');
                    sh.exec( 'wp core config --dbuser=' + work.local.mysql.username + ' --dbpass=' + work.local.mysql.password + ' --dbname=' + answers.db_name );
                    sh.exec( 'wp db create' );
                }

                if( answers.db_reset ){
                    sh.exec('wp db reset --yes');
                }

                let dump_file = work.dev.mysql.dump(answers.db_name);

                SmashWP.db._import(dump_file);

                SmashWP.replace_urls();
            });
        }
    },

    config: function(){
        console.log( 'hellow' );
        //tries to create a db name from the current work directory
        let cwd = sh.exec( 'cwd', { silent: true } );
        console.log(cwd);
        let domain = cwd.stdout();
        console.log(domain);

    }
};

module.exports = SmashWP;


if( 2 >= process.argv.length && undefined !== SmashWP[process.argv[2]] && typeof SmashWP[process.argv[2]] === 'function'){
  SmashWP[process.argv[2]]();
}
// else{
//   console.log( 'Could not run function by args...');
//   console.log( process.argv )
//   console.log( SmashWP[process.argv[2]] );
//}

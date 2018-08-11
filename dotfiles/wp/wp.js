'use strict';

require('manakin').global;
const sh = require('shelljs');
const git = require(
    '/usr/local/var/www/craigiswayne.github.com/dotfiles/git/git.js');
const inquirer = require('inquirer');
const work = require(
    '/usr/local/var/www/craigiswayne.github.com/dotfiles/24/24.js');

let SmashWP = {

  defaults: {
    user: {
      username: 'admin',
      password: 'admin',
      email: 'craigiswayne@gmail.com',
    },
    subdomains: ['local', 'dev', 'staging', 'www'],
    protocols: ['https', 'http'],
  },

  config: {
    get: function(key) {
      return sh.exec('wp config get --constant=' + key +
          ' --skip-plugins --skip-themes --skip-packages --allow-root', {
        silent: true,
      }).stdout.trim();
    },
  },

  getURL: function() {
    return SmashWP.isConfigured() ?
        SmashWP.config.get('WP_SITEURL') :
        sh.exec('basename $(pwd)', {silent: true}).stdout.trim();
  },

  doInstall: function() {
    sh.exec('wp core install --url="' + SmashWP.getURL() +
        '" --title="" --admin_user="' + SmashWP.defaults.user.username +
        '" --admin_email="' + SmashWP.defaults.user.email + '"');
  },

  isInstalled: function(options) {
    let result = sh.exec('wp core is-installed', {
      silent: true,
    });

    if (0 !== result.code) {
      console.error('You can only run this within a WordPress installation.');
    }

    return 0 === result.code;
  },

  isConfigured: function() {
    let result = sh.exec('wp config', {
      silent: true,
    });

    return 0 === result.code;
  },

  maybeConfigure: function(options) {
    if (SmashWP.isConfigured()) {
      return;
    }

    console.info('Attempting to configure WordPress');
    SmashWP.doInstall();
    options = Object.assign({dbName: SmashWP.db.name()}, options);
    sh.exec('wp core config --dbuser=' + work.local.mysql.username +
        ' --dbpass=' + work.local.mysql.password + ' --dbname=' +
        options.dbName);
    sh.exec('wp db create');
  },

  replaceURLs: function() {
    console.info('Replacing WordPress URLs');

    // if (!this.isInstalled(true)) {
    //     return;
    // }

    let siteName = git.repoName();

    let questions = [
      {
        type: 'input',
        name: 'site_name',
        message: 'Site Name?',
        default: siteName,
      },
      {
        type: 'list',
        name: 'desiredSubdomain',
        message: 'Desired Subdomain',
        choices: SmashWP.defaults.subdomains,
        default: SmashWP.defaults.subdomains[0],
      },
      {
        type: 'list',
        name: 'desiredProtocol',
        message: 'Desired Protocol?',
        choices: SmashWP.defaults.protocols,
        default: SmashWP.defaults.protocols[0],
      },

    ];

    let inquirer = require('inquirer');
    inquirer.prompt(questions).then(function(answers) {
      SmashWP._do_replace('https', answers.desiredSubdomain, answers.site_name);
    });
  },

  _do_replace: function(
      desiredProtocol = '', desiredSubdomain = '', desiredSitetName = '') {
    let desiredSiteURL = desiredProtocol + '://' + desiredSubdomain + '.' +
        desiredSitetName;

    for (let i = 0; i < SmashWP.defaults.subdomains.length; i++) {
      for (let j = 0; j < SmashWP.defaults.protocols.length; j++) {
        /**
         * Don't do anything for the chosen subdomain
         */
        if (desiredSubdomain === SmashWP.defaults.subdomains[i]) {
          continue;
        }

        let protocol = SmashWP.defaults.protocols[j];
        let subDomain = SmashWP.defaults.subdomains[i];
        let from = protocol + '://' + subDomain + '.' + desiredSitetName;

        console.log('Replacing ' + from + ' -> ' + desiredSiteURL);
        sh.exec('wp search-replace ' + from + ' ' + desiredSiteURL +
            ' --report-changed-only --skip-plugins --skip-themes --skip-packages --all-tables');
        console.log('');
      }
    }

    /**
     * Make sure that dynamic protocols are used system wide if https is selected
     */
    if ('https' === desiredProtocol) {
      console.log();
      console.log(
          'Replacing all non-secure protocols with dynamic protocols...');
      sh.exec(
          'wp search-replace http:// https:// --report-changed-only --skip-themes --skip-plugins --skip-packages');
    }

    // if the db was imported from a different site, make sure that the requested site name replaces that of the other site
    // @todo allow importing a db from a different site
    let currentSiteName = SmashWP.siteName();
    if (currentSiteName !== desiredSitetName) {
      console.log();
      console.log('Current Site Name does not match... updating...');

      // sh.exec( 'wp search-replace ' + currentSiteName + ' ' + desiredSitetName + ' --report-changed-only');
      // sh.exec( 'wp option update sitename ' + desiredSitetName );
    }

    console.log();
    console.success('SITE URL is now: ' + SmashWP.siteName());
    sh.exec('open ' + desiredSiteURL);
  },

  option: {

    // wp option get siteurl
    siteurl: function() {
      let command = sh.exec('wp option get siteurl', {
        silent: true,
      });

      if (0 !== command.code) {
        return false;
      }

      return command.stdout.trim();
    },
  },

  siteName: function() {
    let siteURL = SmashWP.option.siteurl();

    if (!siteURL) {
      return false;
    }

    const extractDomain = /^https?:\/\/(?:\w*).(.*)/g;
    let siteName = !siteURL ?
        null :
        siteURL.replace(extractDomain, '$1').trim();

    const removeProtocol = /(?:.*)\/\/(.*)/g;
    const subst = '$1';
    siteName = siteName.replace(removeProtocol, subst);

    return siteName;
  },

  db: {

    /**
     * Gets the DB Name from the Configuration, fallsback to the folder name
     *
     * @return {string|*}
     */
    name: function() {
      return SmashWP.isConfigured() ?
          SmashWP.config.get('DB_NAME') :
          sh.exec('basename $(pwd)', {silent: true}).
              stdout.
              trim().
              split('.')[0];
    },

    _import: function(dumpFile) {
      if (!dumpFile) {
        sh.echo('Failed, no dump file given...');
        return;
      }

      sh.exec('wp db import ' + dumpFile);
    },

    importDev: function() {
      SmashWP.maybeConfigure();

      let questions = [
        {
          type: 'list',
          name: 'dbName',
          message: 'Database Name?',
          choices: work.devDatabases(),
          default: SmashWP.db.name(),
          required: true,
        },
        {
          type: 'confirm',
          name: 'dbReset',
          message: 'Reset the DB?',
          default: true,
          required: true,
        },
      ];

      inquirer.prompt(questions).then(function(answers) {
        if (answers.dbReset) {
          sh.exec('wp db reset --yes');
        }

        let dumpFile = work.dev.mysql.dump(answers.dbName);

        SmashWP.db._import(dumpFile);

        SmashWP.replaceURLs();
      });
    },
  },

  import: {
    demo: function() {
      const sh = require('shelljs');
      sh.exec('wp plugin install wordpress-importer --activate --allow-root ' +
          '&& curl -fsSL https://rawgit.com/craigiswayne/wp-theme-unit-test/master/uikit-v2.xml -o uikit-v2.xml ' +
          '&& wp import uikit-v2.xml --authors=create --allow-root' +
          '&& rm uikit-v2.xml ' +
          '&& curl -fsSL https://rawgit.com/craigiswayne/wp-theme-unit-test/master/themeunittestdata.wordpress.xml -o themeunittestdata.wordpress.xml ' +
          '&& wp import themeunittestdata.wordpress.xml --authors=create --allow-root ' +
          '&& rm themeunittestdata.wordpress.xml;\n');
    },
  },

  grabFileFromEnv: function(env) {
    this.option.siteName();

    // rsync -aruv "root@152.111.240.159:/var/www/paws.24.com/*sql" ~/www/paws.24.com
  },
};

module.exports = SmashWP;

if (2 >= process.argv.length && undefined !== SmashWP[process.argv[2]] &&
    'function' === typeof SmashWP[process.argv[2]]) {
  SmashWP[process.argv[2]]();
}

// else{
//   console.log( 'Could not run function by args...');
//   console.log( process.argv )
//   console.log( SmashWP[process.argv[2]] );
// }

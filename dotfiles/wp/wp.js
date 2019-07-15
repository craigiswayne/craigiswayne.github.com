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

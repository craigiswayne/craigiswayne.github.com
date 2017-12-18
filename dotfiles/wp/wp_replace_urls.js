'use strict';

/**
 * Used for colors
 */
require( 'manakin' ).global;

/**
 * Used for shell execution in node
 */
const sh = require( 'shelljs' );

var wp_is_installed = sh.exec( 'wp core is-installed' );
if( 0 !== wp_is_installed.code ){
  console.error( 'You can only run this within a WordPress installation.' );
}

var available_subdomains = [ 'local', 'dev', 'staging', 'www' ];
var available_protocols = [ 'http', 'https' ];

var default_site_name = sh.exec( 'git_repo_url', {
  silent: true
});

var questions = [
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
  {
    type: 'input',
    name: 'site_name',
    message: 'Site Name?',
    default: default_site_name.stdout
  }
];


var inquirer = require('inquirer');
inquirer.prompt( questions ).then(answers => {

  for( var i=0; i < available_subdomains.length; i++ ){


    for( var j=0; j < available_protocols.length; j++ ){

      /**
       * Don't do anything for the chosen subdomain
       */
      if( answers.desired_subdomain === available_subdomains[i] ){
        continue;
      }

      var protocol = available_protocols[j];
      var sub_domain = available_subdomains[i];

      console.log( 'Replacing ' + protocol + '://' + sub_domain + '.' + answers.site_name + ' -> ' + answers.desired_protocol + '://' + answers.desired_sub_domain + '.' + answers.site_name );
      // sh.exec( 'wp search-replace "' + protocol + '"' );
    }
  }

});



// for sub_domain in "${sub_domains[@]}"
// do
//   for protocol in "${protocols[@]}"
//   do
//
//     if [ $sub_domain != $desired_sub_domain ]
//     then
//       echo "";
//       echo "Replacing $protocol://$sub_domain.$site -> $desired_protocol://$desired_sub_domain.$site";
//       wp search-replace "$protocol://$sub_domain.$site" "$desired_protocol://$desired_sub_domain.$site" --skip-packages --skip-plugins --skip-themes;
//       wp search-replace "$sub_domain.$site" "$desired_protocol://$desired_sub_domain.$site" --skip-packages --skip-plugins --skip-themes;
//     fi;
//
//   done
// done
//
//
// for protocol in "${protocols[@]}"
// do
//   echo "";
//   echo "Replacing $protocol://$site -> $desired_protocol://$desired_sub_domain.$site";
//   wp search-replace "$protocol://$sub_domain.$site" "$desired_protocol://$desired_sub_domain.$site" --skip-packages --skip-plugins --skip-themes;
// done
//
// wp search-replace //$site //$desired_sub_domain.$site --skip-packages --skip-plugins --skip-themes;
// wp search-replace https:// http:// --skip-packages --skip-plugins --skip-themes;
// wp search-replace http://http:// http:// --precise --all-tables --skip-packages --skip-plugins --skip-themes;
// site_url=$desired_protocol://$desired_sub_domain.$site;
// wp option update 'siteurl' $site_url --skip-packages --skip-plugins --skip-themes;
// echo "SITE URL is now: $site_url";

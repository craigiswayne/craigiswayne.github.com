# Persona Github Page
A Resume Template based of the [Resume Bootstrap Template](https://startbootstrap.com/themes/resume/) with the [Minima Jekyll Template](https://jekyll.github.io/minima/)

## Lighthouse Ratings

| **DEVICE**    | **PERFORMANCE**   | **ACCESSIBILITY** | **BEST PRACTICES**    | **SEO**   | **PWA**   |
| ------------- | ----------------- | ----------------- | --------------------- | --------- | --------- |
| Desktop       | 25                | 97                | 100                   | 100       | n/a       |
| Mobile        | 33                | 97                | 100                   | 100       | n/a       |

## Getting Started
Install dependencies and start serving your site

```
npm ci
npm start
```

## Changes

### Config Changes
making any config changes require restarting the server

### Overriding the template defaults
Run the following command in your terminal
```
bundle show minima
```

This will show you where the actual files used for minima reside.

Copy the folder structure into the root of your repo.

Override to your hearts content.

> See here for the official docs on how to override templates
> https://jekyllrb.com/docs/themes/#overriding-theme-defaults

### Debugging
you can dump the value of any variable using the following syntax

```
{{ site | inspect }}
```

or alternatively print out the objects value with

```
{{ jekyll | jsonify }}
```

### References:
1. https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll


### TODO:
* [ ] AddThis Script to be a partial based off config
* [X] Assets for 3rd party vendors to use package manager
* [ ] Use sass for custom assets
* [ ] minify custom assets
* [ ] Combine custom assets (js, css)
* CSS Coverage
* JS Coverage
* Lighthouse in pipeline
* lighthouse bade on project page
* [ ] Lighthouse report
* Pipeline tests before trying to merge
* [ ] Break up head template into partials for og tags and twitter etc etc
* Convert Categories to Tags in all posts
* Compare new header to older header
* Add skills for typescript, mongo, kibana, elastic, postman, chai
* Add skills for mongo
* Show thumbnail on post listings
* Pagination for posts page
* [ ] Remove all TODOs from site
* [ ] All meta tags to have values and names
* show codepen links
  * these links should appear much like how you want to display projects or websites in portfolio
  * should contain description
* [ ] include cypress testing
* [ ] twitter card validation
* stack overflow badge
* validate og tags here
* percy.io for visual testing?
* bring back addthis see footer.html
* make use of env config files to set the siteurl
* post about verified site owner: https://search.google.com/search-console
* https://search.google.com/search-console/not-verified?original_url=/search-console/ownership&original_resource_id
* CV Generation from the site
* Available for hire badge

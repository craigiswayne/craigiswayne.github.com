---
layout: post
title:  "Copy files after npm install"
date:   2019-11-18
categories: javascript npm scripts
---

The example below shows you how to copy bootstrap files to another folder within your project.

Things to note:
1. The library __**WILL CREATE DIRECTORIES**__ for you
1. It will output to the console straight after you run `npm i`
1. The library __**WILL NOT**__ run after installing a specific package
1. __**DOES NOT**__ remove files if you update the search strings

-------------------------------------------------------------------------------

### STEP 1: install `copy-files-from-to` package
```shell
npm i -D copy-files-from-to
```

### STEP 2: configure `package.json`
```javascript
{
  "scripts": {
    "postinstall": "copy-files-from-to"
  },
  "copyFiles":[
    {
      "from": "node_modules/bootstrap/dist/css/*",
      "to": "assets/vendor/bootstrap/css/"
    }
  ]
}
```

### STEP 3: install packages
```shell
npm i
```

> See Package Page for more info:
> https://www.npmjs.com/package/copy-files-from-to

---
layout: post
title:  "Transpile Typescript to Javascript"
date:   2019-08-08
categories: typescript javascript node npm
---

This snippet will allow you to transpile (convert) typescript code into valid ES2015 code

### terminal / command line

```
mkdir -p ./assets/scripts;
touch ./assets/scripts/scripts.ts;
npm install typescript --save-dev
```

### package.json
```
scripts:{
  "ts": "tsc ./assets/scripts/scripts.ts --outDir ./dist",
}
```



## Using Babel
```shell
npm install --save-dev @babel/cli @babel/plugin-proposal-class-properties @babel/plugin-transform-spread
touch babel.config.json
touch babel.config.dev.json

echo '{
  "presets": ["@babel/preset-env"],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-spread"
  ],
  "comments": false
}' > babel.config.json

echo '{
  "extends": "./babel.config.json",
  "comments": true,
  "sourceMaps": "inline"
}' > babel.config.dev.json
```

```json
{
  "scripts": {
    "compile:js": "babel scripts.js -o dist/scripts.js",
    "compile:js:dev": "babel --config-file ./babel.config.dev.json -o dist/scripts.js scripts.js"
  }
}
```

---
layout: post
title:  "Compile scss Files"
date:   2020-06-06
categories: npm scripts compile scss
---

refer to https://gist.github.com/craigiswayne/8d72ad807fd7d00af568eaa5f280cec8

# How to Setup npm and scss \ sass
```
npm install node-sass --save-dev
mkdir -p src/styles
touch src/styles/styles.scss
```

In your generated package.json add the following to your **scripts** entry

```
"scripts": {
  "compile:sass:dev":   "node-sass assets/css -o assets/css --output-style=compressed --error-bell --source-comments=false --source-map=true",
  "compile:sass":       "node-sass assets/css -o assets/css --output-style=compressed --error-bell",
  "watch:sass":         "npm run compile:sass -- --watch",  
  "watch":              "npm run watch:sass"
}
```

Then to get up and running, just do the following in your command line \ terminal

```
npm run compile:sass
npm run watch:sass
```


If you wish to compile just one file
```
"scripts": {
  "compile:sass": "node-sass input-file.css output-file.css"
}
```

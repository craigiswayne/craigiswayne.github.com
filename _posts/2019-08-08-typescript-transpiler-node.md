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
npm install typescript --save
```

### package.json
```
scripts:{
  "ts": "tsc ./assets/scripts/scripts.ts --outDir ./dist",
}
```

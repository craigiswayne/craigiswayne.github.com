---
layout: post
title:  "Maintaining JavaScript!"
date:   2019-07-30 01:16:54 +0200
categories: housekeeping maintenance
tags: javascript maintenance typescript eslint pipelines
---

Here are some of my discoveries with regards to maintaining javascript / typescript files in a project.

# TypeScript
## tsconfig.json

```
{
  "compilerOptions":{
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

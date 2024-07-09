---
layout: post
title:  "Different Types of methods for requiring Composer packages"
date:   2019-09-02
categories: [composer]
---

## Requiring a non-packagist package

First define your package in the `repositories` section

using either of these options

```json
{
  "repositories": [
    {
      "type": "package",
      "package": {
        "name": "vendor-name/package-name",
        "version": "dev-main",
        "type": "library",
        "source": {
          "url": "https://gitlab.com/user-name/repo-name.git",
          "type": "git",
          "reference": "origin/main"
        }
      }
    }
  ]
}
```

OR (using https)

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url":  "https://github.com/user-name/repo-name.git"
        }
    ]
}
```

OR (using ssh)

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url":  "git@bitbucket.org:user-name/repo-name.git"
        }
    ]
}
```

OR (using a local folder)

```json
{
  "repositories": [
    {
      "type": "path",
      "url": "../your-local-path"
    }
  ]
}
```

then require the repository

have a look at the composer.json file in the repo for these values

```json
{
   "require": {
      "vendor-name/package-name": "*"
   }
}
```

OR 
```
{
   ...
   "require": {
      "user-name/repo-name": v1.0.0 <---- this comes from the git tag
   }
   ...
}
```

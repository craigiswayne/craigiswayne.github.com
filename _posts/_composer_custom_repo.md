# Require a custom repo
First define your repo in the `repositories` section

using either of these options

```
"repositories": [
        {
            "type": "package",
            "package": {
                "name": "vendor-name/package-name",
                "version": "dev-master",
                "type": "library",
                "source": {
                    "url": "https://gitlab.com/user-name/repo-name.git",
                    "type": "git",
                    "reference": "origin/master"
                }
            }
        }
    ]
```

OR


```
    "repositories": [
        {
            "type": "vcs",
            "url":  "https://github.com/user-name/repo-name.git"
        }
    ]
```

OR

```
    "repositories": [
        {
            "type": "vcs",
            "url":  "git@bitbucket.org:user-name/repo-name.git"
        }
    ]
```

then require the repository

have a look at the composer.json file in the repo for these values
```
{
   ...
   "require": {
      "user-name/repo-name": dev-master
   }
   ...
}
```

OR 

{
   ...
   "require": {
      "user-name/repo-name": v1.0.0 <---- this comes from the git tag
   }
   ...
}



.gitignore
```
.phplint-cache
vendor
```

.phplint.yml
```
path: ./wp-content
jobs: 10
```

composer.json
```
"scripts": {
    "phplint": "./vendor/bin/phplint -vvv --no-cache"
},
"require": {},
"require-dev": {
    "overtrue/phplint": "dev-master",
    "symfony/polyfill": "^1.17@dev"
}
```

.gitlab-ci.yml
```
```

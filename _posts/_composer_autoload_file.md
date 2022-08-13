### Autoloading a file via composer from an external package
composer.json

```
{
    "name": "craigiswayne/my_utils",
    "description": "Collection of utility functions",
    "type": "library",
    "minimum-stability": "stable",
    "license": "MIT",
    "require": {},
    "autoload": {
        "files": [
           "your-util-file.php"
        ]
    }
}
```

ensure commit is tagged on git to allow fetching of correct version in composer

```
"repositories": [
    {
        "type": "vcs",
        "url":  "git@bitbucket.org:craigiswayne/my_utils.git"
    }
],
"require": {
    "rank/cashier_common": "dev-nameOfYourBranch",
},
```

or instead of using a branch name you could do use the tag on the commit, e.g. the commit is `v0.0.1`

```
"repositories": [
    {
        "type": "vcs",
        "url":  "git@bitbucket.org:craigiswayne/my_utils.git"
    }
],
"require": {
    "rank/cashier_common": "v0.0.1",
},
```

----

### Autoloading a file locally via composer

#### Step 1: Create your test files

```shell
mkdir lib
touch lib/Util.php
touch index.php;

# autoloaded file
echo "<?php
namespace MyNamespace;
class Util {
    public static function test() {
        echo 'This works :)';
    }
}";

# usage of autoloaded file
echo "<?php
use MyNamespace\Util;
require_once ('vendor/autoload.php');
Util::test();
?>"
```

#### Step 2: Update your composer file
```json
"autoload": {
  "psr-4": {"MyNamespace\\": "lib/"}
}
```

-----

# Alternative option:
```
"autoload": {
        "classmap": [
            "lib/"
        ]
    }
```

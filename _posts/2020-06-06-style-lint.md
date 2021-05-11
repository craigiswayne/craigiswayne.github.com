---
layout: post
title:  "Linting Styles"
date:   2020-06-06
categories: npm scripts maintenance
---

Managing and maintaining stylesheets can become daunting especially for large files. 

The following is a script i use to lint my stylesheets.

This helps maintain an uniform coding standard across my stylesheets.


### Installation
```
npm install --save-dev stylelint stylelint-config-standard
```

This will install the node package `stylelint` for running the actual lint check.

Additionally to get you started, the `stylelint-config-standard` is installed which is a set of rules with which the stylelint uses.


### Configuration
Now that you've installed the necessary packages, you'll want to configure you project to reference these packakges

These next steps will create your own lint config for your project

```
touch .stylelintrc.json
```

This will create an empty file called `.stylelintrc.json`. This file will be used when deciding on what rules to check against when running the lint.

```
echo '{
  "extends": "stylelint-config-standard"
}' > .stylelintrc.json
```

This will add the following text to this newly created file

```
{
    "extends": "stylelint-config-standard",
    "rules": {
        "selector-pseudo-element-no-unknown": [true, {
            "ignorePseudoElements": ["ng-deep"]
        }]
    }
}
```

Since we don't have any rules yet, it's helpful to inherit a set of rules from somewhere to get started.

This text basically states that your own rules should inherit from the `stylelint-config-standard` we installed earlier.

Everything you've read up until here is taken from [Stylelint GitHub Documentation](https://github.com/stylelint/stylelint/blob/HEAD/docs/user-guide/get-started.md).

At this point we can run the following script to run lint checks on our `*.css` files

```
node_modules/.bin/stylelint "**/*.css"
```

But that's not really ideal... 

### Creating the script alias

Now that you've installed and configured `stylelint`, we'll want an easy to reference way to run our lint checks

In your `package.json`, add this new config to the `scripts`

```
"scripts": {
    "lint": "stylelint '**/*.css'"
}
```

Now you can simply run

```
npm run lint
```


#### References
1. [Stylelint Documentation](https://github.com/stylelint/stylelint/blob/HEAD/docs/user-guide/get-started.md)

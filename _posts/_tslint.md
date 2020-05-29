---
layout: post
title:  "TS Lint for the Pedantik in you"
date:   2019-07-30
categories: typescript javascript maintenance housekeeping
---

Below is the tslint.json file i use for the coding standards i try to adhere to

Palantir has an awesome github page explaining each and every rule: https://palantir.github.io/tslint/rules/

```
{
  "extends": "tslint:recommended",
  "rulesDirectory": [
    "codelyzer"
  ],
  "rules": {
    "arrow-parens": [
      true,
      "ban-single-arg-parens"
    ],
    "array-type": true,
    "arrow-return-shorthand": true,
    "callable-types": true,
    "class-name": true,
    "comment-format": [
      true,
      "check-space"
    ],
    "component-class-suffix": true,
    "component-selector": [
      true,
      "element",
      "app",
      "kebab-case"
    ],
    "curly": true,
    "deprecation": {
      "severity": "warn"
    },
    "directive-class-suffix": null,
    "eofline": true,
    "forin": true,
    "import-blacklist": [
      true,
      "rxjs/Rx"
    ],
    "import-spacing": true,
    "indent": [
      true,
      "spaces"
    ],
    "interface-over-type-literal": true,
    "label-position": true,
    "max-line-length": [
      true,
      140
    ],
    "member-access": false,
    "member-ordering": [
      true,
      {
        "order": [
          "static-field",
          "instance-field",
          "static-method",
          "instance-method"
        ]
      }
    ],
    "no-arg": true,
    "no-bitwise": true,
    "no-console": [
      true,
      "debug",
      "info",
      "time",
      "timeEnd",
      "trace"
    ],
    "no-construct": true,
    "no-debugger": true,
    "no-duplicate-super": true,
    "no-duplicate-variable": true,
    "no-empty": false,
    "no-empty-interface": true,
    "no-eval": true,
    "no-inferrable-types": true,
    "no-input-rename": false,
    "no-misused-new": true,
    "no-non-null-assertion": true,
    "no-output-on-prefix": true,
    "no-output-rename": true,
    "no-shadowed-variable": true,
    "no-string-literal": false,
    "no-string-throw": true,
    "no-switch-case-fall-through": true,
    "no-trailing-whitespace": true,
    "no-unnecessary-initializer": true,
    "no-unused-expression": true,
    "no-use-before-declare": true,
    "no-var-keyword": true,
    "object-literal-sort-keys": false,
    "one-line": [
      true,
      "check-open-brace",
      "check-catch",
      "check-else",
      "check-whitespace"
    ],
    "prefer-const": true,
    "quotemark": [
      true,
      "single"
    ],
    "radix": true,
    "semicolon": [
      true,
      "always"
    ],
    "trailing-comma": "never",
    "triple-equals": [
      true,
      "allow-null-check"
    ],
    "typedef":[true, "call-signature", "parameter"],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      }
    ],
    "unified-signatures": true,
    "use-life-cycle-interface": true,
    "use-host-property-decorator": true,
    "use-input-property-decorator": true,
    "use-output-property-decorator": true,
    "use-pipe-transform-interface": true,
    "variable-name": false,
    "whitespace": [
      true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type"
    ]
  }
}

```

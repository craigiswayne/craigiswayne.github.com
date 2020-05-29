---
layout: post
title:  "Testing using npm and Lighthouse CLI"
date:   2019-11-18
categories: npm lighthouse audit scripts
---

### Install Lighthouse CLI package
```
npm i -D lighthouse-ci
```

### Update `package.json`

```javascript
{
    "scripts": {
      "test-lighthouse-mobile": "lighthouse-ci $1 --budget-path=budget.json --chrome-flags='--headless --allow-insecure-localhost --ignore-certificate-errors' --score=75 --performance=75 --accessibility=75 --best-practices=75 --seo=75 --pwa=75",
      "test-lighthouse-desktop": "lighthouse-ci $1 --budget-path=budget.json --chrome-flags='--headless --allow-insecure-localhost --ignore-certificate-errors' --emulated-form-factor=desktop --score=75 --performance=75 --accessibility=75 --best-practices=75 --seo=75 --pwa=75",
      "verbose-test-lighthouse-mobile": "lighthouse $1 --quiet --no-enable-error-reporting --budget-path=budget.json --save-assets=false --chrome-flags='--headless --allow-insecure-localhost --ignore-certificate-errors'",
      "verbose-test-lighthouse-desktop": "lighthouse $1 --quiet --no-enable-error-reporting --budget-path=budget.json --save-assets=false --chrome-flags='--headless --allow-insecure-localhost --ignore-certificate-errors' --emulated-form-factor=desktop",
    }
}
```

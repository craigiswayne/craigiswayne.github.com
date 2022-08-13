How to run angular tests in headless mode


```
npm run test:ci
```

-----

> see: https://indepth.dev/posts/1178/angular-testing-with-headless-chrome


package.json

```
{
    "scripts": {
        "test:ci": "ng test --watch=false --browsers=ChromeHeadless --code-coverage"
    }
}
```
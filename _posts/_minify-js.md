Minify / Uglify JS

https://www.npmjs.com/package/uglify

```bash
npm i uglify
```

```json
{
  "scripts":{
    "uglify:js": "uglify -s dist/script.js -o dist/script.min.js"
  }
}
```

------

```bash
npm i uglify-js --save-dev
```

```json
{
  "scripts":{
    "uglify:js": "uglifyjs --compress --mangle -o dist/scripts.js -- dist/scripts.js"
  }
}
```

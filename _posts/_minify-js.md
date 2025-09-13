Minify / Uglify JS

https://www.npmjs.com/package/uglify

```bash
npm i -D uglify
```

```json
{
  "scripts":{
    "uglify:js": "uglify -s dist/script.js -o dist/script.min.js"
  }
}
```

------

https://www.npmjs.com/package/uglify-js

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

```
uglifyjs js/file1.js js/file2.js \
         -o foo.min.js -c -m \
         --source-map "root='http://foo.com/src',url='foo.min.js.map'"
```
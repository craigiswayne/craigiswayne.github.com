```sh
npm install --save-dev eslint @typescript-eslint/parser eslint eslint-config-google @typescript-eslint/eslint-plugin@latest

mkdir -p scripts
touch scripts/main.js;
eslint scripts/*
```


.eslintrc.json
see: https://gitlab.com/craigiswayne/scripts/-/blob/master/.eslintrc.json
or the `./dotfiles/.eslintrc.json`

```shell
eslint -c ./.eslintrc.json src/app
```


## Excluding spec files
```
touch .eslintignore
echo '*.spec.ts' >> .eslintignore
eslint -c ./.eslintrc.json src/app
```

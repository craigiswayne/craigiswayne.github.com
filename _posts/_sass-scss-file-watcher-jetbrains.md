These are the filewatcher configs I use for sass and typescript


Install Sass
npm i -g sass
IntelliJ
Arguments: $FileName$ --inlineSourceMap true --removeComments true --strict true
Output Paths to Refresh: $FileNameWithoutExtension$.css:$FileNameWithoutExtension$.css.map
Working Directory: $FileDir$

Install Typescript
npm install -g typescript
IntelliJ
Arguments: $FileName$ --outDir ./
Output Paths to Refresh: empty
Working Directory: $FileDir$



npm install -g sass


https://www.jetbrains.com/help/webstorm/transpiling-sass-less-and-scss-to-css.html#install_sass_scss
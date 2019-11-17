name="moocw";
prefix="mina";

ng g library $name -p $prefix;
ng lint $name;
ng build $name;
ng test $name;

npm install file:dist/$name --no-save


In app.module.ts

```
import { MoocwModule } from 'moocw';

....


imports: [
  MoocwModule
]

```

In app.component.ts
```
<mina-moocw></mina-moocw>
```

## Test the new library
ng s -o

See: https://angular.io/guide/creating-libraries
See: https://medium.com/@SirMaxxx/angular-6-creating-a-shareable-control-library-6a27f0ebe5c2

cd dist/$name;
npm pack;
mv *.tar.gz ../../../

//mv dist/$name ../
//cd ../$name;
//npm link;
//cd ../pg-angular
//npm i ../$name;

ng build;
ng s -o

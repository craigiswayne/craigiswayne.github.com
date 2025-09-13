```
touch src/app/app-routing.module.ts
mkdir -p src/app/my-page
touch src/app/my-page/my-page.component.ts
touch src/app/my-page/my-page.component.html
```

-------------------------------------------------------------------------------

2. Create your basic MyPage Component

in your my-page.component.ts file, add the following
```
@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html'
})
export class MyPageComponent {}
```

in your my-page.component.html file, add the following
```
<p>My Page Component Works!</p>
```

-------------------------------------------------------------------------------

3. Setup the route
in your app-routing.module.ts file, add the following
```
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { MyPageComponent } from './my-page/my-page.component.ts';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'my-page', component: MyPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

in your app.module.ts file, add the following
```
import { AppComponent } from './app.component';
import { RouterModule, Routes }   from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    // ...other declarations here
  ],
  imports: [
    // ... other imports here
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

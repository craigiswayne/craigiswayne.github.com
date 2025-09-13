---
layout: post
title:  "Angular Form Groups"
date:   2019-09-25
categories: typescript angular forms
tags: formgroup formcontrol validation
---

Barebones setup of angular reactive forms with form groups, form controls and validation

### custom.component.html
```

<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
  <label>First Name<sup>*</sup></label>
  <input type="text" formControlName="firstName" />

  <label>Last Name<sup>*</sup></label>
  <input type="text" formControlName="lastName" />

  <label>Favourite Song</label>
  <input type="text" formControlName="favouriteSong" />

  <input type="submit" [disabled]="!formGroup.valid" />
</form>
```

### custom.component.ts
```
import { FormBuilder, Validators } from '@angular/forms';

formGroup = this.fb.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  favouriteSong: ['']
});

constructor(private fb: FormBuilder){}

onSubmit(){
  console.info(this.formGroup.value);
}
```

### custom.module.ts
```
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class MyFormsModule { }
```

### app.module.ts
```
import { CustomModule } from './custom/custom.module'

@NgModule({
  imports: [
    MyFormsModule
  ]
})
```

### CLI
```
ng add @angular/material
```

### custom.module.ts
```
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule
  ]
})
```

### custom.component.html
```
<mat-form-field>
  <input matInput placeholder="First Name" formControlName="firstName">
</mat-form-field>
```

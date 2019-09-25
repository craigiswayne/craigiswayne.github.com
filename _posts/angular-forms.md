---
layout: post
title:  "Angular Form Groups"
date:   2019-09-25
categories: typescript angular forms
tags: formgroup formcontrol validation
---

Barebones setup of angular reactive forms with form groups, form controls and validation

### app.component.html
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

### app.component.ts
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

### app.module.ts
```
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
   imports: [
    ReactiveFormsModule
   ]
});
```

# Create Component via CLI
```bash
ng g component anime-picker
```

# Create Custom Component Module
```bash
touch src/app/anime-picker/anime-picker.module.ts
```

```typescript
import { NgModule } from '@angular/core';
import { AnimePickerComponent } from './anime-picker.component';

@NgModule({
  declarations: [
    AnimePickerComponent
  ],
  exports: [
    AnimePickerComponent
  ]
})
export class AnimePickerModule { }
```

# Include in App's Module
```
import { AnimePickerComponent } from './anime-picker/anime-picker.component';

//

@NgModule({
  declarations: [
    AnimePickerComponent
  ]
})
```

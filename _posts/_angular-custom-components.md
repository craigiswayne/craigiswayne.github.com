# Create Component via CLI
```bash
folder_name=modules
component_slug=anime-picker;
module_name=AnimePicker;
ng generate module $folder_name/$module_name;
ng generate component $folder_name/$component_slug --module=$folder_name/$component_slug/$component_slug.module.ts;
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

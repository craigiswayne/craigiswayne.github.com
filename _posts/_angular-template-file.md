This shows how to include an angular template in a component from another file

custom component with template in it

```
<ng-template #defaultTabButtons>default</ng-template>
<ng-container
    *ngTemplateOutlet="ctaTemplate ? ctaTemplate: defaultTabButtons">
</ng-container>
```

```
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
    @HostBinding('class') class = 'card';
    @Input() ctaTemplate: TemplateRef<any>;

}
```

```
<ng-template #willOverride>override</ng-template>
<app-card [ctaTemplate]="willOverride"></app-card>
```




or

app.comp.html
```
<app-child>
    <div header >This should be rendered in header selection of ng-content</div>
    <div body >This should be rendered in body selection of ng-content</div>
</app-child>
```
child.comp.html
```
<div class="header-css-class">
    <ng-content select="[header]"></ng-content>
</div>
<div class="body-css-class">
    <ng-content select="[body]"></ng-content>
</div>
```

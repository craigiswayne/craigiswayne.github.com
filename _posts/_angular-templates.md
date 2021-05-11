<ng-container *ngTemplateOutlet="templateRefExp; context: contextExp"></ng-container>

## With Variables
```
<ul>
    <li *ngFor='let link of links'>
        <ng-container
             [ngTemplateOutlet]="link.type == 'complex' ?complexLink : simpleLink"
             [ngTemplateOutletContext]="{link:link}">
        </ng-container>
    </li>
</ul>

<ng-template #simpleLink let-link='link'>
    Simple : {{ link.name }}
</ng-template>

<ng-template #complexLink let-link='link'>
    Complex : {{ link.name }}
</ng-template>
```

https://angular.io/api/common/NgTemplateOutlet

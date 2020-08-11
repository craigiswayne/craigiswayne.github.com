```
<ul *ngFor="let person of people"
    [ngSwitch]="person.country"> (1)

  <li *ngSwitchCase="'UK'" (2)
      class="text-success">{{ person.name }} ({{ person.country }})
  </li>
  <li *ngSwitchCase="'USA'"
      class="text-primary">{{ person.name }} ({{ person.country }})
  </li>
  <li *ngSwitchCase="'HK'"
      class="text-danger">{{ person.name }} ({{ person.country }})
  </li>
  <li *ngSwitchDefault (3)
      class="text-warning">{{ person.name }} ({{ person.country }})
  </li>
</ul>
```

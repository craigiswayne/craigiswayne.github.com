## typescript
```
export class TypeScriptMapType {

  method1 = new Map<string, boolean>();

  method2: Map<string, boolean> = new Map([
      ["Checkbox 3", true],
      ["Checkbox 4", true]
  ]);

  constructor(){
    this.method1.set("Checkbox 1", true);
    this.method1.set("Checkbox 2", false);
  }
}

```

## html
```
<div *ngFor="let cb of this.method1 | keyvalue">
  <input type="checkbox" [checked]="cb.value" />
  <label>{{cb.key}}</label>
</div>

<div *ngFor="let cb of this.method2 | keyvalue">
  <input type="checkbox" [checked]="cb.value" />
  <label>{{cb.key}}</label>
</div>
```

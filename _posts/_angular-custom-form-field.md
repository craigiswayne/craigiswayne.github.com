See here:
https://www.tsmean.com/articles/angular/custom-checkbox-component-with-angular/

html
```
<app-insolvency-acknowledgement formControlName="ukgcAck"></app-insolvency-acknowledgement>
```

```
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-insolvency-acknowledgement',
  templateUrl: './insolvency-acknowledgement.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InsolvencyAcknowledgementComponent),
    multi: true
  }]
})
export class InsolvencyAcknowledgementComponent implements ControlValueAccessor {

    @Input() value: number;

    onChange: any = () => {};
    onTouch: any = () => {};

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    writeValue(checked: boolean): void {
        this.value = checked ? 1 : 0;
        this.onChange(this.value);
        this.onTouch(this.value);
    }
}
```
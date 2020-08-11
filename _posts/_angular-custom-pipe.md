import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'unixDate'})
export class UnixDatePipe implements PipeTransform {
    transform(value: number): Date {
        if (!value) {
            return new Date();
        }
        return new Date(value * 1000);
    }
}


```
```

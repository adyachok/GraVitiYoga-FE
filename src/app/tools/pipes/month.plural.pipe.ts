import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'rusMonthPlural'})
export class MonthPluralPipe implements PipeTransform {
  transform(value: number): string {
    if ( value < 2) {
      return 'месяц';
    } else if ( value < 5) {
      return 'месяца';
    } else {
      return 'месяцев';
    }
  }
}

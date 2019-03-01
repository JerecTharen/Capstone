import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRounding'
})
export class StarRoundingPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    return Math.round(value).toString();
  }

}

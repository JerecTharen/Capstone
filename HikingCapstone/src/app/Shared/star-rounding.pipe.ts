import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRounding'
})
export class StarRoundingPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    // console.log(`Value is: ${value}`);
    return Math.round(value).toString();
  }

}

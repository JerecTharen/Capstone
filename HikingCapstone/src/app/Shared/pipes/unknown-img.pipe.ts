import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unknownImg'
})
export class UnknownImgPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    let result: string = value;
    if(result.toLowerCase() === ''){
      // result = 'https://cdn.danspapers.com/wp-content/uploads/2018/10/hikingsign.jpg';
      result = 'https://www.evolvefish.com/thumbnail.asp?file=assets/images/vinyl%20decals/EF-VDC-00035(black).jpg&maxx=300&maxy=0';
    }
    return result;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wDesc'
})
export class WDescPipe implements PipeTransform {

  transform(desc: string): string {
    let words = desc.split(' ');
    let result = '';
    words.forEach((word)=>{
      result += `${word[0].toUpperCase()}${word.slice(word.length-word.length+1, word.length)} `;
    });
    // console.log(result);
    return result;
    // return desc;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficulty'
})
export class DifficultyPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    switch (value) {
      case "green":
        return "https://cdn.apstatic.com/img/diff/green.svg";
        break;
      case "greenBlue":
        return "https://cdn.apstatic.com/img/diff/greenBlue.svg";
        break;
      case "blue":
        return "https://cdn.apstatic.com/img/diff/blue.svg";
        break;
      case "blueBlack":
        return "https://cdn.apstatic.com/img/diff/blueBlack.svg";
        break;
      case "black":
        return "https://cdn.apstatic.com/img/diff/black.svg";
        break;
      case "dblack":
        return "https://cdn.apstatic.com/img/diff/dblack.svg";
        break;
    }
  }

}

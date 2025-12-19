import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ReverseString',
  standalone: false,
})
export class ReversePipe implements PipeTransform {
  transform(value: any): string {
    let converted: string; //NOTE: aapne ahiya to let no use kri j skie . method ni andr
    if (typeof value !== 'string') {
      converted = value.toString();
      return converted.split('').reverse().join('');
    }
    return value.split('').reverse().join('');
  }
}

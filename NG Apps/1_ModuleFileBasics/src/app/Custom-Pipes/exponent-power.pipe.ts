import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponentPower',
  standalone: false,
})
export class ExponentPowerPipe implements PipeTransform {
  transform(value: number, exponent: number = 1): number {
    //exponent ni default value 1, kai nai hse to 1 lese
    return Math.pow(value, exponent);
  }
}

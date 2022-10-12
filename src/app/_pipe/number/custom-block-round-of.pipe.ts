import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customBlockRoundOf'
})
export class CustomBlockRoundOfPipe implements PipeTransform {

 /**
  * The transform function takes a number as an argument and returns a number.
  * @param {number} value - The value to be transformed.
  * @returns The floor of the value.
  */
  transform(value: number): number {
    return Math.floor(value);
}

}

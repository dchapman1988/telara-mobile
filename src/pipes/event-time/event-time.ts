import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the EventTimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'eventTime',
})
export class EventTimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let eventCreatedSeconds = parseInt(value);

    let nowSeconds = Date.now() / 1000;
    let diffSeconds = nowSeconds - eventCreatedSeconds;

    let minutes = Math.round(diffSeconds / 60);
    return `${minutes} Min.`;
  }
}

import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';


/**
 * Generated class for the YoutubePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'youtube',
})
export class YoutubePipe implements PipeTransform {
  constructor(private dom: DomSanitizer){

  }
  transform(value: string, ...args) {
    return this.dom.bypassSecurityTrustResourceUrl(value)
  }
}

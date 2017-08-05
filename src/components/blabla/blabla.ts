import { Component } from '@angular/core';

/**
 * Generated class for the BlablaComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'blabla',
  templateUrl: 'blabla.html'
})
export class BlablaComponent {

  text: string;

  constructor() {
    console.log('Hello BlablaComponent Component');
    this.text = 'Hello World';
  }

}

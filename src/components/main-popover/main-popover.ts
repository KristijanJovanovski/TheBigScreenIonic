import { IonicPage } from 'ionic-angular';
import { NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';


@IonicPage()
@Component({
  selector: "main-popover-component",
  template: `
    <ion-list>
        <ion-item (click)="open(item)" *ngFor="let item of [0,1,2,3,4]">
            <ion-label>Heeeey {{item}}</ion-label>
        </ion-item>
    </ion-list>
  `
})
export class MainPopoverComponent {


    constructor(public viewCtrl: ViewController,private navParams: NavParams){

    }

    open(item){
        console.log(`this is item: ${item}`);
        this.close();
    }
    close(){
        this.viewCtrl.dismiss();
    }
  
}
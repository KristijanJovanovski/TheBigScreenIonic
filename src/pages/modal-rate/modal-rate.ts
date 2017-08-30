import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'modal-rate',
  templateUrl: 'modal-rate.html',
})
export class ModalRate {
  movie: any;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.movie = navParams.get("movie");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalRate');
  }
  dismiss(val:string) {
    if(val!='')
      this.viewCtrl.dismiss(val);
    else
      this.viewCtrl.dismiss();
  }
  Rated(val:string,event:any){
    this.dismiss(val);
  }

}

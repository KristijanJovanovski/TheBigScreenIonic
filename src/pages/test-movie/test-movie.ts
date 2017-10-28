import { AssetPage } from './../asset/asset';
import { Asset } from './../../models/Asset';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssetType, AssetCategory } from "../../models/Asset";

@IonicPage()
@Component({
  selector: 'page-test-movie',
  template: 
      `<ion-content #myContent>  
          <grid [myContent]='myContent' [assetType]='assetType' [assetCategory]='assetCategory'></grid>
        </ion-content>`
})
export class TestMoviePage{


  assetType : string = AssetType.Movie;
  assetCategory : string = AssetCategory.Popular;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.assetType = type;
    // this.assetCategory = category;
  }
 
  //TODO: temp solution, should be nandled in constructor for dynamic creating
  ionViewCanEnter(){
    this.assetType = AssetType.Movie;
    this.assetCategory = AssetCategory.Popular;
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestMoviePage');
  }

}

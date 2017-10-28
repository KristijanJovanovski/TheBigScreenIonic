import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AssetType, AssetCategory } from "../../models/Asset";


@IonicPage()
@Component({
  selector: "page-asset",
  templateUrl: './asset.html'
})
export class AssetPage implements OnInit{
  
  assetType: string;
  assetCategory: string;
  
  // constructor(type : AssetType, category : AssetCategory) {
    //   this.assetType = type;
    //   this.assetCategory = category;
    //  }
    constructor(private navCtrl: NavController,private navParams: NavParams){
      
    }
    
    ngOnInit(): void {
      this.assetCategory = this.navParams.get('assetCategory');
      this.assetType = this.navParams.get('assetType');
    }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AssetPage");
    console.log(`category: ${this.assetCategory} type: ${this.assetType}`);
  }
}

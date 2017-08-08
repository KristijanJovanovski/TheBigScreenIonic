import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { SuperTabsController } from "ionic2-super-tabs/dist";

@IonicPage()
@Component({
  selector: 'page-tv',
  templateUrl: 'tv.html'
})
export class TvPage {

  page1: any = 'PopularTvPage';
  page2: any = 'TopRatedTvPage';
  page3: any = 'AiringTodayTvPage';
  page4: any = 'OnTheAirTvPage';
  constructor(public navCtrl: NavController, private superTabsCtrl: SuperTabsController) {

  }

}

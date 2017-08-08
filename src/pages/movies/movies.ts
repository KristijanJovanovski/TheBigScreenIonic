import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { SuperTabsController } from "ionic2-super-tabs/dist";

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html'
})
export class MoviesPage {

  page1: any = 'PopularMoviesPage';
  page2: any = 'TopRatedMoviesPage';
  page3: any = 'BoxOfficeMoviesPage';
  page4: any = 'UpcomingMoviesPage';
  constructor(public navCtrl: NavController, private superTabsCtrl: SuperTabsController) {
    
  }

}

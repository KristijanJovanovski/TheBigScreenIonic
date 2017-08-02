import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html'
})
export class MoviesPage {

  tab1Root = 'MoviesPage';
  tab2Root = 'TvPage';
  tab3Root = 'CalendarPage';
  tab4Root = 'ProfilePage';
  constructor(public navCtrl: NavController) {

  }

}

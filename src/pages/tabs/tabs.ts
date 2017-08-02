import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular'

@IonicPage(
{
  name: 'tabs-page'
}
)
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'MoviesPage';
  tab2Root = 'TvPage';
  tab3Root = 'CalendarPage';
  tab4Root = 'ProfilePage';

  constructor() {

  }
}

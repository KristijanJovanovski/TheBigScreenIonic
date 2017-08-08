import { ViewChild, Renderer } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular'
import { Tabs } from "ionic-angular/navigation/nav-interfaces";

@IonicPage(
{
  name: 'tabs-page'
}
)
@Component({
  selector: "tabs",
  templateUrl: 'tabs.html'
})
export class TabsPage {
@ViewChild('myTabs') tabRef: Tabs;

  tab1Root = 'MoviesPage';
  tab2Root = 'TvPage';
  tab3Root = 'CalendarPage';
  tab4Root = 'ProfilePage';

  constructor(private renderer: Renderer) {

  }
  ionViewDidEnter(){
   this.renderer.setElementClass(
    this.tabRef["_tabbar"].nativeElement,
    "show-tabbar",
    true
  );
   
   
   
   
  }
}

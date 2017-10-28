import { DatabaseProvider } from './../../providers/database/database';
import { AssetType } from './../../models/Asset';
import { UserPreferenceProvider } from './../../providers/user-preference/user-preference';
import { TvShow } from './../../models/TvShow';
import { Component, OnInit } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { SuperTabsController } from "ionic2-super-tabs/dist";

@IonicPage()
@Component({
  selector: 'page-tv',
  template: `<super-tabs  tabsPlacement="top" toolbarColor="light" toolbarBackground="dark" indicatorColor="light" scrollTabs="true" >
              <super-tab  [root]="page.assetPage" [rootParams]='page.params' [id]='page.page' [title]="page.title" *ngFor="let page of tvPages"></super-tab>
            </super-tabs>`
})
export class TvPage implements OnInit{

  watchedTvShows: TvShow[] = [];
  ratedTvShows: TvShow[] = [];
  bookmarkedTvShows: TvShow[] = [];

  tvPages: any[] = [];
  tabsLoaded = false; 
  
  
  constructor(public navCtrl: NavController,
    private superTabsCtrl: SuperTabsController,
    private userPreferenceProvider : UserPreferenceProvider,
    private db : DatabaseProvider) {

    // TODO: check with database or local storage, user's preferences and dynamically configure them here.
    this.userPreferenceProvider.setupDefaultTabs();
    
    let tabs = this.userPreferenceProvider.getUserPreferenceTabs();
    console.log(tabs);     
    for (var tvTab in tabs['tvshows']) {
      let category = tabs['tvshows'][tvTab];      
      this.tvPages.push({params: { 'assetCategory': category, 'assetType': AssetType.TvShow },assetPage: 'AssetPage',page: category.replace(' ','').concat('TvShowPage') ,title: category});
    }
    this.tabsLoaded = true;
  }

  ngOnInit(): void {
    this.db.getWatchedTvShowsFS()
    .do(res => {
      res.map( el => {
        el.type = AssetType.TvShow;
        let btv = this.bookmarkedTvShows.find(a=>a.id === el.id);
        let rtv = this.ratedTvShows.find(a=>a.id === el.id);
        let wtvDiff = this.watchedTvShows.filter(a => this.watchedTvShows.indexOf(a) < 0);
        if(btv){
          btv.watched = true;
          btv.dateWatched = el.dateWatched;
          el.bookmarked = true;
          el.dateBookmarked = btv.dateBookmarked;
        }
        if(rtv){
          rtv.watched = true;
          rtv.dateWatched = el.dateWatched;
          el.rated = true;
          el.rate = rtv.rate;
          el.dateRated = rtv.dateRated;
        }

        if(wtvDiff && wtvDiff.length > 0){
          wtvDiff.forEach(e=>{
            e.watched = false;
            e.dateWatched = null;
          });
        }
      })
    })
    .subscribe(res => {
      this.watchedTvShows = res;
      this.db.watchedTvShowsNext(res);
    });


    this.db.getBookmarkedTvShowsFS()
    .do(res => {
      res.map( el => {
        el.type = AssetType.TvShow;
        let wtv = this.watchedTvShows.find(a=>a.id === el.id);
        let rtv = this.ratedTvShows.find(a=>a.id === el.id);
        let btvDiff = this.bookmarkedTvShows.filter(a => this.bookmarkedTvShows.indexOf(a) < 0);
        if(wtv){
          wtv.bookmarked = true;
          wtv.dateBookmarked = el.dateBookmarked;
          el.watched = true;
          el.dateWatched = wtv.dateWatched;
        }
        if(rtv){
          rtv.bookmarked = true;
          rtv.dateBookmarked = el.dateBookmarked;
          el.rated = true;
          el.rate = rtv.rate;
          el.dateRated = rtv.dateRated;
        }


        if(btvDiff && btvDiff.length > 0){
          btvDiff.forEach(e=>{
            e.bookmarked = false;
            e.dateBookmarked = null;
          });
        }
      })
    })
    .subscribe(res => {
      this.bookmarkedTvShows = res;
      this.db.bookmarkedTvShowsNext(res);
    });


    this.db.getRatedTvShowsFS()
    .do(res => {
      res.map( el => {
        el.type = AssetType.TvShow;
        let btv = this.bookmarkedTvShows.find(a=>a.id === el.id);
        let wtv = this.watchedTvShows.find(a=>a.id === el.id);
        let rtvDiff = this.ratedTvShows.filter(a => this.ratedTvShows.indexOf(a) < 0);
        if(btv){
          btv.rated = true;
          btv.dateRated = el.dateRated;
          el.bookmarked = true;
          el.dateBookmarked = btv.dateBookmarked;
        }
        if(wtv){
          wtv.rated = true;
          wtv.dateRated = el.dateRated;
          wtv.rate = el.rate;
          el.watched = true;
          el.dateWatched = wtv.dateWatched;
        }


        if(rtvDiff && rtvDiff.length > 0){
          rtvDiff.forEach(e=>{
            e.rated = false;
            e.dateRated = null;
            e.rate = null;
          });
        }
      })
    })
    .subscribe(res => {
      this.ratedTvShows = res;
      this.db.ratedTvShowsNext(res);
    });
  }

}

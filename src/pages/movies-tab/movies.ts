import { Movie } from './../../models/Movie';
import { DatabaseProvider } from './../../providers/database/database';
import { UserPreferenceProvider } from './../../providers/user-preference/user-preference';
import { AssetType, AssetCategory } from "./../../models/Asset";
import { AssetPage } from "./../asset/asset";
import { Component, OnInit } from "@angular/core";
import { NavController, IonicPage } from "ionic-angular";
import { SuperTabsController, SuperTabs } from "ionic2-super-tabs/dist";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@IonicPage()
@Component({
  selector: "page-movies",
  template: `<super-tabs  tabsPlacement="top" toolbarColor="light" toolbarBackground="dark" indicatorColor="light" scrollTabs="true" >
                <super-tab [root]="page.assetPage" [rootParams]='page.params' [id]='page.page' [title]="page.title" *ngFor="let page of moviePages"></super-tab>
             </super-tabs>`
})
export class MoviesPage implements OnInit{

  watchedMovies: Movie[] = [];
  ratedMovies: Movie[] = [];
  bookmarkedMovies: Movie[] = [];
  moviePages: any[] = [];
  tabsLoaded = false;
  
  constructor(
    public navCtrl: NavController,
    private superTabsCtrl: SuperTabsController,
    private userPreferenceProvider : UserPreferenceProvider,
    private db : DatabaseProvider
  ) {
    // TODO: check with database or local storage, user's preferences and dynamically configure them here.
    this.userPreferenceProvider.setupDefaultTabs();
    
    let tabs = this.userPreferenceProvider.getUserPreferenceTabs();
    console.log(tabs);     
    for (var movieTab in tabs['movies']) {
      let category = tabs['movies'][movieTab];      
      this.moviePages.push({params: { 'assetCategory': category, 'assetType': AssetType.Movie },assetPage: 'AssetPage',page: category.replace(' ','').concat('MoviesPage') ,title: category});
    }
    this.tabsLoaded = true;
  }
  
  ngOnInit(): void {
    this.db.getWatchedMoviesFS()
    .do(res => {
      res.map( el => {
        el.type = AssetType.Movie;
        let bm = this.bookmarkedMovies.find(a=>a.id === el.id);
        let rm = this.ratedMovies.find(a=>a.id === el.id);
        let wmDiff = this.watchedMovies.filter(a => this.watchedMovies.indexOf(a) < 0);
        if(bm){
          bm.watched = true;
          bm.dateWatched = el.dateWatched;
          el.bookmarked = true;
          el.dateBookmarked = bm.dateBookmarked;
        }
        if(rm){
          rm.watched = true;
          rm.dateWatched = el.dateWatched;
          el.rated = true;
          el.rate = rm.rate;
          el.dateRated = rm.dateRated;
        }

        if(wmDiff && wmDiff.length > 0){
          wmDiff.forEach(e=>{
            e.watched = false;
            e.dateWatched = null;
          });
        }
      })
    })
    .subscribe(res => {
      this.watchedMovies = res;
      this.db.watchedMoviesNext(res);
    });


    this.db.getBookmarkedMoviesFS()
    .do(res => {
      res.map( el => {
        el.type = AssetType.Movie;
        let wm = this.watchedMovies.find(a=>a.id === el.id);
        let rm = this.ratedMovies.find(a=>a.id === el.id);
        let bmDiff = this.bookmarkedMovies.filter(a => this.bookmarkedMovies.indexOf(a) < 0);
        if(wm){
          wm.bookmarked = true;
          wm.dateBookmarked = el.dateBookmarked;
          el.watched = true;
          el.dateWatched = wm.dateWatched;
        }
        if(rm){
          rm.bookmarked = true;
          rm.dateBookmarked = el.dateBookmarked;
          el.rated = true;
          el.rate = rm.rate;
          el.dateRated = rm.dateRated;
        }


        if(bmDiff && bmDiff.length > 0){
          bmDiff.forEach(e=>{
            e.bookmarked = false;
            e.dateBookmarked = null;
          });
        }
      })
    })
    .subscribe(res => {
      this.bookmarkedMovies = res;
      this.db.bookmarkedMoviesNext(res);
    });


    this.db.getRatedMoviesFS()
    .do(res => {
      res.map( el => {
        el.type = AssetType.Movie;
        let bm = this.bookmarkedMovies.find(a=>a.id === el.id);
        let wm = this.watchedMovies.find(a=>a.id === el.id);
        let rmDiff = this.ratedMovies.filter(a => this.ratedMovies.indexOf(a) < 0);
        if(bm){
          bm.rated = true;
          bm.dateRated = el.dateRated;
          el.bookmarked = true;
          el.dateBookmarked = bm.dateBookmarked;
        }
        if(wm){
          wm.rated = true;
          wm.dateRated = el.dateRated;
          wm.rate = el.rate;
          el.watched = true;
          el.dateWatched = wm.dateWatched;
        }


        if(rmDiff && rmDiff.length > 0){
          rmDiff.forEach(e=>{
            e.rated = false;
            e.dateRated = null;
            e.rate = null;
          });
        }
      })
    })
    .subscribe(res => {
      this.ratedMovies = res;
      this.db.ratedMoviesNext(res);
    });
  }
}

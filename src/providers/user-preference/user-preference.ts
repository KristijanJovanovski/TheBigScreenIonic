import { AssetCategory } from './../../models/Asset';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserPreferenceProvider {
  movieTab : string[] = [];
  tvTab : string[] = [];


  constructor(public http: Http) {

  }
  addMovieTab(tab: string){
    if(this.movieTab.indexOf(tab) === -1)
      this.movieTab.push(tab);
  }
  addTvShowTab(tab:string){
    if(this.tvTab.indexOf(tab) === -1)
    this.tvTab.push(tab);
  }

  removeMovieTab(tab: string){
    let index = this.movieTab.indexOf(tab);
    if(index !== -1)
      this.movieTab.splice(index,1);
  }
  removeTvShowTab(tab:string){
    let index = this.tvTab.indexOf(tab);
    if(index !== -1)
      this.tvTab.splice(index,1);
  }


  setupDefaultTabs(){
    // TODO: should tweak it to fire only once ( when user registers)
    this.movieTab.push(AssetCategory.Popular);
    this.movieTab.push(AssetCategory.TopRated);
    this.movieTab.push(AssetCategory.BoxOffice);
    this.movieTab.push(AssetCategory.Upcoming);
    this.movieTab.push(AssetCategory.Bookmarked);
    this.movieTab.push(AssetCategory.Watched);
    this.movieTab.push(AssetCategory.Rated);
    
    this.tvTab.push(AssetCategory.Popular);
    this.tvTab.push(AssetCategory.TopRated);
    this.tvTab.push(AssetCategory.AiringToday);
    this.tvTab.push(AssetCategory.OnTheAir);
    this.tvTab.push(AssetCategory.Bookmarked);
    this.tvTab.push(AssetCategory.Watched);
    this.tvTab.push(AssetCategory.Rated);
    
  }

  // TODO: read from firestore and return observable
  getUserPreferenceTabs(): object{
    return {'movies' : this.movieTab, 'tvshows': this.tvTab};
  }

}

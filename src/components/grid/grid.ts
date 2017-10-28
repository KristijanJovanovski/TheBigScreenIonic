import { DatabaseProvider } from './../../providers/database/database';
import { AuthProvider } from './../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { Input, Component, OnInit } from "@angular/core";
import { Content } from "ionic-angular";
import { Observable } from "rxjs/Observable";

import { TmdbProvider } from "./../../providers/tmdb/tmdb";

import { Movie } from "./../../models/Movie";
import { TvShow } from "./../../models/TvShow";
import { Asset, AssetType, AssetCategory } from "../../models/Asset";

@Component({
  selector: "grid",
  templateUrl: "grid.html",
  providers: [TmdbProvider]
})
export class GridComponent implements OnInit {
  userUID: string;
  
  provider: Observable<Asset[]>;
  watchedAssets: Asset[];
  bookmarkedAssets: Asset[];
  ratedAssets: Asset[];

  assets: Asset[] = [];

  page: number = 1;

  finishedScroll = false;

  @Input() assetType: string;
  @Input() assetCategory: string;
  @Input() myContent: Content;

  errorMessage: any;

  constructor(
    private tmdbProvider: TmdbProvider,
    private db: DatabaseProvider,
    private auth: AuthProvider    
  ) {
  }
  ngOnInit(): void {
    this.userUID = this.auth.getUser().uid;

    this.getFSAssets();

    this.getAssetsTmdb();
  }

  getFSAssets(){
    if(this.assetType === AssetType.Movie){
      this.db.getWatchedMovies().subscribe(res =>{
        this.watchedAssets = res
        if(this.assetCategory === AssetCategory.Watched){
          this.assets = res;
        }
          this.applyFilter();      
      });
  
      this.db.getBookmarkedMovies().subscribe(res =>{
        this.bookmarkedAssets = res
        if(this.assetCategory === AssetCategory.Bookmarked){
          this.assets = res;
        }
          this.applyFilter();      
      });
  
      this.db.getRatedMovies().subscribe(res =>{
        this.ratedAssets = res
        if(this.assetCategory === AssetCategory.Rated){
          this.assets = res;
        }
          this.applyFilter();      
      });
    }else{
      this.db.getWatchedTvShows().subscribe(res =>{
        this.watchedAssets = res
        if(this.assetCategory === AssetCategory.Watched){
          this.assets = res;
        }
          this.applyFilter();      
      });
  
      this.db.getBookmarkedTvShows().subscribe(res =>{
        this.bookmarkedAssets = res
        if(this.assetCategory === AssetCategory.Bookmarked){
          this.assets = res;
        }
          this.applyFilter();      
      });
  
      this.db.getRatedTvShows().subscribe(res =>{
        this.ratedAssets = res
        if(this.assetCategory === AssetCategory.Rated){
          this.assets = res;
        }
          this.applyFilter();      
      });
    }
  }

  applyFilter(){
    this.assets.forEach(asset => {
      let ratedAsset :Asset;
        ratedAsset = this.ratedAssets? this.ratedAssets.find(a=>a.id === asset.id) : null;
        
      let bookmarkedAsset: Asset;            
        bookmarkedAsset = this.bookmarkedAssets? this.bookmarkedAssets.find(a=>a.id === asset.id) : null;

      let watchedAsset :Asset;            
        watchedAsset = this.watchedAssets? this.watchedAssets.find(a=>a.id === asset.id) : null;
      
        asset.rated = ratedAsset? true : false;
        asset.rate = asset.rated? ratedAsset.rate : null;
        asset.dateRated = asset.rated? ratedAsset.dateRated : null;

        asset.bookmarked = bookmarkedAsset? true : false;;
        asset.dateBookmarked = asset.bookmarked? bookmarkedAsset.dateBookmarked : null;

        asset.watched = watchedAsset? true : false; 
        asset.dateWatched = asset.watched? watchedAsset.dateWatched : null;

    });
  }


  getAssetsTmdb(): Promise<any> {
    if (this.getProvider()) {
      return new Promise(resolve => {
        this.provider.subscribe(result => {
          if(result.length !== 0){
          result.forEach(asset => {
            if(this.assets.find(a=>a.id == asset.id))
              return;
            asset.type = this.assetType;
            
            if(asset.type === AssetType.Movie){
              this.assets.push(asset as Movie)
            }else{
              asset.title = (asset as TvShow).name;
              this.assets.push((asset as TvShow)); 
            }
            
          });

          this.applyFilter();
          this.page++;
        }else{
          this.finishedScroll = true;
        }
          resolve();
        }, error => (this.errorMessage = <any>error));
      });
    }
    return new Promise(resolve => error =>(this.errorMessage = <any>error) );
  }

  getProvider() {
    if (this.assetType === AssetType.Movie) {
      if (this.assetCategory === AssetCategory.Popular) {           
        this.provider = this.tmdbProvider.getPopularMovies(this.page);
      } else if (this.assetCategory === AssetCategory.TopRated) {
        this.provider = this.tmdbProvider.getTopRatedMovies(this.page);
      } else if (this.assetCategory === AssetCategory.BoxOffice) {
        this.provider = this.tmdbProvider.getBoxOfficeMovies(this.page);
      } else if (this.assetCategory === AssetCategory.Upcoming) {
        this.provider = this.tmdbProvider.getUpcomingMovies(this.page);
      } else {
        return false;
      }
    } else if (this.assetType === AssetType.TvShow) {
      if (this.assetCategory === AssetCategory.Popular) {
        this.provider = this.tmdbProvider.getPopularTvShows(this.page);
      } else if (this.assetCategory === AssetCategory.TopRated) {
        this.provider = this.tmdbProvider.getTopRatedTvShows(this.page);
      } else if (this.assetCategory === AssetCategory.AiringToday) {
        this.provider = this.tmdbProvider.getAiringTodayTvShows(this.page);
      } else if (this.assetCategory === AssetCategory.OnTheAir) {
        this.provider = this.tmdbProvider.getOnTheAirTvShows(this.page);
      } else {
        return false;
      }
    } else {
      return false;
    }
    return true;
  }

  Rated(asset: Asset){
    if(asset.type === AssetType.Movie) {
      this.db.movieRated(asset);
    }else if(asset.type === AssetType.TvShow){
      this.db.tvshowRated(asset);
    }
  }

  Bookmarked(asset: Asset){
    if(asset.type === AssetType.Movie) {
      this.db.movieBookmarked(asset);
    }else if(asset.type === AssetType.TvShow){
      this.db.tvshowBookmarked(asset);
    }
  }

  Watched(asset: Asset){
    if(asset.type === AssetType.Movie) {
      this.db.movieWatched(asset);
    }else if(asset.type === AssetType.TvShow){
      this.db.tvshowWatched(asset);
    }
  }

  // Populate the feed

  doInfinite(infiniteScroll) {

    console.log("Begin async operation");
    if(!this.finishedScroll && this.assetCategory != AssetCategory.Watched && this.assetCategory != AssetCategory.Bookmarked && this.assetCategory != AssetCategory.Rated ) {
      this.getAssetsTmdb().then(() => {
        console.log("Async operation has ended");
        setTimeout(() => {
          infiniteScroll.complete();
        }, 350);     
      });
    }else{
      console.log("Async operation has ended");
      infiniteScroll.complete();
    }
  }
}

import { TvShow } from './../../models/TvShow';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { LazyLoadImageModule } from 'ng-lazyload-image';


import { IonicModule, Content, NavController, NavParams } from 'ionic-angular';
import { Asset, AssetType } from "../../models/Asset";
import { Movie } from "../../models/Movie";


@Component({
  selector: "tile",
  templateUrl: "tile.html"
})
export class TileComponent implements OnInit {
  rootNavCtrl: any;
  img_width: number = 185;
  
  @Input() asset: Asset;
  @Input() myContent: Content;
  @Input() assetCategory: string;

  @Output() rated = new EventEmitter<Asset>();
  @Output() bookmarked = new EventEmitter<Asset>();
  @Output() watched = new EventEmitter<Asset>();
  
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.rootNavCtrl = navParams.get("rootNavCtrl");
    console.log("Hello Tile Component");
  }
 
  ngOnInit(): void {
  }

  getAssetDetails(asset: Asset, event) {
    if (asset.type === AssetType.Movie) {
      console.log(
        "Movie details for: " +
          (asset as Movie).id +
          " " +
          (asset as Movie).title
      );
      this.rootNavCtrl.push("MovieDetailsPage", { movie: asset as Movie });
    } else if (asset.type === AssetType.TvShow) {
      console.log( 
        "Movie details for: " +
          (asset as TvShow).id +
          " " +
          (asset as TvShow).name
      );
      this.rootNavCtrl.push("TvShowDetailsPage", { tvShow: asset as TvShow });
    }
  }
  rateAsset(asset: Asset, event) {
    if (asset.type === AssetType.Movie) {
      // TODO:
      asset.rated ? asset.rated = false: asset.rated = true;
      asset.rate = Math.round(Math.random() * 20) / 2;
    } else if (asset.type === AssetType.TvShow) {
      // TODO:
      asset.rated ? asset.rated = false: asset.rated = true;
      asset.rate = Math.round(Math.random() * 20) / 2;
    }
    this.rated.emit(asset);
  }
  assetWatched(asset: Asset, event) {
    if (asset.type === AssetType.Movie) {
      // TODO:
      asset.watched ? asset.watched = false: asset.watched = true;      
    } else if (asset.type === AssetType.TvShow) {
      // TODO:
      asset.watched ? asset.watched = false: asset.watched = true;   
    }
    this.watched.emit(asset);
  }
  assetBookmark(asset: Asset, event) {
    if (asset.type === AssetType.Movie) {
      // TODO:
      asset.bookmarked ? asset.bookmarked = false: asset.bookmarked = true;
    } else if (asset.type === AssetType.TvShow) {
      // TODO:
      asset.bookmarked ? asset.bookmarked = false: asset.bookmarked = true;   
    }
    this.bookmarked.emit(asset);
  }
  watchAsset(asset: Asset, event) {
    if (asset.type === AssetType.Movie) {
      // TODO:
    } else if (asset.type === AssetType.TvShow) {
      // TODO:
    }
  }
}

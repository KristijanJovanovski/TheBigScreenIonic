import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: "tv-details",
  templateUrl: "tv-details.html",
  providers: [TmdbProvider]
})
export class TvDetailsPage {
  tv: {}  = {};
  cover: any;
  backdrop_path: any;
  id: number;
  title: string = "";
  poster_path: string = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public elementRef: ElementRef,
    public tmdbProvider: TmdbProvider
  ) {
    let tvObj = this.navParams.get("tv");
    this.tv = tvObj;
    this.cover = "https://image.tmdb.org/t/p/original/"+tvObj.backdrop_path;
    this.id = Number.parseInt(tvObj.id);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TvDetailsPage");
    this.getTvDetails();
  }

  getTvDetails(){
        this.tmdbProvider.getTvById(this.id).subscribe(result => {
        this.tv = result;
      });
  }
}

import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: "movie-details",
  templateUrl: "movie-details.html",
  providers: [TmdbProvider]
})
export class MovieDetails {
  movie: {}  = {};
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
    let movieObj = this.navParams.get("movie");
    this.movie = movieObj;
    this.cover = "https://image.tmdb.org/t/p/original/"+movieObj.backdrop_path;
    this.id = Number.parseInt(movieObj.id);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MovieDetails");
    this.getMovieDetails();
  }

  getMovieDetails(){
        this.tmdbProvider.getMovieById(this.id).subscribe(result => {
        this.movie = result;
      });
  }
}

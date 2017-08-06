import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: "movie-details",
  templateUrl: "movie-details.html",
  providers: [TmdbProvider]
})
export class MovieDetails {
  id: number;
  title: string = "";
  poster_path: string = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tmdbProvider: TmdbProvider
  ) {
    this.id = Number.parseInt(this.navParams.get("id"));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MovieDetails");
    this.getMovieDetails();
  }

  getMovieDetails() {
    this.tmdbProvider.getMovieById(this.id).subscribe(result => {
      this.title = result.title;
      // this.poster_path = "https://image.tmdb.org/t/p/w500/" + result.poster_path;
      // console.log(this.poster_path);
      
    });
  }
}

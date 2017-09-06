import { OmdbProvider } from './../../providers/omdb/omdb';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { Component, ElementRef, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: "movie-details",
  templateUrl: "movie-details.html",
  providers: [TmdbProvider, OmdbProvider]
})
export class MovieDetailsPage {
  ratings: {}[] = [];
  imdb_id: string;
  trailer: string;
  @Input() myScrollActors;

  cast: Array<object> = [];
  movie: {} = {};
  cover: any;
  backdrop_path: any;
  id: number;
  title: string = "";
  poster_path: string = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public elementRef: ElementRef,
    public tmdbProvider: TmdbProvider,
    public omdbProvider: OmdbProvider
  ) {

    let movieObj = this.navParams.get("movie");
    this.movie = movieObj;
    console.log(this.movie);
    this.cover =
      "https://image.tmdb.org/t/p/original/" + movieObj.backdrop_path;
    this.id = Number.parseInt(movieObj.id);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MovieDetailsPage");
    this.getMovieDetails();
    console.log(this.movie);
  }

  getMovieDetails() {
    this.tmdbProvider.getMovieById(this.id).subscribe(result => {
      this.movie = result;
      this.imdb_id = result.imdb_id;
      this.ratings.push({"Source": "TMDb","Value": result.vote_average});
      console.log(this.ratings);
      
      this.getRatings();
      console.log("movie updated");
      console.log(this.movie);
      if (result.videos.results.length > 0) {
        this.trailer =
          "https://www.youtube.com/embed/" +
          result.videos.results["0"].key +
          "?rel=0";
      }
    });
    this.tmdbProvider.getMovieCredits(this.id).subscribe(result => {
      console.log(this.cast);

      this.cast = Array.from(result.cast);
      console.log(this.cast);
    });
  }

  getRatings() {
    console.log(this.imdb_id);

    this.omdbProvider.getRatings(this.imdb_id).subscribe(result => {
      var i = 0;
      result.forEach(element => {
        this.ratings.splice(i++,0,element);
      }); 
    });
  }
}

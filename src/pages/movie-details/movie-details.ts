import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html'
})
export class MovieDetailsPage  {
  id: string;
  movie: object = {};
  errorMessage: any = '';
  constructor(public navCtrl: NavController, private navParams: NavParams,
      private tmdbProvider:TmdbProvider
  ) {
    this.id = this.navParams.get("id");
           
  }
  ngOnInit(){
    this.tmdbProvider.getMovieById(this.id)
      .subscribe(
          result => this.movie = result ,
          error => this.errorMessage = <any>error
        );
  }


}

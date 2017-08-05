import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { Component  } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
  providers: [TmdbProvider]
})
export class MoviesPage {
  popularMovies: object[] = [];
  errorMessage: any = '';
  segments: string;

  // Segment
  tab1Root = 'MoviesPage';
  tab2Root = 'TvPage';
  tab3Root = 'CalendarPage';
  tab4Root = 'ProfilePage';
  constructor(public navCtrl: NavController, private tmdbProvider:TmdbProvider) {
    this.segments = "Popular";
  }

  // Lifecycle
  ngAfterViewInit(){

   // this.getPopularMovies();
  }

  // REST
  getPopularMovies(){
    this.tmdbProvider.getPopularMovies()
      .subscribe(
        result => this.popularMovies = result,
        error => this.errorMessage = <any>error
      );
  }
  getMovieDetails(id: any){
    
    console.log(id);
   // this.navCtrl.push('MovieDetailsPage',{id : id});
  }
}
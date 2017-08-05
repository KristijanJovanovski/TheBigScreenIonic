import { PopularMovies } from './../../components/segments/movie/popular-movies/popular-movies';
import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { Component, ViewChild } from "@angular/core";
import { NavController, IonicPage, Content } from "ionic-angular";


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
  
  constructor(public navCtrl: NavController, private tmdbProvider:TmdbProvider) {
    this.segments = "Popular";
  }

  // Lifecycle
  ngAfterViewInit(){

   // this.getPopularMovies();
  }

  // // REST
  // getPopularMovies(){
  //   this.tmdbProvider.getPopularMovies()
  //     .subscribe(
  //       result => this.popularMovies = result,
  //       error => this.errorMessage = <any>error
  //     );
  // }
  // getMovieDetails(id: any){
    
  //   console.log(id);
  //  // this.navCtrl.push('MovieDetailsPage',{id : id});
  // }
}
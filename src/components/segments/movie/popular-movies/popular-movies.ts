import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TmdbProvider } from './../../../../providers/tmdb/tmdb';
import { Component  } from '@angular/core';




@Component({
  selector: "component-popular-movies",
  templateUrl: "popular-movies.html",
  providers: [TmdbProvider]
})
export class PopularMovies {
  imageLink: string = 'https://image.tmdb.org/t/p/w500/';
  
  popularMovies: object[] = [];
  errorMessage: any = "";

  constructor(private tmdbProvider: TmdbProvider) {
    
  }

  // Lifecycle
  ngAfterViewInit() {
    this.getPopularMovies();
  }
  ionViewWillEnter(){
    
  }

  // REST
  getPopularMovies() {
    this.tmdbProvider
      .getPopularMovies()
      .subscribe(
        result => {
          this.popularMovies = result;
          console.log(result);
          
        },
        error => (this.errorMessage = <any>error)
      );
  }
  getMovieDetails(id: any) {
    console.log(id);
    // this.navCtrl.push('MovieDetailsPage',{id : id});
  }
}
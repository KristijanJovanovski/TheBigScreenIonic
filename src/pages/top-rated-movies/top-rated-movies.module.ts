import { LazyLoadImageModule } from 'ng-lazyload-image';

import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopRatedMoviesPage } from './top-rated-movies';

@NgModule({
  declarations: [
    TopRatedMoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(TopRatedMoviesPage),
		LazyLoadImageModule
  ],
  exports:[
    TopRatedMoviesPage
  ],
  providers:[TmdbProvider]
})
export class TopRatedMoviesModule {}

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularMoviesPage } from './popular-movies';

@NgModule({
  declarations: [
    PopularMoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(PopularMoviesPage),
		LazyLoadImageModule
  ],
  exports:[
    PopularMoviesPage
  ],
  providers:[TmdbProvider]
})
export class PopularMoviesModule {}

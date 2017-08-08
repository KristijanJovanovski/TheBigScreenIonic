import { LazyLoadImageModule } from 'ng-lazyload-image';

import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpcomingMoviesPage } from './upcoming-movies';

@NgModule({
  declarations: [
    UpcomingMoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(UpcomingMoviesPage),
		LazyLoadImageModule
  ],
  exports:[
    UpcomingMoviesPage
  ],
  providers:[TmdbProvider]
})
export class UpcomingMoviesModule {}

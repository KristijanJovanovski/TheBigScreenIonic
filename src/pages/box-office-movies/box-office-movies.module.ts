import { LazyLoadImageModule } from 'ng-lazyload-image';

import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoxOfficeMoviesPage } from './box-office-movies';

@NgModule({
  declarations: [
    BoxOfficeMoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(BoxOfficeMoviesPage),
		LazyLoadImageModule
  ],
  exports:[
    BoxOfficeMoviesPage
  ],
  providers:[TmdbProvider]
})
export class BoxOfficeMoviesModule {}

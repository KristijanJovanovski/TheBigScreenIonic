import { OmdbProvider } from './../../providers/omdb/omdb';
import { PipesModule } from './../../pipes/pipes.module';
import { DirectivesModule } from './../../directives/directives.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieDetailsPage } from './movie-details';


@NgModule({
  declarations: [
    MovieDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieDetailsPage),
    LazyLoadImageModule,
    DirectivesModule,
    PipesModule
  ],
  exports:[
    MovieDetailsPage
  ],
  providers:[TmdbProvider, OmdbProvider]
})
export class MovieDetailsModule {}

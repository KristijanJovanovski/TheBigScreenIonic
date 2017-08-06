import { DirectivesModule } from './../../directives/directives.module';
import { ComponentsModule } from './../../components/components.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieDetails } from './movie-details';

@NgModule({
  declarations: [
    MovieDetails,
  ],
  imports: [
    IonicPageModule.forChild(MovieDetails),
    LazyLoadImageModule,
    DirectivesModule
  ],
  exports:[
    MovieDetails
  ],
  providers:[TmdbProvider]
})
export class MovieDetailsModule {}

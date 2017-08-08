import { DirectivesModule } from './../../directives/directives.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TvDetailsPage } from './tv-details';

@NgModule({
  declarations: [
    TvDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TvDetailsPage),
    LazyLoadImageModule,
    DirectivesModule
  ],
  exports:[
    TvDetailsPage
  ],
  providers:[TmdbProvider]
})
export class TvDetailsModule {}

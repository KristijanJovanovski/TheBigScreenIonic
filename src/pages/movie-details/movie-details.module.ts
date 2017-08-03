import { MovieDetailsPage } from './movie-details';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
    MovieDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieDetailsPage),
  ],
  exports: [
    MovieDetailsPage
  ]
})
export class MovieDetailsModule {}
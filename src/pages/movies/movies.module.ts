import { ExpandableHeaderModule } from './../../components/expandable-header/expandable-header.module';
import { MoviesPage } from './movies';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
    MoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviesPage),
    ExpandableHeaderModule
  ],
  exports: [
    MoviesPage
  ]
})
export class MoviesModule {}

import { SuperTabsModule } from 'ionic2-super-tabs';
import { MoviesPage } from './movies';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
    MoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviesPage),
    SuperTabsModule,
  ],
  exports: [
    MoviesPage
  ]
})
export class TvModule {}
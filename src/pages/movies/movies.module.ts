import { ComponentsModule } from './../../components/components.module';
import { MoviesPage } from './movies';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
    MoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviesPage),
    ComponentsModule
  ],
  exports: [
    MoviesPage
  ]
})
export class MoviesModule {}
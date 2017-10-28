import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestMoviePage } from './test-movie';

@NgModule({
  declarations: [
    TestMoviePage,
  ],
  imports: [
    IonicPageModule.forChild(TestMoviePage),
    ComponentsModule
  ],
})
export class TestMoviePageModule {}

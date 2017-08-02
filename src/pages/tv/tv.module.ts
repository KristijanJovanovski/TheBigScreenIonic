import { TvPage } from './tv';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
    TvPage,
  ],
  imports: [
    IonicPageModule.forChild(TvPage),
  ],
  exports: [
    TvPage
  ]
})
export class TvModule {}
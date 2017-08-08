
import { SuperTabsModule } from 'ionic2-super-tabs';
import { TvPage } from './tv';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
    TvPage,
  ],
  imports: [
    IonicPageModule.forChild(TvPage),
    SuperTabsModule,
  ],
  exports: [
    TvPage
  ]
})
export class TvModule {}
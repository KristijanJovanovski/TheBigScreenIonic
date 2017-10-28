import { UserPreferenceProvider } from './../../providers/user-preference/user-preference';

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
  ],
  providers: [ UserPreferenceProvider]
})
export class TvModule {}
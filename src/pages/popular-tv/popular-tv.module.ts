import { LazyLoadImageModule } from 'ng-lazyload-image';

import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularTvPage } from './popular-tv';

@NgModule({
  declarations: [
    PopularTvPage,
  ],
  imports: [
    IonicPageModule.forChild(PopularTvPage),
		LazyLoadImageModule
  ],
  exports:[
    PopularTvPage
  ],
  providers:[TmdbProvider]
})
export class PopularTvModule {}

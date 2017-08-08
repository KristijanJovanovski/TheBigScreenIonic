import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnTheAirTvPage } from './on-the-air-tv';

@NgModule({
  declarations: [
    OnTheAirTvPage,
  ],
  imports: [
    IonicPageModule.forChild(OnTheAirTvPage),
		LazyLoadImageModule
  ],
  exports:[
    OnTheAirTvPage
  ],
  providers:[TmdbProvider]
})
export class OnTheAirTvModule {}

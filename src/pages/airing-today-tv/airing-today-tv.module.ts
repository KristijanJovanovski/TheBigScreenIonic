import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AiringTodayTvPage } from './airing-today-tv';

@NgModule({
  declarations: [
    AiringTodayTvPage,
  ],
  imports: [
    IonicPageModule.forChild(AiringTodayTvPage),
		LazyLoadImageModule
  ],
  exports:[
    AiringTodayTvPage
  ],
  providers:[TmdbProvider]
})
export class AiringTodayTvModule {}

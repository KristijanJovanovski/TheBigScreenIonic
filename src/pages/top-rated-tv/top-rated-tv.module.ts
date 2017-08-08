import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopRatedTvPage } from './top-rated-tv';

@NgModule({
  declarations: [
    TopRatedTvPage,
  ],
  imports: [
    IonicPageModule.forChild(TopRatedTvPage),
		LazyLoadImageModule
  ],
  exports:[
    TopRatedTvPage
  ],
  providers:[TmdbProvider]
})
export class TopRatedTvModule {}

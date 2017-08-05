import { IonicModule } from 'ionic-angular';
import { TmdbProvider } from './../providers/tmdb/tmdb';
import { PopularMovies } from './segments/movie/popular-movies/popular-movies';
import { NgModule } from '@angular/core';
@NgModule({
	declarations: [PopularMovies],
	imports: [IonicModule],
	exports: [PopularMovies],
  	providers: [TmdbProvider]
})
export class ComponentsModule {}
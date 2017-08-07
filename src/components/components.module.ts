import { UpcomingMovies } from './segments/movie/upcoming-movies/upcoming-movies';
import { BoxOfficeMovies } from './segments/movie/box-office-movies/box-office-movies';
import { TopRatedMovies } from './segments/movie/top-rated-movies/top-rated-movies';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { IonicModule } from 'ionic-angular';
import { TmdbProvider } from './../providers/tmdb/tmdb';
import { PopularMovies } from './segments/movie/popular-movies/popular-movies';
import { NgModule } from '@angular/core';
@NgModule({
	declarations: [
		PopularMovies,
		TopRatedMovies,
		BoxOfficeMovies,
		UpcomingMovies
		],
	imports: [IonicModule,LazyLoadImageModule],
	exports: [
		PopularMovies,
		TopRatedMovies,
		BoxOfficeMovies,
		UpcomingMovies
		],
	providers: [TmdbProvider],
})
export class ComponentsModule {}

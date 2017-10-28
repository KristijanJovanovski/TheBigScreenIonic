import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PageTitlePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'pageTitle',
})
export class PageTitlePipe implements PipeTransform {
  /**
   * Takes page's class name and transforms it for the view
   * ex. PopularMoviesPage => Popular
   */
  transform(value: string, ...args) {
    
    return value.slice(0, value.indexOf("Movie") || value.indexOf("TvShow") || value.indexOf("TvSeason") || value.indexOf("TvEpisode"));
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'


// Consts
const apiKey = "api_key=4d6f4d5b0959e58630ef311044d93e2d";
const apiUrl = "https://api.themoviedb.org/3/"

@Injectable()
export class TmdbProvider {
  constructor(public http: Http) {
    console.log('Hello TmdbProvider Provider');
  }

  getPopularMovies(page: number):Observable<any>{
    return this.http.get(apiUrl+"movie/popular?"+apiKey+"&language=en-US&page="+page)
      .map(response => response.json())
      .map(response => response?response.results:[])
      .catch(error => {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
      })
  }
  getTopRatedMovies(page: number):Observable<any>{
    return this.http.get(apiUrl+"movie/top_rated?"+apiKey+"&language=en-US&page="+page)
      .map(response => response.json())
      .map(response => response?response.results:[])
      .catch(error => {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
      })
  }
  getUpcomingMovies(page: number):Observable<any>{
    return this.http.get(apiUrl+"movie/upcoming?"+apiKey+"&language=en-US&page="+page)
      .map(response => response.json())
      .map(response => response?response.results:[])
      .catch(error => {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
      })
  }

  getNowInTheaterMovies(page: number):Observable<any>{
    return this.http.get(apiUrl+"movie/now_playing?"+apiKey+"&language=en-US&page="+page)
      .map(response => response.json())
      .map(response => response?response.results:[])
      .catch(error => {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
      })
  }
    
  getMovieById(id: number):Observable<any>{
    return this.http.get(apiUrl+"movie/"+id+"?"+apiKey+"&language=en-US&append_to_response=videos%2Crecommendations")
      .map(response => response.json())
      .catch(error => {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
      })
  }

}
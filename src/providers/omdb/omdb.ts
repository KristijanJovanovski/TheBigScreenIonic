import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'


// Consts
const apiKey = "&apikey=700f5529&loader=hide";
const apiUrl = "http://www.omdbapi.com/?i=";

@Injectable()
export class OmdbProvider {

  constructor(public http: Http) {
    console.log('Hello OmdbProvider Provider');
  }

  getRatings(imdbId: string):Observable<any>{
    return this.http.get(apiUrl+imdbId+apiKey)
      .map(response => response.json())
      .map(response => response?response.Ratings:[])
      .catch(error => {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
      })
  }

}

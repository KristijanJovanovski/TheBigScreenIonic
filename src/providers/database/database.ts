import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AuthProvider } from './../auth/auth';

import { AngularFirestore } from 'angularfire2/firestore';
import firebase  from 'firebase/app';

import { TvshowBookmark, TvshowRate, TvshowWatch, MovieBookmark, MovieWatch, MovieRate } from './../../models/ActionsAssets';
import { TvShow } from './../../models/TvShow';
import { User } from './../../models/User';
import { Movie } from './../../models/Movie';
import { Asset } from './../../models/Asset';


import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DatabaseProvider {
  userUID : string;

  watchedMovies: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>(null);
  bookmarkedMovies: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>(null);
  ratedMovies: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>(null);
  watchedTvShows: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>(null);
  bookmarkedTvShows: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>(null);
  ratedTvShows: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>(null);

  constructor(public afs: AngularFirestore, public auth: AuthProvider, public http: Http) {
    console.log('Hello DatabaseProvider Provider');
    this.auth.getUser()? this.userUID = this.auth.getUser().uid : this.auth.logoutUser();
  }

  watchedMoviesNext(assets : Asset[]){
    this.watchedMovies.next(assets);
  }
  
  getWatchedMovies(): Observable<Asset[]> {
    return this.watchedMovies.asObservable();
  }

  bookmarkedMoviesNext(assets : Asset[]){
    this.bookmarkedMovies.next(assets);
  }
  
  getBookmarkedMovies(): Observable<Asset[]> {
    return this.bookmarkedMovies.asObservable();
  }

  ratedMoviesNext(assets : Asset[]){
    this.ratedMovies.next(assets);
  }
  
  getRatedMovies(): Observable<Asset[]> {
    return this.ratedMovies.asObservable();
  }


  
  watchedTvShowsNext(assets : Asset[]){
    this.watchedTvShows.next(assets);
  }

  getWatchedTvShows(): Observable<Asset[]> {
    return this.watchedTvShows.asObservable();
  }

  bookmarkedTvShowsNext(assets : Asset[]){
    this.bookmarkedTvShows.next(assets);
  }

  getBookmarkedTvShows(): Observable<Asset[]> {
    return this.bookmarkedTvShows.asObservable();
  }

  ratedTvShowsNext(assets : Asset[]){
    this.ratedTvShows.next(assets);
  }

  getRatedTvShows(): Observable<Asset[]> {
    return this.ratedTvShows.asObservable();
}






  getUserDetails(){
    var getFromFirestore  = false;
    let docRef = this.afs.collection("users").doc(`${this.userUID}`);
    docRef.ref.get().then(doc=>{
      getFromFirestore = doc.exists
    })
    
    if(getFromFirestore){
      return this.afs
      .doc(`users/${this.userUID}`)
      .valueChanges()
      .map(user=>{
        return { 
          uid: user['uid'] || this.userUID, 
          firstName: user['firstname'], 
          lastName: user['lastname'],
          username: user['username'], 
          avatar: user['avatar'], 
          lastLogin: user['lastLogin'], 
          gender: user['gender'], 
          email: user['email']
          
        } as User
      })
    }else{
      let u =  this.auth.getUser();
      return Observable.of({ 
        uid: u.uid,
        email: u.email,
        firstName: u.displayName.split(' ')['0'],
        lastName: u.displayName.split(' ')['1'],
        avatar: u.photoURL
       } as User);
    }
    
  }

  getRatedMoviesFS(){
    return this.afs
      .collection('movies-rated',ref=>ref
        .where('userId','==',this.userUID)
        .orderBy('date','desc')
      )
      .valueChanges()
      .do(e=>console.log("g R m"))
      .map(movies=>{
        return movies.map(movie=>({
          id:  movie['movieId'],
          dateRated: movie['date'],
          rate: movie['rate'],

          backdrop_path:  movie['backdrop_path'],
          poster_path :  movie['poster_path'],
          title : movie['title'],
          vote_average : movie['vote_average']
        }) as Movie)
      })
      .share();
  }

  getBookmarkedMoviesFS(){
    return this.afs
    .collection('movies-bookmarked',ref=>ref
      .where('userId','==',this.userUID)
      .orderBy('date','desc')
    )
    .valueChanges()
    .do(e=>console.log("g B m"))
    .map(movies=>{
      return movies.map(movie=>({
        id:  movie['movieId'],
        dateBookmarked: movie['date'],
        
        backdrop_path:  movie['backdrop_path'],
        poster_path :  movie['poster_path'],
        title : movie['title'],
        vote_average : movie['vote_average']

      }) as Movie)
    })
    .share();
  }

  getWatchedMoviesFS(){
    return this.afs
    .collection('movies-watched',ref=>ref
      .where('userId','==',this.userUID)
      .orderBy('date','desc')
    ).valueChanges()
    .do(e=>console.log("g W m"))
    .map(movies=>{
      return movies.map(movie=>({
        id:  movie['movieId'],
        dateRated: movie['date'],
        
        backdrop_path:  movie['backdrop_path'],
        poster_path :  movie['poster_path'],
        title : movie['title'],
        vote_average : movie['vote_average']

      }) as Movie)
    })
    .share();
  }

  movieWatched(asset : Asset){
    if(asset.watched){
      const assetWatch : MovieWatch = { 
        userId: this.userUID,
        movieId: +asset.id,
        date: new Date(),
        backdrop_path: asset.backdrop_path,
        poster_path: asset.poster_path,
        title: asset.title,
        vote_average: asset.vote_average
      }
      this.afs.doc(`movies-watched/${this.userUID}_${asset.id}`).set(assetWatch);
    }else{
      this.afs.doc(`movies-watched/${this.userUID}_${asset.id}`).delete();
    }
  }
  
  movieBookmarked(asset : Asset) {
    if(asset.bookmarked){
      const assetBookmark : MovieBookmark = { 
        userId: this.userUID,
        movieId: +asset.id,
        date: new Date(),
        backdrop_path: asset.backdrop_path,
        poster_path: asset.poster_path,
        title: asset.title,
        vote_average: asset.vote_average
      }
      this.afs.doc(`movies-bookmarked/${this.userUID}_${asset.id}`).set(assetBookmark);
    }else{
      this.afs.doc(`movies-bookmarked/${this.userUID}_${asset.id}`).delete();
    }
  }

  movieRated(asset : Asset){
    if(asset.rated){
      const assetRate : MovieRate = { 
        userId: this.userUID,
        movieId: +asset.id,
        date: new Date(),
        backdrop_path: asset.backdrop_path,
        poster_path: asset.poster_path,
        title: asset.title,
        vote_average: asset.vote_average,
        rate: asset.rate
      }
      this.afs.doc(`movies-rated/${this.userUID}_${asset.id}`).set(assetRate);
    }else{
      this.afs.doc(`movies-rated/${this.userUID}_${asset.id}`).delete();
    }
  }


  getRatedTvShowsFS(){
    // TODO: add map to Movie...
    return this.afs
      .collection('tvshows-rated',ref=>ref
        .where('userId','==',this.userUID)
        .orderBy('date','desc')
      )
      .valueChanges()
      .do(e=>console.log("g R s"))
      .map(tvshows=>{
        return tvshows.map(tvshow=>({
          id:  tvshow['tvshowId'],
          dateRated: tvshow['date'],
          rate: tvshow['rate'],
          
          backdrop_path:  tvshow['backdrop_path'],
          poster_path :  tvshow['poster_path'],
          title : tvshow['title'],
          vote_average : tvshow['vote_average']

        }) as TvShow)
      })
      .share();
  }

  getBookmarkedTvShowsFS(){
    return this.afs
    .collection('tvshows-bookmarked',ref=>ref
      .where('userId','==',this.userUID)
      .orderBy('date','desc')
    )
    .valueChanges()
    .do(e=>console.log("g B s"))
    .map(tvshows=>{
      return tvshows.map(tvshow=>({
        id:  tvshow['tvshowId'],
        dateBookmarked: tvshow['date'],
        
        backdrop_path:  tvshow['backdrop_path'],
        poster_path :  tvshow['poster_path'],
        title : tvshow['title'],
        vote_average : tvshow['vote_average']

      }) as TvShow)
    })
    .share();
  }

  getWatchedTvShowsFS(){
    return this.afs
    .collection('tvshows-watched',ref=>ref
      .where('userId','==',this.userUID)
      .orderBy('date','desc')
    )
    .valueChanges()
    .do(e=>console.log("g w s"))
    .map(tvshows=>{
      return tvshows.map(tvshow=>({
        id:  tvshow['tvshowId'],
        dateRated: tvshow['date'],
        
        backdrop_path:  tvshow['backdrop_path'],
        poster_path :  tvshow['poster_path'],
        title : tvshow['title'],
        vote_average : tvshow['vote_average']

      }) as TvShow)
    })
    .share();
  }


  tvshowWatched(asset : Asset){
    if(asset.watched){
      const assetWatch : TvshowWatch = { 
        userId: this.userUID,
        tvshowId: +asset.id,
        date: new Date(),
        backdrop_path: asset.backdrop_path,
        poster_path: asset.poster_path,
        title: asset.title,
        vote_average: asset.vote_average
      }
      this.afs.doc(`tvshows-watched/${this.userUID}_${asset.id}`).set(assetWatch);
    }else{
      this.afs.doc(`tvshows-watched/${this.userUID}_${asset.id}`).delete();
    }
  }
  
  tvshowBookmarked(asset : Asset) {
    if(asset.bookmarked){
      const assetBookmark : TvshowBookmark = { 
        userId: this.userUID,
        tvshowId: +asset.id,
        date: new Date(),
        backdrop_path: asset.backdrop_path,
        poster_path: asset.poster_path,
        title: asset.title,
        vote_average: asset.vote_average
      }
      this.afs.doc(`tvshows-bookmarked/${this.userUID}_${asset.id}`).set(assetBookmark);
    }else{
      this.afs.doc(`tvshows-bookmarked/${this.userUID}_${asset.id}`).delete();
    }
  }

  tvshowRated(asset : Asset){
    if(asset.rated){
      const assetRate : TvshowRate = { 
        userId: this.userUID,
        tvshowId: +asset.id,
        date: new Date(),
        backdrop_path: asset.backdrop_path,
        poster_path: asset.poster_path,
        title: asset.title,
        vote_average: asset.vote_average,
        rate: asset.rate
      }
      this.afs.doc(`tvshows-rated/${this.userUID}_${asset.id}`).set(assetRate);
    }else{
      this.afs.doc(`tvshows-rated/${this.userUID}_${asset.id}`).delete();
    }
  }

}

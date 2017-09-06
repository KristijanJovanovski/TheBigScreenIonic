import { SuperTabsController } from 'ionic2-super-tabs/dist';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HttpModule } from '@angular/http';
import { TmdbProvider } from './../providers/tmdb/tmdb';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {SuperTabsModule } from 'ionic2-super-tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';
import { OmdbProvider } from '../providers/omdb/omdb';

export const firebaseConfig = {
  apiKey: "AIzaSyCupvz_AG8N7x5DNIZl1mOFQZFM8Y7bDmk",
  authDomain: "the-big-screen-a649c.firebaseapp.com",
  databaseURL: "https://the-big-screen-a649c.firebaseio.com",
  projectId: "the-big-screen-a649c",
  storageBucket: "",
  messagingSenderId: "997676054462"
};


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages: true}),
    SuperTabsModule,
    HttpModule,
    LazyLoadImageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TmdbProvider,
    SuperTabsController,
    Facebook,
    GooglePlus,
    AuthProvider,
    DatabaseProvider,
    OmdbProvider,
  ]
})
export class AppModule {}

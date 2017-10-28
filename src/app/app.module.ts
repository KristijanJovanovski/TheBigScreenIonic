import { SuperTabsController } from 'ionic2-super-tabs/dist';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HttpModule } from '@angular/http';
import { TmdbProvider } from './../providers/tmdb/tmdb';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { firebaseConfig } from "../../firebase.config";
import { AngularFireModule  } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from "angularfire2/firestore";

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';
import { OmdbProvider } from '../providers/omdb/omdb';
import { UserPreferenceProvider } from '../providers/user-preference/user-preference';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,
      {
        tabsHideOnSubPages: true,
        platforms : {
          ios : { scrollAssist : false, autoFocusAssist : false},
          android : { scrollAssist : false, autoFocusAssist : false},
          windows : { scrollAssist : false, autoFocusAssist : false}
        }
      }),
    SuperTabsModule,
    HttpModule,
    LazyLoadImageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,


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
    UserPreferenceProvider,
  ]
})
export class AppModule {}

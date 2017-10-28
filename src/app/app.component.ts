import { DatabaseProvider } from './../providers/database/database';
import { Component } from "@angular/core";
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';


import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html',
  providers: [Keyboard]
})
export class MyApp { 
  rootPage:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    afAuth: AngularFireAuth, private keyboard: Keyboard) {

    const authObserver = afAuth.authState.subscribe( user => {
      if (user){
        this.rootPage = 'tabs-page';
        authObserver.unsubscribe();
      } else {
        this.rootPage = 'LoginPage';
        authObserver.unsubscribe();
      }
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if(platform.is('android') || platform.is('ios')){
        keyboard.disableScroll(true);
        
      }
    });
  }
}

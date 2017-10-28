import { Observable } from 'rxjs/Observable';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';



@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth,
    public googlePlus: GooglePlus,
    public facebook: Facebook
  ) {}

  getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  googleLogin(): Promise<any> {
    return this.googlePlus
      .login({
        webClientId:
          "997676054462-75qkq23b6mdun81h7c4e7gffmpog2i49.apps.googleusercontent.com",
        offline: true
      })
      .then(res => {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          res.idToken
        );
        this.afAuth.auth
          .signInWithCredential(credential)
          // .then(success => {
          //   console.log("Firebase success: " + JSON.stringify(success));
          //   this.authenticated = true;
          // })
          // .catch(error =>{
          //   console.log("Firebase failure: " + JSON.stringify(error));
          //   this.authenticated = false;            
          // });
      })
      // .catch(err => console.error("Error: ", err));
  }

  facebookLogin(): Promise<any> {
    return this.facebook
      .login(["email"])
      .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
          response.authResponse.accessToken
        );
        this.afAuth.auth
          .signInWithCredential(facebookCredential)
          // .then(success => {
          //   console.log("Firebase success: " + JSON.stringify(success));            
          //   this.authenticated = true;
          // })
          // .catch(error => {
          //   console.log("Firebase failure: " + JSON.stringify(error));            
          //   this.authenticated = false;           
          // });
      })
      // .catch(error => {
      //   console.log(error);
      // });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<any> {   
    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      newEmail,
      newPassword
    );
  }
}
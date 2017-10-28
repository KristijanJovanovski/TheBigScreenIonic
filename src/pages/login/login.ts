import { DatabaseProvider } from './../../providers/database/database';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  public loginForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authProvider: AuthProvider, 
    public database: DatabaseProvider,
    public formBuilder: FormBuilder, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Enter(promise:any,type: string):void{
    promise.then(() => {
        // this.navCtrl.setRoot('tabs-page');
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

  googleLogin(): void {
    this.Enter(this.authProvider.googleLogin(),"social")
  }

  facebookLogin(): void {
    this.Enter(this.authProvider.facebookLogin(),"social")
  }




  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.Enter(this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password),"email")
    }
  }

  ResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }

}
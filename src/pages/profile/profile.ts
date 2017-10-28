import { MainPopoverComponent } from './../../components/main-popover/main-popover';
import { DatabaseProvider } from "./../../providers/database/database";
import { User } from "./../../models/User";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, App, PopoverController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  user: User;
  avatar: string = 'assets/images/avatar-male.png';

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public database: DatabaseProvider,
    public popoverCtrl: PopoverController,
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilePage");
    console.log(this.auth.getUser());
    console.log("User from profilePage: ");
    this.getUser();
  }

  getUser() {
    this.database.getUserDetails().subscribe(response => {
      console.log(response);
      this.user = response;
      this.avatar = response.avatar || 'assets/images/avatar-male.png';
    });
  }

  popoverPresent(event){
    let popover = this.popoverCtrl.create('MainPopoverComponent');
    popover.present({
      ev: event
    });
  }

  logOut() {
    this.auth
      .logoutUser()
      .then(() => {
        console.log("logged out");

        this.app.getRootNav().setRoot("LoginPage");
      })
      .catch(error => {
        console.log(error);
      });
  }
}

import { MainPopoverModule } from './../../components/main-popover/main-popover.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    LazyLoadImageModule,
    MainPopoverModule
  ]
})
export class ProfileModule {}

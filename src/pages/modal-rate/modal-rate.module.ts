import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalRate } from './modal-rate';

@NgModule({
  declarations: [
    ModalRate,
  ],
  imports: [
    IonicPageModule.forChild(ModalRate),
		LazyLoadImageModule
  ],
})
export class ModalRateModule {}

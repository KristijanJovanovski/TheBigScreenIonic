import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CalendarPage } from './calendar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
    CalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarPage),
    LazyLoadImageModule,
  ],
  exports: [
    CalendarPage
  ]
})
export class CalendarModule {}
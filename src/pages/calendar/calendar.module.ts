import { CalendarPage } from './calendar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
    CalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarPage),
  ],
  exports: [
    CalendarPage
  ]
})
export class CalendarModule {}
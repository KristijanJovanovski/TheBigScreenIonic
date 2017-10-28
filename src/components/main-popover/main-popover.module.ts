import { MainPopoverComponent } from './main-popover';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';



@NgModule({
    imports: [
        IonicPageModule.forChild(MainPopoverComponent),
        
    ],
    declarations: [
        MainPopoverComponent
    ],

})

export class MainPopoverModule{}
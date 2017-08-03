import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { ExpandableHeader } from './expandable-header';

@NgModule({
    imports: [IonicModule],
    exports: [ExpandableHeader],
    declarations: [ExpandableHeader],
    providers: [],
})
export class ExpandableHeaderModule { }

import { TmdbProvider } from './../providers/tmdb/tmdb';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { MainPopoverComponent } from './main-popover/main-popover';
import { GridComponent } from './grid/grid';
import { TileComponent } from './tile/tile';

@NgModule({
	declarations: [
		GridComponent,
		TileComponent,
	],
	imports: [
		IonicModule.forRoot(TileComponent,GridComponent),
		LazyLoadImageModule
	],
	exports: [
		GridComponent,
		TileComponent
	],
	providers:[TmdbProvider]
})
export class ComponentsModule {}

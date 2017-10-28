import { NgModule } from '@angular/core';
import { YoutubePipe } from './youtube/youtube';
import { PageTitlePipe } from './page-title/page-title';
@NgModule({
	declarations: [YoutubePipe,
    PageTitlePipe],
	imports: [],
	exports: [YoutubePipe,
    PageTitlePipe]
})
export class PipesModule {}

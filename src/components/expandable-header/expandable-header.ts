import { Component, Input, ElementRef, Renderer } from "@angular/core";

@Component({
  selector: 'expandable-header',
  templateUrl: 'expandable-header.html'
})
export class ExpandableHeader {

  @Input('scrollArea')scrollArea: any;
  headerHeight: any;
  newHeaderHeight: any;
  constructor(public element:ElementRef, public renderer: Renderer) {
    console.log('Hello ExpandableHeader Component');
    this.headerHeight = 100;
    this.renderer.setElementStyle(this.element.nativeElement,'height',this.headerHeight + 'px')
  }

  ngAfterViewInit(){
   this.scrollArea.ionScroll.subscribe((ev)=> {
      this.resizeHeader(ev);
    })
  }

  resizeHeader(ev){
    ev.domWrite(()=>{
      console.log(ev.scrollTop);
      this.newHeaderHeight = this.headerHeight - ev.scrollTop;

      if(this.newHeaderHeight < 0){
        this.newHeaderHeight = 0;
      }

      this.renderer.setElementStyle(this.element.nativeElement,'height',this.newHeaderHeight+'px'); 
      
    });
  }
}

import { Directive, ElementRef, Renderer } from '@angular/core';
 
@Directive({
  selector: "[parallax-header]",
  host: {
    "(ionScroll)": "onContentScroll($event)",
    "(window:resize)": "onWindowResize($event)"
  }
})
export class ParallaxHeader {
  mainContent: any;
  navbarRef: any;

  header: any;
  headerHeight: any;
  translateAmt: any;
  scaleAmt: any;
  navbarBackground: any;

  constructor(public element: ElementRef, public renderer: Renderer) {}

  ngOnInit() {
    this.navbarRef = this.element.nativeElement.parentElement.getElementsByClassName("header-md")["0"] ? this.element.nativeElement.parentElement.getElementsByClassName("header-md")["0"] : this.element.nativeElement.parentElement.getElementsByClassName("header-ios")["0"];

    this.navbarBackground = this.element.nativeElement.parentElement.children[
      "0"
    ].getElementsByClassName("toolbar-background")["0"];

    let content = this.element.nativeElement.getElementsByClassName(
      "scroll-content"
    )[0];
    this.header = content.getElementsByClassName("header-image")[0];
    this.mainContent = content.getElementsByClassName("main-content")[0];

    this.headerHeight = this.header.clientHeight;

    this.renderer.setElementStyle(
      this.header,
      "webkitTransformOrigin",
      "center bottom"
    );
    this.renderer.setElementStyle(this.header, "background-size", "cover");
    this.renderer.setElementStyle(this.mainContent, "position", "absolute");
    
  }

  onWindowResize(ev) {
    this.headerHeight = this.header.clientHeight;
  }

  onContentScroll(ev) {
    ev.domWrite(() => {
      this.updateParallaxHeader(ev);
    });
  }

  updateParallaxHeader(ev) {

    if (ev.scrollTop >= 0) {
      this.translateAmt = ev.scrollTop / 2;
      this.scaleAmt = 1;
    } else {
      this.translateAmt = 0;
      this.scaleAmt = -ev.scrollTop / this.headerHeight + 1;
    }
    if (ev.scrollTop >= 240) {
    //   if (ev.scrollTop >= 240 && ev.scrollTop <= 280 &&) {
    //     this.renderer.setElementStyle(this.navbarRef, "top", "-56px");
    //     this.renderer.setElementStyle(this.mainContent, "margin-top", "-56px");
    //   }else
       if (ev.scrollTop >= 260 && (ev.startY - ev.scrollTop) < -30 ){
        this.renderer.setElementStyle(this.navbarRef, "top", "-56px");
        this.renderer.setElementStyle(this.mainContent, "margin-top", "-56px");
      }else if (ev.scrollTop >= 260 && (ev.startY - ev.scrollTop) > 30 ){
        this.renderer.setElementStyle(this.navbarRef, "top", "0");
        this.renderer.setElementStyle(this.mainContent, "margin-top", "0");
      }

    } else {
      this.renderer.setElementStyle(this.navbarRef, "top", "0");
      this.renderer.setElementStyle(this.mainContent, "margin-top", "0");
    }
    if (this.translateAmt >= 80) {
      this.renderer.setElementStyle(
        this.navbarBackground,
        "background-color",
        "rgba(0,0,0, 1)"
      );
    } else if (this.translateAmt > 50) {
      this.renderer.setElementStyle(
        this.navbarBackground,
        "background-color",
        "rgba(0,0,0, 0.8)"
      );
      this.renderer.setElementStyle(
        this.navbarBackground,
        "transition-timing-function",
        "ease-out"
      );
      this.renderer.setElementStyle(
        this.navbarBackground,
        "transition",
        "background-color 0.2s"
      );
    } else {
      this.renderer.setElementStyle(
        this.navbarBackground,
        "background-color",
        "rgba(0,0,0, 0.3)"
      );
    }

    this.renderer.setElementStyle(
      this.header,
      "webkitTransform",
      "translate3d(0," +
        this.translateAmt +
        "px,0) scale(" +
        this.scaleAmt +
        "," +
        this.scaleAmt +
        ")"
    );
  }
}
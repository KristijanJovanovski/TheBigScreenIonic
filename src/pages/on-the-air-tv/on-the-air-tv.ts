import { Input } from '@angular/core';
import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';


@IonicPage()
@Component({
  selector: "on-the-air-tv",
  templateUrl: "on-the-air-tv.html",
  providers: [TmdbProvider]
})
export class OnTheAirTvPage {
  rootNavCtrl: any;
  @Input() myContent: Content;

  page: number = 1;
  imageLink: string = "https://image.tmdb.org/t/p/w500/";
  onTheAirTv: object[] = [];
  errorMessage: any = "";

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private tmdbProvider: TmdbProvider
  ) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OnTheAirTvPage");
  }

  ngAfterViewInit() {
    this.page = 1;
    this.onTheAirTv = [];
    this.getOnTheAirTv(this.page);
  }

  // REST
  getOnTheAirTv(page: number): Promise<any> {
    return new Promise(resolve => {
      this.tmdbProvider.getOnTheAirTv(page).subscribe(result => {
        result.forEach(x => {
          this.onTheAirTv.push(x);
        });
        this.page++;
        resolve();
      }, error => (this.errorMessage = <any>error));
    });
  }
  getTvDetails(tv: any) {
    console.log("Tv details for: " + tv.id + " " + tv.title);
    this.rootNavCtrl.push("TvDetailsPage", { tv: tv });
  }

  // REST + Animations

  tvWatched(tv: any, event) {
    console.log("Tv watched: " + tv.title);
    event.target.style.color = event.target.style.color ? "" : "red";
    // register and persist data about the user
  }
  tvFavorite(tv: any, event) {
    console.log("Tv favorited: " + tv.title);
    event.target.style.color = event.target.style.color ? "" : "red";
    // register and persist data about the user
  }
  watchTv(tv: any) {
    console.log("Watching Tv: " + tv.title);
    // register and persist data about the user
  }
  rateTv(tv: any, event) {
    console.log("Rate Tv " + tv.title);
    event.target.parentElement.children[0].style.color = event.target
      .parentElement.children[0].style.color
      ? ""
      : "red";
  }

  // Populate the feed

  doInfinite(infiniteScroll) {
    console.log("Begin async operation");
    this.getOnTheAirTv(this.page).then(() => {
      console.log("Async operation has ended");
      setTimeout(() => {
        infiniteScroll.complete();
      }, 1000);
    });
  }
}

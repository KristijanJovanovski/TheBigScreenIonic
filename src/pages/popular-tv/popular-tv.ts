import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { Component, Input } from "@angular/core";
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';


@IonicPage()
@Component({
  selector: "popular-tv",
  templateUrl: "popular-tv.html",
  providers: [TmdbProvider]
})
export class PopularTvPage {
  rootNavCtrl: any;

  @Input() myContent: Content;
  page: number = 1;
  imageLink: string = "https://image.tmdb.org/t/p/w500/";
  popularTv: object[] = [];
  errorMessage: any = "";

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private tmdbProvider: TmdbProvider
  ) {
    this.rootNavCtrl = navParams.get("rootNavCtrl");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PopularTvPage");
  }

  ngAfterViewInit() {
    this.page = 1;
    this.popularTv = [];
    this.getPopularTv(this.page);
  }

  // REST
  getPopularTv(page: number): Promise<any> {
    return new Promise(resolve => {
      this.tmdbProvider.getPopularTv(page).subscribe(result => {
        result.forEach(x => {
          this.popularTv.push(x);
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
    this.getPopularTv(this.page).then(() => {
      console.log("Async operation has ended");
      setTimeout(() => {
        infiniteScroll.complete();
      }, 1000);
    });
  }
}

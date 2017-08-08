import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { Component, Input } from "@angular/core";
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';


@IonicPage()
@Component({
  selector: "upcoming-movies",
  templateUrl: "upcoming-movies.html",
  providers: [TmdbProvider]
})
export class UpcomingMoviesPage {
  rootNavCtrl: any;

  @Input() myContent: Content;
  page: number = 1;
  imageLink: string = "https://image.tmdb.org/t/p/w500/";
  upcomingMovies: object[] = [];
  errorMessage: any = "";

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private tmdbProvider: TmdbProvider
  ) {
    this.rootNavCtrl = navParams.get("rootNavCtrl");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UpcomingMoviesPage");
  }

  ngAfterViewInit() {
    this.page = 1;
    this.upcomingMovies = [];
    this.getUpcomingMovies(this.page);
  }

  // REST
  getUpcomingMovies(page: number): Promise<any> {
    return new Promise(resolve => {
      this.tmdbProvider.getUpcomingMovies(page).subscribe(result => {
        result.forEach(x => {
          this.upcomingMovies.push(x);
        });
        this.page++;
        resolve();
      }, error => (this.errorMessage = <any>error));
    });
  }
  getMovieDetails(movie: any) {
    console.log("Movie details for: " + movie.id + " " + movie.title);
    this.rootNavCtrl.push("MovieDetailsPage", { movie: movie });
  }

  // REST + Animations

  movieWatched(movie: any, event) {
    console.log("Movie watched: " + movie.title);
    event.target.style.color = event.target.style.color ? "" : "red";
    // register and persist data about the user
  }
  movieFavorite(movie: any, event) {
    console.log("Movie favorited: " + movie.title);
    event.target.style.color = event.target.style.color ? "" : "red";
    // register and persist data about the user
  }
  watchMovie(movie: any) {
    console.log("Watching Movie: " + movie.title);
    // register and persist data about the user
  }
  rateMovie(movie: any, event) {
    console.log("Rate Movie " + movie.title);
    event.target.parentElement.children[0].style.color = event.target
      .parentElement.children[0].style.color
      ? ""
      : "red";
  }

  // Populate the feed

  doInfinite(infiniteScroll) {
    console.log("Begin async operation");
    this.getUpcomingMovies(this.page).then(() => {
      console.log("Async operation has ended");
      setTimeout(() => {
        infiniteScroll.complete();
      }, 1000);
    });
  }
}

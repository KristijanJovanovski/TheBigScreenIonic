import { TmdbProvider } from './../../providers/tmdb/tmdb';
import { Component, Input } from "@angular/core";
import { IonicPage, NavController, NavParams, Content, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: "popular-movies",
  templateUrl: "popular-movies.html",
  providers: [TmdbProvider]
})
export class PopularMoviesPage {
  rootNavCtrl: any;

  @Input() myContent: Content;
  page: number = 1;
  imageLink: string = "https://image.tmdb.org/t/p/w500/";
  popularMovies: object[] = [];
  errorMessage: any = "";

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private tmdbProvider: TmdbProvider,
    public modalCtrl: ModalController
  ) {
    this.rootNavCtrl = navParams.get("rootNavCtrl");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PopularMoviesPage");
  }

  ngAfterViewInit() {
    this.page = 1;
    this.popularMovies = [];
    this.getPopularMovies(this.page);
  }

  // REST
  getPopularMovies(page: number): Promise<any> {
    return new Promise(resolve => {
      this.tmdbProvider.getPopularMovies(page).subscribe(result => {
        result.forEach(x => {
          this.popularMovies.push(x);
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
    if(!event.target.style.color){
      event.target.style.color = 'red';
      event.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.style.opacity = '0.1'; 
    }else{
      event.target.style.color = '';
      event.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.style.opacity = '1'; 
    }
    // register and persist data about the user and the movie
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
    console.log("Rate Movie: " + movie.title);
    console.log(event);
    
    if(event.target.parentElement.children[0].style.color){
      event.target.parentElement.children[0].style.color = '';
      // TODO: Unrate movie
    }else{
      let myModal = this.modalCtrl.create("ModalRate",{"movie": movie});
      myModal.present();
      myModal.onDidDismiss((data) => {
        console.log("I have dismissed.");
        if(data)
          event.target.parentElement.children[0].style.color = "red";
        console.log(data);
      });
    }
  }

  // Populate the feed

  doInfinite(infiniteScroll) {
    console.log("Begin async operation");
    this.getPopularMovies(this.page).then(() => {
      console.log("Async operation has ended");
      setTimeout(() => {
        infiniteScroll.complete();
      }, 1000);
    });
  }
}

export class Asset {
    id: string; // should be number and  the same with  tmdbId... For now it is to be used like this until tratkt provider is implemented;
    traktId : string;
    title: string;

    poster_path : string;
    backdrop_path : string;

    vote_average : number;
    overview : string;
    
    status : string;
    type : string;

    videos : object;

    rated : boolean;
    rate? : number;
    dateRated : Date;

    bookmarked : boolean;
    dateBookmarked : Date;

    watched : boolean;
    dateWatched : Date;
    constructor(){

    }
}

export const AssetType = {
    'Movie':'Movie' ,
    'TvShow':'Tv Show',
    'TvSeason':'Tv Season',
    'TvEpisode':'Tv Episode'
}

export const AssetCategory = {
    // TODO:    when updating typescript to 2.5+ refactor this enum to contain like key val pairs {Popular : 'Popular'}
    
    // movies
    'Bookmarked': "Bookmarked",
    'BoxOffice':'Box Office',
    'Popular':'Popular',
    'Rated':'Rated',
    'TopRated':'Top Rated',
    'Trending':'Trending',
    'Upcoming':'Upcoming',
    'Watched':'Watched',

    // tv
    'AiringToday':'Airing Today',
    'OnTheAir':'On The Air',
}
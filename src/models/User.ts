export class User {
    id: string;
    firstName: string;
    secondName: string;
    userName: string;
    avatar: any;
    lastLogin: string;
    totalMovieTime: string;
    totalTvTime: string;
    

//  Lists
    watchedMovies: [any];
    ratedMovies: [any];
    bookmarkedMovies: [any];
    watchedTvSeries: [any];
    ratedTvSeries: [any];
    bookmarkedTvSeries: [any];
    watchedTvEpisodes: [any];
    ratedTvEpisodes: [any];
    bookmarkedEpisodes: [any];
    logins: [string]
}
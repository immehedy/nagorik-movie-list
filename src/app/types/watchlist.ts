interface WatchlistItem {
    id: number; // or string, depending on your ID type
    title: string;
    addedAt: Date;
    poster: string;
    overview: string; // Added overview property
    backdropPath: string; // Added backdropPath property
    releaseDate: string; // Added releaseDate property
    voteAverage: number; // Added voteAverage property
    // Add any other properties that a movie might have
}
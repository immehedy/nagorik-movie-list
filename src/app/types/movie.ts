  interface Movie {
    id: number
    title: string
    overview: string
    poster_path: string
    backdrop_path: string
    release_date: string
    vote_average: number
  }
  
  interface MovieResponse {
    page: number
    results: Movie[]
    total_pages: number
  }
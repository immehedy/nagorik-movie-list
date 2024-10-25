const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

export async function fetchMovies(page = 1): Promise<MovieResponse> {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
  )
  return res.json()
}

export async function fetchMovie(id: string): Promise<Movie> {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
  )
  return res.json()
}

export async function fetchRecommendations(id: string): Promise<Movie[]> {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  const data = await res.json();
  return data.results; // Return the array of recommended movies
}


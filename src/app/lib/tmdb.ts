const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY // API key for TMDB
const TMDB_BASE_URL = 'https://api.themoviedb.org/3' // Base URL for TMDB API

export async function fetchMovies(page = 1): Promise<MovieResponse> {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}` // Fetch popular movies
  )
  return res.json() // Return the JSON response
}

export async function searchMovies(query: string, page: number = 1) {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query // Encode the search query
    )}&page=${page}` // Fetch movies based on search query
  )
  if (!response.ok) {
    throw new Error('Network response was not ok') // Handle network errors
  }
  return response.json() // Return the JSON response
}

export async function fetchMovie(id: string): Promise<Movie> {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}` // Fetch movie details by ID
  )
  return res.json() // Return the JSON response
}

export async function fetchRecommendations(id: string): Promise<Movie[]> {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${id}/recommendations?api_key=${TMDB_API_KEY}` // Fetch movie recommendations
  );

  if (!res.ok) {
    throw new Error('Failed to fetch recommendations'); // Handle fetch errors
  }

  const data = await res.json(); // Parse the JSON response
  return data.results; // Return the array of recommended movies
}

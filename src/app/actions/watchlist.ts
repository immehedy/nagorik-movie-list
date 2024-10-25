'use server'

import { revalidatePath } from 'next/cache'

// In-memory storage (Note: This will reset on server restart)
let serverWatchlist: WatchlistItem[] = []

export async function toggleWatchlistServer(movie: Movie) {
  const exists = serverWatchlist.some(item => item.id === movie.id)
  
  if (exists) {
    serverWatchlist = serverWatchlist.filter(item => item.id !== movie.id)
  } else {
    serverWatchlist.push({ 
        ...movie, 
        addedAt: new Date(), 
        poster: movie.poster_path, 
        backdropPath: movie.backdrop_path, 
        releaseDate: movie.release_date, 
        voteAverage: movie.vote_average 
      })
  }
  
  revalidatePath('/watchlist')
  revalidatePath(`/movies/${movie.id}`)
  
  return { 
    success: true, 
    isAdded: !exists, 
    watchlist: serverWatchlist 
  }
}

export async function getWatchlist() {
  return serverWatchlist
}
'use server'

import { revalidatePath } from 'next/cache'
import fs from 'fs'
import path from 'path'

// Define the path for the watchlist file
const watchlistFilePath = path.join(process.cwd(), 'watchlist.json')

// Load the watchlist from the file
let serverWatchlist: WatchlistItem[] = loadWatchlist()

function loadWatchlist() {
  try {
    const data = fs.readFileSync(watchlistFilePath, 'utf8')
    return JSON.parse(data) || []
  } catch (error) {
    console.error('Error loading watchlist:', error)
    return []
  }
}

function saveWatchlist() {
  fs.writeFileSync(watchlistFilePath, JSON.stringify(serverWatchlist, null, 2))
}

export async function toggleWatchlistServer(movie: Movie) {
  const exists = serverWatchlist.some(item => item.id === movie.id)
  
  if (exists) {
    serverWatchlist = serverWatchlist.filter(item => item.id !== movie.id)
    // Save the updated watchlist to the file after removal
    saveWatchlist() // Ensure this is called after removing an item
  } else {
    serverWatchlist.push({ 
        ...movie, 
        addedAt: new Date(), 
        poster: movie.poster_path, 
        backdropPath: movie.backdrop_path, 
        releaseDate: movie.release_date, 
        voteAverage: movie.vote_average 
      })
    // Save the updated watchlist to the file after adding
    saveWatchlist() // Ensure this is called after adding an item
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
  console.log({serverWatchlist}); 
  return serverWatchlist
}

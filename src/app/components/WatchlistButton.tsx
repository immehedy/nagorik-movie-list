'use client'

import { useState } from 'react'
import { toggleWatchlistServer } from '@/app/actions/watchlist'
import { useWatchlistStore } from '../lib/store'

export function WatchlistButton({ movie }: { movie: Movie }) {
  const [isPending, setIsPending] = useState(false)
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore()
  const isWatchlisted = isInWatchlist(movie.id)

  const handleToggleWatchlist = async () => {
    console.log("hello")
    try {
      setIsPending(true)
      
      // Update server state
      const result = await toggleWatchlistServer(movie);

      console.log({result})
      
      // Update client state
      if (result.success) {
        if (result.isAdded) {
          addToWatchlist(movie)
        } else {
          removeFromWatchlist(movie.id)
        }
      }
    } catch (error) {
      console.error('Failed to toggle watchlist:', error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button
      onClick={handleToggleWatchlist}
      disabled={isPending}
      className={`px-4 py-2 rounded-lg transition-colors ${
        isWatchlisted 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      {isPending ? 'Loading...' : isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
  )
}
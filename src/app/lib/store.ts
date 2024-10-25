import { create } from 'zustand'

export type Movie = {
  id: string | number
  title: string
  poster?: string
  overview: string
}

export type WatchlistItem = Movie & {
  addedAt: Date
}

type WatchlistStore = {
  watchlist: WatchlistItem[]
  addToWatchlist: (movie: Movie) => void
  removeFromWatchlist: (movieId: string | number) => void
  isInWatchlist: (movieId: string | number) => boolean
}

export const useWatchlistStore = create<WatchlistStore>((set, get) => ({
  watchlist: [],
  addToWatchlist: (movie) => set((state) => ({
    watchlist: [...state.watchlist, { ...movie, addedAt: new Date() }]
  })),
  removeFromWatchlist: (movieId) => set((state) => ({
    watchlist: state.watchlist.filter(item => item.id !== movieId)
  })),
  isInWatchlist: (movieId) => get().watchlist.some(item => item.id === movieId)
}))